<template>
	<div class="main-content">
		<el-card class="box-card hasTit">
			<div slot="header" class="clearfix">新的调度
				<el-button type="text" icon="el-icon-plus" class="addBtn" @click="dialogTableVisible = true" v-if="stepActive == 0">添加承运单</el-button>
			</div>
			<el-steps :active="stepActive" finish-status="success" simple style="margin-bottom:20px;" class="stepBar">
				<el-step title="选择待运货物"></el-step>
				<el-step title="选择载具和司机及押运人"></el-step>
				<el-step title="设置运费及付款方式"></el-step>
				<el-step title="确认调度信息"></el-step>
			</el-steps>
			<Step1 v-show="stepActive == 0" :carrierBills="selectedCarrierBills" @nextStep="nextStep"/>
			<Step2 v-show="stepActive == 1" :startLoad="stepActive == 1" @nextStep="nextStep" @prevStep="prevStep"/>
			<Step3 v-show="stepActive == 2" @nextStep="nextStep" @prevStep="prevStep"/>
			<div v-show="stepActive == 3" class="step step4">
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
								<p></p>
							</el-form-item>
							<el-form-item label="发货人">
								<p></p>
							</el-form-item>
							<el-form-item label="发货时间">
								<p></p>
							</el-form-item>
						</el-form>
					</el-col>
					<el-col :span="8">
						<el-form label-width="120px">
							<el-form-item label="委托时间">
								<p></p>
							</el-form-item>
						</el-form>
					</el-col>
					<el-col :span="8">
						<el-form label-width="120px">
							<el-form-item label="发货单号">
								<p></p>
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
								<p></p>
							</el-form-item>
						</el-form>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="8">
						<el-form label-width="120px">
							<el-form-item label="收货单位">
								<p></p>
							</el-form-item>
						</el-form>
					</el-col>
					<el-col :span="8">
						<el-form label-width="120px">
							<el-form-item label="收货人">
								<p></p>
							</el-form-item>
						</el-form>
					</el-col>
					<el-col :span="8">
						<el-form label-width="120px">
							<el-form-item label="到货时间">
								<p></p>
							</el-form-item>
						</el-form>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="8">
						<el-form label-width="120px">
							<el-form-item label="运输方式">
								<p></p>
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
								<p></p>
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
				<div class="controlInfo">
					<p>司机：李司机 13529005327</p>
					<p>载具：云AG33652  6.2米厢式  10吨21方</p>
					<p>随车人员：赵押运员  13566778899</p>
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
				<div class="step-footer">
					<el-button @click="prevStep(2)">上一步</el-button>
					<el-button type="primary" @click="save">确认</el-button>
					<el-button @click="back">取消</el-button>
				</div>
			</div>
		</el-card>
		<AddCarrierBillDialog :dialogTableVisible="dialogTableVisible" @selectCarrierBills="handSelectCarrierBills"/>
	</div>
</template>
<script type="text/javascript">
import { Message } from 'element-ui'
import request from '../../common/request'
import Step1 from './Common/Step1'
import Step2 from './Common/Step2'
import Step3 from './Common/Step3'
import AddCarrierBillDialog from './Common/AddCarrierBillDialog'
export default {
	data() {
		return {
			stepActive: 0,
			dialogTableVisible: false,
			carrierbillInfo: [{
				CarrierNum: '20180205001',
				Discharge: '云南省昭通市镇远县城李家沟',
				ArrivalDate: '2018:02:06 18:00',
				Dispatch: '云南省昆明市安宁市区山顶上化工厂',
			}],
			tableData: [
				{
					CarrierNum: '20180205001',
					CargoTotal: '9.76吨/10方',
					CargoName:'R72/炸药'
				}
			],
			selectedCarrierBills: []  // 选择的承运单
		}
	},
	created() {
		let carrierOrderID = this.$route.query.carrierOrderID
		if (carrierOrderID) {
			this.handSelectCarrierBills(carrierOrderID.split(','))
		}
	},
	methods: {
		nextStep(x, data, data1) {
			if (x == 1) {
				console.log(data)
			} else if (x == 2) {
				console.log(data, data1)
			}
			this.stepActive = x
		},
		prevStep(x) {
			this.stepActive = x
		},
		save() {
			this.$router.push({ name: 'dispatchbills' })
		},
		handSelectCarrierBills(data) {
			let selectedCarrierBillIDs = data
			for (let i = 0; i < data.length; i++) {
				this.getDetail(data[i])
			}
		},
		// 单个承运单详情
		getDetail(carrierOrderID) {
			let params = {
				carrierOrderID
			}
			request({
				url: '/biz/carrierOrder/detail',
				params
			}).then(res => {
				this.selectedCarrierBills.push(res.data.data)
			})
		},
		back() {
			this.$router.go(-1)
		},
	},
	components: {
		Step1,
		Step2,
		Step3,
		AddCarrierBillDialog
	}

}

</script>
<style lang="stylus" scoped>
	.el-card__header
		.addBtn
			position absolute
			margin-right 0
			right 20px
			top 8px
	.tips
		color #909399
	.step-footer
		margin-top 20px
		text-align center
	.table
		margin-top -1px
		&:first-child
			margin-top 0
	.total-table
		padding-left 10px
		height 40px
		border 1px solid #ebeef5
		border-top none
		line-height 40px
		color #409EFF
		span
			width 180px
			display inline-block
			padding 0 25px
			border-left 1px solid #ebeef5
		b
			padding-right 10px
	.step
		.split-item
			padding 10px 0
			margin-bottom 20px
			border-bottom 1px solid #ebeef5
			.tit
				padding-left 0
	.control-info
		font-size 14px
		border-bottom 1px solid #ebeef5
		padding-bottom 20px
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