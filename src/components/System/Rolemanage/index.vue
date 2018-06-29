<template>
	<div class="main-content">
		<div class="wf-card">
			<div class="header clearfix">角色列表</div>
			<div class="search">
				<el-form :inline="true"  class="demo-form-inline"  size="small">
					<el-form-item label="角色名称：">
						<el-input placeholder="角色名称" v-model="findRoleName"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="getList">查询</el-button>
						<el-button type="default" @click="reset">重置</el-button>
					</el-form-item>
				</el-form>
			</div>
			<div class="tableControl">
				<el-button type="default" size="mini" icon="el-icon-plus" @click="addRole">添加</el-button>
				<el-button type="default" size="mini" icon="el-icon-delete" @click="deleteConfirm">批量删除</el-button>
			</div>
			<div class="table">
				<el-table 
					ref="roleTable" 
					:data="roles" 
					@selection-change="selectRoleChange" 
					border style="width: 100%" size="mini">
					<el-table-column type="selection" align="center" width="40"></el-table-column>
					<el-table-column label="角色名称" prop="RoleName" align="left"></el-table-column>
					<el-table-column label="英文名称" prop="RoleEnName" align="left"></el-table-column>
					<el-table-column label="角色代码" prop="RoleCode" align="left"></el-table-column>
					<el-table-column label="角色类型" prop="RoleType" align="center">
						<template slot-scope="scope">
							<span v-if="scope.row.RoleType=='assignment'">任务分配</span>
							<span v-if="scope.row.RoleType=='security-role'">管理角色</span>
							<span v-if="scope.row.RoleType=='user'">普通角色</span>
						</template>
					</el-table-column>
					<el-table-column label="备注" prop="Remark" align="left"></el-table-column>
					<el-table-column width="80" align="center" fixed="right">
						<template slot-scope="scope">
							<el-dropdown  @command="handleCommand"  trigger="click">
								<el-button type="primary" size="mini">操作<i class="el-icon-arrow-down el-icon--right"></i></el-button>
								<el-dropdown-menu slot="dropdown">
									<el-dropdown-item :command="{type: 'view', id:scope.row.Role_ID}">查看</el-dropdown-item>
									<el-dropdown-item :command="{type: 'edit', id: scope.row.Role_ID}">编辑</el-dropdown-item>
									<el-dropdown-item :command="{type: 'delete', id: scope.row.Role_ID}" >删除</el-dropdown-item>
									<el-dropdown-item :command="{type: 'setAuth', id: scope.row.Role_ID}" >权限设置</el-dropdown-item>
									<el-dropdown-item :command="{type: 'setUser', id: scope.row.Role_ID}" >分配用户</el-dropdown-item>
								</el-dropdown-menu>
							</el-dropdown>
						</template>
					</el-table-column>
				</el-table>
				<Page :total="count" :pageSize="pageSize" @pageChange="pageChange" @pageSizeChange="pageSizeChange"/>
			</div>
		</div>
		<el-dialog title="权限设置" :visible.sync="showSetAuth" width="30%">
			<el-tree
				:data="menus"
				show-checkbox
				default-expand-all
				node-key="Menu_ID"
				ref="tree"
				highlight-current
				:props="defaultProps"
				@check-change="selectMenu" style="height:400px;overflow-y:auto">
			</el-tree>
			<span slot="footer" class="dialog-footer">
				<el-button @click="showSetAuth = false">取 消</el-button>
				<el-button type="primary" @click="submitSetAuth">确 定</el-button>
			</span>
		</el-dialog>
		<el-dialog title="分配用户" :visible.sync="showSetUser" width="600px">
			<el-table 
				ref="usersTable"
				:data="staffs" 
				height="400"
				@selection-change="selectUserChange" 
				border style="width: 100%" 
				size="mini">
				<el-table-column type="selection" align="center"></el-table-column>
				<el-table-column label="姓名" prop="RealName"></el-table-column>
				<el-table-column label="手机" prop="Mobile"></el-table-column>
			</el-table>
			<span slot="footer" class="dialog-footer">
				<el-button @click="showSetUser = false">取 消</el-button>
				<el-button type="primary" @click="submitSetUser">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>
