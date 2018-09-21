<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">资料补充</div>
			<div class="search">
				<el-form :inline="true" class="demo-form-inline" size="small">
					<el-form-item label="appKey：">
						<el-input placeholder="请输入..." v-model="find.appKey"></el-input>
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
				<el-table :data="tableData" @selection-change="selectionChange" border style="width: 100%" size="mini">
					<el-table-column label="企业名称" prop="companyName"></el-table-column>
					<el-table-column label="企业接入码" prop="senderCode"></el-table-column>
					<el-table-column label="Appkey" prop="appkey"></el-table-column>
					<el-table-column label="报文功能代码" prop="messageFunctionCode"></el-table-column>
					<el-table-column label="报文版本号" prop="documentVersionNumber"></el-table-column>
					<el-table-column label="接收方代码" prop="recipientCode"></el-table-column>
					<el-table-column label="用户名" prop="userName"></el-table-column>
					<el-table-column label="操作" width="280" align="center">
						<template slot-scope="scope">							
							<el-button type="default" size="mini" icon="el-icon-view" @click="view(scope.row.noTruckUserID)">查看</el-button>
							<el-button type="default" size="mini" icon="el-icon-edit" @click="edit(scope.row.noTruckUserID)">修改</el-button>
							<el-button type="default" size="mini" icon="el-icon-delete" @click="deleteConfirm(scope.row.noTruckUserID)"> 删除</el-button>
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
import { baseMixin } from '../../../common/mixin'
import Notruck from '../../../api/Notruck'
import { deleteConfirm } from '../../../common/utils'
export default {
	mixins: [baseMixin],
	data() {
		return {
			find: {
				appKey: ''
			}
		}
	},
	created() {
		this.getList()
	},
	methods: {
		reset() {
			this.find.appKey = ''
			this.pageIndex = this.PAGEINDEX
			this.pageSize = this.PAGESIZE
			this.getList()
		},
		selectionChange(data) {
			this.selectedList = data.map(item => item.userID)
		},
		getList() {
			Notruck.broker().find({
				pageNum: this.pageIndex,
				pageSize: this.pageSize,
				appkey: this.find.appKey
			}).then(res => {
				this.total = res.total
				this.tableData = res.list
			})
		},
		view(noTruckUserID) {
			this.$router.push({name: 'viewnotruckbroker', query: {noTruckUserID}})
		},
		edit(noTruckUserID) {
			this.$router.push({name: 'editnotruckbroker', query: {noTruckUserID}})
		},
		add() {
			this.$router.push({name: 'addnotruckbroker'})
		},
		del(noTruckUserID) {
			deleteConfirm(noTruckUserID, noTruckUserIDs => {
				Notruck.broker().del({ noTruckUserIDs }).then(res => {
					Message.success('删除成功!')
					this.getList()
				})
			}, this.selectedList)
		}
	}
}
</script>
<style lang="stylus" scoped>

</style>
