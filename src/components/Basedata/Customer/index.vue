<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">客户</div>
			<div class="search">
				<el-form :inline="true"  class="demo-form-inline"  size="small">
					<el-form-item label="关键字">
						<el-input placeholder="请输入关键字" v-model="find.keyword"  @change="inputChange"></el-input>
					</el-form-item>
					<el-form-item label="类型" class="customerSelect">
						<el-select v-model="find.customerType" placeholder="请选择"  @change="inputChange">
							<el-option value="Shipper" label="发货方"></el-option>
							<el-option value="Consignee" label="收货方"></el-option>
							<el-option value="Delegate" label="委托方"></el-option>
						</el-select>
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
					name="excel" 
					:action="importFileUrl" 
					:auto-upload="true" 
					:onError="uploadError" 
					:onSuccess="uploadSuccess" 
					:beforeUpload="beforeFileUpload" 
					:headers="uploadHeaders" 
					:show-file-list="false">
					<el-button type="default" size="mini" icon="el-icon-upload2">导入</el-button>
				</el-upload>
				<a :href="exportExcelUrl" download="customer.xlsx" class="exportExcel el-icon-download">导出</a>
				<a :href="templateUrl" download="customer.xlsx" class="download-btn"><svg-icon iconClass="excel-icon"></svg-icon> 下载模板</a>
			</div>
			<div class="table">
				<el-table 
					ref="recTable" 
					:data="tableData" @selection-change="selectionChange"
					border style="width: 100%" size="mini" stripe>
					<el-table-column label="id" type="selection" align="center" width="40"></el-table-column>
					<el-table-column label="单位名称" prop="companyName" align="center"></el-table-column>
					<el-table-column label="地区" prop="companyArea" align="center"></el-table-column>
					<el-table-column label="类型" prop="customerType" width="120" align="center">
						<template slot-scope="scope">
							{{scope.row.customerType?scope.row.customerType.split(',').map((item) => CUSTOMERTYPE[item]).join(' , '):''}}
						</template>
					</el-table-column>
					<el-table-column label="联系人" prop="contactName" width="100" align="center"></el-table-column>
					<el-table-column label="手机" prop="contactPhone" width="140" align="center"></el-table-column>
					<el-table-column label="TA的地址" prop="customerAddressNum" width="140" align="center">
						<template slot-scope="scope">
							<span :class="{'link': Number(scope.row.customerAddressNum) > 0}" @click="viewAddress(scope.row)">{{scope.row.customerAddressNum + '个地址'}}</span>
						</template>
					</el-table-column>
					<el-table-column width="80" align="center" fixed="right">
						<template slot-scope="scope">
							<el-dropdown  @command="handleCommand"  trigger="click">
								<el-button type="primary" size="mini">操作<i class="el-icon-arrow-down el-icon--right"></i></el-button>
								<el-dropdown-menu slot="dropdown">
									<el-dropdown-item :command="{type: 'address', data: scope.row}">地址</el-dropdown-item>
									<el-dropdown-item :command="{type: 'view', id:scope.row.customerID}">查看</el-dropdown-item>
									<el-dropdown-item :command="{type: 'edit', id: scope.row.customerID}">编辑</el-dropdown-item>
									<el-dropdown-item :command="{type: 'delete', id: scope.row.customerID}" >删除</el-dropdown-item>
								</el-dropdown-menu>
							</el-dropdown>
						</template>
					</el-table-column>
				</el-table>
				<Page :total="total" :pageIndex="pageIndex" :pageSize="pageSize" @pageChange="pageChange" @pageSizeChange="pageSizeChange"/>
			</div>
		</el-card>
	</div>
</template>
<script type="text/javascript">
import { Message } from 'element-ui'
import Company from '../../../api/Company'
import { baseMixin } from '../../../common/mixin'
import { baseURL } from '../../../common/request'
import { deleteConfirm } from '../../../common/utils'
export default {
	mixins: [baseMixin],
	data() {
		return {
			uploadHeaders: {'Authorization': localStorage.getItem('token')},
			importFileUrl: baseURL + '/company/customer/import?Authorization=' + localStorage.getItem("token"),
			exportExcelUrl: '',
			templateUrl: baseURL + '/base/filetemplate/downLoadTemplate?fileName=customer.xlsx&Authorization=' + localStorage.getItem("token"),
			find: {
				keyword: '',
				customerType: ''
			}
		}
	},
	created() {
		this.resetExportExcelUrl()
		this.getList()
	},
	activated() {
		if(!this.$route.query.cache) {
			this.find = {
				keyword: '',
				customerType: ''
			}
			this.resetExportExcelUrl()
			this.getList()
		}
	},
	methods: {
		reset() {
			this.find.keyword = ''
			this.find.customerType = ''
			this.pageIndex = 1
			this.pageSize = 10
			this.resetExportExcelUrl()
			this.getList()
		},
		selectionChange(data) {
			this.selectedList = data.map(item => item.customerID)
		},
		getList() {
			Company.customerFind({
				current: this.pageIndex,
				size: this.pageSize,
				customerType: this.find.customerType,
				keyword: this.find.keyword
			}).then(res => {
				this.tableData = res.records
				this.total= res.total
			})
		},
		add() { 
			this.$router.push({name: 'addrecdeliverycomp'})
		},
		handleCommand(e) {
			if (e.type == 'view') {
				this.$router.push({name: 'viewrecdeliverycomp', query: { customerID: e.id }})
			} else if (e.type == 'edit') {
				this.$router.push({ name: 'editrecdeliverycomp' , query: {  customerID: e.id } })
			} else if (e.type == 'address') {
				this.$router.push({ 
					name: 'companyaddress', 
					query: { 
						customerID: e.data.customerID,
						companyName: e.data.companyName,
						contactName: e.data.contactName,
						contactPhone: e.data.contactPhone,
						companyAreaID: e.data.companyAreaID
					}
				})
			} else if (e.type == 'delete') {
				this.del(e.id)
			}
		},
		viewAddress(data) {
			this.$router.push({ name: 'companyaddress' , query: {  customerID: data.customerID, companyName: data.companyName,contactName: data.contactName,
						contactPhone: data.contactPhone,
						companyAreaID: data.companyAreaID } })
		},
		del(customerID) {
			deleteConfirm(customerID, customerIDs => {
				Company.customerDeleteBatch({ customerIDs }).then(res => {
					Message.success('删除成功!')
					this.getList()
				})
			}, this.selectedList)
		},
		resetExportExcelUrl(){
			this.exportExcelUrl = baseURL + '/company/customer/export?Authorization=' + localStorage.getItem("token") 
				+ '&keyword=' + this.find.keyword
				+ '&customerType=' + this.find.customerType
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