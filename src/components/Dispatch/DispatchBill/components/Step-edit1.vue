<template>
	<div class="step step1">
		<div class="table">
			<table class="wfTable">
				<tr>
					<th width="40">
						<el-checkbox 
							:disabled="true" 
							:checked="true" 
							:indeterminate="(selectedCarrierBill.length > 0) && (selectedCarrierBill.length < carrierList.length)" 
							v-model="checked">
						</el-checkbox>
					</th>
					<th>货物</th>
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
				<template v-for="item in carrierList">
					<tr class="tit" :key="item.carrierOrderID">
						<td>
							<div class="wfCheck">
								<span>
									<input 
										:disabled="true" 
										type="checkbox" 
										class="checkbox" 
										ref="checkCarrier" 
										:checked="true"
									/>
									<label></label>
								</span>
							</div>
						</td>
						<td colspan="11">
							<span class="infoItem ViewDispatchBill" @click="ViewCarrierbills(item.carrierOrderID)">承运单号：{{item.carrierOrderNo}}</span>
							<span class="infoItem">
								<el-tag size="mini" type="warning" v-if="item.status=='Committed'">待执行</el-tag>
								<el-tag size="mini" v-else-if="item.status=='Running'">执行中</el-tag>
							</span>
						</td>
					</tr>
					<tr class="list" :key="item.carrierOrderID + 1">
						<td colspan="2">{{item.cargoName}}</td>
						<td class="text-center">{{item.cargoWeightSum}}kg{{item.cargoWeightSum&&item.cargoVolumeSum?'/':''}}{{item.cargoVolumeSum?item.cargoVolumeSum+'m³':''}}</td>
						<td class="text-center">{{item.cargoNumSum?item.cargoNumSum:''}}</td>
						<td>{{item.shipperCompanyName}}</td>
						<td class="text-center" width="160">{{item.shipperName}}<span class="phone">{{item.shipperPhone}}</span></td>
						<td class="text-center">{{item.shipperArea}}</td>
						<td class="text-center" width="140">{{item.shipperDate | getdatefromtimestamp(true)}}</td>
						<td>{{item.consigneeCompanyName}}</td>
						<td class="text-center" width="160">{{item.consigneeName}}<span class="phone">{{item.consigneePhone}}</span></td>
						<td class="text-center">{{item.consigneeArea}}</td>
						<td class="text-center" width="140">{{item.consigneeDate | getdatefromtimestamp(true)}}</td>
					</tr>
				</template>
			</table>
		</div>
		<Page :total="total" :pageSize="pageSize" @pageChange="pageChange" @pageSizeChange="pageSizeChange"/>
		<div class="step-footer text-center">
			<el-button type="primary" @click="nextStep">下一步</el-button>
			<el-button @click="back">返回</el-button>
		</div>
	</div>
</template>
<script type="text/javascript">
import { mapGetters } from 'vuex'
import { Message } from 'element-ui'
import Carrierbill from '../../../../api/Carrierbill'
import Page from '../../../CommonComponents/Page'
export default {
	data() {
		return {
			pageIndex: 1,
			pageSize: 10,
			total: 0,
			carrierList:[],
			checkedList: [],
			checked: false,
			isIndeterminate: false,
			recdeliverycomp: {},
			dispatchOrderID: this.$route.query.dispatchOrderID
		}
	},
	computed: {
		...mapGetters(['selectedCarrierBill'])
	},
	created() {
		this.getList()
	},
	methods: {
		nextStep() {
			if (this.selectedCarrierBill.length == 0) {
				Message.error('请选择！')
				return
			}
			this.$emit('nextStep', 2)
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
			let params = {
				current: this.pageIndex,
				size: this.pageSize
			}
			this.dispatchOrderID && (params['dispatchOrderID'] = this.dispatchOrderID)
			Carrierbill.findPreDispatch(params).then(res => {
				this.carrierList = res.records
				this.total = res.total
				if (this.dispatchOrderID) {
					this.$store.dispatch('addCarrierBill', this.carrierList)
				}
			})
		},
		ViewCarrierbills(carrierOrderID) {
			this.$router.push({name: 'viewcarrierbill', query: {carrierOrderID}})
		},
		back() {
			this.$router.go(-1)
		}
	},
	components: {
		Page
	},
}
</script>
<style lang="stylus" scoped>
.table
	overflow hidden
	overflow-x auto
.wfTable
	min-width 100%
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
		white-space nowrap
		max-width 180px
		overflow hidden
		text-overflow ellipsis
	.tit
		td
			border-top 1px solid #bbb
			background #f8f8f8
			color #3582d0
			.infoItem
				margin-right 40px
				&.ViewDispatchBill
					cursor pointer
				.tag
					padding 0 8px
					color #fff
					border-radius 4px
					font-size 12px
					height 19px
					line-height 19px
					display inline-block
					&.tag1
						background #409EFF
					&.tag2
						background #909399
	th
		padding 6px 10px
		height 36px
		line-height 24px
		background #f0f0f0
		color #666
		white-space nowrap
	.list
		td
			font-size 12px
			.phone
				// color #67C23A
				margin-left 10px
.main-content
	.pagination
		margin-top 0
.step-footer
	margin-top 10px

			
</style>