<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">客户地址</div>
			<div class="search">
				<el-form :inline="true"  class="demo-form-inline"  size="small">
					<el-form-item label="关键字">
						<el-input placeholder="请输入关键字" v-model="find.keyword"  @change="inputChange"></el-input>
					</el-form-item>
                    <el-form-item label="所属客户">
                        <el-autocomplete 
							style="width:100%" 
                            value-key="companyName" 
                            v-model="find.companyName"
                            :fetch-suggestions="getCompanys"
                            placeholder="请输入..."
                            @select="handSelect"  @change="inputChange">
							<i class="el-icon-close el-input__icon" slot="suffix"  @click="clearSelect"></i>
                        </el-autocomplete>
                    </el-form-item>
					<el-form-item>
						<el-button type="primary" @click="search">查询</el-button>
						<el-button type="default" @click="reset">重置</el-button>
					</el-form-item>
				</el-form>
			</div>
			<div class="tableControl">
				<el-button type="default" size="mini" icon="el-icon-plus" @click="add">添加</el-button>
				<el-button type="default" size="mini" icon="el-icon-delete" @click="del">批量删除</el-button>
				<el-upload 
					class="upload-File" 
					name="excelFile" 
					:action="importFileUrl" 
					:auto-upload="true" 
					:onError="uploadError" 
					:onSuccess="uploadSuccess"  
					:beforeUpload="beforeFileUpload" 
					:headers="uploadHeaders" 
					:show-file-list="false">
					<el-button type="default" size="mini" icon="el-icon-upload2">导入</el-button>
				</el-upload>
				<a :href="exportExcelUrl" class="exportExcel el-icon-download">导出</a>
				<a :href="templateUrl" class="download-btn"><svg-icon iconClass="excel-icon"></svg-icon> 下载模板</a>
			</div>
			<div class="table">
				<el-table 
					ref="recTable" 
					:data="tableData"
					@selection-change="selectionChange"
					border style="width: 100%" size="mini" stripe>
					<el-table-column label="id" type="selection" align="center" width="40"></el-table-column>
					<el-table-column label="所属客户" prop="companyName" align="center"></el-table-column>
					<el-table-column label="地址编号" prop="code" align="center"></el-table-column>
					<el-table-column label="联系人" prop="contactName" align="center"></el-table-column>
					<el-table-column label="电话" prop="contactPhone" align="center"></el-table-column>
					<el-table-column label="区域" prop="contactArea" align="center"></el-table-column>
					<el-table-column label="地址" align="center">
						<template slot-scope="scope">
							<span>{{scope.row.locationAddress}}{{scope.row.detailAddress}}</span>
						</template>
					</el-table-column>
                    <el-table-column label="围栏范围" prop="monitorScope" align="center">
                        <template slot-scope="scope">
							<span>{{scope.row.monitorScope?scope.row.monitorScope+'米':''}}</span>
						</template>
                    </el-table-column>
					<el-table-column label="操作" align="center" width="100">
						<template slot-scope="scope">
							<el-dropdown  @command="handleCommand"  trigger="click">
								<el-button type="primary" size="mini">操作<i class="el-icon-arrow-down el-icon--right"></i></el-button>
								<el-dropdown-menu slot="dropdown">
									<el-dropdown-item :command="{type: 'view', id:scope.row.customerAddressID}">查看</el-dropdown-item>
									<el-dropdown-item :command="{type: 'edit', id: scope.row.customerAddressID}">编辑</el-dropdown-item>
									<el-dropdown-item :command="{type: 'delete', id: scope.row.customerAddressID}" >删除</el-dropdown-item>
								</el-dropdown-menu>
							</el-dropdown>
						</template>
					</el-table-column>
				</el-table>
				<Page :total="total" :pageIndex="pageIndex" :pageSize="pageSize" @pageChange="pageChange" @pageSizeChange="pageSizeChange"/>
			</div>
		</el-card>
		<el-dialog title="添加货物单位" :visible.sync="dialogFormVisible">
			<el-form>
				<el-form-item label="单位名称" label-width="80px">
					<el-input placeholder="请输入货物单位" auto-complete="off" v-model="unit"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="add">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>
