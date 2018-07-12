<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">运输人员管理</div>
			<div class="search">
				<el-form :inline="true"  class="demo-form-inline"  size="small">
					<el-form-item label="人员">
						<el-input placeholder="姓名/手机号" v-model="find.keyword"></el-input>
					</el-form-item>
					<el-form-item label="联系电话">
						<el-form-item>
							<el-checkbox-group v-model="supercargoType" @change="supercargoTypeChange">
								<el-checkbox label="Driver">驾驶员</el-checkbox>
								<el-checkbox label="Supercargo">押运员</el-checkbox>
							</el-checkbox-group>
						</el-form-item>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="search">查询</el-button>
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
					ref="recTable"
					:data="tableData"
					@selection-change="selectionChange"
					border style="width: 100%" size="mini" stripe>
					<el-table-column label="id" fixed type="selection" align="center" width="40"></el-table-column>
					<el-table-column label="姓名" prop="realName">
						<template slot-scope="scope">
							<span class="link" @click="view(scope.row.comSupercargoID)">{{scope.row.realName}}</span>
						</template>
					</el-table-column>
					<el-table-column label="手机" prop="mobile"></el-table-column>
					<el-table-column label="驾驶员" prop="homeAddress">
						<template slot-scope="scope">
							<span >{{scope.row.supercargoType == 'Driver' || scope.row.supercargoType == 'SupercargoDriver' ? '是' : '否'}}</span>
						</template>
					</el-table-column>
					<el-table-column label="押运员" prop="remark">
						<template slot-scope="scope">
							<span >{{scope.row.supercargoType == 'Supercargo' || scope.row.supercargoType == 'SupercargoDriver' ? '是' : '否'}}</span>
						</template>
					</el-table-column>
					<el-table-column label="操作" width="80" align="center" fixed="right">
						<template slot-scope="scope">
							<el-dropdown  @command="handleCommand"  trigger="click">
								<el-button type="primary" size="mini">操作<i class="el-icon-arrow-down el-icon--right"></i></el-button>
								<el-dropdown-menu slot="dropdown">
									<el-dropdown-item :command="{type: 'edit', id: scope.row.comSupercargoID}">编辑</el-dropdown-item>
									<el-dropdown-item :command="{type: 'delete', id: scope.row.comSupercargoID}">删除</el-dropdown-item>
								</el-dropdown-menu>
							</el-dropdown>
						</template>
					</el-table-column>
				</el-table>
				<Page :total="count" :pageIndex="pageIndex" :pageSize="pageSize" @pageChange="pageChange" @pageSizeChange="pageSizeChange"/>
			</div>
		</el-card>
	</div>
</template>
<script type="text/javascript">
import { Message } from 'element-ui'
import { deleteConfirm } from '../../../common/utils'
import SuperCargo from '../../../api/SuperCargo'
import Page from '../../CommonComponents/Page'
export default {
	data() {
		return {
			supercargoType: [],
			find: {
				keyword: '',
				supercargoType: ''
			},
			pageIndex: 1,
			pageSize: 10,
			count: 0,
			selectedList: [],
			tableData: []
		}
	},
	components: { Page },
	created() {
		this.getList()
	},
	methods: {
		search() {
			this.pageIndex = 1
			this.pageSize = 10
			this.getList()
		},
		reset() {
			this.find.keyword = ''
			this.find.supercargoType = ''
			this.pageIndex = 1
			this.pageSize = 10
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
		selectionChange(data) {
			this.selectedList = data.map(item => item.comSupercargoID)
		},
		supercargoTypeChange(data) {
			if (data.length == 2) {
				this.find.supercargoType = 'SupercargoDriver'
			} else {
				this.find.supercargoType = data.join('')
			}
		},
		getList() {
			SuperCargo.find({
				current: this.pageIndex,
				size: this.pageSize,
				keyword: this.find.keyword,
				supercargoType: this.find.supercargoType
			}).then(res => {
				this.tableData = res.records
				this.count = res.total
			})
		},
		handleCommand(e) {
			if (e.type == 'view') {
				this.$router.push({name: 'viewsupercargo', query: { comSupercargoID: e.id}})
			} else if (e.type == 'edit') {
				this.$router.push({name: 'editsupercargo', query: { comSupercargoID: e.id}})
			} else if (e.type == 'delete') {
				this.del(e.id)
			}
		},
		view(comSupercargoID) {
			this.$router.push({name: 'viewsupercargo', query: { comSupercargoID }})
		},
		add() {
			this.$router.push({name: 'addsupercargo'})
		},
		del(comSupercargoID) {
			deleteConfirm(comSupercargoID, comSupercargoIDs => {
				SuperCargo.del({ comSupercargoIDs }).then(res => {
					Message.success('删除成功!')
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
