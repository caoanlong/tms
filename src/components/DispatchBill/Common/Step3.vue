<template>
	<div class="step step3">
		<el-row>
			<div class="split-item">
				<span class="tit">配载信息</span>
			</div>
		</el-row>
		<div class="control-info">
			<el-row :gutter="30">
				<el-col :span="6" style="border-right:1px solid #ebeef5">
					<div class="base-info inlineBlock">
						<p class="driverName">{{truck.realName}}</p>
						<p class="vehicleNo">{{truck.plateNo}}</p>
						<p class="trailerNo">{{truck.trailerPlateNo}}</p>
						<p class="vehicleType">{{truck.length ? truck.length + '米' : ''}}{{truck.truckType}}{{truck.truckCategory}}</p>
					</div>
				</el-col>
				<el-col :span="18">
					<el-row :gutter="30">
						<el-col :span="8">
							<div class="sliderSelect">
								<el-progress :percentage="parseInt(totalCargoWeight/Number(truck.loads) *100)" style="margin-top:13px"></el-progress>
								<span class="surplus">剩 {{Number(truck.loads) - totalCargoWeight}}吨</span>
							</div>
						</el-col>
						<el-col :span="8">
							<div class="sliderSelect">
								<el-progress :percentage="parseInt(totalCargoVolume/Number(truck.loadVolume) * 100)" style="margin-top:13px"></el-progress>
								<span class="surplus">剩 {{Number(truck.loadVolume) - totalCargoVolume}}方</span>
							</div>
						</el-col>
						<!-- <el-col :span="8">
							<div class="sliderSelect">
								<el-progress :percentage="Number(totalNum)/Number(truck.loadVolume)" style="margin-top:13px"></el-progress>
								<span class="surplus">剩 件</span>
							</div>
						</el-col> -->
					</el-row>
					<el-row :gutter="30">
						<el-col :span="8">
							<el-form label-width="60px">
								<el-form-item label="已配载">
									<el-input size="mini" v-model="totalWeight">
										<template slot="append">吨</template>
									</el-input>
								</el-form-item>
							</el-form>
						</el-col>
						<el-col :span="8">
							<el-form label-width="60px">
								<el-form-item label="已配载">
									<el-input size="mini" v-model="totalVol">
										<template slot="append">方</template>
									</el-input>
								</el-form-item>
							</el-form>
						</el-col>
						<el-col :span="8">
							<el-form label-width="60px">
								<el-form-item label="已配载">
									<el-input size="mini" v-model="totalNum">
										<template slot="append">件</template>
									</el-input>
								</el-form-item>
							</el-form>
						</el-col>
						<el-col :span="24" class="controlStatus">
							<el-radio v-model="loadStatus" label="Full">满载</el-radio>
							<el-radio v-model="loadStatus" label="NotFull">未满载</el-radio>
						</el-col>
					</el-row>
				</el-col>
			</el-row>
		</div>
		<el-row>
			<div class="split-item">
				<p style="font-size: 12px">从“这个订单的发货地”到卸货地对内运距为“50公里”  TKM为1.1？</p>
				<span class="tit">付款方式及费用</span>
			</div>
		</el-row>
		<table class="customertable" width="100%">
			<thead>
				<tr>
					<th width="100"></th>
					<th>现付</th>
					<th>到付</th>
					<th>回单付</th>
					<th>月结</th>
					<th>收方到货付</th>
					<th>合计</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td class="txt-r">司机</td>
					<td>
						<el-input size="mini" v-model="payMethods.driverCashAmount">
						</el-input>
					</td>
					<td>
						<el-input size="mini" v-model="payMethods.driverCodAmount"></el-input>
					</td>
					<td>
						<el-input size="mini" v-model="payMethods.driverPorAmount"></el-input>
					</td>
					<td>
						<el-input size="mini" v-model="payMethods.driverMonthlyAmont"></el-input>
					</td>
					<td>
						<el-input size="mini" v-model="payMethods.driverCosigneeAmount"></el-input>
					</td>
					<td>
						<el-input disabled size="mini" :value="totalDriver"></el-input>
					</td>
				</tr>
				<tr>
					<td class="txt-r">随车人员</td>
					<td>
						<el-input size="mini" v-model="payMethods.superCargoCashAmount"></el-input>
					</td>
					<td>
						<el-input size="mini" v-model="payMethods.superCargoCodAmount"></el-input>
					</td>
					<td>
						<el-input size="mini" v-model="payMethods.superCargoCorAmount"></el-input>
					</td>
					<td>
						<el-input size="mini" v-model="payMethods.superCargoMonthlyAmount"></el-input>
					</td>
					<td>
						<el-input size="mini" v-model="payMethods.superCosigneeAmount"></el-input>
					</td>
					<td>
						<el-input disabled size="mini" :value="totalSuperCargo"></el-input>
					</td>
				</tr>
			</tbody>
			<tfoot>
				<tr>
					<td colspan="7" class="txt-r">合计：{{totalDriver + totalSuperCargo}}</td>
				</tr>
			</tfoot>
		</table>
		<div class="step-footer">
			<el-button @click="prevStep">上一步</el-button>
			<el-button type="primary" @click="nextStep">下一步</el-button>
		</div>
	</div>
