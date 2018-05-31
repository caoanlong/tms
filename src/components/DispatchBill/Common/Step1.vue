<template>
	<div class="step step1">
		<div class="search">
			<el-form :inline="true" size="small">
				<el-form-item label="关键字" >
					<el-input placeholder="承运单号/货物名称/起始地/目的地" style="width:150px" v-model="findsearchInfo"></el-input>
				</el-form-item>
				<el-form-item label="收发货单位">
					<el-input placeholder="收发货单位" v-model="findrecdeliverycomp"></el-input>
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
				<el-form-item>
					<el-button type="primary" @click="getList">搜索</el-button>
					<el-button type="default" @click="reset">重置</el-button>
				</el-form-item>
			</el-form>
		</div>
		<div class="table">
			<table class="wfTable">
					<tr>
						<th colspan="2">货物</th>
						<th>货量</th>
						<th>件数</th>
						<th>发货公司</th>
						<th width="160">发货人</th>
						<th>发货地</th>
						<th width="160">发货时间</th>
						<th>收货公司</th>
						<th width="160">收货人</th>
						<th>收货地</th>
						<th width="160">收货时间</th>
					</tr>
					<template>
					<tr class="tit">
						<td colspan="12">
							<span class="infoItem ViewDispatchBill">承运单号：234567888899</span>
							<span class="infoItem">
								<span class="tag tag1">待执行</span>
								<!-- <span class="tag tag1" v-if="item.status == 'Committed'">待执行</span> -->
								<!-- <span class="tag tag2" v-else-if="item.status == 'Loaded'">已装运</span>
								<span class="tag tag3" v-else-if="item.status == 'Signed'">已签收</span>
								<span class="tag tag4" v-else-if="item.status == 'Canceled'">作废</span> -->
							</span>
						</td>
					</tr>
					<tr class="list">
						<td class="text-center" width="40"><el-checkbox></el-checkbox></td>
						<td>啤酒、可乐...</td>
						<td>3000kg/3.5m³</td>
						<td class="text-center">556</td>
						<td>昆明天龙</td>
						<td class="text-center" width="160">周俊1342438994</td>
						<td>云南昆明</td>
						<td class="text-center" width="160">2018-04-22 18:33:15</td>
						<td>广东天龙</td>
						<td class="text-center" width="160">董戡134455666</td>
						<td>广东广州</td>
						<td class="text-center" width="160">2018-04-22 18:33:15</td>
					</tr>
					</template>
				</table>
				<el-row type="flex">
					<el-col :span="12" style="font-size: 12px; color: #909399">
						<span>总共 {{count}} 条记录每页显示</span>
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
							<el-pagination :page-size="pageSize" align="right" background layout="prev, pager, next" :total="count" @current-change="pageChange" size="small"></el-pagination>
						</div>
					</el-col>
				</el-row>
		</div>
		<div class="step-footer text-center">
			<el-button type="primary" @click="nextStep">下一步</el-button>
			<el-button @click="back">返回</el-button>
		</div>
	</div>
</template>
<script type="text/javascript">
	import { Message } from 'element-ui'
	import request from '../../../common/request'
	export default {
		data() {
			return {
				pageIndex: 1,
				pageSize: 10,
				count: 0,
				carrierList:[],
				selected: [],
				findsearchInfo:'',
				findrecdeliverycomp:'',
				findRangeDate: [],
				findshipperBeginDate: '',
				findshipperEndDate: ''
			}
		},
		created(){
			this.getList()
		},
		methods: {
			nextStep(){
				let selectedCarrierBillIDs = this.selected.map(item => item.carrierOrderID)
				// if (selectedCarrierBillIDs.length == 0) {
				// 	Message.error('请选择！')
				// 	return
				// }
				this.$emit('nextStep', 1,selectedCarrierBillIDs)
			},
			back() {
				this.$router.go(-1)
			},
			pageChange(index) {
				this.pageIndex = index
				this.getList()
			},
			getList(){
				let params = {
					current: this.pageIndex,
					size: this.pageSize,
					shipperBeginDate: this.findshipperBeginDate,
					shipperEndDate: this.findshipperEndDate,
					searchInfo: this.findsearchInfo,
				}
				request({
					url: '/biz/carrierOrder/list',
					params
				}).then(res => {
					this.carrierList = res.data.data.records
					this.count = res.data.data.total
				})
			},
			reset() {
				this.findsearchInfo='',
				this.findshipperBeginDate='',
				this.findshipperEndDate='',
				this.findRangeDate = [],
				this.pageIndex=1,
				this.getList()
			},
			selectDateRange(date) {
				this.findshipperBeginDate = date[0]
				this.findshipperEndDate = date[1]
			},
			selectionChange(data) {
				// this.selectedList = data.map(item => item.carrierOrderID)
				this.selected = data
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
.main-content
	.pagination
		margin-top 0
.step-footer
	margin-top 10px
</style>