<script type="text/javascript">
import { Message } from 'element-ui'
import { mapGetters } from 'vuex'
import requestNode from '../../../common/requestNode'
import Page from '../../CommonComponents/Page'
export default {
	data() {
		return {
			refreshing: false,
			roles: [],
			role: {},
			pageIndex: 1,
			pageSize: 10,
			count: 0,
			findRoleName: '',
			selectedRoles: [],
			setAuthId: '',
			setUserId: '',
			// 所有的用户
			staffs:[],
			showSetAuth: false,
			showSetUser:false,
			defaultProps: {
				children: 'children',
				label: 'Name'
			},
			selectedMenuId: [],
			selectedUsers: [],
			sysDataScopes: [],
			menus: []
		}
	},
	components: { Page },
	created() {
		this.getList()
	},
	methods: {
		addRole() {
			this.$router.push({name: 'addrole'})
		},
		handleCommand(e) {
			if(e.type=='view'){
				this.$router.push({name: 'viewrole', query: { Role_ID:e.id }})
			}else if(e.type=='edit'){
				this.$router.push({ name: 'editrole' , query: {  Role_ID:e.id } })
			}else if(e.type=='setAuth'){
				this.setAuth(e)
			}else if(e.type=='setUser'){
				this.setUser(e)
			}else if(e.type=='delete'){
				this.deleteConfirm(e.id)
			}
		},
		pageChange(index) {
			this.pageIndex = index
			this.getList()
		},
		pageSizeChange(size) {
			this.pageSize = size
			this.getList() 
		},
		selectRoleChange(data) {
			this.selectedRoles = data.map(item => item.Role_ID)
		},
		selectUserChange(data) {
			this.selectedUsers = data
		},
		// 重置搜索表单
		reset() {
			this.findRoleName = ''
			this.getList()
		},
		// 获取所有菜单
		getMenus() {
			return new Promise((resolve, reject) => {
				requestNode({
					url: '/sys_menu/list/all',
					method: 'get'
				}).then(res => {
					if (res.data.code == 0) {
						this.menus = res.data.data
						resolve()
					} else {
						Message.error(res.data.msg)
						reject(res.data.msg)
					}
				})
			})
		},
		getList() {
			const params = {
				pageIndex: this.pageIndex,
				pageSize: this.pageSize,
				RoleName: this.findRoleName
			}
			requestNode({
				url: '/sys_role/list',
				method: 'get',
				params
			}).then(res => {
				if (res.data.code == 0) {
					this.count = res.data.data.count
					this.roles = res.data.data.rows
				} else {
					Message.error(res.data.msg)
				}
			})
		},
		deleteConfirm(id) {
			let ids = []
			if (id && typeof id == 'string') {
				ids = [].concat(id)
			} else {
				if (this.selectedRoles.length == 0) {
					this.$message({
						type: 'warning',
						message: '请选择'
					})
					return
				}
				ids = this.selectedRoles
			}
			this.$confirm('此操作将永久删除, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				this.delRole(ids)
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
		delRole(ids) {
			let data = {
				ids: ids
			}
			requestNode({
				url: '/sys_role/delete',
				method: 'post',
				data
			}).then(res => {
				if (res.data.code == 0) {
					this.getList()
				} else {
					Message.error(res.data.msg)
				}
			})
		},
		setAuth(data) {
			this.getMenus().then(() => {
				this.setAuthId = data.id
				this.showSetAuth = true
				this.getRole(data.id, res => {
					let menusID = res.sys_menus.map(item => item.Menu_ID)
					for (let i = 0; i < menusID.length; i++) {
						this.$refs.tree.setChecked(menusID[i], true)
					}
					this.getList()
					this.$store.dispatch('getMenu')
				})
			})
		},
		submitSetAuth() {
			let data = {
				Role_ID: this.setAuthId,
				sys_menus: this.selectedMenuId
			}
			requestNode({
				url: '/sys_role/update/menu',
				method: 'post',
				data
			}).then(res => {
				if (res.data.code == 0) {
					Message.success(res.data.msg)
				} else {
					Message.error(res.data.msg)
				}
				this.showSetAuth = false
			})
		},
		selectMenu(data, isSelected) {
			if (isSelected) {
				this.selectedMenuId.push(data.Menu_ID)
			} else {
				this.selectedMenuId.splice(this.selectedMenuId.indexOf(data.Menu_ID), 1)
			}
		},
		// 获取当前角色详情
		getRole(Role_ID, callback) {
			const params = { Role_ID }
			requestNode({
				url: '/sys_role/info',
				method: 'get',
				params
			}).then(res => {
				if (res.data.code == 0) {
					this.role = res.data.data
					callback && callback(this.role)
				} else {
					Message.error(res.data.msg)
				}
			})
		},
		// 获取所有用户
		getStaffs(callback) {
			const params = { pageSize: 100 }
			requestNode({
				url: '/com_staff/list',
				method: 'get',
				params
			}).then(res => {
				if (res.data.code == 0) {
					this.staffs = res.data.data.rows
					callback && callback(this.staffs)
				} else {
					Message.error(res.data.msg)
				}
			})
		},
		setUser(data) {
			this.setUserId = data.id
			this.showSetUser = true
			this.getList()
			this.getStaffs(staffList => {
				this.getRole(data.id, res => {
					const Staff_IDs = res.com_staffs.map(item => item.Staff_ID)
					const staffs = staffList.filter(item => Staff_IDs.includes(item.Staff_ID))
					staffs.forEach(staff => {
						this.$refs.usersTable.toggleRowSelection(staff)
					})
					this.getList()
				})
			})
		},
		handleChange(value, direction, movedKeys) {
			console.log(value, direction, movedKeys)
		},
		submitSetUser() {
			this.showSetUser = false
			let Staff_IDs = this.selectedUsers.map(item => item.Staff_ID)
			let data = {
				Role_ID: this.setUserId,
				sys_users: Staff_IDs
			}
			requestNode({
				url: '/sys_role/update/user',
				method: 'post',
				data
			}).then(res => {
				if (res.data.code == 0) {
					Message.success(res.data.msg)
				} else {
					Message.error(res.data.msg)
				}
			})
		},
		refresh() {
			this.refreshing = true
			this.getList()
			setTimeout(() => {
				this.refreshing = false
			}, 500)
		}
	}
}
</script>
<style lang="stylus" scoped>

</style>