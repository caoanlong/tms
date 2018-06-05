<template>
	<div class="main-content">
		<div class="wf-card">
			<div class="header clearfix">司机管理</div>
			<div class="search">
				<el-form :inline="true"  class="demo-form-inline"  size="small">
					<el-form-item label="关键字">
						<el-input placeholder="车牌号/挂车号/姓名" v-model="findName"></el-input>
					</el-form-item>
					<el-form-item label="车辆归属">
						<el-select v-model="findLevel" placeholder="全部">
							<el-option label="全部" value=""></el-option>
							<el-option label="单位挂靠" value="单位挂靠"></el-option>
							<el-option label="个人挂靠" value="个人挂靠"></el-option>
							<el-option label="自有车辆" value="自有车辆"></el-option>
						</el-select>
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
				<a :href="templateUrl" :download="templateTit" class="download-btn"><svg-icon iconClass="excel-icon"></svg-icon> 下载模板</a>
				<el-button type="default" size="mini" icon="el-icon-delete" @click="deleteConfirm">批量删除</el-button>
			</div>
			<div class="table">
				<el-table
					ref="recTable"
					:data="tableData"
					@selection-change="selectionChange"
					border style="width: 100%" size="mini" stripe>
					<el-table-column label="id" fixed type="selection" align="center" width="40"></el-table-column>
					<el-table-column label="姓名" prop="realName"></el-table-column>
					<el-table-column label="性别">
						<template slot-scope="scope">
							<span >{{scope.row.sex == 'M' ? '男' : '女'}}</span>
						</template>
					</el-table-column>
					<el-table-column label="手机" width="100">
					</el-table-column>
					<el-table-column label="合作关系" prop="idCardNum" width="160"></el-table-column>
					<el-table-column label="关联账号" prop="createName" ></el-table-column>
					<el-table-column label="备注"></el-table-column>
					<el-table-column label="身份证" prop="auditName" ></el-table-column>
					<el-table-column label="驾驶证" ></el-table-column>
					<el-table-column label="从业资格证"></el-table-column>
					
					<el-table-column label="更新时间" width="140">
						<template slot-scope="scope">
							<span v-if="scope.row.createTime">{{scope.row.createTime | getdatefromtimestamp()}}</span>
						</template>
					</el-table-column>
					<el-table-column label="操作" width="80" align="center" fixed="right">
						<template slot-scope="scope">
							<el-dropdown  @command="handleCommand"  trigger="click">
								<el-button type="primary" size="mini">操作<i class="el-icon-arrow-down el-icon--right"></i></el-button>
								<el-dropdown-menu slot="dropdown">
									<el-dropdown-item :command="{type: 'view', id: scope.row.staffID}" icon="el-icon-view">查看</el-dropdown-item>
									<el-dropdown-item :command="{type: 'edit', id: scope.row.staffID}">编辑</el-dropdown-item>
									<el-dropdown-item :command="{type: 'delete', id: scope.row.staffID}">删除</el-dropdown-item>
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
			findMobile: '',
			findLevel: '',
			findPost: '',
			findDate: [],
			startDate: '',
			endDate: '',
			pageIndex: 1,
			pageSize: 10,
			count: 0,
			selectedList: [],
			tableData: [],
			importFileUrl: baseURL + '/staff/upload',
			uploadHeaders: {'Authorization': localStorage.getItem('token')},
			postMap: {
				"Operator": "操作员",
				"Driver": "驾驶员",
				"Supercargo": "押运员",
				"SafetyOfficer": "专职安全员",
				"Stevedore": "装卸管理人员",
				"Other": "其他人员"
			},
			templateUrl: baseURL + '/base/filetemplate/downLoadTemplate?fileName=employee.xlsx&&Authorization=' +localStorage.getItem("token"),
			templateTit:'employee.xlsx'
		}
	},
	created() {
		this.getList()
	},
	methods: {
		reset() {
			this.findName = ''
			this.findMobile = ''
			this.findLevel = ''
			this.findPost = ''
			this.findDate = []
			this.startDate = ''
			this.endDate = ''
			this.getList()
		},
		pageChange(index) {
			this.pageIndex = index
			this.getList()
		},
		selectionChange(data) {
			this.selectedList = data.map(item => item.staffID)
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
				mobile: this.findMobile,
				position: this.findPost,
				realName: this.findName,
				integrityExamineGrade: this.findLevel,
				createTimeBegin: this.startDate,
				createTimeEnd: this.endDate
			}
			request({
				url: '/staff/findList',
				params
			}).then(res => {
				if (res.data.code == 200) {
					this.tableData = res.data.data.records
					this.count = res.data.data.total
				}
			})
		},
		handleCommand(e) {
			console.log(e)
			if (e.type == 'view') {
				this.$router.push({name: 'viewdriver', query: {staffID: e.id}})
			} else if (e.type == 'edit') {
				this.$router.push({name: 'editdriver', query: {staffID: e.id}})
			} else if (e.type == 'delete') {
				this.deleteConfirm(e.id)
			}
		},
		add() {
			this.$router.push({name: 'adddriver'})
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
		delItem(staffIDs) {
			console.log(staffIDs)
			let data = {
				staffIDs
			}
			request({
				url: '/staff/deleteBatch',
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