</template>
<script type="text/javascript">
	export default {
		props: {
			truck: {
				type: Object,
				default: () => {}
			},
			person: {
				type: Object,
				default: () => {}
			},
			carrierCargos: {
				type: Array,
				default: () => []
			},
			totalList: {
				type: Array,
				default: () => []
			}
		},
		computed: {
			totalDriver() {
				return Number(this.payMethods.driverCashAmount ? this.payMethods.driverCashAmount : 0) + Number(this.payMethods.driverCodAmount  ? this.payMethods.driverCodAmount : 0) + Number(this.payMethods.driverPorAmount  ? this.payMethods.driverPorAmount : 0) + Number(this.payMethods.driverMonthlyAmont  ? this.payMethods.driverMonthlyAmont : 0) + Number(this.payMethods.driverCosigneeAmount  ? this.payMethods.driverCosigneeAmount : 0)
			},
			totalSuperCargo() {
				return Number(this.payMethods.superCargoCashAmount ? this.payMethods.superCargoCashAmount : 0) + Number(this.payMethods.superCargoCodAmount  ? this.payMethods.superCargoCodAmount : 0) + Number(this.payMethods.superCargoCorAmount  ? this.payMethods.superCargoCorAmount : 0) + Number(this.payMethods.superCargoMonthlyAmount  ? this.payMethods.superCargoMonthlyAmount : 0) + Number(this.payMethods.superCosigneeAmount  ? this.payMethods.superCosigneeAmount : 0)
			},
			totalCargoWeight() {
				if (this.truck.cargos) {
					let values = this.truck.cargos.map(item => item.loadWeight ? Number(item.loadWeight) : 0)
					return values.reduce((prev, next) => prev + next, 0)
				} else {
					return 0
				}
			},
			totalCargoVolume() {
				if (this.truck.cargos) {
					let values = this.truck.cargos.map(item => item.loadVolume ? Number(item.loadVolume) : 0)
					return values.reduce((prev, next) => prev + next, 0)
				} else {
					return 0
				}
			},
		},
		watch: {
			totalList: {
				handler: function(newVal) {
					console.log(newVal[2])
					this.totalWeight = newVal[0]
					this.totalVol = newVal[1]
					this.totalNum = newVal[2]
				},
				deep: true
			}
		},
		data() {
			return {
				payMethods: {
					driverCashAmount: '', // 司机现付金额
					driverCodAmount: '', // 司机到付金额
					driverPorAmount: '', // 司机回单金额
					driverMonthlyAmont: '', // 司机月结金额
					driverCosigneeAmount: '', // 司机收货方到付金额
					superCargoCashAmount: '', // 押运人现付金额
					superCargoCodAmount: '', // 押运人到付金额
					superCargoCorAmount: '', // 押运人回单金额
					superCargoMonthlyAmount: '', // 押运人月结金额
					superCosigneeAmount: '', // 押运人收货方到付金额
				},
				loadStatus: 'NotFull',
				totalWeight: 0,
				totalVol: 0,
				totalNum: 0,
			}
		},
		methods: {
			prevStep() {
				this.$emit('prevStep', 1)
			},
			nextStep() {
				this.$emit('nextStep', 3, this.payMethods, this.loadStatus)
			},
		}
	}
</script>
<style lang="stylus" scoped>
	.step-footer
		margin-top 20px
		text-align center
	.step
		.split-item
			padding 10px 0
			.tit
				padding-left 0
	.control-info
		font-size 14px
		border-bottom 1px solid #ebeef5
		border-top 1px solid #ebeef5
		padding 20px 0
		margin-bottom 20px
		.sliderSelect
			display inline-block
			width 220px
			height 40px
			padding-right 100px
			position relative
			.labels
				position absolute
				left 0
				top 0
				line-height 40px
			.surplus
				position absolute
				right 0
				top 0
				line-height 40px
				width 80px
		.base-info
			p
				line-height 30px
				margin 0
	.customertable
		width 100%
		font-size 14px
		background #ebeef5
		border-spacing 1px
		margin-top -1px
		td
		th
			background #fff
			padding 6px 10px
			color #909399
			height 24px
			line-height 24px
			text-align center
			&.txt-r
				text-align right
</style>