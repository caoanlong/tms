<template>
	<div>
		<el-dialog title="修改运费" :visible="isVisible" :show-close="false" custom-class="table" width="70%">
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
								+ Number(payInfo.driverDetoursMileage)
								+ Number(payInfo.driverDetoursAmount)
								+ Number(payInfo.driverOtherAmount)
								+ Number(payInfo.superCargoCashAmount)
								+ Number(payInfo.superCargoCodAmount)
								+ Number(payInfo.superCargoCorAmount)
								+ Number(payInfo.superCargoMonthlyAmount)
								+ Number(payInfo.superCosigneeAmount)
								+ Number(payInfo.superCargoDetoursMileage)
								+ Number(payInfo.superCargoDetoursAmount)
								+ Number(payInfo.superCargoOtherAmount)
							}}
						</td>
					</tr>
				</tfoot>
			</table>
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
			payInfo: {
				type: Object,
				default: () => {}
			}
		},
		methods: {
			control(bool) {
				if (bool) {
					this.$emit('control', false, this.payInfo)
				} else {
					this.$emit('control', false)
				}
			}
		}
	}
</script>