<template>
	<div class="main-content">
		<el-card class="box-card hasTit">
			<div slot="header" class="clearfix">添加承运单</div>
			<el-row>
				<div class="split-item">
					<span class="num">1</span>
					<span class="tit">基本信息</span>
				</div>
			</el-row>
			<el-row>
				<el-col :span="8">
					<el-form label-width="100px">
						<el-form-item label="托运人">
							<el-input placeholder="托运人" v-model="carrierbillInfo.Consignor"></el-input>
						</el-form-item>
					</el-form>
				</el-col>
				<el-col :span="8">
					<el-form label-width="100px">
						<el-form-item label="承运人">
							<el-input placeholder="承运人" v-model="carrierbillInfo.Carrier"></el-input>
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
					<el-form label-width="100px">
						<el-form-item label="发货单位">
							<el-input placeholder="发货单位" v-model="carrierbillInfo.ConsignerCompany"></el-input>
						</el-form-item>
						<el-form-item label="发货人">
							<el-input placeholder="发货人" v-model="carrierbillInfo.Consigner"></el-input>
						</el-form-item>
						<el-form-item label="发货时间">
							<el-date-picker type="datetime" style="width:100%" placeholder="选择发货时间" v-model="carrierbillInfo.DeliveryDate"></el-date-picker>
						</el-form-item>
					</el-form>
				</el-col>
				<el-col :span="8">
					<el-form label-width="100px">
						<el-form-item label="委托时间">
							<el-date-picker type="datetime" style="width:100%" placeholder="选择委托时间" v-model="carrierbillInfo.CommissionDate"></el-date-picker>
						</el-form-item>
					</el-form>
				</el-col>
				<el-col :span="8">
					<el-form label-width="100px">
						<el-form-item label="发货单号">
							<el-input placeholder="发货单号" v-model="carrierbillInfo.ConsignNum"></el-input>
						</el-form-item>
					</el-form>
				</el-col>
				<el-col :span="6">
					<el-form label-width="100px">
						<el-form-item label="发货地">
							<el-cascader style="width: 100%" :options="distData" v-model="selectedAreas">
							</el-cascader>
						</el-form-item>
					</el-form>
				</el-col>
				<el-col :span="10">
					<el-form label-width="20px">
						<el-form-item>
							<el-input placeholder="发货详细地址" v-model="carrierbillInfo.Dispatch"></el-input>
						</el-form-item>
					</el-form>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="8">
					<el-form label-width="100px">
						<el-form-item label="收货单位">
							<el-input placeholder="收货单位" v-model="carrierbillInfo.Consigner"></el-input>
						</el-form-item>
					</el-form>
				</el-col>
				<el-col :span="8">
					<el-form label-width="100px">
						<el-form-item label="收货人">
							<el-input placeholder="收货人" v-model="carrierbillInfo.Consignee"></el-input>
						</el-form-item>
					</el-form>
				</el-col>
				<el-col :span="8">
					<el-form label-width="100px">
						<el-form-item label="到货时间">
							<el-date-picker type="datetime" style="width:100%" placeholder="选择到货时间" v-model="carrierbillInfo.ArrivalDate"></el-date-picker>
						</el-form-item>
					</el-form>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="8">
					<el-form label-width="100px">
						<el-form-item label="运输方式">
							<el-select v-model="transType" placeholder="请选择" style="width:100%">
								<el-option v-for="op in transTypeOption" :key="op.value" :label="op.label" :value="op.value"></el-option>
							</el-select>
						</el-form-item>
					</el-form>
				</el-col>
				<el-col :span="6">
					<el-form label-width="100px">
						<el-form-item label="卸货地">
							<el-cascader style="width: 100%" :options="distData" v-model="selectedAreas">
							</el-cascader>
						</el-form-item>
					</el-form>
				</el-col>
				<el-col :span="10">
					<el-form label-width="20px">
						<el-form-item>
							<el-input placeholder="卸货详细地址" v-model="carrierbillInfo.Discharge"></el-input>
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
			<el-row>
				<el-col :span="24">
					<el-form label-width="100px">
						<el-form-item label="货物信息">
							<div class="cargoItem" v-for="(item,index) in cargoInfo">
								<el-select v-model="item.type" placeholder="请选择" style="width:100px">
									<el-option label="重货" value="重货"></el-option>
									<el-option label="轻货" value="轻货"></el-option>
								</el-select>
								<el-input placeholder="货物名称" style="width:150px"></el-input>
								<el-input placeholder="货物规格" style="width:150px"></el-input>
								<el-input placeholder="货物数量" style="width:150px"><span slot="suffix">吨</span></el-input>
								<el-input placeholder="货物数量" style="width:150px"><span slot="suffix">方</span></el-input>
								<el-input placeholder="货物数量" style="width:150px"><span slot="suffix">件</span></el-input>
								<el-button type="text" icon="el-icon-plus" @click="addItem">添加</el-button>
								<el-button type="text" icon="el-icon-delete" style="color:#F56C6C" @click="removeItem(index)" v-show="cargoInfo.length>1">删除</el-button>
							</div>
						</el-form-item>
					</el-form>
				</el-col>
			</el-row>
			<el-row>
				<div class="split-item">
					<span class="num">4</span>
					<span class="tit">应款金额</span>
				</div>
			</el-row>
			<el-row>
				<el-col :span="24">
					<el-form label-width="100px">
						<el-form-item label="承运单应收款">
							<el-radio-group v-model="carrierbillInfo.Receivable">
								<el-radio label="Y">按吨公里自动生成</el-radio>
								<el-radio label="N">手动输入</el-radio>
							</el-radio-group>
							<div v-show="carrierbillInfo.Receivable=='Y'" class="tips">从“这个单的发货地”到卸货地对外运距为“50公里”总价为90909009？</div>
							<div class="form-input">
								<el-form-item label="现付" label-width="40px" style="width:180px;display:inline-block;margin:10px 10px 0 0">
									<el-input placeholder="现付"></el-input>
								</el-form-item>
								<el-form-item label="到付" label-width="40px" style="width:180px;display:inline-block;margin:10px 10px 0 0">
									<el-input placeholder="到付"></el-input>
								</el-form-item>
								<el-form-item label="回单结" label-width="60px" style="width:180px;display:inline-block;margin:10px 10px 0 0">
									<el-input placeholder="回单结"></el-input>
								</el-form-item>
								<el-form-item label="月结" label-width="40px" style="width:180px;display:inline-block;margin:10px 10px 0 0">
									<el-input placeholder="月结"></el-input>
								</el-form-item>
								<el-form-item label="收货方付" label-width="70px" style="width:180px;display:inline-block;margin:10px 10px 0 0">
									<el-input placeholder="收货方付"></el-input>
								</el-form-item>
							</div>
						</el-form-item>
						<el-form-item label="付款费用">
							<el-radio-group v-model="carrierbillInfo.payable">
								<el-radio label="Y">按吨公里自动生成</el-radio>
								<el-radio label="N">手动输入</el-radio>
							</el-radio-group>
							<div v-show="carrierbillInfo.payable=='Y'" class="tips">从“这单的发货地”到卸货地对内运距为“50公里”?</div>
						</el-form-item>
						<el-form-item label="发票">
							<el-radio-group v-model="carrierbillInfo.invoice">
								<el-radio label="Y">开发票</el-radio>
								<el-radio label="N">不开发票</el-radio>
							</el-radio-group>
						</el-form-item>
						<el-form-item label="回单要求">
							<el-checkbox-group v-model="carrierbillInfo.receipt">
								<el-checkbox label="1">货物托运单</el-checkbox>
								<el-checkbox label="2">发货单文件</el-checkbox>
								<el-checkbox label="3">不需要回单</el-checkbox>
							</el-checkbox-group>
						</el-form-item>
					</el-form>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="24">
					<el-form label-width="0">
						<el-form-item align="center">
							<el-button type="primary">保存</el-button>
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
				Status: '',
				Consignor: '',
				Carrier: '',
				CarrierNum:'',
				ConsignNum:'',
				ConsigneeCompany:'',
				Discharge:'',
				Consignee:'',
				ArrivalDate:'',
				CargoTotal:'',
				ConsignerCompany:'',
				DeliveryDate:'',
				Consigner:'',
				Dispatch:'',
				CargoName:'',
				CreatedDate:'',
				CommissionDate:'',
				invoice:'N',
				receipt: ['3'],
				Receivable:'N',
				payable:'N'
			},
			cargoInfo: [{
				'type': '',
				'name': '',
				'rule': '',
				'weight': '',
				'volumn': '',
				'num': ''
			}],
			transType:'',
			transTypeOption:[
				{
					label:'海上运输',
					value:'海上运输'
				},
				{
					label:'铁路运输',
					value:'铁路运输'
				},
				{
					label:'公路运输',
					value:'公路运输'
				},
				{
					label:'航空运输',
					value:'航空运输'
				},
				{
					label:'邮件运输',
					value:'邮件运输'
				},
				{
					label:'多式联运',
					value:'多式联运'
				},
				{
					label:'固定设施运输',
					value:'固定设施运输'
				},
				{
					label:'内河运输',
					value:'内河运输'
				},
				{
					label:'其他',
					value:'其他'
				}
			]
		}
	},
	created() {

	},
	methods: {
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
			this.cargoInfo.splice(index,1)
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
.cargoItem
	padding-bottom 10px
	margin-bottom 10px
	border-bottom 1px solid #ebeef5
	.el-select
	.el-input
		margin 0 10px 10px 0
</style>
