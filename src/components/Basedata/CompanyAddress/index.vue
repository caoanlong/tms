<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">客户地址</div>
			<div class="search">
				<el-form :inline="true"  class="demo-form-inline"  size="small">
                    <el-form-item label="所属客户">
                        <el-autocomplete 
                            value-key="companyName" 
                            v-model="find.companyName"
                            :fetch-suggestions="getCustomers"
                            placeholder="请输入客户名称" 
                            @select="handSelectCustomer" 
							@change="inputChange">
							<i class="el-icon-close el-input__icon" slot="suffix" @click="clearSelectCustomer"></i>
                        </el-autocomplete>
                    </el-form-item>
                    <el-form-item label="所属片区" class="customerSelect">
						<el-select v-model="find.zone" placeholder="请选择"  @change="inputChange">
                            <el-option value="" label="全部"></el-option>
							<el-option v-for="(item,index) in CustomerZone" :key="index" :value="item.code" :label="item.code"></el-option>
						</el-select>
					</el-form-item>
                    <el-form-item label="终端用户名称">
						<el-input placeholder="请输入终端用户名称" v-model="find.finalUsername"  @change="inputChange"></el-input>
					</el-form-item>
                    <el-form-item label="地址">
						<el-input placeholder="请输入地址" v-model="find.locationAddress"  @change="inputChange"></el-input>
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
					<el-table-column label="所属片区" prop="zone" align="center"></el-table-column>
					<el-table-column label="终端用户名称" prop="finalUsername" align="center"></el-table-column>
					<el-table-column label="联系人" prop="contactName" align="center"></el-table-column>
					<el-table-column label="手机" prop="contactPhone" align="center"></el-table-column>
					<el-table-column label="区域" prop="contactArea" align="center"></el-table-column>
					<el-table-column label="地址" align="center">
						<template slot-scope="scope">
							<span>{{scope.row.locationAddress}}{{scope.row.detailAddress}}</span>
						</template>
					</el-table-column>
					<el-table-column label="地址编码" prop="code" align="center"></el-table-column>

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
import BaseDict from '../../../api/BaseDict'
import { baseMixin } from '../../../common/mixin'
import { baseURL } from '../../../common/request'
import { deleteConfirm } from '../../../common/utils'
export default {
	mixins: [baseMixin],
	data() {
		return {
			dialogFormVisible: false,
			uploadHeaders: {'Authorization': localStorage.getItem('token'),'Request-From':'PC'},
			importFileUrl: baseURL + '/company/customer/address/import?Request-From=PC&Authorization=' + localStorage.getItem("token"),
			exportExcelUrl:'',
			templateUrl: baseURL + '/base/filetemplate/downLoadTemplate?fileName=customerAddress.xlsx&Authorization=' + localStorage.getItem("token"),
			find: { 
                keyword: '',
                zone:'',
                customerID: '', 
                companyName: '' ,
                locationAddress:'',
                finalUsername:''
            },
			unit: '',
			customerID: '',
            companyName: '',
            CustomerZone:[]
		}
	},
	activated() {
		const customerID = this.$route.query.customerID
		const companyName = this.$route.query.companyName
		if (customerID) this.find.customerID = customerID
		if (companyName) this.find.companyName = companyName
		this.resetExportExcelUrl()
        this.getList()
        this.getDictList()
	},
	methods: {
        getDictList() {
			BaseDict.getDict({
				groupName:'CustomerZone'
			}).then(res => {
				this.CustomerZone = res.data
			})
		},
        getCustomers(companyName, cb) {
			this.find.consigneeID = ''
			Company.customerFind({
                current: 1,
                size: 1000,
                customerType: 'Consignee'
            }).then(res => {
                cb(res.records) 
            })
		},
        handSelectCustomer(data){
			this.find.customerID = data.customerID
            this.find.companyName = data.companyName
			this.resetExportExcelUrl()
		},
		clearSelectCustomer(){
			this.find.customerID = ''
			this.find.companyName =''
			this.resetExportExcelUrl()
		},
		reset() {
			this.find.zone=''
            this.find.customerID=''
            this.find.companyName=''
            this.find.locationAddress=''
            this.find.finalUsername=''
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
                zone:this.find.zone,
                customerID:this.find.customerID, 
                companyName:this.find.companyName,
                locationAddress:this.find.locationAddress
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
        inputChange(){},
		add() {
            const customerID = this.$route.query.customerID
		    const companyName = this.$route.query.companyName
			if (customerID && companyName) {
				this.$router.push({ 
					name: 'addcompanyaddress', 
					query: { 
						customerID: this.$route.query.customerID, 
						companyName: this.$route.query.companyName,
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
			this.exportExcelUrl = baseURL + '/company/customer/address/export?Request-From=PC&Authorization=' + localStorage.getItem("token")
                + '&keyword='+ this.find.keyword 
                + '&companyName='+ this.find.companyName
                + '&zone='+ this.find.zone
                + '&customerID='+ this.find.customerID
                + '&locationAddress='+ this.find.locationAddress
                + '&finalUsername='+ this.find.finalUsername		
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