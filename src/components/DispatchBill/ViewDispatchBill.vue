<template>
	<div class="main-content">
		<el-card class="box-card hasTit controlDetail">
			<div slot="header" class="clearfix">调度单编号 <span class="CarrierNum">{{$route.query.ControlsNum}}</span>
				 
				<span>创建时间：{{carrierbillInfo.CreatedDate}}</span>
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
							<p>{{carrierbillInfo.Dispatch}}</p>
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
							<p>{{carrierbillInfo.Carrier}}</p>
						</el-form-item>
					</el-form>
				</el-col>
				<el-col :span="8">
					<el-form label-width="120px">
						<el-form-item label="收货人">
							<p>{{carrierbillInfo.Carrier}}</p>
						</el-form-item>
					</el-form>
				</el-col>
				<el-col :span="8">
					<el-form label-width="120px">
						<el-form-item label="到货时间">
							<p>{{carrierbillInfo.Carrier}}</p>
						</el-form-item>
					</el-form>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="8">
					<el-form label-width="120px">
						<el-form-item label="运输方式">
							<p>{{carrierbillInfo.Carrier}}</p>
						</el-form-item>
					</el-form>
				</el-col>
				<el-col :span="6">
					<el-form label-width="120px">
						<el-form-item label="卸货地">
							<p>{{carrierbillInfo.Discharge}}</p>
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
					<el-table-column label="承运单编号" prop="CarrierNum" width="110" align="center">
					</el-table-column>
					<el-table-column label="货物规格" prop="CargoName">
					</el-table-column>
					<el-table-column label="货物名称" prop="CargoName">
					</el-table-column>
					<el-table-column label="配载量" prop="CargoTotal" align="center">
					</el-table-column>
					<el-table-column label="运载量" prop="" width="100" align="center">
					</el-table-column>
					<el-table-column label="签收量" prop="" width="100" align="center">
					</el-table-column>
				</el-table>
			</div>
			<div class="controlInfo">
				<p>司机：李司机 13529005327</p>
				<p>载具：云AG33652 6.2米厢式 10吨21方</p>
				<p>随车人员：赵押运员 13566778899</p>
			</div>
			<el-row>
				<div class="split-item">
					<span class="num">4</span>
					<span class="tit">付款信息</span>
				</div>
			</el-row>
			<table class="customertable">
				<thead>
					<tr>
						<th width="100" rowspan="2"></th>
						<th rowspan="2">现付</th>
						<th rowspan="2">到付</th>
						<th rowspan="2">回单付</th>
						<th rowspan="2">月结</th>
						<th rowspan="2">收方到货付</th>
						<th colspan="2">绕路费</th>
						<th rowspan="2">其他费用</th>
					</tr>
					<tr>
						<th>里程</th>
						<th>费用</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td class="txt-r">司机</td>
						<td>111</td>
						<td>111</td>
						<td>111</td>
						<td>111</td>
						<td>111</td>
						<td>111</td>
						<td>111</td>
						<td>111</td>
					</tr>
					<tr>
						<td class="txt-r">随车人员</td>
						<td>111</td>
						<td>111</td>
						<td>111</td>
						<td>111</td>
						<td>111</td>
						<td>111</td>
						<td>111</td>
						<td>111</td>
					</tr>
				</tbody>
				<tfoot>
					<tr>
						<td colspan="9" class="txt-r">合计</td>
					</tr>
				</tfoot>
			</table>
			<div class="control-footer">
				<el-button type="primary">装车</el-button>
				<el-button type="danger">作废</el-button>
				<el-button @click="back">返回</el-button>
			</div>
		</el-card>
	</div>
</template>
<script type="text/javascript">
import { Message } from 'element-ui'
export default {
	data() {
		return {
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
				payable: 'N'
			},
			tableData: [
				{
					CarrierNum: '20180205001',
					CargoTotal: '9.76吨/10方',
					CargoName:'R72/炸药'
				}
			]
		}
	},
	created() {

	},
	methods: {
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
.control-footer
	margin-top 20px
	text-align center
.base-info
	p
		line-height 30px
		margin 0
.customertable
	width 100%
	font-size 12px
	background #ebeef5
	border-spacing 1px
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
.controlInfo
	padding 20px 0
	p
		line-height 30px
		font-size 12px
		margin 0
		color #999

</style>
