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
							<el-select style="width: 100%"  v-model="Shippers.consignorID" filterable remote placeholder="请输入托运人关键词" :remote-method="getShippers" :loading="loading" @change="getConsignorDetail">
								<el-option v-for="item in Shippers" :key="item.Shippers" :label="item.companyName" :value="item.customerID">
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
				<el-col :span="8">
					<el-form label-width="100px">
						<el-form-item label="承运单号">
							<el-input placeholder="请输入承运单号" v-model="carrierbillInfo.carrierOrderNo"></el-input>
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
							<el-select style="width: 100%"  v-model="carrierbillInfo.shipperCompanyName" filterable remote placeholder="请输入托运人关键词" :remote-method="getRecdeliverycomp" :loading="loading" @change="getShipperDetail">
								<el-option v-for="item in Recdeliverycomp" :key="item.Recdeliverycomp" :label="item.companyName" :value="item.companyName">
								</el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="发货人">
							<el-input placeholder="发货人" v-model="shipperDetail.contactName" disabled></el-input>
						</el-form-item>
						<el-form-item label="发货时间">
							<el-date-picker style="width:100%" placeholder="选择发货时间" v-model="carrierbillInfo.shipperDate" value-format="timestamp" ></el-date-picker>
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
				<el-col :span="8">
					<el-form label-width="100px">
						<el-form-item label="发货地">
							<el-cascader 
								style="width: 100%" 
								:options="distData" 
								v-model="selectedArea"
								@change="handleSelectedArea" separator="" disabled>
							</el-cascader>
							<!-- <el-input disabled placeholder="发货地" v-model="shipperDetail.companyArea"></el-input> -->
						</el-form-item>
					</el-form>
				</el-col>
				<el-col :span="8">
					<el-form label-width="20px">
						<el-form-item>
							<el-input placeholder="发货详细地址" v-model="shipperDetail.detailAddress" disabled></el-input>
						</el-form-item>
					</el-form>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="8">
					<el-form label-width="100px">
						<el-form-item label="收货单位">
							<el-select style="width: 100%"  v-model="carrierbillInfo.consigneeCompanyName" filterable remote placeholder="请输入托运人关键词" :remote-method="getRecdeliverycomp" :loading="loading" @change="getConsigneeDetail">
								<el-option v-for="item in Recdeliverycomp" :key="item.Recdeliverycomp" :label="item.companyName" :value="item.companyName">
								</el-option>
							</el-select>
						</el-form-item>
					</el-form>
				</el-col>
				<el-col :span="8">
					<el-form label-width="100px">
						<el-form-item label="收货人">
							<el-input placeholder="收货人" v-model="ConsigneeDetail.contactName" disabled></el-input>
						</el-form-item>
					</el-form>
				</el-col>
				<el-col :span="8">
					<el-form label-width="100px">
						<el-form-item label="到货时间">
							<el-date-picker style="width:100%" placeholder="选择到货时间" v-model="carrierbillInfo.consigneeDate" value-format="timestamp"></el-date-picker>
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
				<el-col :span="8">
					<el-form label-width="100px">
						<el-form-item label="卸货地">
							<el-cascader 
								style="width: 100%" 
								:options="distData" 
								v-model="selectedArea1"
								@change="handleSelectedArea1" separator="" disabled>
							</el-cascader>
						</el-form-item>
					</el-form>
				</el-col>
				<el-col :span="8">
					<el-form label-width="20px">
						<el-form-item>
							<el-input placeholder="卸货详细地址" v-model="ConsigneeDetail.detailAddress" disabled></el-input>
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
							<div class="cargoItem" v-for="(item,index) in carrierbillInfo.carrierCargoInfo">
								<el-select v-model="item.weightType" placeholder="请选择" style="width:100px">
									<el-option label="重货" value="Heavy"></el-option>
									<el-option label="轻货" value="Light"></el-option>
								</el-select>
								<el-input placeholder="货物名称" style="width:150px" v-model="item.cargoName"></el-input>
								<el-input placeholder="货物规格" style="width:150px" v-model="item.cargoType"></el-input>
								<el-input placeholder="货物重量" style="width:150px" v-model="item.cargoWeight"><span slot="suffix">吨</span></el-input>
								<el-input placeholder="货物体积" style="width:150px" v-model="item.cargoVolume"><span slot="suffix">方</span></el-input>
								<el-input placeholder="货物数量" style="width:150px" v-model="item.cargoNum"><span slot="suffix">件</span></el-input>
								
								<el-button type="text" icon="el-icon-delete" style="color:#F56C6C" @click="removeItem(index)" v-show="carrierbillInfo.carrierCargoInfo.length>1">删除</el-button>
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
								<el-radio label="TKM">按吨公里自动生成</el-radio>
								<el-radio label="Manual">手动输入</el-radio>
							</el-radio-group>
							<div v-show="carrierbillInfo.receiptMethod=='TKM'" class="tips">从“这个单的发货地”到卸货地对外运距为“50公里”总价为90909009？</div>
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
								<el-radio label="TKM">按吨公里自动生成</el-radio>
								<el-radio label="Manual">手动输入</el-radio>
							</el-radio-group>
							<div v-show="carrierbillInfo.paymentMethod=='TKM'" class="tips">从“这单的发货地”到卸货地对内运距为“50公里”?</div>
						</el-form-item>
						<el-form-item label="发票">
							<el-radio-group v-model="carrierbillInfo.Invoice">
								<el-radio label="Y">开发票</el-radio>
								<el-radio label="N">不开发票</el-radio>
							</el-radio-group>
						</el-form-item>
						<el-form-item label="回单要求" class="receipt">
							<span class="wf-checkbox" @click="selectReceipt('ConsigneePor')" :class="{'select': carrierbillInfo.porRequire.includes('ConsigneePor')}"><svg-icon :icon-class="carrierbillInfo.porRequire.includes('ConsigneePor') ? 'ic_checkbox_true' : 'ic_checkbox_false'"></svg-icon>货物托运单</span>
							<span class="wf-checkbox" @click="selectReceipt('ShipperPor')" :class="{'select': carrierbillInfo.porRequire.includes('ShipperPor')}"><svg-icon :icon-class="carrierbillInfo.porRequire.includes('ShipperPor') ? 'ic_checkbox_true' : 'ic_checkbox_false'"></svg-icon>发货单文件</span>
							<span class="wf-checkbox" @click="selectReceipt('NotRequired')" :class="{'select': carrierbillInfo.porRequire.includes('NotRequired')}"><svg-icon :icon-class="carrierbillInfo.porRequire.includes('NotRequired') ? 'ic_checkbox_true' : 'ic_checkbox_false'"></svg-icon>不需要回单</span>
						</el-form-item>
					</el-form>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="24">
					<el-form label-width="0">
						<el-form-item align="center">
							<el-button type="primary" @click="save">保存</el-button>
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
			distData: regionData,
			selectedArea: [],
			selectedArea1: [],
			loading: false,
			Shippers:{
				companyArea:'',
				companyName:'',
				contactName:'',
				contactPhone:'',
				customerID:'',
				detailAddress:''
			},
			Recdeliverycomp:{},
			shipperDetail: {
				companyName:'',
				contactName:'',
				companyArea:'',
				detailAddress:'',
				companyID:'',
				customerID:''
			},
			ConsigneeDetail: {
				companyName:'',
				contactName:'',
				companyArea:'',
				detailAddress:'',
				companyID:'',
				customerID:''
			},
			carrierbillInfo: {
				carrierCargoInfo:[
					{
						'weightType': '',
						'cargoName': '',
						'cargoType': '',
						'cargoWeight': '',
						'cargoVolume': '',
						'cargoNum': ''
					}
				],
				carrierOrderNo:'',
				carrierrName:'',
				cashAmount:'',
				chargeMode:'',
				codAmount:'',
				consigneeAddressID:'',
				consigneeAmount:'',
				consigneeArea:'',
				consigneeAreaID:'',
				consigneeCompanyName:'',
				consigneeDate:'',
				consigneeDetailAddress:'',
				consigneeID:'',
				consigneeName:'',
				consigneePhone:'',
				consignorID:'',
				monthlyAmount:'',
				paymentMethod:'Manual',
				porAmount:'',
				receiptMethod:'Manual',
				shipperAddressID:'',
				shipperArea:'',
				shipperCompanyName:'',
				shipperDate:'',
				shipperDetailAddress:'',
				shipperID:'',
				shipperName:'',
				shipperNo:'',
				shipperPhone:'',
				Invoice:'N',
				porRequire: ['NotRequired'],
			},
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
		getShippers(e) {
			let params = {
				type: 'Consignor',
			}
			request({
				url: '/customer/findList',
				params
			}).then(res => {
				console.log('托运人')
				console.log(res.data)
				
				this.Shippers = res.data.data.records
				let arr = this.Shippers.filter(item => {
					return item.companyName == e
				})
				console.log(e)
				return
				this.Shippers.contactName = arr[0].contactName
				this.Shippers.companyArea = arr[0].companyArea
				this.Shippers.detailAddress = arr[0].detailAddress
				this.Shippers.companyID = arr[0].companyID
				this.Shippers.customerID = arr[0].customerID
			})
		},
		// 获取托运人详情
		getConsignorDetail(e){
			let arr = this.Shippers.filter(item => {
				return item.customerID == e
			})
			console.log('托运人详情')
			console.log(arr[0])
			this.Shippers.companyArea = arr[0].companyArea
			this.Shippers.companyName = arr[0].companyName
			this.Shippers.contactName = arr[0].contactName
			this.Shippers.contactPhone = arr[0].contactPhone
			this.Shippers.customerID = arr[0].customerID
			this.Shippers.detailAddress = arr[0].detailAddress
		},
		getRecdeliverycomp() {
			let params = {
				type: 'ShipperConsignee',
			}
			request({
				url: '/customer/findList',
				params
			}).then(res => {
				console.log('发货人，收货人列表')
				console.log(res.data.data)
				this.Recdeliverycomp = res.data.data.records
			})
		},
		getShipperDetail(e){
			let arr = this.Recdeliverycomp.filter(item => {
				return item.companyName == e
			})
			console.log('发货人详情')
			console.log(arr[0])
			this.shipperDetail.contactName = arr[0].contactName
			this.shipperDetail.contactPhone = arr[0].contactPhone
			this.shipperDetail.companyArea = arr[0].companyArea
			this.shipperDetail.detailAddress = arr[0].detailAddress
			this.shipperDetail.companyID = arr[0].companyID
			this.shipperDetail.customerID = arr[0].customerID
			let areaID = String(arr[0].companyAreaID)
			this.selectedArea = [(areaID.substr(0, 2) + '0000'), (areaID.substr(0, 4) + '00'), areaID]
		},
		getConsigneeDetail(e){
			let arr = this.Recdeliverycomp.filter(item => {
				return item.companyName == e
			})
			console.log('收货人详情')
			console.log(arr[0])
			this.ConsigneeDetail.contactName = arr[0].contactName
			this.ConsigneeDetail.contactPhone = arr[0].contactPhone
			this.ConsigneeDetail.companyArea = arr[0].companyArea
			this.ConsigneeDetail.detailAddress = arr[0].detailAddress
			this.ConsigneeDetail.companyID = arr[0].companyID
			this.ConsigneeDetail.customerID = arr[0].customerID
			let areaID = String(arr[0].companyAreaID)
			this.selectedArea1 = [(areaID.substr(0, 2) + '0000'), (areaID.substr(0, 4) + '00'), areaID]
		},
		
		save(){
			let data = {
				carrierCargoInfo:JSON.stringify(this.carrierbillInfo.carrierCargoInfo),
				carrierOrderNo:this.carrierbillInfo.carrierOrderNo,
				carrierrName:this.carrierbillInfo.carrierrName,
				cashAmount:this.carrierbillInfo.cashAmount,
				codAmount:this.carrierbillInfo.codAmount,
				consigneeAddressID: '',
				// consigneeAddressID:this.carrierbillInfo.consigneeAddressID,
				consigneeAmount:this.carrierbillInfo.consigneeAmount,
				consigneeArea:this.ConsigneeDetail.companyArea,
				consigneeAreaID:this.selectedArea[this.selectedArea.length-1],
				consigneeCompanyName:this.carrierbillInfo.consigneeCompanyName,
				consigneeDate:this.carrierbillInfo.consigneeDate,
				consigneeDetailAddress:this.ConsigneeDetail.detailAddress,
				consigneeID:this.ConsigneeDetail.customerID,
				consigneeName:this.ConsigneeDetail.contactName,
				consigneePhone:this.ConsigneeDetail.contactPhone,
				consignorID:this.Shippers.customerID,
				monthlyAmount:this.carrierbillInfo.monthlyAmount,
				paymentMethod:this.carrierbillInfo.paymentMethod,
				porAmount:this.carrierbillInfo.porAmount,
				receiptMethod:this.carrierbillInfo.receiptMethod,	
				shipperAddressID: '',
				// shipperAddressID:this.shipperDetail.detailAddress,
				shipperArea:this.shipperDetail.companyArea,
				shipperAreaID:this.selectedArea1[this.selectedArea1.length-1],
				shipperCompanyName:this.carrierbillInfo.shipperCompanyName,
				shipperDate:this.carrierbillInfo.shipperDate,
				shipperDetailAddress:this.shipperDetail.detailAddress,
				shipperID:this.shipperDetail.customerID,
				shipperName:this.shipperDetail.contactName,
				shipperNo:this.carrierbillInfo.shipperNo,
				shipperPhone:this.shipperDetail.contactPhone
			}
			console.log(data)
			request({
				url: '/biz/carrierOrder/add',
				method: 'post',
				data
			}).then(res => {
				console.log(res.data)
				Message.success(res.data.msg)
				this.$router.push({name: 'carrierbills'})
			})
		},
		addItem() {
			this.carrierbillInfo.carrierCargoInfo.push({
				'cargoType': '',
				'cargoName': '',
				'weightType': '',
				'cargoWeight': '',
				'cargoVolume': '',
				'cargoNum': ''
			})
		},
		removeItem(index) {
			this.carrierbillInfo.carrierCargoInfo.splice(index, 1)
		},
		selectReceipt(e){
			if (this.carrierbillInfo.porRequire.includes(e)) {
				this.carrierbillInfo.porRequire.splice(this.carrierbillInfo.porRequire.indexOf(e), 1)
			} else {
				this.carrierbillInfo.porRequire.push(e)
			}
			if(e == 'NotRequired'){
				this.carrierbillInfo.porRequire = ['NotRequired']
			} else {
				this.carrierbillInfo.porRequire.includes('NotRequired') && this.carrierbillInfo.porRequire.splice(this.carrierbillInfo.porRequire.indexOf('NotRequired'), 1)
			}
		},
		back() {
			this.$router.go(-1)
		},
		handleSelectedArea(data) {
			this.carrierbillInfo.shipperAddressID = data[data.length-1]
		},
		handleSelectedArea1(data) {
			this.carrierbillInfo.consigneeAreaID = data[data.length-1]
		},
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
	margin-bottom 10px
	border-bottom 1px solid #ebeef5
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
