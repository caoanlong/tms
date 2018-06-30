<template>
	<div class="main-content">
		<div class="wf-card box-card">
			<div  class="header clearfix">关联司机APP</div>
			<div class="search">
				<el-form :inline="true"  class="demo-form-inline"  size="small">
					<el-form-item label="司机">
						<el-input placeholder="请输入姓名或手机号" v-model="findcompanyName"></el-input>
					</el-form-item>
					<el-form-item label="关联状态">
						<el-select placeholder="全部">
							<el-option label="全部" value=""></el-option>
							<el-option label="已关联" value="Agreed"></el-option>
							<el-option label="已邀请" value="Invited"></el-option>
							<el-option label="已拒绝" value="Rejected"></el-option>
							<el-option label="已解除" value="Relieved"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="getList()">查询</el-button>
						<el-button type="default" @click="reset">重置</el-button>
					</el-form-item>
				</el-form>
			</div>
			<div class="tableControl">
				<el-button type="default" size="mini" icon="el-icon-plus" @click="add">邀请司机</el-button>
			</div>
			<div class="table">
				<el-table 
					ref="recTable" 
					:data="tableData"
					@selection-change="selectionChange"
					border style="width: 100%" size="mini" stripe>
					<el-table-column label="姓名" prop="realName" align="center"></el-table-column>
					<el-table-column label="手机" prop="mobile" align="center"></el-table-column>
					<el-table-column label="关联状态" align="center">
						<template slot-scope="scope">
							<el-tag size="mini" type="success" v-if="scope.row.cooperateStatus == 'Agreed'">已同意</el-tag>
							<el-tag size="mini" v-else-if="scope.row.cooperateStatus == 'Invited'">已邀请</el-tag>
							<el-tag size="mini" type="danger" v-else-if="scope.row.cooperateStatus == 'Rejected'">已拒绝</el-tag>
							<el-tag size="mini" type="info" v-else-if="scope.row.cooperateStatus == 'Relieved'">已解除</el-tag>
						</template>
					</el-table-column>
					<el-table-column label="合作备注" prop="remark" align="center"></el-table-column>
					<el-table-column label="操作" align="center">
						<template slot-scope="scope">
							<el-button type="danger" size="mini">删除</el-button>
						</template>
					</el-table-column>
				</el-table>
				<Page :total="total" :pageSize="pageSize" @pageChange="pageChange" @pageSizeChange="pageSizeChange"/>
			</div>
		</div>
		<el-dialog title="添加货物单位" :visible.sync="dialogFormVisible">
			<el-form>
				<el-form-item label="单位名称" label-width="80px">
					<el-input placeholder="请输入货物单位" auto-complete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>
<script type="text/javascript">
import { Message } from 'element-ui'
import request, { baseURL } from '../../common/request'
import Driver from '../../api/Driver'
import Page from '../CommonComponents/Page'
import { deleteConfirm } from '../../common/utils'
export default {
	data() {
		return {
			dialogFormVisible:false,
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
			Driver.find({
				current: this.pageIndex,
				size: this.pageSize,
				keyword: this.findKeyword,
				cooperateRelation: this.findCooperateRelation
			}).then(res => {
				this.tableData = res.records
				this.count = res.total
			})
		},
		add() { 
			this.dialogFormVisible = true
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