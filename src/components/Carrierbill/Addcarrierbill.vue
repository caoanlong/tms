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
							<el-select style="width: 100%"  v-model="Shippers.companyName" filterable remote placeholder="请输入托运人关键词" :remote-method="getShippers" :loading="loading">
								<el-option v-for="item in Shippers" :key="item.Shippers" :label="item.companyName" :value="item.companyName">
								</el-option>
							</el-select>
						</el-form-item>
					</el-form>
				</el-col>
				<el-col :span="8">
					<el-form label-width="100px">
						<el-form-item label="承运人">
							<el-input placeholder="请输入承运人" v-model="carrierbillInfo.carrierrName"></el-input>
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
							<el-input placeholder="发货单位" v-model="carrierbillInfo.shipperCompanyName"></el-input>
						</el-form-item>
						<el-form-item label="发货人">
							<el-input placeholder="发货人" v-model="carrierbillInfo.shipperName"></el-input>
						</el-form-item>
						<el-form-item label="发货时间">
							<el-date-picker type="datetime" style="width:100%" placeholder="选择发货时间" v-model="carrierbillInfo.shipperDate" value-format="timestamp"></el-date-picker>
						</el-form-item>
					</el-form>
				</el-col>
				<el-col :span="8">
					<el-form label-width="100px">
						<el-form-item label="委托时间">
							无参数
						</el-form-item>
					</el-form>
				</el-col>
				<el-col :span="8">
					<el-form label-width="100px">
						<el-form-item label="发货单号">
							<el-input placeholder="发货单号" v-model="carrierbillInfo.shipperNo"></el-input>
						</el-form-item>
					</el-form>
				</el-col>
				<el-col :span="6">
					<el-form label-width="100px">
						<el-form-item label="发货地">
							<el-cascader style="width: 100%" :options="distData" v-model="carrierbillInfo.shipperAddressID">
							</el-cascader>
						</el-form-item>
					</el-form>
				</el-col>
				<el-col :span="10">
					<el-form label-width="20px">
						<el-form-item>
							<el-input placeholder="发货详细地址" v-model="carrierbillInfo.shipperDetailAddress"></el-input>
						</el-form-item>
					</el-form>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="8">
					<el-form label-width="100px">
						<el-form-item label="收货单位">
							<el-input placeholder="收货单位" v-model="carrierbillInfo.consigneeCompanyName"></el-input>
						</el-form-item>
					</el-form>
				</el-col>
				<el-col :span="8">
					<el-form label-width="100px">
						<el-form-item label="收货人">
							<el-input placeholder="收货人" v-model="carrierbillInfo.consigneeName"></el-input>
						</el-form-item>
					</el-form>
				</el-col>
				<el-col :span="8">
					<el-form label-width="100px">
						<el-form-item label="到货时间">
							<el-date-picker type="datetime" style="width:100%" placeholder="选择到货时间" v-model="carrierbillInfo.consigneeDate" value-format="timestamp"></el-date-picker>
						</el-form-item>
					</el-form>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="8">
					<el-form label-width="100px">
						<el-form-item label="运输方式">
							无参数
						</el-form-item>
					</el-form>
				</el-col>
				<el-col :span="6">
					<el-form label-width="100px">
						<el-form-item label="卸货地">
							<el-cascader style="width: 100%" :options="distData" v-model="carrierbillInfo.consigneeAddressID">
							</el-cascader>
						</el-form-item>
					</el-form>
				</el-col>
				<el-col :span="10">
					<el-form label-width="20px">
						<el-form-item>
							<el-input placeholder="卸货详细地址" v-model="carrierbillInfo.consigneeDetailAddress"></el-input>
						</el-form-item>
					</el-form>
				</el-col>
			</el-row>
			<el-row>
				<div class="split-item">
					<span class="num">3</span>
					<span class="tit">货物信息</span>
					<el-button type="text" icon="el-icon-plus" class="fr" @click="addItem">添加</el-button>
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
								<el-input placeholder="货物名称" style="width:150px" v-model="item.cargoName"></el-input>
								<el-input placeholder="货物规格" style="width:150px" v-model="item.cargoType"></el-input>
								<el-input placeholder="货物重量" style="width:150px" v-model="item.cargoWeight"><span slot="suffix">吨</span></el-input>
								<el-input placeholder="货物体积" style="width:150px" v-model="item.cargoVolume"><span slot="suffix">方</span></el-input>
								<el-input placeholder="货物数量" style="width:150px" v-model="item.cargoNum"><span slot="suffix">件</span></el-input>
								
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
							<el-radio-group v-model="carrierbillInfo.receiptMethod">
								<el-radio label="Y">按吨公里自动生成</el-radio>
								<el-radio label="N">手动输入</el-radio>
							</el-radio-group>
							<div v-show="carrierbillInfo.receiptMethod=='Y'" class="tips">从“这个单的发货地”到卸货地对外运距为“50公里”总价为90909009？</div>
							<div class="form-input">
								<el-form-item label="现付" label-width="40px" style="width:180px;display:inline-block;margin:10px 10px 0 0">
									<el-input placeholder="现付" v-model="carrierbillInfo.cashAmount"></el-input>
								</el-form-item>
								<el-form-item label="到付" label-width="40px" style="width:180px;display:inline-block;margin:10px 10px 0 0">
									<el-input placeholder="到付" v-model="carrierbillInfo.codAmount"></el-input>
								</el-form-item>
								<el-form-item label="回单结" label-width="60px" style="width:180px;display:inline-block;margin:10px 10px 0 0">
									<el-input placeholder="回单结" v-model="carrierbillInfo.porAmount"></el-input>
								</el-form-item>
								<el-form-item label="月结" label-width="40px" style="width:180px;display:inline-block;margin:10px 10px 0 0">
									<el-input placeholder="月结" v-model="carrierbillInfo.monthlyAmount"></el-input>
								</el-form-item>
								<el-form-item label="收货方付" label-width="70px" style="width:180px;display:inline-block;margin:10px 10px 0 0">
									<el-input placeholder="收货方付" v-model="carrierbillInfo.consigneeAmount"></el-input>
								</el-form-item>
							</div>
						</el-form-item>
						<el-form-item label="付款费用">
							<el-radio-group v-model="carrierbillInfo.paymentMethod">
								<el-radio label="Y">按吨公里自动生成</el-radio>
								<el-radio label="N">手动输入</el-radio>
							</el-radio-group>
							<div v-show="carrierbillInfo.paymentMethod=='Y'" class="tips">从“这单的发货地”到卸货地对内运距为“50公里”?</div>
						</el-form-item>
						<el-form-item label="发票">
							<el-radio-group v-model="carrierbillInfo.invoice">
								<el-radio label="Y">开发票</el-radio>
								<el-radio label="N">不开发票</el-radio>
							</el-radio-group>
						</el-form-item>
						<!-- <el-form-item label="回单要求">
							<el-checkbox-group v-model="carrierbillInfo.receipt" @change="checkreceipt">
								<el-checkbox label="1">货物托运单</el-checkbox>
								<el-checkbox label="2">发货单文件</el-checkbox>
								<el-checkbox label="3">不需要回单</el-checkbox>
							</el-checkbox-group>
						</el-form-item> -->
						
						<el-form-item label="回单要求" class="receipt">
							<span @click="selectReceipt(1)"><svg-icon icon-class="ic_checkbox_false"></svg-icon>货物托运单</span>
							<span @click="selectReceipt(2)"><svg-icon icon-class="ic_checkbox_false"></svg-icon>发货单文件</span>
							<span @click="selectReceipt(3)"><svg-icon icon-class="ic_checkbox_false"></svg-icon>不需要回单</span>
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
import request from '../../common/request'
export default {
	data() {
		return {
			state1: '',
			state2: '',
			distData: regionData,
			selectedAreas: [],
			loading: false,
			Shippers:'',
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
		getShippers(realName) {
			let params = {
				type: 'Consignor',
			}
			request({
				url: '/customer/findList',
				params
			}).then(res => {
				console.log(res.data)
				this.Shippers = res.data.data.records
			})
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
			this.cargoInfo.splice(index,1)
		},
		selectReceipt(e){
			console.log(this.carrierbillInfo.receipt)
			if (this.carrierbillInfo.receipt.includes(e)) {
				this.carrierbillInfo.receipt.splice(this.carrierbillInfo.receipt.indexOf(e), 1)
			} else {
				this.carrierbillInfo.receipt.push(e)
			}
			// if(e==3){
			// 	this.carrierbillInfo.receipt = ['3']
			// } else {
			// 	this.carrierbillInfo.receipt.splice(this.carrierbillInfo.receipt.indexOf('3'), 1)
			// }
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
