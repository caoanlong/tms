<template>
	<div>
		<el-dialog title="签收" :visible="isVisible" :show-close="false" custom-class="table" width="70%">
			<table class="wf-table">
				<tr>
					<th width="60">序号</th>
					<th width="120">承运单编号</th>
					<th>货物规格/名称</th>
					<th width="80">配载量</th>
					<th>运载量</th>
					<th width="90">签收量/千克</th>
					<th width="90">签收量/方</th>
					<th width="90">签收量/件</th>
				</tr>
				<tr class="is-center" v-for="(item, index) in cargoInfo">
					<td>{{index+1}}</td>
					<td>{{item.carrierOrderNo}}</td>
					<td>{{item.cargoType}}/{{item.cargoName}}</td>
					<td>{{item.cargoWeight + '千克/'}}{{item.cargoVolume + '方/'}}{{item.cargoNum + '件'}}</td>
					<td>
						{{(item.loadWeight ? item.loadWeight : 0) + '千克/'}}
						{{(item.loadVolume ? item.loadVolume : 0) + '方/'}}
						{{(item.loadNum ? item.loadNum : 0) + '件'}}
					</td>
					<td>
						<el-input size="mini" v-model="item.signWeight"></el-input>
					</td>
					<td>
						<el-input size="mini" v-model="item.signVolume"></el-input>
					</td>
					<td>
						<el-input size="mini" v-model="item.signNum"></el-input>
					</td>
				</tr>
				<tr>
					<td>合计</td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td>{{cargoInfo[0] ? (cargoInfo[0].signWeight ? totalSignWeight : 0) : 0}}</td>
					<td>{{cargoInfo[0] ? (cargoInfo[0].signVolume ? totalSignVolume : 0) : 0}}</td>
					<td>{{cargoInfo[0] ? (cargoInfo[0].signNum ? totalSignNum : 0) : 0}}</td>
				</tr>
			</table>
			<table class="customertable">
				<thead>
					<tr>
						<th width="100"></th>
						<th>现付</th>
						<th>到付</th>
						<th>回单付</th>
						<th>月结</th>
						<th>收方到货付</th>
						<th>绕路里程</th>
						<th>绕路费用</th>
						<th>其他费用</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td class="txt-r">司机</td>
						<td>
							<el-input size="mini" v-model="payInfo.driverCashAmount"></el-input>
						</td>
						<td>
							<el-input size="mini" v-model="payInfo.driverCodAmount"></el-input>
						</td>
						<td>
							<el-input size="mini" v-model="payInfo.driverPorAmount"></el-input>
						</td>
						<td>
							<el-input size="mini" v-model="payInfo.driverMonthlyAmont"></el-input>
						</td>
						<td>
							<el-input size="mini" v-model="payInfo.driverCosigneeAmount"></el-input>
						</td>
						<td>
							<el-input size="mini" v-model="payInfo.driverDetoursMileage"></el-input>
						</td>
						<td>
							<el-input size="mini" v-model="payInfo.driverDetoursAmount"></el-input>
						</td>
						<td>
							<el-input size="mini" v-model="payInfo.driverOtherAmount"></el-input>
						</td>
					</tr>
					<tr>
						<td class="txt-r">随车人员</td>
						<td>
							<el-input size="mini" v-model="payInfo.superCargoCashAmount"></el-input>
						</td>
						<td>
							<el-input size="mini" v-model="payInfo.superCargoCodAmount"></el-input>
						</td>
						<td>
							<el-input size="mini" v-model="payInfo.superCargoCorAmount"></el-input>
						</td>
						<td>
							<el-input size="mini" v-model="payInfo.superCargoMonthlyAmount"></el-input>
						</td>
						<td>
							<el-input size="mini" v-model="payInfo.superCosigneeAmount"></el-input>
						</td>
						<td>
							<el-input size="mini" v-model="payInfo.superCargoDetoursMileage"></el-input>
						</td>
						<td>
							<el-input size="mini" v-model="payInfo.superCargoDetoursAmount"></el-input>
						</td>
						<td>
							<el-input size="mini" v-model="payInfo.superCargoOtherAmount"></el-input>
						</td>
					</tr>
				</tbody>
				<tfoot>
					<tr>
						<td class="txt-r">合计</td>
						<td colspan="6">
							{{
								Number(payInfo.driverCashAmount) 
								+ Number(payInfo.driverCodAmount)
								+ Number(payInfo.driverPorAmount)
								+ Number(payInfo.driverMonthlyAmont)
								+ Number(payInfo.driverCosigneeAmount)
								+ Number(payInfo.driverDetoursAmount)
								+ Number(payInfo.driverOtherAmount)
								+ Number(payInfo.superCargoCashAmount)
								+ Number(payInfo.superCargoCodAmount)
								+ Number(payInfo.superCargoCorAmount)
								+ Number(payInfo.superCargoMonthlyAmount)
								+ Number(payInfo.superCosigneeAmount)
								+ Number(payInfo.superCargoDetoursAmount)
								+ Number(payInfo.superCargoOtherAmount)
							}}
						</td>
					</tr>
				</tfoot>
			</table>
			<!-- <p>备注</p>
			<el-input type="textarea" placeholder="请输入..."></el-input> -->
			<span slot="footer" class="dialog-footer">
				<el-button @click="control(false)">取消</el-button>
				<el-button type="primary" @click="control(true)">确认</el-button>
			</span>
		</el-dialog>
	</div>
</template>
<script type="text/javascript">
	export default {
		props: {
			isVisible: {
				type: Boolean,
				default: false
			},
			cargoInfo: {
				type: Array,
				default: () => []
			},
			payInfo: {
				type: Object,
				default: () => {}
			}
		},
		computed: {
			totalSignWeight() {
				let values = this.cargoInfo.map(item => Number(item.signWeight ? item.signWeight : 0))
				return values.reduce((prev, next) => {
					return prev + next
				}, 0)
			},
			totalSignVolume() {
				let values = this.cargoInfo.map(item => Number(item.signVolume ? item.signVolume : 0))
				return values.reduce((prev, next) => {
					return prev + next
				}, 0)
			},
			totalSignNum() {
				let values = this.cargoInfo.map(item => Number(item.signNum ? item.signNum : 0))
				return values.reduce((prev, next) => {
					return prev + next
				}, 0)
			},
		},
		methods: {
			control(bool) {
				if (bool) {
					this.$emit('control', false, this.cargoInfo, this.payInfo)
				} else {
					this.$emit('control', false)
				}
			}
		}
	}
</script>