<template>
	<div class="main-content">
		<el-card class="box-card hasTit">
			<div slot="header" class="clearfix">承运单编号 <span class="CarrierNum">{{$route.query.CarrierNum}}</span><span>创建时间：{{carrierbillInfo.CreatedDate}}</span><span>发货单号：{{carrierbillInfo.ConsignNum}}</span><span>委托时间：{{carrierbillInfo.CommissionDate}}</span>
				<span class="status status1" v-if="carrierbillInfo.Status =='待执行'">待执行</span>
				<span class="status status2" v-else-if="carrierbillInfo.Status =='执行中'">执行中</span>
				<span class="status status3" v-else-if="carrierbillInfo.Status =='已签收'">已签收</span>
			</div>
			<el-row>
				<div class="split-item">
					<span class="num">1</span>
					<span class="tit">基本信息</span>
				</div>
			</el-row>
			<el-row>
				<el-col :span="8">
					<el-form label-width="120px">
						<el-form-item label="托运人">
							<p>{{carrierbillInfo.Consignor}}</p>
						</el-form-item>
					</el-form>
				</el-col>
				<el-col :span="8">
					<el-form label-width="120px">
						<el-form-item label="承运人">
							<p>{{carrierbillInfo.Carrier}}</p>
						</el-form-item>
					</el-form>
				</el-col>
			</el-row>
			<el-row>
				<div class="split-item">
					<span class="num">2</span>
					<span class="tit">收发货信息</span>
				</div>
			</el-row>
			<el-row>
				<el-col :span="8">
					<el-form label-width="120px">
						<el-form-item label="发货单位">
							<p>{{carrierbillInfo.ConsignerCompany}}</p>
						</el-form-item>
						<el-form-item label="发货人">
							<p>{{carrierbillInfo.Consigner}}</p>
						</el-form-item>
						<el-form-item label="发货时间">
							<p>{{carrierbillInfo.DeliveryDate}}</p>
						</el-form-item>
					</el-form>
				</el-col>
				<el-col :span="8">
					<el-form label-width="120px">
						<el-form-item label="委托时间">
							<p>{{carrierbillInfo.CommissionDate}}</p>
						</el-form-item>
					</el-form>
				</el-col>
				<el-col :span="8">
					<el-form label-width="120px">
						<el-form-item label="发货单号">
							<p>{{carrierbillInfo.ConsignNum}}</p>
						</el-form-item>
					</el-form>
				</el-col>
				<el-col :span="6">
					<el-form label-width="120px">
						<el-form-item label="发货地">
							<p></p>
						</el-form-item>
					</el-form>
				</el-col>
				<el-col :span="10">
					<el-form label-width="20px">
						<el-form-item>
							<p>{{carrierbillInfo.Dispatch}}</p>
						</el-form-item>
					</el-form>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="8">
					<el-form label-width="120px">
						<el-form-item label="收货单位">
							<p>{{carrierbillInfo.Consigner}}</p>
						</el-form-item>
					</el-form>
				</el-col>
				<el-col :span="8">
					<el-form label-width="120px">
						<el-form-item label="收货人">
							<p>{{carrierbillInfo.Consignee}}</p>
						</el-form-item>
					</el-form>
				</el-col>
				<el-col :span="8">
					<el-form label-width="120px">
						<el-form-item label="到货时间">
							<p>{{carrierbillInfo.ArrivalDate}}</p>
						</el-form-item>
					</el-form>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="8">
					<el-form label-width="120px">
						<el-form-item label="运输方式">
							<p>{{carrierbillInfo.transType}}</p>
						</el-form-item>
					</el-form>
				</el-col>
				<el-col :span="6">
					<el-form label-width="120px">
						<el-form-item label="卸货地">
							<p></p>
						</el-form-item>
					</el-form>
				</el-col>
				<el-col :span="10">
					<el-form label-width="20px">
						<el-form-item>
							<p>{{carrierbillInfo.Discharge}}</p>
						</el-form-item>
					</el-form>
				</el-col>
			</el-row>
			<el-row>
				<div class="split-item">
					<span class="num">3</span>
					<span class="tit">货物信息</span>
				</div>
			</el-row>
			<div class="table">
				<el-table :data="tableData" border style="width: 100%" size="mini">
					<el-table-column type="index" label="货物序号" width="80" align="center"></el-table-column>
					<el-table-column label="承运单编号" prop="CarrierNum"  width="110" align="center">
					</el-table-column>
					<el-table-column label="货物规格" prop="CargoName">
					</el-table-column>
					<el-table-column label="货物名称" prop="CargoName">
					</el-table-column>
					<el-table-column label="配载量" prop="CargoTotal" align="center">
					</el-table-column>
					<el-table-column label="运载量" prop=""  width="100" align="center">
					</el-table-column>
					<el-table-column label="签收量" prop=""  width="100" align="center">
					</el-table-column>
				</el-table>
			</div>
			<el-row>
				<div class="split-item">
					<span class="num">4</span>
					<span class="tit">应款金额</span>
				</div>
			</el-row>
			<el-row>
				<el-col :span="24">
					<el-form label-width="120px">
						<el-form-item label="承运单应收款">
							<div class="form-input">
								<el-form-item label-width="40px" label="现付" style="width:180px;display:inline-block;vertical-align:top">
									<p>11</p>
								</el-form-item>
								<el-form-item label-width="40px" label="到付" style="width:180px;display:inline-block;vertical-align:top">
									<p></p>
								</el-form-item>
								<el-form-item label-width="60px" label="回单结" style="width:180px;display:inline-block;vertical-align:top">
									<p></p>
								</el-form-item>
								<el-form-item label-width="40px" label="月结" style="width:180px;display:inline-block;vertical-align:top">
									<p></p>
								</el-form-item>
								<el-form-item label-width="70px" label="收货方付" style="width:180px;display:inline-block;vertical-align:top">
									<p></p>
								</el-form-item>
							</div>
						</el-form-item>
					</el-form>
				</el-col>
				<el-col :span="8">
					<el-form label-width="120px">
						<el-form-item label="付款费用">
							<p></p>
						</el-form-item>
					</el-form>
				</el-col>
				<el-col :span="8">
					<el-form label-width="120px">
						<el-form-item label="发票">
							<p>{{carrierbillInfo.invoice=='Y'?'开发票':'不开发票'}}</p>
						</el-form-item>
					</el-form>
				</el-col>
				<el-col :span="8">
					<el-form label-width="120px">
						<el-form-item label="回单要求">
							<p><span v-for="item in carrierbillInfo.receipt">
								<span v-if="item==1">货物托运单</span>
								<span v-else-if="item==2">发货单文件</span>
								<span v-else>不需要回单</span>
								</span>
							</p>
						</el-form-item>
					</el-form>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="24">
					<el-form label-width="0">
						<el-form-item align="center">
							<el-button type="primary" @click="EditCarrierbill">修改</el-button>
							<el-button type="success" @click="AddDispatchBill">调度</el-button>
							<el-button type="danger">删除</el-button>
							<el-button @click="back">返回</el-button>
						</el-form-item>
					</el-form>
				</el-col>
			</el-row>
		</el-card>
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
.el-card__header
	span
		margin-right 40px
		font-size 14px
		color #909399
		&.CarrierNum
			font-weight bold
			margin-left 20px
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
			border-radius 4px
			&.status1
				background #F56C6C
			&.status2
				background #409EFF
			&.status3
				background #909399
.tips
	color #909399
.el-form-item__content
	p
		margin 0
		border 1px solid #fff
		border-bottom-color #dcdfe6
		padding 0 15px
		height 40px
		font-family 'sans-serif'
		line-height 40px
		color #999
		font-size 12px
		span
			margin-right 10px
.table
	margin-bottom 20px
</style>
