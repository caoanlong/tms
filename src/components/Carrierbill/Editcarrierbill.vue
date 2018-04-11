<template>
	<div class="main-content">
		<div class="wf-card hasTit">
			<div class="header clearfix">承运单编号：{{carrierOrder.carrierOrderID}}<span>发货单号：{{carrierOrder.shipperNo}}</span><span>创建时间：{{carrierOrder.createTime | getdatefromtimestamp()}}</span><span>委托时间：接口无此参数</span>
				<span class="status status1" v-if="carrierOrder.status=='Commited'">待执行</span>
				<span class="status status2" v-else-if="carrierOrder.status=='Running'">执行中</span>
				<span class="status status3" v-else-if="carrierOrder.status=='Signed'">到达签收</span>
				<span class="status status1" v-else-if="carrierOrder.status=='Closed'">关闭</span>
				<span class="status status1" v-else-if="carrierOrder.status=='Canceled'">作废</span>
			</div>
			<el-form label-width="100px">
				<el-row>
					<div class="split-item">
						<span class="num">1</span>
						<span class="tit">基本信息</span>
					</div>
				</el-row>
				<el-row>
					<el-col :span="8">
						<el-form-item label="托运人">
							<el-input placeholder="承运人" v-model="Consignor.companyName"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="承运人">
							<el-input placeholder="承运人" v-model="carrierOrder.carrierrName"></el-input>
						</el-form-item>
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
						<el-form-item label="发货单位">
							<el-input placeholder="发货单位" v-model="carrierOrder.shipperCompanyName"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="发货单号">
							<el-input placeholder="发货单号" v-model="carrierOrder.shipperNo"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="8">
						<el-form-item label="发货人">
							<el-input placeholder="发货人" v-model="carrierOrder.shipperName"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="发货人电话">
							<el-input placeholder="发货人电话" v-model="carrierOrder.shipperPhone"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="发货时间">
							<el-date-picker style="width:100%" placeholder="选择发货时间" v-model="carrierOrder.shipperDate"></el-date-picker>
						</el-form-item>
					</el-col>

					<el-col :span="8">
						<el-form-item label="发货地">
							<DistPicker @selectChange="handleSelectedArea" class="normal" :selected="selectedArea" />
						</el-form-item>
					</el-col>
					
					<el-col :span="8">
						<el-form-item label-width="20px">
							<el-input placeholder="发货详细地址" v-model="carrierOrder.shipperDetailAddress"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row style="margin-top:20px">
					<el-col :span="8">
						<el-form-item label="收货单位">
							<el-input placeholder="收货单位" v-model="carrierOrder.consigneeCompanyName"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="8">
						<el-form-item label="收货人">
							<el-input placeholder="收货人" v-model="carrierOrder.consigneeName"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="收货人电话">
							<el-input placeholder="收货人电话" v-model="carrierOrder.consigneePhone"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="到货时间">
							<el-date-picker style="width:100%" placeholder="选择到货时间" v-model="carrierOrder.consigneeDate"></el-date-picker>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="8">
						<el-form-item label="卸货地">
							<DistPicker @selectChange="handleSelectedArea1" class="normal" :selected="selectedArea1" />
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label-width="20px">
							<el-input placeholder="卸货详细地址" v-model="carrierOrder.consigneeDetailAddress"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row style="margin-top:20px">
					<el-col :span="8">
						<el-form-item label="运输方式">
							<el-select v-model="transType" placeholder="请选择" style="width:100%">
								<el-option v-for="op in transTypeOption" :key="op.value" :label="op.label" :value="op.value"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="委托时间">
							<el-date-picker style="width:100%" placeholder="后台现在没参数" value-format="timestamp"></el-date-picker>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<div class="split-item">
						<span class="num">3</span>
						<span class="tit">货物信息</span>
						<el-button type="text" icon="el-icon-plus" @click="addItem" class="fr">添加货物</el-button>
					</div>
				</el-row>
				<el-row>
					<el-col :span="24">
						<el-form-item label="货物信息">
							<div class="cargoItem" v-for="(item,index) in carrierCargo">
								<el-select v-model="item.weightType" placeholder="请选择" style="width:100px">
									<el-option label="重货" value="Heavy"></el-option>
									<el-option label="轻货" value="Light"></el-option>
									<el-option label="轻货" value="HeavyAndLight"></el-option>
								</el-select>
								<el-input placeholder="货物名称" style="width:150px" v-model="item.cargoName"></el-input>
								<el-input placeholder="货物规格" style="width:150px" v-model="item.cargoType"></el-input>
								<el-input placeholder="货物重量" style="width:150px" v-model="item.cargoWeight"><span slot="suffix">吨</span></el-input>
								<el-input placeholder="货物体积" style="width:150px" v-model="item.cargoVolume"><span slot="suffix">方</span></el-input>
								<el-input placeholder="货物数量" style="width:150px" v-model="item.cargoNum"><span slot="suffix">件</span></el-input>
								<el-button type="text" icon="el-icon-delete" style="color:#F56C6C" @click="removeItem(index)" v-show="carrierCargo.length>1">删除</el-button>
							</div>
						</el-form-item>
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
						<el-form-item label="承运单应收款">
							<el-radio-group v-model="carrierOrder.receiptMethod">
								<el-radio label="TKM">按吨公里自动生成</el-radio>
								<el-radio label="Manual">手动输入</el-radio>
							</el-radio-group>
							<div v-show="carrierOrder.Receivable=='Y'" class="tips">从“这个单的发货地”到卸货地对外运距为“50公里”总价为90909009？</div>
							<div class="form-input">
								<el-form-item label="现付" label-width="40px" style="width:180px;display:inline-block;margin:10px 10px 0 0">
									<el-input placeholder="现付" v-model="carrierOrder.cashAmount"></el-input>
								</el-form-item>
								<el-form-item label="到付" label-width="40px" style="width:180px;display:inline-block;margin:10px 10px 0 0">
									<el-input placeholder="到付" v-model="carrierOrder.codAmount"></el-input>
								</el-form-item>
								<el-form-item label="回单结" label-width="60px" style="width:180px;display:inline-block;margin:10px 10px 0 0">
									<el-input placeholder="回单结" v-model="carrierOrder.porAmount"></el-input>
								</el-form-item>
								<el-form-item label="月结" label-width="40px" style="width:180px;display:inline-block;margin:10px 10px 0 0">
									<el-input placeholder="月结" v-model="carrierOrder.monthlyAmount"></el-input>
								</el-form-item>
								<el-form-item label="收货方付" label-width="70px" style="width:180px;display:inline-block;margin:10px 10px 0 0">
									<el-input placeholder="收货方付" v-model="carrierOrder.consigneeAmount"></el-input>
								</el-form-item>
							</div>
						</el-form-item>
						<el-form-item label="付款费用">
							<el-radio-group v-model="carrierOrder.paymentMethod">
								<el-radio label="TKM">按吨公里自动生成</el-radio>
								<el-radio label="Manual">手动输入</el-radio>
							</el-radio-group>
							<div v-show="carrierOrder.paymentMethod=='TKM'" class="tips">从“这单的发货地”到卸货地对内运距为“50公里”?</div>
						</el-form-item>
						<el-form-item label="发票">
							<el-radio-group v-model="carrierOrder.Invoice">
								<el-radio label="Y">开发票</el-radio>
								<el-radio label="N">不开发票</el-radio>
							</el-radio-group>
						</el-form-item>
						<el-form-item label="回单要求" class="receipt">
							<span class="wf-checkbox" @click="selectReceipt('ConsigneePor')" :class="{'select': porRequire.includes('ConsigneePor')}"><svg-icon :icon-class="porRequire.includes('ConsigneePor') ? 'ic_checkbox_true' : 'ic_checkbox_false'"></svg-icon>货物托运单</span>
							<span class="wf-checkbox" @click="selectReceipt('ShipperPor')" :class="{'select': porRequire.includes('ShipperPor')}"><svg-icon :icon-class="porRequire.includes('ShipperPor') ? 'ic_checkbox_true' : 'ic_checkbox_false'"></svg-icon>发货单文件</span>
							<span class="wf-checkbox" @click="selectReceipt('NotRequired')" :class="{'select': porRequire.includes('NotRequired')}"><svg-icon :icon-class="porRequire.includes('NotRequired') ? 'ic_checkbox_true' : 'ic_checkbox_false'"></svg-icon>不需要回单</span>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="24">
						<el-form-item align="center" label-width="0">
							<el-button type="primary" @click="save">保存</el-button>
							<el-button type="success" @click="AddDispatchBill">调度</el-button>
							<el-button type="danger">删除</el-button>
							<el-button @click="back">返回</el-button>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
		</div>
	</div>
