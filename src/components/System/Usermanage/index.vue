<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">员工列表</div>
			<div class="search">
				<el-form :inline="true" class="demo-form-inline" size="small">
					<el-form-item label="姓名">
						<el-input placeholder="姓名" v-model="findName"></el-input>
					</el-form-item>
					<el-form-item label="手机号">
						<el-input placeholder="登录名" v-model="findMobile"></el-input>
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
				<Page :total="count" :pageSize="pageSize" @pageChange="pageChange" @pageSizeChange="pageSizeChange"/>
			</div>
		</el-card>
	</div>
</template>
<script type="text/javascript">
import { Message } from 'element-ui'
import requestNode from '../../../common/requestNode'
import ComStaff from '../../../api/ComStaff'
import Page from '../../CommonComponents/Page'
import { deleteConfirmArr } from '../../../common/utils'
export default {
	data() {
		return {
			users: [],
			pageIndex: 1,
			pageSize: 10,
			findName: '',
			findMobile: '',
			count: 0,
			selectedList: [],
		}
	},
	components: { Page },
	created() {
		this.getList()
	},
	methods: {
		selectionChange(data) {
			this.selectedList = data.map(item => item.Staff_ID)
		},
		pageChange(index) {
			this.pageIndex = index
			this.getList()
		},
		pageSizeChange(size) {
			this.pageSize = size
			this.getList() 
		},
		reset() {
			this.findName = ''
			this.findMobile = ''
			this.getList()
		},
		getList() {
			ComStaff.find({
				pageIndex: this.pageIndex,
				pageSize: this.pageSize,
				Mobile: this.findMobile,
				RealName: this.findName
			}).then(res => {
				this.count = res.count
				this.users = res.rows
			})
		},
		handleCommand(e) {
			if(e.type == 'view'){
				this.$router.push({name: 'viewuser', query: { Staff_ID: e.id }})
			}else if(e.type == 'edit'){
				this.$router.push({ name: 'edituser' , query: {  Staff_ID: e.id } })
			}else if(e.type == 'delete'){
				this.del(e.id)
			}
		},
		add() {
			this.$router.push({ name: 'adduser' })
		},
		del(Role_ID) {
			deleteConfirmArr(Role_ID, ids => {
				console.log(ids)
				ComStaff.del({ ids }).then(res => {
					Message({ type: 'success', message: '删除成功!' })
					this.getList()
				})
			}, this.selectedList)
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
