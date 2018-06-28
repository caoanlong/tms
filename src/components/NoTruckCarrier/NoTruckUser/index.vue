<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>无车承运接口配置</span>
			</div>
			<div class="search">
				<el-form :inline="true" class="demo-form-inline" size="small">
					<el-form-item label="appKey：">
						<el-input placeholder="请输入..." v-model="findAppKey"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="getList">查询</el-button>
						<el-button type="default" @click="reset">重置</el-button>
					</el-form-item>
				</el-form>
			</div>
			<div class="tableControl">
				<el-button type="default" size="mini" icon="el-icon-plus" @click="add()">添加</el-button>
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
				<Page :total="count" :pageSize="pageSize" @pageChange="pageChange" @pageSizeChange="pageSizeChange"/>
			</div>
		</el-card>
	</div>
</template>
<script type="text/javascript">
import { Message } from 'element-ui'
import NoTruckUser from '../../../api/NoTruckUser'
import Page from '../../CommonComponents/Page'
export default {
	data() {
		return {
			findAppKey: '',
			pageIndex: 1,
			pageSize: 10,
			count: 0,
			tableData: [],
			selectedInterfaceConfigs: []
		}
	},
	components: { Page },
	created() {
		this.getList()
	},
	methods: {
		reset() {
			this.findAppKey = ''
			this.getList()
		},
		selectionChange(data) {
			this.selectedInterfaceConfigs = data.map(item => item.userID)
		},
		pageChange(index) {
			this.pageIndex = index
			this.getList()
		},
		pageSizeChange(size) {
			this.pageSize = size
			this.getList() 
		},
		getList() {
			NoTruckUser.find({
				pageNum: this.pageIndex,
				pageSize: this.pageSize,
				appkey: this.findAppKey
			}).then(res => {
				this.count = res.total
				this.tableData = res.list
			})
		},
		view(noTruckUserID) {
			this.$router.push({name: 'viewnotruckuser', query: {noTruckUserID}})
		},
		edit(noTruckUserID) {
			this.$router.push({name: 'editnotruckuser', query: {noTruckUserID}})
		},
		add() {
			this.$router.push({name: 'addnotruckuser'})
		},
		deleteConfirm(id) {
			let ids = ''
			if (id && typeof id == 'string') {
				ids = id
			} else {
				ids = this.selectedInterfaceConfigs.join(',')
			}
			this.$confirm('此操作将永久删除, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				this.delInterfaceConfig(ids)
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
		delInterfaceConfig(noTruckUserIDs) {
			let data = {
				noTruckUserIDs
			}
			requestJava({
				url: '/notruckUser/del',
				method: 'post',
				data
			}).then(res => {
				if (res.data.code == 200) {
					this.getList()
				} else {
					Message.error(res.data.message)
				}
			})
		}
	}
}
</script>
<style lang="stylus" scoped>

</style>
