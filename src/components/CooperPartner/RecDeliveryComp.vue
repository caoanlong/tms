<template>
	<div class="main-content">
		<div class="wf-card box-card">
			<div  class="header clearfix">收发货单位</div>
			<div class="search">
				<el-form :inline="true"  class="demo-form-inline"  size="small">
					<el-form-item label="公司名称">
						<el-input placeholder="请输入..." v-model="findcompanyName"></el-input>
					</el-form-item>
					<el-form-item label="地区">
						<el-input placeholder="请输入..." v-model="findcompanyArea"></el-input>
					</el-form-item>
					<el-form-item label="联系人">
						<el-input placeholder="请输入..." v-model="findcontactName"></el-input>
					</el-form-item>
					<el-form-item label="联系方式">
						<el-input placeholder="请输入..." v-model="findcontactPhone"></el-input>
					</el-form-item>
					<el-form-item label="录入时间">
						<el-date-picker
							v-model="findRangeDate"
							type="daterange"
							range-separator="至"
							start-placeholder="开始日期"
							end-placeholder="结束日期"
							value-format="timestamp"
							@change="selectDateRange">
						</el-date-picker>
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
					:data="{'type': 'ShipperConsignee'}" 
					:action="importFileUrl" 
					:auto-upload="true" 
					:onError="uploadError" 
					:onSuccess="uploadSuccess" 
					:beforeUpload="beforeFileUpload" 
					:headers="uploadHeaders" 
					:show-file-list="false">
					<el-button type="default" size="mini" icon="el-icon-upload2">导入</el-button>
				</el-upload>
				<a :href="templateUrl" :download="templateTit" class="download-btn"><svg-icon iconClass="excel-icon"></svg-icon> 下载模板</a>
				<el-button type="default" size="mini" icon="el-icon-delete" @click="del">批量删除</el-button>
			</div>
			<div class="table">
				<el-table 
					ref="recTable" 
					:data="tableData" @selection-change="selectionChange"
					border style="width: 100%" size="mini" stripe>
					<el-table-column label="id" type="selection" align="center" width="40"></el-table-column>
					<el-table-column label="公司名称" prop="companyName"></el-table-column>
					<el-table-column label="地区" prop="companyArea"></el-table-column>
					<el-table-column label="详细地址" prop="detailAddress"></el-table-column>
					<el-table-column label="联系人" prop="contactName" width="100"></el-table-column>
					<el-table-column label="联系方式" prop="contactPhone" width="140"></el-table-column>
					<el-table-column label="录入时间" prop="createTime" width="140">
						<template slot-scope="scope">
							<span>{{scope.row.createTime | getdatefromtimestamp() }}</span>
						</template>
					</el-table-column>
					<el-table-column width="80" align="center" fixed="right">
						<template slot-scope="scope">
							<el-dropdown  @command="handleCommand"  trigger="click">
								<el-button type="primary" size="mini">操作<i class="el-icon-arrow-down el-icon--right"></i></el-button>
								<el-dropdown-menu slot="dropdown">
									<el-dropdown-item :command="{type: 'view', id:scope.row.customerID}" icon="el-icon-view">查看</el-dropdown-item>
									<el-dropdown-item :command="{type: 'edit', id: scope.row.customerID}">编辑</el-dropdown-item>
									<el-dropdown-item :command="{type: 'delete', id: scope.row.customerID}" >删除</el-dropdown-item>
								</el-dropdown-menu>
							</el-dropdown>
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
import { baseURL } from '../../common/request'
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
			this.findcompanyArea='',
			this.findcompanyName='',
			this.findcontactName='',
			this.findcontactPhone='',
			this.findcreateTimeBegin='',
			this.findcreateTimeEnd='',
			this.findRangeDate = [],
			this.pageIndex=1,
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
			console.log(response)
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
				companyArea: this.findcompanyArea,
				companyName: this.findcompanyName,
				contactName: this.findcontactName,
				contactPhone: this.findcontactPhone,
				createTimeBegin: this.findcreateTimeBegin,
				createTimeEnd: this.findcreateTimeEnd,
				type: 'ShipperConsignee',
			}).then(res => {
				this.tableData = res.records
				this.total= res.total
			})
		},
		add() { 
			this.$router.push({name: 'addrecdeliverycomp'})
		},
		handleCommand(e) {
			if(e.type=='view'){
				this.$router.push({name: 'viewrecdeliverycomp', query: { customerID:e.id }})
			}else if(e.type=='edit'){
				this.$router.push({ name: 'editrecdeliverycomp' , query: {  customerID:e.id } })
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
			})
		}
	}
}
</script>
<style lang="stylus" scoped>
.upload-File
	display inline-block
	margin 0 10px
</style>