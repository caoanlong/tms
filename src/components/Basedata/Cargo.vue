<template>
	<div class="main-content">
		<div class="wf-card box-card">
			<div  class="header clearfix">常用货物</div>
			<div class="search">
				<el-form :inline="true"  class="demo-form-inline"  size="small">
					<el-form-item label="企业名称">
						<el-input placeholder="请输入企业名称" v-model="findcompanyName"></el-input>
					</el-form-item>
					<el-form-item label="货物名称">
						<el-input placeholder="请输入货物名称" v-model="findcompanyName"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="getList()">查询</el-button>
						<el-button type="default" @click="reset">重置</el-button>
					</el-form-item>
				</el-form>
			</div>
			<div class="tableControl">
				<el-button type="default" size="mini" icon="el-icon-plus" @click="add">添加</el-button>
				<el-upload 
					class="upload-File" 
					name="excelFile" 
					:data="{'type': 'Consignor'}" 
					:action="importFileUrl" 
					:auto-upload="true" 
					:onError="uploadError" 
					:onSuccess="uploadSuccess" 
					:beforeUpload="beforeFileUpload" 
					:headers="uploadHeaders" 
					:show-file-list="false">
					<el-button type="default" size="mini" icon="el-icon-upload2">导入货物</el-button>
				</el-upload>
			</div>
			<div class="table">
				<el-table 
					ref="recTable" 
					:data="tableData"
					@selection-change="selectionChange"
					border style="width: 100%" size="mini" stripe>
					<el-table-column label="企业名称" prop="companyName" align="center"></el-table-column>
					<el-table-column label="货物名称" prop="companyName" align="center"></el-table-column>
					<el-table-column label="品名表名称" prop="companyName" align="center"></el-table-column>
					<el-table-column label="货物类型" prop="companyName" align="center"></el-table-column>
					<el-table-column label="包装单位" prop="companyName" align="center"></el-table-column>
					<el-table-column label="操作" align="center">
						<template slot-scope="scope">
							<el-button type="primary" size="mini" @click="edit">编辑</el-button>
							<el-button type="danger" size="mini">删除</el-button>
						</template>
					</el-table-column>
				</el-table>
				<Page :total="total" :pageSize="pageSize" @pageChange="pageChange" @pageSizeChange="pageSizeChange"/>
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
import { Message } from 'element-ui'
import request, { baseURL } from '../../common/request'
import Customer from '../../api/Customer'
import Page from '../CommonComponents/Page'
import { deleteConfirm } from '../../common/utils'
export default {
	data() {
		return {
			findcompanyName: '',
			findcompanyArea: '',
			findcontactName: '',
			findcontactPhone: '',
			findRangeDate: [],
			findcreateTimeBegin: '',
			findcreateTimeEnd: '',
			pageIndex: 1,
			pageSize: 10,
			total:0,
			tableData: [],
			selectedList: [],
			importFileUrl: baseURL + '/customer/upload',
			uploadHeaders: {'Authorization': localStorage.getItem('token')},
			templateUrl: baseURL + '/base/filetemplate/downLoadTemplate?fileName=shipperAndConsignor.xlsx&&Authorization=' +localStorage.getItem("token"),
			templateTit:'shipperAndConsignor.xlsx'
		}
	},
	components: {
		Page
	},
	created() {
		this.getList()
	},
	methods: {
		reset() {
			this.findcompanyArea = ''
			this.findcompanyName = ''
			this.findcontactName = ''
			this.findcontactPhone = ''
			this.findcreateTimeBegin = ''
			this.findcreateTimeEnd = ''
			this.findRangeDate = []
			this.pageIndex = 1
			this.getList()
		},
		pageChange(index) {
			this.pageIndex = index
			this.getList()
		},
		pageSizeChange(size) {
			this.pageSize = size
			this.getList() 
		},
		selectDateRange(date) {
			this.findcreateTimeBegin = date[0]
			this.findcreateTimeEnd = date[1]
		},
		selectionChange(data) {
			this.selectedList = data.map(item => item.customerID)
		},
		// 导入
		uploadSuccess (response) {
			if (response.code != 200) {
				Message.error(response.msg)
			} else {
				Message.success(response.msg)
				this.getList()
			}
		},
		// 上传错误
		uploadError (response) {
			Message.error(response.msg)
		},
		beforeFileUpload (file) {
			const extension = file.name.split('.')[1] === 'xls'
			const extension2 = file.name.split('.')[1] === 'xlsx'
			const isLt2M = file.size / 1024 / 1024 < 10
			if (!extension && !extension2) {
				Message.error('上传模板只能是 xls、xlsx格式!')
			}
			if (!isLt2M) {
				Message.error('上传模板大小不能超过 10MB!')
			}
			return extension || extension2 && isLt2M
		},
		getList() {
			Customer.find({
				current: this.pageIndex,
				size: this.pageSize,
				companyArea:this.findcompanyArea,
				companyName:this.findcompanyName,
				contactName:this.findcontactName,
				contactPhone:this.findcontactPhone,
				createTimeBegin:this.findcreateTimeBegin,
				createTimeEnd:this.findcreateTimeEnd,
				type: 'Consignor'
			}).then(res => {
				this.tableData = res.records
				this.total= res.total
			})
		},
		add() { 
			this.$router.push({ name: 'addcargo' })
		},
		edit(){
			this.$router.push({ name: 'editcargo' })
		},
		handleCommand(e) {
			if(e.type=='view'){
				this.$router.push({name: 'viewshipper', query: { customerID:e.id }})
			}else if(e.type=='edit'){
				this.$router.push({ name: 'editshipper' , query: {  customerID:e.id } })
			}else if(e.type=='delete'){
				this.del(e.id)
			}
		},
		del(customerID) {
			deleteConfirm(customerID, customerIDs => {
				Customer.del({ customerIDs }).then(res => {
					Message({ type: 'success', message: '删除成功!' })
					this.getList()
				})
			}, this.selectedList)
		}
	}
}
</script>
<style lang="stylus" scoped>
.upload-File
	display inline-block
	margin 0 10px
</style>