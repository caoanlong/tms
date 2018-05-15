<template>
	<div class="main-content">
		<div class="wf-card">
			<div class="header clearfix">员工列表</div>
			<div class="search">
				<el-form :inline="true" class="demo-form-inline" size="small">
					<el-form-item label="姓名">
						<el-input placeholder="姓名" v-model="findName"></el-input>
					</el-form-item>
					<el-form-item label="手机号">
						<el-input placeholder="登录名" v-model="findMobile"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="getUsers()">查询</el-button>
						<el-button type="default" @click="reset">重置</el-button>
					</el-form-item>
				</el-form>
			</div>
			<div class="tableControl">
				<el-button type="default" size="mini" icon="el-icon-plus" @click="addUser">添加</el-button>
				<el-button type="default" size="mini" icon="el-icon-delete" @click="deleteConfirm">批量删除</el-button>
				<!-- <upload-excel btnType="default" btnTxt="导入" @on-selected-file="onSelectedFile"/>
				<el-button type="default" size="mini" icon="el-icon-download" :loading="downloadLoading" @click="exportExcel">导出</el-button>
				<a href="../../../../../static/user_template.xlsx" download="user_template.xlsx" class="download-btn"><svg-icon iconClass="excel-icon"></svg-icon> 下载模板</a> -->
			</div>
			<div class="table">
				<el-table :data="users" @selection-change="selectionChange" border style="width: 100%" size="mini">
					<el-table-column label="Id" type="selection" align="center" width="40"></el-table-column>
					<el-table-column label="姓名" prop="RealName"></el-table-column>
					<el-table-column label="员工编号" prop="StaffCode"></el-table-column>
					<el-table-column label="手机号码" prop="Mobile" align="center" width="100"></el-table-column>
					<el-table-column label="职位名称" prop="Position"></el-table-column>
					<el-table-column label="职位类型" prop="PositionType"></el-table-column>
					<el-table-column label="资料状态" align="center">
						<template slot-scope="scope">
							<span v-if="scope.row.Status=='Passed'">通过</span>
							<span v-else-if="scope.row.Status=='NotPassed'">审核中</span>
							<span v-else>其它</span>
						</template>
					</el-table-column>
					<el-table-column label="工作状态" align="center">
						<template slot-scope="scope">
							<span v-if="scope.row.WorkStatus=='Free'">空闲中</span>
							<span v-else>工作中</span>
						</template>
					</el-table-column>
					<el-table-column label="创建时间" prop="CreateTime" width="140" align="center">
						<template slot-scope="scope">
							<span v-if="scope.row.CreateTime">{{ new Date(scope.row.CreateTime).getTime() | getdatefromtimestamp()}}</span>
						</template>
					</el-table-column>
					<el-table-column width="80" align="center" fixed="right">
						<template slot-scope="scope">
							<el-dropdown  @command="handleCommand"  trigger="click">
								<el-button type="primary" size="mini">操作<i class="el-icon-arrow-down el-icon--right"></i></el-button>
								<el-dropdown-menu slot="dropdown">
									<el-dropdown-item :command="{type: 'view', id:scope.row.Staff_ID}">查看</el-dropdown-item>
									<el-dropdown-item :command="{type: 'edit', id: scope.row.Staff_ID}">编辑</el-dropdown-item>
									<el-dropdown-item :command="{type: 'delete', id: scope.row.Staff_ID}" >删除</el-dropdown-item>
								</el-dropdown-menu>
							</el-dropdown>
						</template>
					</el-table-column>
				</el-table>
				<el-row type="flex">
					<el-col :span="12" style="padding-top: 15px; font-size: 12px; color: #909399">
						<span>总共 {{count}} 条记录每页显示</span>
						<el-select size="mini" style="width: 90px; padding: 0 5px" v-model="pageSize" @change="getUsers()">
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
	import requestNode from '../../../common/requestNode'
	import { Message } from 'element-ui'
	import UploadExcel from '../../CommonComponents/UploadExcel'
	import { validUploadFile } from '../../../common/utils'
	const userMap = {
		'登录名': 'LoginName',
		'姓名': 'Name',
		'电话': 'Phone',
		'手机': 'Mobile',
		'归属公司': 'company.Name',
		'归属部门': 'department.Name'
	}
	export default {
		data() {
			return {
				downloadLoading: false,
				filename: '用户数据',
				users: [],
				pageIndex: 1,
				pageSize: 10,
				findName: '',
				findMobile: '',
				findCompany: '',
				count: 0,
				selectedUsers: [],
				companys: [],
				departments: []
			}
		},
		created() {
			this.getUsers()
			this.getOrgs()
		},
		methods: {
			exportExcel() {
				this.downloadLoading = true
				import('../../../common/Export2Excel').then(excel => {
					const tHeader = ['登录名', '姓名', '电话', '手机', '归属公司', '归属部门']
					const filterVal = [userMap['登录名'], userMap['姓名'], userMap['电话'], userMap['手机'], userMap['归属公司'], userMap['归属部门']]
					const data = this.formatJson(filterVal, this.users)
					excel.export_json_to_excel(tHeader, data, this.filename)
					this.downloadLoading = false
				})
			},
			formatJson(filterVal, jsonData) {
				return jsonData.map(v => filterVal.map(j => {
					if (j === 'timestamp') {
						return parseTime(v[j])
					} else {
						return v[j]
					}
				}))
			},
			// 选择导入文件
			onSelectedFile(result) {
				validUploadFile(result, userMap, [
					'登录名', '姓名', '电话', '手机', '归属公司', '归属部门'
				]).then(res => {
					this.addMutiple(res)
				}).catch(err => {
					Message.error(err)
				})
			},
			// 导入
			addMutiple(users) {
				let data = {
					users: users,
				}
				requestNode({
					url: '/com_staff/addmutip',
					method: 'post',
					data
				}).then(res => {
					if (res.data.code == 0) {
						Message.success(res.data.msg)
						this.getUsers()
					} else {
						Message.error(res.data.msg)
					}
				})
			},
			pageChange(index) {
				this.pageIndex = index
				this.getUsers()
			},
			// 重置搜索表单
			reset() {
				this.findName = ''
				this.findMobile = ''
				this.findCompany = ''
				this.findDepartment = ''
				this.getUsers()
			},
			getUsers() {
				let params = {
					pageIndex: this.pageIndex || 1,
					pageSize: this.pageSize,
					Mobile: this.findMobile,
					RealName: this.findName
				}
				requestNode({
					url: '/com_staff/list',
					method: 'get',
					params
				}).then(res => {
					if (res.data.code == 0) {
						this.count = res.data.data.count
						this.users = res.data.data.rows
					} else {
						Message.error(res.data.msg)
					}
				})
			},
			handleCommand(e) {
				if(e.type=='view'){
					this.$router.push({name: 'viewuser', query: { Staff_ID:e.id }})
				}else if(e.type=='edit'){
					this.$router.push({ name: 'edituser' , query: {  Staff_ID:e.id } })
				}else if(e.type=='delete'){
					this.deleteConfirm(e.id)
				}
			},
			addUser() {
				this.$router.push({ name: 'adduser' })
			},
			deleteConfirm(id) {
				let ids = []
				if (id && typeof id == 'string') {
					ids = [].concat(id)
				} else {
					if (this.selectedUsers.length == 0) {
						this.$message({
							type: 'warning',
							message: '请选择'
						})
						return
					}
					ids = this.selectedUsers
				}
				this.$confirm('此操作将永久删除, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.delUser(ids)
					this.$message({
						type: 'success',
						message: '删除成功!'
					})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					})
				})
			},
			delUser(ids) {
				let data = {
					ids: ids
				}
				requestNode({
					url: '/com_staff/delete',
					method: 'post',
					data
				}).then(res => {
					if (res.data.code == 0) {
						this.getUsers()
					} else {
						Message.error(res.data.msg)
					}
				})
			},
			
			getOrgs(Organization_PID) {
				let params = {
					Organization_PID: Organization_PID || ''
				}
				requestNode({
					url: '/sys_organization/list',
					method: 'get',
					params
				}).then(res => {
					if (res.data.code == 0) {
						if (Organization_PID) {
							this.departments = res.data.data
						} else {
							this.companys = res.data.data
						}
					} else {
						Message.error(res.data.msg)
					}
				})
			},
			changeCompany(id) {
				this.findDepartment = ''
				this.getOrgs(id)
			},
			selectionChange(data) {
				this.selectedUsers = data.map(item => item.Staff_ID)
				console.log(this.selectedUsers )
			}
		},
		components: {
			UploadExcel
		}
	}

</script>
<style lang="stylus" scoped>
.el-row
    margin-bottom 20px
    &:last-child
    	margin-bottom 0
.el-col
	border-radius 4px
.download-btn
	font-size 12px
	color #606266
	height 29px
	line-height 29px
	padding 0 15px
	border 1px solid #dcdfe6
	border-radius 3px
	background #fff
	margin 0 10px
	display inline-block
	&:hover
		border-color #c6e2ff
		color #409eff
		background #ecf5ff
	&:active
		border-color #3a8ee6
		color #3a8ee6
</style>