</template>


<script type="text/javascript">
import { Message } from 'element-ui'
import DistPicker from '../CommonComponents/DistPicker'
import request from "../../common/request"
export default {
	data() {
		return {
			loading: false,
			carrierOrder:{},
			consignorID:'',
			porRequire:[],
			carrierCargo:[
				{
					'cargoType': '',
					'cargoName': '',
					'weightType': '',
					'cargoWeight': '',
					'cargoVolume': '',
					'cargoNum': '',
					'carrierCargoID':''
				}
			],
			selectedArea: [],
			selectedArea1: [],
			Consignor:{
				companyName:''
			},
			transType:'',
			transTypeOption:[
				{
					label:'后台现在没参数',
					value:'海上运输'
				},
				// {
				// 	label:'海上运输',
				// 	value:'海上运输'
				// },
				// {
				// 	label:'铁路运输',
				// 	value:'铁路运输'
				// },
				// {
				// 	label:'公路运输',
				// 	value:'公路运输'
				// },
				// {
				// 	label:'航空运输',
				// 	value:'航空运输'
				// },
				// {
				// 	label:'邮件运输',
				// 	value:'邮件运输'
				// },
				// {
				// 	label:'多式联运',
				// 	value:'多式联运'
				// },
				// {
				// 	label:'固定设施运输',
				// 	value:'固定设施运输'
				// },
				// {
				// 	label:'内河运输',
				// 	value:'内河运输'
				// },
				// {
				// 	label:'其他',
				// 	value:'其他'
				// }
			]
		}
	},
	created() {
		this.getDetail()
	},
	methods: {
		getDetail() {
			let params = {
				carrierOrderID:this.$route.query.carrierOrderID
			}
			request({
				url: '/biz/carrierOrder/detail',
				params
			}).then(res => {
				// console.log(res.data.data)
				this.carrierOrder = res.data.data
				this.carrierCargo = res.data.data.carrierCargo
				this.consignorID= res.data.data.consignorID
				this.porRequire = res.data.data.porRequire.split(',')
				let shipperAreaID = res.data.data.shipperAreaID
				this.selectedArea = [(shipperAreaID.substr(0, 2) + '0000'), (shipperAreaID.substr(0, 4) + '00'), shipperAreaID]
				let consigneeAreaID = res.data.data.consigneeAreaID
				this.selectedArea1 = [(consigneeAreaID.substr(0, 2) + '0000'), (consigneeAreaID.substr(0, 4) + '00'), consigneeAreaID]
				this.getConsignor()
				console.log(res.data.data.porRequire)
			})
		},
		// 获取托运人
		getConsignor() {
			let params = {
				customerID: this.consignorID
			}
			request({
				url: '/customer/findById',
				params
			}).then(res => {
				this.Consignor.companyName = res.data.data.companyName
			})
		},
		save(){
			let data ={
				carrierOrderID:this.$route.query.carrierOrderID,
				consignorID:this.consignorID,
				carrierrName:this.carrierOrder.carrierrName,
				shipperCompanyName:this.carrierOrder.shipperCompanyName,
				shipperDate:this.carrierOrder.shipperDate,
				shipperDate:this.carrierOrder.shipperNo,
				shipperName:this.carrierOrder.shipperName,
				shipperAreaID:this.carrierOrder.shipperAreaID,
				shipperDetailAddress:this.carrierOrder.shipperDetailAddress,
				consigneeCompanyName:this.carrierOrder.consigneeCompanyName,
				consigneeName:this.carrierOrder.consigneeName,
				consigneeDate:this.carrierOrder.consigneeDate,
				consigneeAreaID:this.carrierOrder.consigneeAreaID,
				consigneeDetailAddress:this.carrierOrder.consigneeDetailAddress,
				carrierCargoInfo:JSON.stringify(this.carrierCargo),
				receiptMethod:this.carrierOrder.receiptMethod,
				cashAmount:this.carrierOrder.cashAmount,
				codAmount:this.carrierOrder.codAmount,
				porAmount:this.carrierOrder.porAmount,
				monthlyAmount:this.carrierOrder.monthlyAmount,
				consigneeAmount:this.carrierOrder.consigneeAmount,
				paymentMethod:this.carrierOrder.paymentMethod,
				status:this.carrierOrder.status,
				porRequire:this.porRequire
			}
			request({
				url: '/biz/carrierOrder/modify',
				method: 'post',
				data
			}).then(res => {
				Message.success('编辑成功！')
				this.$router.go(-1)
			})
		},
		AddDispatchBill() {
			this.$router.push({ name: 'adddispatchbill', query: { CarrierNum: this.$route.query.CarrierNum } })
		},
		addItem() {
			this.carrierCargo.push({
				'cargoType': '',
				'cargoName': '',
				'weightType': '',
				'cargoWeight': '',
				'cargoVolume': '',
				'cargoNum': ''
			})
		},
		selectReceipt(e){
			if (this.porRequire.includes(e)) {
				this.porRequire.splice(this.porRequire.indexOf(e), 1)
			} else {
				this.porRequire.push(e)
			}
			if(e == 'NotRequired'){
				this.porRequire = ['NotRequired']
			} else {
				this.porRequire.includes('NotRequired') && this.porRequire.splice(this.porRequire.indexOf('NotRequired'), 1)
			}
		},
		removeItem(index) {
			this.carrierCargo.splice(index, 1)
		},
		back() {
			this.$router.go(-1)
		},
		handleSelectedArea(data) {
			console.log(data)
			this.carrierOrder.shipperAreaID = data
		},
		handleSelectedArea1(data) {
			this.carrierOrder.consigneeAreaID = data
		},
	},
	components: {
		DistPicker
	}
}

</script>
<style lang="stylus" scoped>
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
.tips
	color #909399
.cargoItem
	padding-top 10px
	border-top 1px solid #ebeef5
	&:first-child
		border-top none
		padding-top 0
	.el-select
	.el-input
		margin 0 10px 10px 0
.wf-checkbox
	margin-right 30px
	cursor pointer
	&:last-child
		margin-right 0
	.svg-icon
		color #dcdfe6
		font-size 14px
		margin-right 10px
	&.select
		color #409EFF
		.svg-icon
			color #409EFF

</style>
