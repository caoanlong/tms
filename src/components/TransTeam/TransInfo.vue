<template>
	<div class="main-content">
		<div class="wf-card">
			<div class="header clearfix">运输档案</div>
			<div class="search">
				<el-form :inline="true"  class="demo-form-inline"  size="small">
					<el-form-item label="姓名">
						<el-input placeholder="请输入..." v-model="findName"></el-input>
					</el-form-item>
					<el-form-item label="车牌号">
						<el-input placeholder="请输入..." v-model="findPlateNum"></el-input>
					</el-form-item>
					<el-form-item label="自编号">
						<el-input placeholder="请输入..." v-model="findSelfNum"></el-input>
					</el-form-item>
					<el-form-item label="创建时间">
						<el-date-picker
							v-model="findDate"
							type="daterange"
							range-separator="至"
							start-placeholder="开始日期"
							end-placeholder="结束日期"
							value-format="timestamp" 
							@change="selectDateRange">
						</el-date-picker>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="getList">查询</el-button>
						<el-button type="default" @click="reset">重置</el-button>
					</el-form-item>
				</el-form>
			</div>
			<div class="tableControl">
				<el-button type="default" size="mini" icon="el-icon-plus" @click="add">添加</el-button>
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
				<el-button type="default" size="mini" icon="el-icon-delete" @click="deleteConfirm">批量删除</el-button>
			</div>
			<div class="table">
				<el-table 
					ref="recTable" 
					:data="tableData" 
					@selection-change="selectionChange"
					border style="width: 100%" size="mini" stripe>
					<el-table-column label="id" type="selection" align="center" width="40"></el-table-column>
					<el-table-column label="姓名" prop="realName"></el-table-column>
					<el-table-column label="身份证号" prop="idCardNum" width="150"></el-table-column>
					<el-table-column label="联系电话" prop="mobile" width="100"></el-table-column>
					<el-table-column label="从业资格证件号" prop="qualificationCode" width="120"></el-table-column>
					<el-table-column label="车牌号" width="120">
						<template slot-scope="scope">
							<span>{{scope.row.plateNo}}</span>
							<span v-if="scope.row.trailerPlateNo">{{'/' + scope.row.trailerPlateNo}}</span>
						</template>
					</el-table-column>
					<el-table-column label="自编号" prop="code"></el-table-column>
					<el-table-column label="道路运输证号" prop="transportLicenceCode" width="120"></el-table-column>
					<el-table-column label="载重" prop="loads" width="100"></el-table-column>
					<el-table-column label="备注" prop="remark"></el-table-column>
					<el-table-column label="创建时间" width="100">
						<template slot-scope="scope">
							<span v-if="scope.row.createTime">{{scope.row.createTime | getdatefromtimestamp(true)}}</span>
						</template>
					</el-table-column>
					<el-table-column label="建档时间" width="100">
						<template slot-scope="scope">
							<span v-if="scope.row.archiveTime">{{scope.row.archiveTime | getdatefromtimestamp(true)}}</span>
						</template>
					</el-table-column>
					<el-table-column width="80" align="center" fixed="right">
						<template slot-scope="scope">
							<el-dropdown  @command="handleCommand"  trigger="click">
								<el-button type="primary" size="mini">操作<i class="el-icon-arrow-down el-icon--right"></i></el-button>
								<el-dropdown-menu slot="dropdown">
									<el-dropdown-item :command="{type: 'view', id: scope.row.transportRecordID}" icon="el-icon-view">查看</el-dropdown-item>
									<el-dropdown-item :command="{type: 'edit', id: scope.row.transportRecordID}">编辑</el-dropdown-item>
									<el-dropdown-item :command="{type: 'delete', id: scope.row.transportRecordID}">删除</el-dropdown-item>
								</el-dropdown-menu>
							</el-dropdown>
						</template>
					</el-table-column>
				</el-table>
				<el-row type="flex">
					<el-col :span="12" style="padding-top: 15px; font-size: 12px; color: #909399">
						<span>总共 {{count}} 条记录每页显示</span>
						<el-select size="mini" style="width: 90px; padding: 0 5px" v-model="pageSize" @change="getList">
							<el-option label="10" :value="10"></el-option>
							<el-option label="20" :value="20"></el-option>
							<el-option label="30" :value="30"></el-option>
							<el-option label="40" :value="40"></el-option>
							<el-option label="50" :value="50"></el-option>
							<el-option label="100" :value="100"></el-option>
						</el-select>
						<span>条记录</span>
					</el-col>
					<el-col :span="12">
						<div class="pagination">
							<el-pagination :page-size="pageSize" align="right" background layout="prev, pager, next" :total="count" @current-change="pageChange"></el-pagination>
						</div>
					</el-col>
				</el-row>
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
	import { Message } from 'element-ui'
	import request, { baseURL } from '../../common/request'
	export default {
		data() {
			return {
				findName: '',
				findPlateNum: '',
				findSelfNum: '',
				findDate: [],
				startDate: '',
				endDate: '',
				pageIndex: 1,
				pageSize: 10,
				count: 0,
				selectedList:[],
				tableData: [],
				importFileUrl: baseURL + '/transportRecord/upload',
				uploadHeaders: {'Authorization': localStorage.getItem('token')},
			}
		},
		created() {
			this.getList()
		},
		methods: {
			reset() {
				this.findName = ''
				this.findPlateNum = ''
				this.findSelfNum = ''
				this.findDate = []
				this.startDate = ''
				this.endDate = ''
			},
			pageChange(index) {
				this.pageIndex = index
				this.getList()
			},
			selectionChange(data) {
				this.selectedList = data.map(item => item.transportRecordID)
			},
			selectDateRange(date) {
				this.startDate = date[0]
				this.endDate = date[1]
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
				let params = {
					current: this.pageIndex,
					size: this.pageSize,
					code: this.findSelfNum,
					realName: this.findName,
					plateNo: this.findPlateNum,
					createTimeBegin: this.startDate,
					createTimeEnd: this.endDate
				}
				request({
					url: '/transportRecord/findList',
					params
				}).then(res => {
					this.tableData = res.data.data.records
					this.count = res.data.data.total
				})
			},
			handleCommand(e) {
				if (e.type == 'view') {
					this.$router.push({name: 'viewtransinfo', query: {transportRecordID: e.id}})
				} else if (e.type == 'edit') {
					this.$router.push({name: 'edittransinfo', query: {transportRecordID: e.id}})
				} else if (e.type == 'delete') {
					this.deleteConfirm(e.id)
				}
			},
			add() {
				this.$router.push({name: 'addtransinfo'})
			},
			deleteConfirm(id) {
				let ids = ''
				if (id && typeof id == 'string') {
					ids = id
				} else {
					ids = this.selectedList.join(',')
				}
				if(!ids) {
					Message({
						type: 'warning',
						message: '请选择'
					})
					return
				}
				this.$confirm('此操作将永久删除, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.delItem(ids)
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					})
				})
			},
			delItem(transportRecordIDs) {
				console.log(transportRecordIDs)
				let data = {
					transportRecordIDs
				}
				request({
					url: '/transportRecord/deleteBatch',
					method: 'post',
					data
				}).then(res => {
					this.$message({
						type: 'success',
						message: '删除成功!'
					})
					this.getList()
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