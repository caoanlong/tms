<template>
	<div class="main-content">
		<div class="wf-card box-card">
			<div class="header clearfix">承运单列表</div>
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
							<el-option value="Committed" label="待执行">待执行</el-option>
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
			</div>
			<div class="table">
				<table class="wfTable">
					<tr>
						<th>货物</th>
						<th>货量</th>
						<th>件数</th>
						<th>发货公司</th>
						<th>发货人</th>
						<th>发货地</th>
						<th width="140">发货时间</th>
						<th>到货公司</th>
						<th>到货人</th>
						<th>到货地</th>
						<th width="140">到货时间</th>
					</tr>
					<template v-for="(item, index) in tableData">
						<tr class="tit" :key="index">
							<td colspan="10">
								<span class="infoItem ViewDispatchBill" @click="view(item.carrierOrderID)" >承运单号：{{item.carrierOrderNo}}</span>
								<span class="infoItem">
									<span class="tag tag1" v-if="item.status=='Committed'">待执行</span>
									<span class="tag tag2" v-else-if="item.status=='Running'">执行中</span>
									<span class="tag tag3" v-else-if="item.status=='Signed'">到达签收</span>
									<span class="tag tag4" v-else-if="item.status=='Closed'">关闭</span>
									<span class="tag tag5" v-else-if="item.status=='Canceled'">作废</span>
								</span>
							</td>
							<td class="text-center" width="140">
								<el-button type="text" size="mini">编辑</el-button>
								<el-button type="text" size="mini">关闭</el-button>
								<el-button type="text" size="mini">删除</el-button>
							</td>
						</tr>
						<tr class="list" :key="index+100">
							<td>{{item.carrierCargo[0].cargoName}}</td>
							<td width="80">{{item.carrierCargo[0].cargoWeight + 'kg'}}/{{item.carrierCargo[0].cargoVolume + 'm³'}}</td>
							<td width="80">{{item.carrierCargo[0].cargoNum}}</td>
							<td>{{item.shipperCompanyName}}</td>
							<td>{{item.shipperName}}</td>
							<td>{{item.shipperArea}}</td>
							<td width="140">{{item.shipperDate | getdatefromtimestamp()}}</td>
							<td>{{item.consigneeCompanyName}}</td>
							<td>{{item.consigneeName}}</td>
							<td>{{item.consigneeArea}}</td>
							<td width="140">{{item.consigneeDate | getdatefromtimestamp()}}</td>
						</tr>
					</template>
				</table>
				<el-row type="flex">
					<el-col :span="12" style="padding-top: 15px; font-size: 12px; color: #909399">
						<span>总共 {{total}} 条记录每页显示</span>
						<el-select size="mini" style="width: 90px; padding: 0 5px" v-model="pageSize" @change="getList">
							<el-option label="10" :value="10"></el-option>
							<el-option label="20" :value="20"></el-option>
							<el-option label="30" :value="30"></el-option>
							<el-option label="40" :value="40"></el-option>
							<el-option label="50" :value="50"></el-option>
							<el-option label="100" :value="100"></el-option>
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
			findStatus:''
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
			this.findStatus = '',
			this.pageIndex = 1,
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
		SumDispatchCargoQuantity(data) {
			let sumWeight = 0;
			let sumVolume = 0;
			let sumNum = 0;
			data.map(item => {
				sumWeight += (item.cargoWeight ?item.cargoWeight : 0)
				sumVolume += (item.cargoVolume ? item.cargoVolume : 0)
				sumNum += (item.cargoNum ? item.cargoNum : 0)
			})

			return (sumWeight + '吨/' + sumVolume + '方/' + sumNum + '件')
		},
		pageChange(index) {
			this.pageIndex = index
			this.getList() 
		},

		getList() {
			let params = {
				current: this.pageIndex,
				size: this.pageSize,
				shipperBeginDate: this.findshipperBeginDate,
				shipperEndDate: this.findshipperEndDate,
				searchInfo: this.findsearchInfo,
				status: this.findStatus
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
		view(carrierOrderID) {
			this.$router.push({name: 'viewcarrierbill', query: {carrierOrderID}})
		},
		add() {
			this.$router.push({ name: 'addcarrierbill' })
		},
		deleteConfirm(id) {
			let ids = ''
			if (id && typeof id == 'string') {
				ids = id
			} else {
				ids = this.selectedList.join(',')
			}
			if(!ids) {
				Message({
					type: 'warning',
					message: '请选择'
				})
				return
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
.wfTable
	width 100%
	background #e2ecf6
	border-spacing 1px
	font-size 14px
	margin-bottom 10px
	td
		background #fff
		padding 6px 10px
		height 36px
		line-height 24px
		color #666
		position relative
	.tit
		td
			border-top 1px solid #bbb
			background #f8f8f8
			color #3582d0
			.infoItem
				margin-right 40px
				&.ViewDispatchBill
					cursor pointer
	
	th
		padding 6px 10px
		height 36px
		line-height 24px
		background #f0f0f0
		color #666
		width 100px
	.list
		td
			font-size 12px
			.ViewTaskDetail
				cursor pointer
				display block
</style>
