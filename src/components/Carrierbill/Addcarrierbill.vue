<template>
	<div class="main-content">
		<div id="cb"></div>
		<div class="wf-card hasTit">
			<div class="header clearfix">添加承运单</div>
			<el-row>
				<div class="split-item">
					<span class="num">1</span>
					<span class="tit">基本信息</span>
				</div>
			</el-row>
			<el-form label-width="100px" size="mini" :model="carrierbillInfo" :rules="rules" ref="ruleForm">
				<el-row>
					<el-col :span="8">
						<el-form-item label="托运人" prop="consignorName">
							<el-autocomplete style="width:100%"
								value-key="companyName" 
								v-model="carrierbillInfo.consignorName"
								:fetch-suggestions="getConsignors"
								placeholder="请输入内容"
								@select="handSelectConsignor">
							</el-autocomplete>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="承运人" prop="carrierrName">
							<el-input placeholder="请输入承运人" v-model="carrierbillInfo.carrierrName"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="8">
						<el-form-item label="准运证号">
							<el-input placeholder="请输入..." v-model="carrierbillInfo.navicertNo"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="电子运单">
							<el-input placeholder="请输入..." v-model="carrierbillInfo.electronicWaybill"></el-input>
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
						<el-form-item label="发货单位" prop="shipperCompanyName">
							<el-autocomplete  style="width:100%"
								value-key="companyName" 
								v-model="carrierbillInfo.shipperCompanyName"
								:fetch-suggestions="getRecdeliverycomp"
								placeholder="请输入内容"
								@select="handSelectShipper">
							</el-autocomplete>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="发货单号">
							<el-input placeholder="发货单号" v-model="carrierbillInfo.shipperNo"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="8">
						<el-form-item label="发货人" prop="shipperName">
							<el-input placeholder="发货人" v-model="carrierbillInfo.shipperName"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="发货人电话" prop="shipperPhone">
							<el-input placeholder="发货人电话" v-model="carrierbillInfo.shipperPhone"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="发货时间" prop="shipperDate">
							<el-date-picker type="datetime" style="width:100%" placeholder="选择发货时间" v-model="carrierbillInfo.shipperDate" value-format="timestamp"></el-date-picker>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="12">
						<el-form-item label="发货地" prop="shipperAreaID">
							<DistPicker @selectChange="handleSelectedArea" :selected="selectedArea"/>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="详细地址" prop="shipperDetailAddress">
							<el-input placeholder="发货详细地址" v-model="carrierbillInfo.shipperDetailAddress"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="12">
						<el-form-item label="发货位置" prop="shipperLocation">
							<el-autocomplete  style="width:100%"
								value-key="name" 
								v-model="carrierbillInfo.shipperLocation"
								:fetch-suggestions="getShipperLocation"
								placeholder="请输入内容">
							</el-autocomplete>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row style="margin-top:20px">
					<el-col :span="8">
						<el-form-item label="收货单位" prop="consigneeCompanyName">
							<el-autocomplete  style="width:100%"
								value-key="companyName" 
								v-model="carrierbillInfo.consigneeCompanyName"
								:fetch-suggestions="getRecdeliverycomp"
								placeholder="请输入内容"
								@select="handSelectConsignee">
							</el-autocomplete>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="8">
						<el-form-item label="收货人" prop="consigneeName">
							<el-input placeholder="收货人" v-model="carrierbillInfo.consigneeName"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="收货人电话" prop="consigneePhone">
							<el-input placeholder="收货人电话" v-model="carrierbillInfo.consigneePhone"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="到货时间" prop="consigneeDate">
							<el-date-picker type="datetime" style="width:100%" placeholder="选择到货时间" v-model="carrierbillInfo.consigneeDate" value-format="timestamp"></el-date-picker>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="12">
						<el-form-item label="卸货地" prop="consigneeAreaID">
							<DistPicker @selectChange="handleSelectedArea1" :selected="selectedArea1"/>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="详细地址" prop="consigneeDetailAddress">
							<el-input placeholder="卸货详细地址" v-model="carrierbillInfo.consigneeDetailAddress"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="12">
						<el-form-item label="卸货位置" prop="consigneeLocation">
							<el-autocomplete  style="width:100%"
								value-key="name" 
								v-model="carrierbillInfo.consigneeLocation"
								:fetch-suggestions="getConsigneeLocation"
								placeholder="请输入内容">
							</el-autocomplete>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row style="margin-top:20px">
					<el-col :span="8">
						<el-form-item label="运输方式" prop="transportType">
							<el-select v-model="carrierbillInfo.transportType" placeholder="请选择" style="width:100%">
								<el-option label="海上运输" value="海上运输"></el-option>
								<el-option label="铁路运输" value="铁路运输"></el-option>
								<el-option label="公路运输" value="公路运输"></el-option>
								<el-option label="航空运输" value="航空运输"></el-option>
								<el-option label="邮件运输" value="邮件运输"></el-option>
								<el-option label="多式联运" value="多式联运"></el-option>
								<el-option label="固定设施运输" value="固定设施运输"></el-option>
								<el-option label="内河运输" value="内河运输"></el-option>
								<el-option label="其他" value="其他"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="委托时间">
							<el-date-picker style="width:100%" type="datetime" placeholder="请选择" value-format="timestamp" v-model="carrierbillInfo.commissionDate"></el-date-picker>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<div class="split-item">
						<span class="num">3</span>
						<span class="tit">货物信息</span>
						<el-button type="text" icon="el-icon-plus" class="fr" @click="addItem">添加</el-button>
					</div>
				</el-row>
				<div class="cargoItem" v-for="(item, index) in carrierbillInfo.carrierCargo" :key="index">
					<el-form :inline="true" size="mini" :model="item" :rules="cargoRules" ref="cargoRuleForm">
						<el-row>
							<el-form-item :label="'货物' + (index + 1)" prop="weightType">
								<el-select v-model="item.weightType" placeholder="请选择" style="width: 100px">
									<el-option label="重货" value="Heavy"></el-option>
									<el-option label="轻货" value="Light"></el-option>
								</el-select>
							</el-form-item>
							<el-form-item prop="cargoName">
								<el-input placeholder="货物名称" style="width: 130px" v-model="item.cargoName"></el-input>
							</el-form-item>
							<el-form-item prop="cargoType">
								<el-input placeholder="货物规格" style="width: 130px" v-model="item.cargoType"></el-input>
							</el-form-item>
							<el-form-item prop="cargoWeight">
								<el-input placeholder="货物重量" style="width: 130px" v-model="item.cargoWeight">
									<span slot="suffix">吨</span>
								</el-input>
							</el-form-item>
							<el-form-item prop="cargoVolume">
								<el-input placeholder="货物体积" style="width: 130px" v-model="item.cargoVolume">
									<span slot="suffix">方</span>
								</el-input>
							</el-form-item>
							<el-form-item prop="cargoNum">
								<el-input placeholder="货物数量" style="width: 130px" v-model="item.cargoNum">
									<span slot="suffix">件</span>
								</el-input>
							</el-form-item>
							<el-button type="text" icon="el-icon-delete" style="color:#F56C6C" @click="removeItem(index)" v-show="carrierbillInfo.carrierCargo.length>1">删除</el-button>
						</el-row>
					</el-form>
				</div>
				<el-row>
					<div class="split-item">
						<span class="num">4</span>
						<span class="tit">收付款金额</span>
					</div>
				</el-row>
				<el-row>
					<el-col :span="24">
						<el-form-item label="承运单应收款">
							<el-radio-group v-model="carrierbillInfo.receiptMethod" @change="handSelectReceiptMethod">
								<el-radio label="TKM">按吨公里自动生成</el-radio>
								<el-radio label="Manual">手动输入</el-radio>
							</el-radio-group>
							<div v-show="carrierbillInfo.receiptMethod=='TKM'" class="tips">从“这个单的发货地”到卸货地对外运距为“{{exmile}}公里”总价为{{totalPrice}}？</div>
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
								<el-form-item style="width:180px;display:inline-block;margin:10px 10px 0 0" v-if="carrierbillInfo.receiptMethod=='TKM'">
									<el-button type="primary" @click="getTransportPrice">重新生成</el-button>
								</el-form-item>
							</div>
						</el-form-item>
						<el-form-item label="付款费用">
							<el-radio-group v-model="carrierbillInfo.paymentMethod" @change="handSelectPaymentMethod">
								<el-radio label="TKM">按吨公里自动生成</el-radio>
								<el-radio label="Manual">手动输入</el-radio>
							</el-radio-group>
							<div v-show="carrierbillInfo.paymentMethod=='TKM'" class="tips">从“这单的发货地”到卸货地对内运距为“{{innermile}}公里”?</div>
						</el-form-item>
						<el-form-item label="发票">
							<el-radio-group v-model="carrierbillInfo.invoice">
								<el-radio label="Y" value="Y">开发票</el-radio>
								<el-radio label="N" value="N">不开发票</el-radio>
							</el-radio-group>
						</el-form-item>
						<el-form-item label="回单要求" class="receipt">
							<span class="wf-checkbox" @click="selectReceipt('ConsigneePor')" :class="{'select': carrierbillInfo.porRequire.includes('ConsigneePor')}"><svg-icon :icon-class="carrierbillInfo.porRequire.includes('ConsigneePor') ? 'ic_checkbox_true' : 'ic_checkbox_false'"></svg-icon>货物托运单</span>
							<span class="wf-checkbox" @click="selectReceipt('ShipperPor')" :class="{'select': carrierbillInfo.porRequire.includes('ShipperPor')}"><svg-icon :icon-class="carrierbillInfo.porRequire.includes('ShipperPor') ? 'ic_checkbox_true' : 'ic_checkbox_false'"></svg-icon>发货单文件</span>
							<span class="wf-checkbox" @click="selectReceipt('NotRequired')" :class="{'select': carrierbillInfo.porRequire.includes('NotRequired')}"><svg-icon :icon-class="carrierbillInfo.porRequire.includes('NotRequired') ? 'ic_checkbox_true' : 'ic_checkbox_false'"></svg-icon>不需要回单</span>
						</el-form-item>
					</el-col>
				</el-row>
			
			<el-row>
				<el-col :span="24">
					<el-form-item align="center" label-width="0">
						<el-button type="primary" @click="save">保存</el-button>
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
import { mapGetters } from 'vuex'
import DistPicker from '../CommonComponents/DistPicker'
import axios from 'axios'
import request from '../../common/request'
import requestNode from '../../common/requestNode'
import { addCarrierbill } from '../../api/carrierbill'
import { searchAreaByKey } from '../../common/utils'
import { checkFloat2, checkTel } from '../../common/validators'

