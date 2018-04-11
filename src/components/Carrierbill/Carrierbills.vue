<template>
	<div class="main-content">
		<div class="wf-card box-card">
			<div  class="header clearfix">承运单列表</div>
			<div class="search">
				<el-form :inline="true" class="demo-form-inline" size="small">
					<el-form-item label="关键字" >
						<el-input placeholder="请输入关键字" style="width:150px" v-model="findsearchInfo"></el-input>
					</el-form-item>
					<el-form-item label="发货时间">
						<el-date-picker
							v-model="findRangeDate"
							type="daterange"
							range-separator="至"
							start-placeholder="开始日期"
							end-placeholder="结束日期"
							value-format="timestamp"
							:clearable="false"
							@change="selectDateRange">
						</el-date-picker>
					</el-form-item>
					<el-form-item label="运单状态" class="customerSelect">
						<el-select v-model="findStatus" placeholder="运单状态" style="width:140px">
							<el-option value="" label="全部订单">全部订单</el-option>
							<el-option value="Commited" label="待执行">待执行</el-option>
							<el-option value="Running" label="执行中">执行中</el-option>
							<el-option value="Signed" label="到达签收">到达签收</el-option>
							<el-option value="Closed" label="关闭">关闭</el-option>
							<el-option value="Canceled" label="作废">作废</el-option>
						</el-select>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="getList">搜索</el-button>
						<el-button type="default" @click="reset">重置</el-button>
					</el-form-item>
				</el-form>
			</div>
			<div class="tableControl">
				<el-button type="default" size="mini" icon="el-icon-plus" @click="add">添加</el-button>
				<el-button type="default" size="mini" icon="el-icon-delete" @click="deleteConfirm">批量删除</el-button>
				<el-button type="default" size="mini" icon="el-icon-news" @click="AddDispatchBill">调度</el-button>
				<el-button type="default" size="mini" icon="el-icon-refresh" :loading="refreshing" @click="refresh">刷新</el-button>
			</div>
			<div class="table">
				<el-table :data="tableData" border style="width: 100%" size="mini" stripe @selection-change="selectionChange" >
					<el-table-column type="selection" width="36" align="center" fixed >
					</el-table-column>
					<el-table-column label="处理状态"  prop="status" width="90" align="center">
						<template slot-scope="scope">
							<span v-if="scope.row.status=='Commited'">待执行</span>
							<span v-else-if="scope.row.status=='Running'">执行中</span>
							<span v-else-if="scope.row.status=='Signed'">到达签收</span>
							<span v-else-if="scope.row.status=='Closed'">关闭</span>
							<span v-else-if="scope.row.status=='Canceled'">作废</span>
						</template>
					</el-table-column>
					<el-table-column label="承运单号" prop="carrierOrderNo" width="100" align="center">
						<template slot-scope="scope">
							<el-popover trigger="hover" placement="top" class="customerTablePop">
								<p>发货单位：{{ scope.row.shipperCompanyName }}</p>
								<p>发货地：{{ scope.row.shipperDetailAddress }}</p>
								<p>收货单位：{{ scope.row.consigneeCompanyName }}</p>
								<p>卸货地：{{ scope.row.consigneeDetailAddress }}</p>
								<div slot="reference" class="name-wrapper">
									<span style="color:#409EFF">{{ scope.row.carrierOrderNo}}</span>
								</div>
							</el-popover>
						</template>
					</el-table-column>
					<el-table-column label="收货单位" prop="consigneeCompanyName">
					</el-table-column>
					<el-table-column label="卸货地" prop="consigneeDetailAddress">
					</el-table-column>
					<el-table-column label="收货人" prop="consigneeName">
					</el-table-column>
					<el-table-column label="到货时间" prop="consigneeDate" width="100" align="center">
						<template slot-scope="scope">
							<span>{{scope.row.consigneeDate | getdatefromtimestamp(true) }}</span>
						</template>
					</el-table-column>
					<el-table-column label="货物规格/货物名称" prop="CargoName">
					</el-table-column>
					<el-table-column label="货物总量" prop="CargoTotal">
					</el-table-column>
					<el-table-column label="发货单位" prop="shipperCompanyName">
					</el-table-column>
					<el-table-column label="发货时间" prop="shipperDate" width="100" align="center">
						<template slot-scope="scope">
							<span>{{scope.row.shipperDate | getdatefromtimestamp(true) }}</span>
						</template>
					</el-table-column>
					<el-table-column label="发货人" prop="shipperName">
					</el-table-column>
					<el-table-column label="发货地" prop="shipperDetailAddress">
					</el-table-column>
					<el-table-column label="操作" width="80" align="center" fixed="right">
						<template slot-scope="scope">
							<el-dropdown  @command="handleCommand"  trigger="click">
								<el-button type="primary" size="mini">操作<i class="el-icon-arrow-down el-icon--right"></i></el-button>
								<el-dropdown-menu slot="dropdown">
									<el-dropdown-item :command="{type: 'view', id: scope.row.carrierOrderID}" icon="el-icon-view">查看</el-dropdown-item>
									<el-dropdown-item :command="{type: 'edit', id: scope.row.carrierOrderID}">编辑</el-dropdown-item>
									<el-dropdown-item :command="{type: 'delete', id: scope.row.carrierOrderID}">删除</el-dropdown-item>
								</el-dropdown-menu>
							</el-dropdown>
						</template>
					</el-table-column>
				</el-table>
				<el-row type="flex">
					<el-col :span="12" style="padding-top: 15px; font-size: 12px; color: #909399">
						<span>总共 {{total}} 条记录每页显示</span>
						<el-select size="mini" style="width: 90px; padding: 0 5px" v-model="pageSize" @change="getList()">
							<el-option label="10" value="10"></el-option>
							<el-option label="20" value="20"></el-option>
							<el-option label="30" value="30"></el-option>
							<el-option label="40" value="40"></el-option>
							<el-option label="50" value="50"></el-option>
							<el-option label="100" value="100"></el-option>
						</el-select>
						<span>条记录</span>
					</el-col>
					<el-col :span="12">
						<div class="pagination">
							<el-pagination :page-size="pageSize" align="right" background layout="prev, pager, next" :total="total" @current-change="pageChange"></el-pagination>
						</div>
					</el-col>
				</el-row>
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
import { Message } from 'element-ui'
import request from "../../common/request"
export default {
	data() {
		return {
			pageIndex: 1,
			pageSize: 10,
			total:0,
			tableData: [],
			selectedList: [],
			findsearchInfo:'',
			findRangeDate: [],
			findshipperBeginDate: '',
			findshipperEndDate: '',
			findStatus:'',
			refreshing: false
		}
	},
	created() {
		this.getList()
	},
	methods: {
		reset() {
			this.findsearchInfo='',
			this.findshipperBeginDate='',
			this.findshipperEndDate='',
			this.findRangeDate = [],
			this.findStatus='',
			this.pageIndex=1,
			this.getList()
		},
		selectDateRange(date) {
			this.findshipperBeginDate = date[0]
			this.findshipperEndDate = date[1]
		},
		selectionChange(data) {
			this.selectedList = data.map(item => item.carrierOrderID)
			console.log(this.selectedList)
		},
		AddDispatchBill() {
			console.log(this.selectedList)
			this.$router.push({ name: 'adddispatchbill', query: { carrierOrderID: this.selectedList.join(',') } })
		},
		pageChange(index) {
			this.pageIndex = index
			this.getList() 
		},

		getList() {
				console.log(this.pageIndex)
				let params = {
					current: this.pageIndex,
					size: this.pageSize,
					shipperBeginDate: this.findshipperBeginDate,
					shipperEndDate: this.findshipperEndDate,
					searchInfo: this.findsearchInfo
				}
				request({
					url: '/biz/carrierOrder/list',
					params
				}).then(res => {
					this.tableData = res.data.data.records
					this.total= res.data.data.total
				})
			},
		handleCommand(e) {
			if (e.type == 'view') {
				this.$router.push({name: 'viewcarrierbill', query: {carrierOrderID: e.id}})
			} else if (e.type == 'edit') {
				this.$router.push({name: 'editcarrierbill', query: {carrierOrderID: e.id}})
			} else if (e.type == 'delete') {
				this.deleteConfirm(e.id)
			}
		},
		add() {
			this.$router.push({ name: 'addcarrierbill' })
		},
		refresh() {
			this.refreshing = true
			this.getList()
			setTimeout(() => {
				this.refreshing = false
			}, 500)
		},
		deleteConfirm(id) {
				console.log(id)
				let ids = ''
				if (id && typeof id == 'string') {
					ids = id
				} else {
					ids = this.selectedList.join(',')
				}
				this.$confirm('此操作将永久删除, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.delItem(ids)
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					})
				})
			},
			delItem(carrierOrderIDs) {
				let data = {
					carrierOrderIDs
				}
				request({
					url: '/biz/carrierOrder/delete',
					method: 'post',
					data
				}).then(res => {
					this.$message({
						type: 'success',
						message: '删除成功!'
					})
					this.getList()
				})
			},
	}
}

</script>
<style lang="stylus" scoped>

</style>
