<template>
	<div class="main-content">
		<div class="wf-card">
			<div class="header clearfix">调度单编号：{{dispatchBill.dispatchOrderNo}}
				<span>创建时间：{{dispatchBill.createTime}}</span>
				<span class="status status1" v-if="dispatchBill.status == 'Committed'">待执行</span>
				<span class="status status2" v-else-if="dispatchBill.status == 'Loaded'">已装运</span>
				<span class="status status3" v-else-if="dispatchBill.status == 'Signed'">已签收</span>
				<span class="status status3" v-else-if="dispatchBill.status == 'Canceled'">作废</span>
			</div>
			<table class="wf-table">
				<caption>承运信息</caption>
				<tr>
					<td width="50%"><span class="justify">托运人</span>{{dispatchBill.Consignor}}</td>
					<td width="50%"><span class="justify">承运人</span>{{dispatchBill.Carrier}}</td>
				</tr>
			</table>
			<table class="wf-table">
				<caption>收发货信息</caption>
				<tr>
					<td width="50%"><span class="justify">发货单位</span>{{dispatchBill.ConsignerCompany}}</td>
					<td width="50%"><span class="justify">收货单位</span>{{dispatchBill.ConsigneeCompany}}</td>
				</tr>
				<tr>
					<td><span class="justify">发货人</span>{{dispatchBill.Consigner}}</td>
					<td><span class="justify">收货人</span>{{dispatchBill.Consignee}}</td>
				</tr>
				<tr>
					<td><span class="justify">联系方式</span>{{dispatchBill.Consigner}}</td>
					<td><span class="justify">联系方式</span>{{dispatchBill.Consignee}}</td>
				</tr>
				<tr>
					<td><span class="justify">发货地</span>{{dispatchBill.Dispatch}}</td>
					<td><span class="justify">收货地</span>{{dispatchBill.Discharge}}</td>
				</tr>
				<tr>
					<td><span class="justify">发货时间</span>{{dispatchBill.DeliveryDate}}</td>
					<td><span class="justify">到货时间</span>{{dispatchBill.ArrivalDate}}</td>
				</tr>
			</table>
			<table class="wf-table">
				<caption>货物信息</caption>
				<tr>
					<td colspan="6">
						<span class="labels">货物类型：</span>重货
						<span class="labels" style="margin-left:40px">运输方式：</span>公路运输
					</td>
				</tr>
				<tr>
					<th width="60">序号</th>
					<th width="120">承运单编号</th>
					<th>货物规格/名称</th>
					<th>配载量</th>
					<th>运载量</th>
					<th>签收量</th>
				</tr>
				<tr class="is-center">
					<td>1</td>
					<td>20180202001</td>
					<td>R72/炸药</td>
					<td>9.76吨/10方</td>
					<td></td>
					<td></td>
				</tr>
				<tr class="is-center">
					<td>2</td>
					<td>20180214401</td>
					<td>R72/炸药</td>
					<td>9.76吨/10方</td>
					<td></td>
					<td></td>
				</tr>
				<tr>
					<td colspan="6">
						<span class="labels">司机：</span>李司机 13529005327
						<span class="labels" style="margin-left:40px">载具：</span>云AG33652 6.2米厢式 10吨21方
						<span class="labels" style="margin-left:40px">随车人员：</span>赵押运员 13566778899
					</td>
				</tr>
			</table>
			<table class="wf-table">
				<caption>付款信息</caption>
				<tr>
					<th></th>
					<th>现付</th>
					<th>到付</th>
					<th>回单付</th>
					<th>月结</th>
					<th>收方到货付</th>
					<th>绕路里程</th>
					<th>绕路费用</th>
					<th>其他费用</th>
				</tr>
				<tr class="is-center">
					<td>司机</td>
					<td></td>
					<td>2000.00元</td>
					<td></td>
					<td>2000.00元</td>
					<td></td>
					<td>4000.00元</td>
					<td></td>
					<td></td>
				</tr>
				<tr class="is-center">
					<td>随车人员</td>
					<td></td>
					<td>2000.00元</td>
					<td></td>
					<td>2000.00元</td>
					<td></td>
					<td>4000.00元</td>
					<td></td>
					<td></td>
				</tr>
				<tr class="is-center">
					<td>合计：</td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
				</tr>
			</table>
			<div class="wf-footer clearfix is-center">
				<button type="button" class="wf-btn btn-primary" v-if="dispatchBill.status == 'Committed'" @click="load">装车</button>
				<button type="button" class="wf-btn btn-primary" v-if="dispatchBill.status == 'Loaded'" @click="confirm">签收</button>
				<button type="button" class="wf-btn btn-primary" v-if="dispatchBill.status == 'Signed'" @click="isVisible = true">修改运费</button>
				<button type="button" class="wf-btn btn-danger" v-if="dispatchBill.status != 'Signed' && dispatchBill.status != 'Canceled'" @click="cancel">作废</button>
				<button type="button" class="wf-btn btn-default" @click="back">返回</button>
			</div>
		</div>
		<el-dialog title="修改运费" :visible.sync="isVisible" custom-class="table" width="70%">
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
							<el-input size="mini" v-model="payMethods.driverCashAmount"></el-input>
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
							<el-input size="mini"></el-input>
						</td>
						<td>
							<el-input size="mini"></el-input>
						</td>
						<td>
							<el-input size="mini"></el-input>
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
							<el-input size="mini"></el-input>
						</td>
						<td>
							<el-input size="mini"></el-input>
						</td>
						<td>
							<el-input size="mini"></el-input>
						</td>
					</tr>
				</tbody>
				<tfoot>
					<tr>
						<td colspan="7" class="txt-r">合计</td>
					</tr>
				</tfoot>
			</table>
			<span slot="footer" class="dialog-footer">
				<el-button @click="isVisible = false">取消</el-button>
				<el-button type="primary" @click="updatePayInfo">确认</el-button>
			</span>
		</el-dialog>
	</div>
