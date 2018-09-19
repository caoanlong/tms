<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">委托方</div>
			<div class="search">
				<el-form :inline="true"  class="demo-form-inline"  size="small">
					<el-form-item label="委托方">
						<el-input placeholder="名称/手机号" v-model="find.keyword"></el-input>
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
					<el-table-column label="id" type="selection" align="center" width="40"></el-table-column>
					<el-table-column label="委托方" prop="name" align="center"></el-table-column>
					<el-table-column label="地区" prop="area" align="center"></el-table-column>
					<el-table-column label="联系人" prop="contactName" align="center"></el-table-column>
					<el-table-column label="手机" prop="mobile" align="center" width="70"></el-table-column>
					<el-table-column label="操作" align="center" width="100">
						<template slot-scope="scope">
							<el-dropdown  @command="handleCommand"  trigger="click">
								<el-button type="primary" size="mini">操作<i class="el-icon-arrow-down el-icon--right"></i></el-button>
								<el-dropdown-menu slot="dropdown">
									<el-dropdown-item :command="{type: 'view', id: scope.row.cargoID}">查看</el-dropdown-item>
									<el-dropdown-item :command="{type: 'edit', id: scope.row.cargoID}">编辑</el-dropdown-item>
									<el-dropdown-item :command="{type: 'delete', id: scope.row.cargoID}" >删除</el-dropdown-item>
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
import { baseMixin } from '../../../common/mixin'
import { deleteConfirm } from '../../../common/utils'
export default {
	mixins: [baseMixin], 
	data() {
		return {
			find: {
				keyword: ''
			}
		}
	},
	created() {
		this.getList()
	},
	methods: {
		reset() {
			this.find.keyword = ''
			this.pageIndex = this.PAGEINDEX
			this.pageSize = this.PAGESIZE
			this.getList()
		},
		pageChange(index) {
			this.pageIndex = index
			this.getList()
		},
		pageSizeChange(size) {
			this.pageSize = size
			this.pageIndex = this.PAGEINDEX
			this.getList() 
		},
		selectionChange(data) {
			this.selectedList = data.map(item => item.cargoID)
		},
		getList() {
			// CargoGeneralName.find({
			// 	current: this.pageIndex,
			// 	size: this.pageSize,
			// 	cargoName: this.find.keyword
			// }).then(res => {
			// 	this.tableData = res.records
			// 	this.total= res.total
			// })
		},
		add() { 
			this.$router.push({ name: 'addentruster' })
		},
		handleCommand(e) {
			if (e.type == 'edit') {
				this.$router.push({ name: 'editentruster' , query: {  cargoID: e.id } })
			} else if (e.type == 'delete') {
				this.del(e.id)
			} else{
				this.$router.push({ name: 'viewentruster' , query: {  cargoID: e.id } })
			}
		},
		del(cargoNameID) {
			deleteConfirm(cargoNameID, cargoNameIDs => {
				// CargoGeneralName.del({ cargoNameIDs }).then(res => {
				// 	Message.success('删除成功!')
				// 	this.getList()
				// })
			}, this.selectedList)
		}
	}
}
</script>
<style lang="stylus" scoped>

</style>