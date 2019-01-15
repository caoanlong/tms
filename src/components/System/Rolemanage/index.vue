<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">角色列表</div>
			<div class="search">
				<el-form :inline="true"  class="demo-form-inline"  size="small">
					<el-form-item label="角色名称">
						<el-input placeholder="角色名称" v-model="find.roleName" @input="inputChange"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="search">查询</el-button>
						<el-button type="default" @click="reset">重置</el-button>
					</el-form-item>
				</el-form>
			</div>
			<div class="tableControl">
				<el-button 
					type="default" 
					size="mini" 
					icon="el-icon-plus" 
					@click="$router.push({name: 'addrole'})">
					添加
				</el-button>
				<a :href="exportExcelUrl" class="exportExcel el-icon-download">导出</a>
			</div>
			<div class="table">
				<el-table 
					ref="roleTable" 
					:data="tableData" 
					border style="width: 100%" size="mini">
					<el-table-column label="编号" type="index" width="50" align="center"></el-table-column>
					<el-table-column label="角色名称" prop="roleName" align="center"></el-table-column>
					<el-table-column label="权限英文" prop="roleEnName" align="center"></el-table-column>
					<el-table-column label="角色类型" prop="roleType" align="center">
						<template slot-scope="scope">
							<span v-if="scope.row.roleType == 'System'">系统角色</span>
							<span v-else-if="scope.row.roleType == 'Business'">业务角色</span>
						</template>
					</el-table-column>
					<el-table-column width="100" align="center" fixed="right">
						<template slot-scope="scope">
							<el-dropdown  @command="handleCommand"  trigger="click">
								<el-button type="primary" size="mini">操作<i class="el-icon-arrow-down el-icon--right"></i></el-button>
								<el-dropdown-menu slot="dropdown">
									<el-dropdown-item 
										:command="{type: 'edit', id: scope.row.roleID}">
										编辑
									</el-dropdown-item>
									<el-dropdown-item 
										:command="{type: 'delete', id: scope.row.roleID}" 
										v-if="scope.row.roleType != 'System'">
										删除
									</el-dropdown-item>
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
import { mapGetters } from 'vuex'
import { baseMixin } from '../../../common/mixin'
import SysRole from '../../../api/SysRole'
import { deleteConfirm } from '../../../common/utils'
import { baseURL } from '../../../common/request'
export default {
	mixins: [baseMixin],
	data() {
		return {
			find: { roleName: '' },
			exportExcelUrl: ''
		}
	},
	created() {
		this.getList()
		this.resetExportExcelUrl()
	},
	activated() {
		if(!this.$route.query.cache) {
			this.reset()
		}
	},
	methods: {
		resetExportExcelUrl() {
			this.exportExcelUrl = baseURL 
				+ '/sys/role/export?Request-From=PC&Authorization=' 
				+ localStorage.getItem("token")	
				+ '&roleName=' + this.find.roleName 
		},
		inputChange() {
			this.resetExportExcelUrl()
        },
		handleCommand(e) {
			switch (e.type) {
				case 'edit':
					this.$router.push({name: 'editrole', query: { roleID: e.id }})
					break
				case 'delete':
					this.del(e.id)
					break
			}
		},
		reset() {
			this.find.roleName = ''
			this.pageIndex = 1
			this.pageSize = 10
			this.getList()
		},
		getList() {
			SysRole.find({
				current: this.pageIndex,
				size: this.pageSize,
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
		}
	}
}
</script>
<style lang="stylus" scoped>
.exportExcel
	font-size 12px
	color #606266
	height 29px
	line-height 29px
	padding 0 15px
	border 1px solid #dcdfe6
	border-radius 3px
	background #fff
	margin-left 10px
	display inline-block
	vertical-align top
	&:hover
		border-color #c6e2ff
		color #409eff
		background #ecf5ff
	&:active
		border-color #3a8ee6
		color #3a8ee6
</style>