<script type="text/javascript">
import { Message } from 'element-ui'
import CargoUnit from '../../../api/CargoUnit'
import Company from '../../../api/Company'
import { baseMixin } from '../../../common/mixin'
import { baseURL } from '../../../common/request'
import { deleteConfirm } from '../../../common/utils'
export default {
	mixins: [baseMixin],
	data() {
		return {
			dialogFormVisible: false,
			uploadHeaders: {'Authorization': localStorage.getItem('token')},
			importFileUrl: baseURL + '/company/customer/address/import?Authorization=' + localStorage.getItem("token"),
			exportExcelUrl:'',
			templateUrl: baseURL + '/base/filetemplate/downLoadTemplate?fileName=customerAddress.xlsx&Authorization=' + localStorage.getItem("token"),
			find: { keyword: '',customerID: '', companyName: '' },
			unit: '',
			customerID: '',
			companyName: ''
		}
	},
	activated() {
		const customerID = this.$route.query.customerID
		const companyName = this.$route.query.companyName
		if (customerID) this.find.customerID = customerID
		if (companyName) this.find.companyName = companyName
		this.resetExportExcelUrl()
		this.getList()
	},
	methods: {
        getCompanys(queryString, cb) {
			this.find.customerID = ''
			Company.customerSuggest({
				companyName: queryString
			}).then(res => { cb(res) })
        },
        handSelect(data){
			this.find.customerID = data.customerID
			this.find.companyName = data.companyName
			this.resetExportExcelUrl()
		},
		clearSelect(){
			this.find.customerID = ''
			this.find.companyName =''
			this.resetExportExcelUrl()
		},
		reset() {
			this.find.keyword = ''
			this.find.customerID = ''
			this.find.companyName = ''
			this.pageIndex = 1
			this.resetExportExcelUrl()
			this.getList()
		},
		selectionChange(data) {
			this.selectedList = data.map(item => item.customerAddressID)
		},
		getList() {
			this.tableData = []
			Company.customerAddressFind({
				current: this.pageIndex,
				size: this.pageSize,
				keyword: this.find.keyword,
				companyName: this.find.companyName
			}).then(res => {
				this.tableData = res.records
				this.total = res.total
			})
        },
        handleCommand(e) {
			if(e.type == 'view'){
				this.$router.push({name: 'viewcompanyaddress', query: { customerAddressID: e.id }})
			}else if(e.type == 'edit'){
				this.$router.push({ name: 'editcompanyaddress', query: { customerAddressID: e.id } })
			}else if(e.type == 'delete'){
				this.del(e.id)
			}
		},
		add() {
			if (this.customerID && this.companyName) {
				this.$router.push({ 
					name: 'addcompanyaddress', 
					query: { 
						customerID: this.customerID, 
						companyName: this.companyName,
						contactName: this.$route.query.contactName,
						contactPhone: this.$route.query.contactPhone,
						companyAreaID: this.$route.query.companyAreaID
					} 
				})
			} else {
				this.$router.push({ name: 'addcompanyaddress' })
			}
		},
		del(customerAddressID) {
			deleteConfirm(customerAddressID, customerAddressIDs => {
				Company.customerAddressDeleteBatch({ customerAddressIDs }).then(res => {
					Message.success('删除成功!')
					this.getList()
				})
			}, this.selectedList)
		},
		resetExportExcelUrl(){
			this.exportExcelUrl = baseURL + '/company/customer/address/export?Authorization=' + localStorage.getItem("token")
				+ '&keyword=' + this.find.keyword + '&companyName=' + this.find.companyName
			
		},
		inputChange() {
			this.resetExportExcelUrl()
		},
		// 导入成功
		uploadSuccess (response) {
			if(response.code != 200){
				Message.error(response.msg)
			} else{
				Message.success(response.msg)
				this.getList()
			}
		}
	}
}
</script>
<style lang="stylus" scoped>
.download-btn
.exportExcel
	font-size 12px
	color #606266
	height 29px
	line-height 29px
	padding 0 15px
	border 1px solid #dcdfe6
	border-radius 3px
	background #fff
	margin-right 10px
	display inline-block
	vertical-align top
	&:hover
		border-color #c6e2ff
		color #409eff
		background #ecf5ff
	&:active
		border-color #3a8ee6
		color #3a8ee6
.upload-File
	display inline-block
	margin 0 10px
</style>