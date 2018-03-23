<template>
	<div class="main-content">
		<div class="wf-card">
			<div class="header clearfix">承运单编号：{{$route.query.CarrierNum}}<span>发货单号：{{carrierbillInfo.ConsignNum}}</span><span>创建时间：{{carrierbillInfo.CreatedDate}}</span><span>委托时间：{{carrierbillInfo.CommissionDate}}</span>
				<span class="status status1" v-if="carrierbillInfo.Status =='待执行'">待执行</span>
				<span class="status status2" v-else-if="carrierbillInfo.Status =='执行中'">执行中</span>
				<span class="status status3" v-else-if="carrierbillInfo.Status =='已签收'">已签收</span>
			</div>
			<table class="wf-table">
				<caption>承运信息</caption>
				<tr>
					<td width="50%"><span class="justify">托运人</span>{{carrierbillInfo.Consignor}}</td>
					<td width="50%"><span class="justify">承运人</span>{{carrierbillInfo.Carrier}}</td>
				</tr>
			</table>
			<table class="wf-table">
				<caption>收发货信息</caption>
				<tr>
					<td width="50%"><span class="justify">发货单位</span>{{carrierbillInfo.ConsignerCompany}}</td>
					<td width="50%"><span class="justify">收货单位</span>{{carrierbillInfo.ConsigneeCompany}}</td>
				</tr>
				<tr>
					<td><span class="justify">发货人</span>{{carrierbillInfo.Consigner}}</td>
					<td><span class="justify">收货人</span>{{carrierbillInfo.Consignee}}</td>
				</tr>
				<tr>
					<td><span class="justify">联系方式</span>{{carrierbillInfo.Consigner}}</td>
					<td><span class="justify">联系方式</span>{{carrierbillInfo.Consignee}}</td>
				</tr>
				<tr>
					<td><span class="justify">发货地</span>{{carrierbillInfo.Dispatch}}</td>
					<td><span class="justify">收货地</span>{{carrierbillInfo.Discharge}}</td>
				</tr>
				<tr>
					<td><span class="justify">发货时间</span>{{carrierbillInfo.DeliveryDate}}</td>
					<td><span class="justify">到货时间</span>{{carrierbillInfo.ArrivalDate}}</td>
				</tr>
			</table>
			<table class="wf-table">
				<caption>货物信息</caption>
				<tr>
					<td colspan="6">
						<span class="labels">货物类型：</span>重货
						<span class="labels" style="margin-left:40px">运输方式：</span>{{carrierbillInfo.transType}}
					</td>
				</tr>
				<tr>
					<th>货物规格</th>
					<th>货物名称</th>
					<th>数量(件)</th>
					<th>体积(方)</th>
					<th>重量(吨)</th>
					<th>剩余货量</th>
				</tr>
				<tr class="is-center">
					<td>R72</td>
					<td>炸药</td>
					<td>0</td>
					<td>3</td>
					<td>9.76</td>
					<td>9.76吨</td>
				</tr>
				<tr class="total is-center">
					<td>合计</td>
					<td></td>
					<td>0</td>
					<td>3</td>
					<td>9.76</td>
					<td>3方/9.76吨</td>
				</tr>
			</table>
			<table class="wf-table">
				<caption>应收款</caption>
				<tr>
					<th>现付</th>
					<th>到付</th>
					<th>回单付</th>
					<th>月结</th>
					<th>收方到货付</th>
					<th>合计</th>
					<th>其他</th>
					<th>备注</th>
				</tr>
				<tr class="is-center">
					<td></td>
					<td>2000.00元</td>
					<td></td>
					<td>2000.00元</td>
					<td></td>
					<td>4000.00元</td>
					<td></td>
					<td>人民币</td>
				</tr>
				<tr>
					<td colspan="8">
						<span class="labels">发票：</span>{{carrierbillInfo.invoice=='Y'?'开发票':'不开发票'}}
						<span class="labels" style="margin-left:40px">回单要求：</span>{{carrierbillInfo.receipt}}
						<span class="labels fr">承运单应收总价：</span>
					</td>
				</tr>
			</table>
			<table class="wf-table">
				<caption>调度单</caption>
				<tr>
					<th>调度单号</th>
					<th>状态</th>
					<th>车辆</th>
					<th>货物规格/名称</th>
					<th>数量(件)</th>
					<th>体积(方)</th>
					<th>重量(吨)</th>
					<th>付款金额</th>
				</tr>
				<tr class="is-center">
					<td>20180220001</td>
					<td>已装运</td>
					<td>云A-G3365</td>
					<td>R72/炸药</td>
					<td></td>
					<td></td>
					<td>9.76</td>
					<td>月结1800.00元</td>
				</tr>
			</table>
			<div class="wf-footer clearfix">
				<div class="btn-group fl">
					<button type="button" class="wf-btn btn-success" @click="EditCarrierbill">
						<svg-icon icon-class="edit"></svg-icon>修改</button>
					<button type="button" class="wf-btn btn-primary" @click="AddDispatchBill">
						<svg-icon icon-class="dispatchbill"></svg-icon>调度</button>
					<button type="button" class="wf-btn btn-warning" @click="AddDispatchBill">
						<svg-icon icon-class="money1"></svg-icon>调整应收款</button>
				</div>
				<div class="btn-group fr">
					<button type="button" class="wf-btn btn-danger plain">
						<svg-icon icon-class="delete"></svg-icon>删除</button>
					<button type="button" class="wf-btn btn-default" @click="back">
						<svg-icon icon-class="back"></svg-icon>返回</button>
				</div>
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
import { Message } from 'element-ui'
import { regionData } from 'element-china-area-data'
export default {
	data() {
		return {
			distData: regionData,
			selectedAreas: [],
			carrierbillInfo: {
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
				payable: 'N',
				transType: '公路运输'
			},
			cargoInfo: [{
				'type': '',
				'name': '',
				'rule': '',
				'weight': '',
				'volumn': '',
				'num': ''
			}],
			transType: '',
			transTypeOption: [{
					label: '海上运输',
					value: '海上运输'
				},
				{
					label: '铁路运输',
					value: '铁路运输'
				},
				{
					label: '公路运输',
					value: '公路运输'
				},
				{
					label: '航空运输',
					value: '航空运输'
				},
				{
					label: '邮件运输',
					value: '邮件运输'
				},
				{
					label: '多式联运',
					value: '多式联运'
				},
				{
					label: '固定设施运输',
					value: '固定设施运输'
				},
				{
					label: '内河运输',
					value: '内河运输'
				},
				{
					label: '其他',
					value: '其他'
				}
			]
		}
	},
	created() {

	},
	methods: {
		AddDispatchBill() {
			this.$router.push({ name: 'adddispatchbill', query: { CarrierNum: this.$route.query.CarrierNum } })
		},
		EditCarrierbill() {
			this.$router.push({ name: 'editcarrierbill', query: { CarrierNum: this.$route.query.CarrierNum } })
		},
		addItem() {
			this.cargoInfo.push({
				'type': '',
				'name': '',
				'rule': '',
				'weight': '',
				'volumn': '',
				'num': ''
			})
		},
		removeItem(index) {
			this.cargoInfo.splice(index, 1)
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