</template>
<script type="text/javascript">
import { Message } from 'element-ui'
import request from '../../common/request'
export default {
	data() {
		return {
			isVisible: false,
			dispatchBill: {
				Status: '待执行',
				Consignor: '安宁化工厂',
				Carrier: '安化物流',
				CarrierNum: '20180205001',
				ConsignNum: '20180205001',
				ConsigneeCompany: '云南磷化',
				Discharge: '云南省昭通市镇远县城李家沟',
				Consignee: '磷化',
				ArrivalDate: '2018:02:06 18:00',
				CargoTotal: '9.76吨/10方',
				ConsignerCompany: '安宁~~化工厂',
				DeliveryDate: '2018-02-06 18:00',
				Consigner: '李铁军',
				Dispatch: '云南省昆明市安宁市区山顶上化工厂',
				CargoName: 'R72/炸药',
				CreatedDate: '2018:02:06 18:00',
				CommissionDate: '2018:02:06 18:00',
				invoice: 'Y',
				receipt: ['1', '2'],
				Receivable: 'N',
				payable: 'N'
			},
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
		}
	},
	// computed: {
	// 	totalDriver() {
	// 		return Number(this.payMethods.driverCashAmount ? this.payMethods.driverCashAmount : 0) + Number(this.payMethods.driverCodAmount  ? this.payMethods.driverCodAmount : 0) + Number(this.payMethods.driverPorAmount  ? this.payMethods.driverPorAmount : 0) + Number(this.payMethods.driverMonthlyAmont  ? this.payMethods.driverMonthlyAmont : 0) + Number(this.payMethods.driverCosigneeAmount  ? this.payMethods.driverCosigneeAmount : 0)
	// 	},
	// 	totalSuperCargo() {
	// 		return Number(this.payMethods.superCargoCashAmount ? this.payMethods.superCargoCashAmount : 0) + Number(this.payMethods.superCargoCodAmount  ? this.payMethods.superCargoCodAmount : 0) + Number(this.payMethods.superCargoCorAmount  ? this.payMethods.superCargoCorAmount : 0) + Number(this.payMethods.superCargoMonthlyAmount  ? this.payMethods.superCargoMonthlyAmount : 0) + Number(this.payMethods.superCosigneeAmount  ? this.payMethods.superCosigneeAmount : 0)
	// 	},
	// },
	created() {
		this.getInfo()
	},
	methods: {
		getInfo(){
			let params = {
				dispatchOrderID: this.$route.query.dispatchOrderID,
			}
			request({
				url: '/biz/dispatchOrder/detail',
				params
			}).then(res => {
				console.log(res.data.data)
				this.dispatchBill = res.data.data
			})
		},
		load() {
			let data = {
				dispatchOrderID: this.$route.query.dispatchOrderID,
			}
			request({
				url: '/biz/dispatchOrder/load',
				method: 'post',
				data
			}).then(res => {
				Message.success('成功！')
				this.getInfo()
			})
		},
		confirm() {
			let data = {
				dispatchOrderID: this.$route.query.dispatchOrderID,
			}
			request({
				url: '/biz/dispatchOrder/confirm',
				method: 'post',
				data
			}).then(res => {
				Message.success('成功！')
				this.getInfo()
			})
		},
		cancel() {
			let data = {
				dispatchOrderID: this.$route.query.dispatchOrderID,
			}
			request({
				url: '/biz/dispatchOrder/cancel',
				method: 'post',
				data
			}).then(res => {
				Message.success('成功！')
				this.getInfo()
			})
		},
		updatePayInfo() {

		},
		back() {
			this.$router.go(-1)
		}
	}
}

</script>
<style lang="stylus" scoped>
.main-content
	background #ebebeb
	padding-top 20px
	.wf-card
		.header
			span
				font-size 12px
				margin-left 40px
				&.status
					position absolute
					margin-right 0
					right 20px
					top 15px
					height 24px
					line-height 24px
					color #fff
					padding 0 15px
					font-size 12px
					-moz-border-radius 4px
					     border-radius 4px
				&.status1
					background #F56C6C
				&.status2
					background #409EFF
				&.status3
					background #909399
		.wf-table
			.justify
				width 80px
				height 24px
				display inline-block
				vertical-align top
				padding-right 20px
				color #3582d0
				text-align justify
				&:after
					content '：'
					position relative
					top -24px
					padding-left 100%
					display inline-block
</style>