export default {
	data() {
		return {
			selectedArea: [],
			selectedArea1: [],
			consignor: {},
			loading: false,
			carrierbillInfo: {
				carrierCargo:[
					{
						'weightType': 'Heavy',
						'cargoName': '',
						'cargoType': '',
						'cargoWeight': '',
						'cargoVolume': '',
						'cargoNum': ''
					}
				],
				carrierOrderNo:'',
				carrierrName: '',
				navicertNo: '',   // 新增
				electronicWaybill: '',   // 新增
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
				shipperAreaID: '',
				shipperCompanyName:'',
				shipperDate:'',
				shipperDetailAddress:'',
				shipperID:'',
				shipperName:'',
				shipperNo:'',
				shipperPhone:'',
				invoice:'N',
				porRequire: ['NotRequired'],
				transportType: '',
				commissionDate: ''
			},
			totalPrice: 0,
			exmile: 0,
			innermile: 0,
			rules: {
				consignorName: [
					{required: true, message: '请输入托运人'}
				],
				carrierrName: [
					{required: true, message: '请输入承运人'}
				],
				shipperCompanyName: [
					{required: true, message: '请输入发货单位'}
				],
				shipperName: [
					{ required: true, message: '请输入发货人'}
				],
				shipperPhone: [
					{ required: true, validator: checkTel}
				],
				shipperDate: [
					{required: true, message: '请选择发货时间', trigger: 'change'}
				],
				shipperAreaID: [
					{required: true, message: '请选择发货地'}
				],
				shipperLocation: [
					{required: true, message: '请选择定位地址'}
				],
				shipperDetailAddress: [
					{ required: true, message: '请输入发货详细地址'}
				],
				consigneeCompanyName: [
					{required: true, message: '请输入收货单位'}
				],
				consigneeName: [
					{ required: true, message: '请输入收货人'}
				],
				consigneePhone: [
					{ required: true, validator: checkTel}
				],
				consigneeDate: [
					{required: true, message: '请选择收货时间', trigger: 'change'}
				],
				consigneeAreaID: [
					{required: true, message: '请选择收货地'}
				],
				consigneeLocation: [
					{required: true, message: '请选择定位地址'}
				],
				consigneeDetailAddress: [
					{required: true, message: '请输入收货详细地址'}
				],
				transportType: [
					{required: true, message: '请选择运输方式'}
				]
			},
			cargoRules: {
				weightType: [
					{required: true, message: '请选择货物类型', trigger: 'change'}
				],
				cargoName: [
					{required: true, message: '请输入货物名称', trigger: 'blur'}
				],
				cargoType: [
					{required: true, message: '请输入货物规格', trigger: 'blur'}
				],
				cargoWeight: [
					{validator: checkFloat2, trigger: 'blur'}
				],
				cargoVolume: [
					{validator: checkFloat2, trigger: 'blur'}
				],
				cargoNum: [
					{validator: checkFloat2, trigger: 'blur'}
				]
			}
		}
	},
	computed: {
		...mapGetters(['companyName'])
	},
	created() {
		this.carrierbillInfo.carrierrName = this.companyName
	},
	methods: {
		getConsignors(queryString, cb) {
			let params = {
				type: 'Consignor',
				companyName: queryString
			}
			request({
				url: '/customer/findList',
				params
			}).then(res => {
				let list = res.data.data.records
				cb(list)
			})
		},
		getRecdeliverycomp(queryString, cb) {
			let params = {
				type: 'ShipperConsignee',
				companyName: queryString
			}
			request({
				url: '/customer/findList',
				params
			}).then(res => {
				cb(res.data.data.records)
			})
		},
		getShipperLocation(queryString, cb) {
			let params = {
				region: this.carrierbillInfo.shipperArea,
				queryString
			}
			requestNode({
				url: '/baiduMap/getLocation',
				params
			}).then(res => {
				if (res.data.result instanceof Object && res.data.result.name instanceof Array) {
					let names = res.data.result.name.map((item, i) => { 
						return { 
							name: item,
							location: res.data.result.location[i]
						} 
					})
					cb(names)
				}
			})
		},
		getConsigneeLocation(queryString, cb) {
			let params = {
				region: this.carrierbillInfo.consigneeArea,
				queryString
			}
			requestNode({
				url: '/baiduMap/getLocation',
				params
			}).then(res => {
				if (res.data.result instanceof Object && res.data.result.name instanceof Array) {
					let names = res.data.result.name.map((item, i) => { 
						return { 
							name: item,
							location: res.data.result.location[i]
						} 
					})
					cb(names)
				}
			})
		},
		handSelectConsignor(data) {
			this.carrierbillInfo.consignorID = data.customerID
			this.carrierbillInfo.consignorName = data.companyName
		},
		handSelectShipper(data){
			this.carrierbillInfo.shipperCompanyName = data.companyName
			this.carrierbillInfo.shipperName = data.contactName
			this.carrierbillInfo.shipperArea = data.companyArea
			this.carrierbillInfo.shipperDetailAddress = data.detailAddress
			this.carrierbillInfo.shipperID = data.customerID
			this.carrierbillInfo.shipperPhone = data.contactPhone
			this.carrierbillInfo.shipperAreaID = data.companyAreaID
			let areaID = String(data.companyAreaID)
			this.selectedArea = [(areaID.substr(0, 2) + '0000'), (areaID.substr(0, 4) + '00'), areaID]
		},
		handSelectConsignee(data){
			this.carrierbillInfo.consigneeCompanyName = data.companyName
			this.carrierbillInfo.consigneeName = data.contactName
			this.carrierbillInfo.consigneeArea = data.companyArea
			this.carrierbillInfo.consigneeDetailAddress = data.detailAddress
			this.carrierbillInfo.consigneeID = data.customerID
			this.carrierbillInfo.consigneePhone = data.contactPhone
			this.carrierbillInfo.consigneeAreaID = data.companyAreaID
			let areaID = String(data.companyAreaID)
			this.selectedArea1 = [(areaID.substr(0, 2) + '0000'), (areaID.substr(0, 4) + '00'), areaID]
		},
		handleSelectedArea(data) {
			this.carrierbillInfo.shipperAreaID = data
			this.carrierbillInfo.shipperArea = searchAreaByKey(data)
		},
		handleSelectedArea1(data) {
			this.carrierbillInfo.consigneeAreaID = data
			this.carrierbillInfo.consigneeArea = searchAreaByKey(data)
		},
		handSelectReceiptMethod(data) {
			if (data == 'TKM') {
				if (!this.carrierbillInfo.consigneeArea) {
					Message.error('收货地区未填写！')
					this.carrierbillInfo.receiptMethod = 'Manual'
					return
				}
				if (!this.carrierbillInfo.consigneeDetailAddress) {
					Message.error('收货详细地址未填写！')
					this.carrierbillInfo.receiptMethod = 'Manual'
					return
				}
				if (!this.carrierbillInfo.shipperArea) {
					Message.error('发货地区未填写！')
					this.carrierbillInfo.receiptMethod = 'Manual'
					return
				}
				if (!this.carrierbillInfo.shipperDetailAddress) {
					Message.error('发货详细地址未填写！')
					this.carrierbillInfo.receiptMethod = 'Manual'
					return
				}
				let heavyCargos = this.carrierbillInfo.carrierCargo.filter(item => item.weightType == 'Heavy')
				if (heavyCargos.length == 0) {
					Message.error('货物不能全是轻货！')
					this.carrierbillInfo.receiptMethod = 'Manual'
					return
				}
				this.getTransportPrice(true)
			}
		},
		handSelectPaymentMethod(data) {
			if (data == 'TKM') {
				if (!this.carrierbillInfo.consigneeArea) {
					Message.error('收货地区未填写！')
					this.carrierbillInfo.receiptMethod = 'Manual'
					return
				}
				if (!this.carrierbillInfo.consigneeDetailAddress) {
					Message.error('收货详细地址未填写！')
					this.carrierbillInfo.receiptMethod = 'Manual'
					return
				}
				if (!this.carrierbillInfo.shipperArea) {
					Message.error('发货地区未填写！')
					this.carrierbillInfo.receiptMethod = 'Manual'
					return
				}
				if (!this.carrierbillInfo.shipperDetailAddress) {
					Message.error('发货详细地址未填写！')
					this.carrierbillInfo.receiptMethod = 'Manual'
					return
				}
				let heavyCargos = this.carrierbillInfo.carrierCargo.filter(item => item.weightType == 'Heavy')
				if (heavyCargos.length == 0) {
					Message.error('货物不能全是轻货！')
					this.carrierbillInfo.receiptMethod = 'Manual'
					return
				}
				this.getTransportPrice(false)
			}
		},
		save() {
			new Promise((resolve, reject) => {
				this.$refs['ruleForm'].validate(valid => {
					if (valid) {
						resolve()
					} else {
						reject()
					}
				})
			}).then(() => {
				new Promise((resolve, reject) => {
					this.$refs['cargoRuleForm'].forEach(item => {
						item.validate(valid => {
							if (valid) {
								let cargoInfo = this.carrierbillInfo.carrierCargo
								for (let i = 0; i < cargoInfo.length; i++) {
									if (cargoInfo[i].weightType == 'Heavy' && (cargoInfo[i].cargoWeight == '' || cargoInfo[i].cargoWeight == 0)) {
										Message.error('重货必须填写货物重量！')
										return reject()
									}
									if (cargoInfo[i].weightType == 'Light' && (cargoInfo[i].cargoVolume == '' || cargoInfo[i].cargoVolume == 0)) {
										Message.error('轻货必须填写货物体积！')
										return reject()
									}
								}
								resolve()
							} else {
								reject()
							}
						})
					})
				}).then(() => {
					addCarrierbill({
						carrierCargoInfo: JSON.stringify(this.carrierbillInfo.carrierCargo),
						carrierOrderNo: this.carrierbillInfo.carrierOrderNo,
						carrierrName: this.carrierbillInfo.carrierrName,
						navicertNo: this.carrierbillInfo.navicertNo,
						electronicWaybill: this.carrierbillInfo.electronicWaybill,
						cashAmount: this.carrierbillInfo.cashAmount,
						codAmount: this.carrierbillInfo.codAmount,
						consigneeAddressID: '',
						consigneeAmount: this.carrierbillInfo.consigneeAmount,
						consigneeArea: this.carrierbillInfo.consigneeArea ,
						consigneeAreaID: this.carrierbillInfo.consigneeAreaID,
						consigneeCompanyName: this.carrierbillInfo.consigneeCompanyName,
						consigneeDate: this.carrierbillInfo.consigneeDate,
						consigneeDetailAddress: this.carrierbillInfo.consigneeDetailAddress,
						consigneeID: this.carrierbillInfo.consigneeID,
						consigneeName: this.carrierbillInfo.consigneeName,
						consigneePhone: this.carrierbillInfo.consigneePhone,
						consignorID: this.carrierbillInfo.consignorID || '', // 托运人ID
						consignorName: this.carrierbillInfo.consignorName || '', // 托运人名称
						monthlyAmount: this.carrierbillInfo.monthlyAmount,
						paymentMethod: this.carrierbillInfo.paymentMethod,
						porAmount: this.carrierbillInfo.porAmount,
						receiptMethod: this.carrierbillInfo.receiptMethod,	
						shipperAddressID: '',
						shipperArea: this.carrierbillInfo.shipperArea,
						shipperAreaID: this.carrierbillInfo.shipperAreaID,
						shipperCompanyName: this.carrierbillInfo.shipperCompanyName,
						shipperDate: this.carrierbillInfo.shipperDate,
						shipperDetailAddress: this.carrierbillInfo.shipperDetailAddress,
						shipperID: this.carrierbillInfo.shipperID,
						shipperName: this.carrierbillInfo.shipperName,
						shipperNo: this.carrierbillInfo.shipperNo,
						shipperPhone: this.carrierbillInfo.shipperPhone,
						porRequire: this.carrierbillInfo.porRequire.join(','),
						invoice: this.carrierbillInfo.invoice,
						transportType: this.carrierbillInfo.transportType,
						commissionDate: this.carrierbillInfo.commissionDate
					}).then(res => {
						Message.success(res.data.msg)
						this.$router.push({name: 'carrierbills'})
					})
				})
			})
		},
		addItem() {
			this.carrierbillInfo.carrierCargo.push({
				'cargoType': '',
				'cargoName': '',
				'weightType': 'Heavy',
				'cargoWeight': '',
				'cargoVolume': '',
				'cargoNum': ''
			})
		},
		removeItem(index) {
			this.carrierbillInfo.carrierCargo.splice(index, 1)
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
		getTransportPrice(type) {
			let params = {
				consigneeAreaID: this.carrierbillInfo.consigneeAreaID, //	收货地区ID
				consigneeArea: this.carrierbillInfo.consigneeArea, //	收货地区
				consigneeDetailAddress: this.carrierbillInfo.consigneeDetailAddress, //	收货详细地址	
				shipperAreaID: this.carrierbillInfo.shipperAreaID, //	发货地区ID
				shipperArea: this.carrierbillInfo.shipperArea, //	发货地区	
				shipperDetailAddress: this.carrierbillInfo.shipperDetailAddress // 发货详细地址
			}
			request({
				url: '/transportPrice/findOneByAddress',
				method: 'get',
				params
			}).then(res => {
				if (res.data.code == 200) {
					let result = res.data.data
					let heavyCargos = this.carrierbillInfo.carrierCargo.filter(item => item.weightType == 'Heavy')
					let cargoWeights = heavyCargos.map(item => Number(item.cargoWeight))
					let totalCargoWeight = cargoWeights.reduce((prev, next) => (prev + next), 0)
					let temp = Number(result.externalUnitPrice) * Number(result.externalMileage) * totalCargoWeight
					if (type) {
						this.carrierbillInfo.cashAmount = temp * result.externalCashRate
						this.carrierbillInfo.codAmount = temp * result.externalCodRate
						this.carrierbillInfo.porAmount = temp * result.externalPorRate
						this.carrierbillInfo.monthlyAmount = temp * result.externalAbschlussRate
						this.carrierbillInfo.consigneeAmount = temp * result.externalConsigneeCodRate
					}
					this.exmile = result.externalMileage
					this.innermile = result.mileage
					this.totalPrice = temp
				} else if (res.data.code == 2001) {
					this.$msgbox({
						message: '请先配置运费模板！',
						title: '未配置运费模板',
						confirmButtonText: '去配置',
						showCancelButton: true,
						callback: (action) => {
							if (action == 'confirm') {
								this.$router.push({name: 'addsettleconfig'})
							}
						}
					})
				}
			})
		},
		back() {
			this.$router.go(-1)
		}
	},
	components: {
		DistPicker
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
// .cargoItem
// 	padding-top 10px
// 	border-top 1px solid #ebeef5
// 	&:first-child
// 		border-top none
// 		padding-top 0
// 	.el-select
// 	.el-input
// 		margin 0 10px 10px 0
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
