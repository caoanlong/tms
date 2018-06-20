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
							<el-option value="Committed" label="未执行">未执行</el-option>
							<el-option value="Running" label="执行中">执行中</el-option>
							<el-option value="Signed" label="已完成">已完成</el-option>
							<el-option value="Closed" label="已关闭">已关闭</el-option>
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
							<td colspan="11">
								<span class="infoItem ViewDispatchBill" @click="view(item.carrierOrderID)">承运单号：{{item.carrierOrderNo}}</span>
								<span class="infoItem">
									<el-tag size="mini" type="warning" v-if="item.status=='Committed'">未执行</el-tag>
									<el-tag size="mini" v-else-if="item.status=='Running'">执行中</el-tag>
									<el-tag size="mini" type="success" v-else-if="item.status=='Signed'">已完成</el-tag>
									<el-tag size="mini" type="info" v-else-if="item.status=='Closed'">已关闭</el-tag>
									<el-tag size="mini" type="info" v-else-if="item.status=='Canceled'">作废</el-tag>
								</span>
								<span class="fr">
									<el-button type="text" size="mini" 
										:disabled="item.status != 'Committed'" 
										@click="edit(item.carrierOrderID)">
										编辑
									</el-button>
									<el-button type="text" size="mini" 
										:disabled="item.status != 'Running' && item.status != 'Signed'"
										@click="close(item.carrierOrderID)">
										关闭
									</el-button>
									<el-button type="text" size="mini"
										:disabled="item.status == 'Running' || item.status == 'Signed' || item.status == 'Closed'" 
										@click="del(item.carrierOrderID)">
										删除
									</el-button>
								</span>
							</td>
						</tr>
						<tr class="list" :key="index+100" v-if="item.carrierCargo">
							<td>{{item.cargoName}}</td>
							<td width="80">
								{{item.cargoWeightSum + 'kg'}}
								{{(item.cargoVolumeSum ? ('/' + item.cargoVolumeSum) : 0) + 'm³'}}
							</td>
							<td width="80">{{item.cargoNumSum}}</td>
							<td>{{item.shipperCompanyName}}</td>
							<td>{{item.shipperName}}({{item.shipperPhone}})</td>
							<td>{{item.shipperArea}}</td>
							<td width="140">{{item.shipperDate | getdatefromtimestamp(true)}}</td>
							<td>{{item.consigneeCompanyName}}</td>
							<td>{{item.consigneeName}}({{item.consigneePhone}})</td>
							<td>{{item.consigneeArea}}</td>
							<td width="140">{{item.consigneeDate | getdatefromtimestamp(true)}}</td>
						</tr>
					</template>
				</table>
				<Page :total="total" :pageSize="pageSize" @pageChange="pageChange" @pageSizeChange="pageSizeChange"/>
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
import { Message } from 'element-ui'
import { deleteConfirm, closeConfirm } from '../../common/utils'
import Carrierbill from '../../api/Carrierbill'
import Page from '../CommonComponents/Page'
export default {
	data() {
		return {
			pageIndex: 1,
			pageSize: 10,
			total: 0,
			tableData: [],
			findsearchInfo:'',
			findRangeDate: [],
			findshipperBeginDate: '',
			findshipperEndDate: '',
			findStatus: ''
		}
	},
	components: {
		Page
	},
	created() {
		this.getList()
	},
	methods: {
		reset() {
			this.findsearchInfo = ''
			this.findshipperBeginDate = ''
			this.findshipperEndDate = ''
			this.findRangeDate = []
			this.findStatus = ''
			this.pageIndex = 1
			this.getList()
		},
		selectDateRange(date) {
			this.findshipperBeginDate = date[0]
			this.findshipperEndDate = date[1]
		},
		SumDispatchCargoQuantity(data) {
			let sumWeight = 0
			let sumVolume = 0
			let sumNum = 0
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
		pageSizeChange(size) {
			this.pageSize = size
			this.getList() 
		},
		getList() {
			Carrierbill.find({
				current: this.pageIndex,
				size: this.pageSize,
				shipperBeginDate: this.findshipperBeginDate,
				shipperEndDate: this.findshipperEndDate,
				searchInfo: this.findsearchInfo,
				status: this.findStatus
			}).then(res => {
				this.tableData = res.records
				this.total= res.total
			})
		},
		view(carrierOrderID) {
			this.$router.push({name: 'viewcarrierbill', query: {carrierOrderID}})
		},
		edit(carrierOrderID) {
			this.$router.push({name: 'editcarrierbill', query: {carrierOrderID}})
		},
		add() {
			this.$router.push({ name: 'addcarrierbill' })
		},
		close(carrierOrderID) {
			closeConfirm(carrierOrderID, carrierOrderIDs => {
				Carrierbill.close({ carrierOrderIDs }).then(res => {
					Message({ type: 'success', message: '关闭成功!' })
					this.getList()
				})
			})
		},
		del(carrierOrderID) {
			deleteConfirm(carrierOrderID, carrierOrderIDs => {
				Carrierbill.del({ carrierOrderIDs }).then(res => {
					Message({ type: 'success', message: '删除成功!' })
					this.getList()
				})
			})
		}
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
			border-top 10px solid #fff
			background #f8f8f8
			color #3582d0
			.infoItem
				margin-right 40px
				height 24px
				line-height 24px
				display inline-block
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
