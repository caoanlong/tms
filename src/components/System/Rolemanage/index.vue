<template>
	<div class="main-content">
		<div class="wf-card">
			<div class="header clearfix">角色列表</div>
			<div class="search">
				<el-form :inline="true"  class="demo-form-inline"  size="small">
					<el-form-item label="名称">
						<el-input placeholder="请输入..." v-model="find.roleName"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="getList">查询</el-button>
						<el-button type="default" @click="reset">重置</el-button>
					</el-form-item>
				</el-form>
			</div>
			<div class="tableControl">
				<el-button type="default" size="mini" icon="el-icon-plus" @click="dialogFormVisible = true">添加</el-button>
				<el-button type="default" size="mini" icon="el-icon-delete" @click="del">批量删除</el-button>
			</div>
			<div class="table">
				<el-table 
					ref="roleTable" 
					:data="tableData" 
					@selection-change="selectChange" 
					border style="width: 100%" size="mini">
					<el-table-column type="selection" align="center" width="40"></el-table-column>
					<el-table-column label="角色名称" prop="roleName" align="center"></el-table-column>
					<el-table-column label="角色类型" prop="roleType" align="center">
						<template slot-scope="scope">
							<span v-if="scope.row.roleType == 'SysSuperAdmin'">系统管理员</span>
							<span v-else-if="scope.row.roleType == 'SysAdmin'">系统角色</span>
							<span v-else-if="scope.row.roleType == 'SysMember'">自定义角色</span>
						</template>
					</el-table-column>
					<el-table-column width="100" align="center" fixed="right">
						<template slot-scope="scope">
							<el-dropdown  @command="handleCommand"  trigger="click">
								<el-button type="primary" size="mini">操作<i class="el-icon-arrow-down el-icon--right"></i></el-button>
								<el-dropdown-menu slot="dropdown">
									<el-dropdown-item :command="{type: 'delete', id: scope.row.roleID}" >删除</el-dropdown-item>
									<el-dropdown-item :command="{type: 'setAuth', id: scope.row.roleID}" >权限设置</el-dropdown-item>
									<el-dropdown-item :command="{type: 'setStaff', id: scope.row.roleID}" >分配用户</el-dropdown-item>
								</el-dropdown-menu>
							</el-dropdown>
						</template>
					</el-table-column>
				</el-table>
				<Page :total="total" :pageSize="pageSize" @pageChange="pageChange" @pageSizeChange="pageSizeChange"/>
			</div>
		</div>
		<auth-config :showSetAuth="showSetAuth" :setRoleID="setRoleID" @selected-auth="handleSelectedAuth"></auth-config>
		<staff-config :showSetStaff="showSetStaff" :setRoleID="setRoleID" @selected-staff="handleSelectedStaff"></staff-config>
		<el-dialog title="添加角色" :visible.sync="dialogFormVisible">
			<el-form>
				<el-form-item label="名称" label-width="80px">
					<el-input placeholder="请输入..." auto-complete="off" v-model="roleName"></el-input>
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
import { mapGetters } from 'vuex'
import SysRole from '../../../api/SysRole'
import Menu from '../../../api/Menu'
import { deleteConfirm } from '../../../common/utils'
import Page from '../../CommonComponents/Page'
import AuthConfig from './components/AuthConfig'
import StaffConfig from './components/StaffConfig'
export default {
	data() {
		return {
			dialogFormVisible: false,
			tableData: [],
			pageIndex: 1,
			pageSize: 10,
			total: 0,
			find: { roleName: '' },
			roleName: '',
			selectedList: [],
			setRoleID: '',
			showSetAuth: false,
			showSetStaff:false
		}
	},
	components: { Page, AuthConfig, StaffConfig },
	created() {
		this.getList()
	},
	methods: {
		add() {
			SysRole.add({ roleName: this.roleName }).then(res => {
				this.dialogFormVisible = false
				Message.success('成功!')
				this.getList()
			})
		},
		handleCommand(e) {
			switch (e.type) {
				case 'setAuth':
					this.setAuth(e.id)
					break
				case 'setStaff':
					this.setStaff(e.id)
					break
				case 'delete':
					this.del(e.id)
					break
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
		selectChange(data) {
			this.selectedList = data.map(item => item.roleID)
		},
		reset() {
			this.find.roleName = ''
			this.getList()
		},
		getList() {
			SysRole.find({
				pageIndex: this.pageIndex,
				pageSize: this.pageSize,
				roleName: this.find.roleName
			}).then(res => {
				this.tableData = res.records
				this.total= res.total
			})
		},
		del(roleID) {
			deleteConfirm(roleID, roleIDs => {
				SysRole.del({ roleIDs }).then(res => {
					Message.success('删除成功!')
					this.getList()
				})
			}, this.selectedList)
		},
		handleSelectedAuth(bool) {
			this.showSetAuth = false
			if (bool) {
				this.getList()
				this.$store.dispatch('getMenu')
			}
		},
		handleSelectedStaff(bool) {
			this.showSetStaff = false
			if (bool) this.getList()
		},
		setAuth(roleID) {
			this.showSetAuth = true
			this.setRoleID = roleID
		},
		setStaff(roleID) {
			this.showSetStaff = true
			this.setRoleID = roleID
		}
	}
}
</script>
<style lang="stylus" scoped>

</style>