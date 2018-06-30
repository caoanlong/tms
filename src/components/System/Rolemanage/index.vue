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
				<el-button type="default" size="mini" icon="el-icon-plus" @click="add">添加</el-button>
				<el-button type="default" size="mini" icon="el-icon-delete" @click="del">批量删除</el-button>
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
									<el-dropdown-item :command="{type: 'setStaff', id: scope.row.Role_ID}" >分配用户</el-dropdown-item>
								</el-dropdown-menu>
							</el-dropdown>
						</template>
					</el-table-column>
				</el-table>
				<Page :total="count" :pageSize="pageSize" @pageChange="pageChange" @pageSizeChange="pageSizeChange"/>
			</div>
		</div>
		<auth-config :showSetAuth="showSetAuth" :setRoleID="setRoleID" @selected-auth="handleSelectedAuth"></auth-config>
		<staff-config :showSetStaff="showSetStaff" :setRoleID="setRoleID" @selected-staff="handleSelectedStaff"></staff-config>
	</div>
</template>
<script type="text/javascript">
import { Message } from 'element-ui'
import { mapGetters } from 'vuex'
import requestNode from '../../../common/requestNode'
import SysRole from '../../../api/SysRole'
import Menu from '../../../api/Menu'
import { deleteConfirmArr } from '../../../common/utils'
import Page from '../../CommonComponents/Page'
import AuthConfig from './components/AuthConfig'
import StaffConfig from './components/StaffConfig'
export default {
	data() {
		return {
			roles: [],
			pageIndex: 1,
			pageSize: 10,
			count: 0,
			findRoleName: '',
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
			this.$router.push({name: 'addrole'})
		},
		handleCommand(e) {
			switch (e.type) {
				case 'view':
					this.$router.push({name: 'viewrole', query: { Role_ID: e.id }})
					break
				case 'edit':
					this.$router.push({ name: 'editrole' , query: {  Role_ID: e.id } })
					break
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
		selectRoleChange(data) {
			this.selectedList = data.map(item => item.Role_ID)
		},
		reset() {
			this.findRoleName = ''
			this.getList()
		},
		getList() {
			SysRole.find({
				pageIndex: this.pageIndex,
				pageSize: this.pageSize,
				RoleName: this.findRoleName
			}).then(res => {
				this.count = res.count
				this.roles = res.rows
			})
		},
		del(Role_ID) {
			deleteConfirmArr(Role_ID, ids => {
				SysRole.del({ ids }).then(res => {
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