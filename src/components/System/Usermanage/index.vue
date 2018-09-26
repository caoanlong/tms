<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">用户管理</div>
			<div class="search">
				<el-form :inline="true" class="demo-form-inline" size="small">
					<el-form-item label="关键字">
						<el-input placeholder="请输入关键字" v-model="find.keyword"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="search">查询</el-button>
						<el-button type="default" @click="reset">重置</el-button>
					</el-form-item>
				</el-form>
			</div>
			<div class="tableControl">
				<el-button type="default" size="mini" icon="el-icon-plus" @click="add">添加</el-button>
			</div>
			<div class="table">
				<el-table :data="tableData" border style="width: 100%" size="mini">
					<el-table-column label="手机号" prop="mobile"></el-table-column>
					<el-table-column label="姓名" prop="realName"></el-table-column>
					<el-table-column label="角色" prop="roleNames"></el-table-column>
					<el-table-column width="80" align="center" fixed="right">
						<template slot-scope="scope" v-if="!scope.row.registerMemberFlag">
							<el-dropdown  @command="handleCommand"  trigger="click">
								<el-button type="primary" size="mini">操作<i class="el-icon-arrow-down el-icon--right"></i></el-button>
								<el-dropdown-menu slot="dropdown">
									<el-dropdown-item :command="{type: 'role', id: scope.row.memberID}">角色</el-dropdown-item>
									<el-dropdown-item :command="{type: 'delete', id: scope.row.memberID}" >删除</el-dropdown-item>
								</el-dropdown-menu>
							</el-dropdown>
						</template>
					</el-table-column>
				</el-table>
				<Page :total="total" :pageIndex="pageIndex" :pageSize="pageSize" @pageChange="pageChange" @pageSizeChange="pageSizeChange"/>
			</div>
		</el-card>
		<select-role :showSelectRole="showSelectRole" :memberID="curMemberID" @selected-role="selectedRole"></select-role>
	</div>
</template>
<script type="text/javascript">
import { Message } from 'element-ui'
import { baseMixin } from '../../../common/mixin'
import SysMember from '../../../api/SysMember'
import Page from '../../CommonComponents/Page'
import SelectRole from './components/SelectRole'
import { deleteConfirm } from '../../../common/utils'
export default {
	mixins: [baseMixin],
	data() {
		return {
			find: {
				keyword: ''
			},
			showSelectRole: false,
			curMemberID: ''
		}
	},
	components: { SelectRole },
	created() {
		this.getList()
	},
	methods: {
		reset() {
			this.find.keyword = ''
			this.pageIndex = 1
			this.pageSize = 10
			this.getList()
		},
		getList() {
			SysMember.find({
				current: this.pageIndex,
				size: this.pageSize,
				keyword: this.find.keyword
			}).then(res => {
				this.total = res.total
				this.tableData = res.records
			})
		},
		handleCommand(e) {
			if(e.type == 'role'){
				this.curMemberID = e.id
				this.showSelectRole = true
			} else if (e.type == 'disable') {
				
			} else if (e.type == 'delete') {
				this.del(e.id)
			}
		},
		add() {
			this.$router.push({ name: 'adduser' })
		},
		del(memberID) {
			deleteConfirm(memberID, memberID => {
				SysMember.del({ memberID }).then(res => {
					Message.success('删除成功!')
					this.getList()
				})
			})
		},
		selectedRole(bool) {
			this.showSelectRole = false
			bool && this.search()
		}
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
