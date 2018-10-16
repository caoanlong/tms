<template>
	<div class="main-content" style="min-width: 1050px">
		<el-card class="box-card hasTit">
			<el-form label-width="100px" size="small" :model="carrierbillInfo" :rules="rules" ref="ruleForm">
				<el-row>
					<el-col :span="8">
						<el-form-item label="发货单号">
							<el-input placeholder="请输入..." v-model="carrierbillInfo.shipperNo"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="运输方式" prop="transportType">
							<el-select 
								v-model="carrierbillInfo.transportType" 
								placeholder="请选择" 
								style="width:100%">
								<el-option 
									v-for="(label, value) in TRANSPORTTYPE" 
									:key="value" 
									:label="label" 
									:value="value">
								</el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="委托时间" prop="commissionDate">
							<el-date-picker 
								style="width:100%" 
								type="date" 
								placeholder="请选择" 
								value-format="timestamp" 
								v-model="carrierbillInfo.commissionDate">
							</el-date-picker>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="8">

						<el-form-item label="委托方" prop="consignorID">
							<el-autocomplete
								value-key="companyName" style="width:100%"
								v-model="carrierbillInfo.consignorName"
								:fetch-suggestions="getConsignorCompany"
								placeholder="请输入..." 
								@select="handSelectConsignorCompany">
								<i class="el-icon-close el-input__icon" slot="suffix"  @click="clearSelectConsignor"></i>
							</el-autocomplete>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="20">
					<el-col :span="12">
						<div class="section-block posr">
							<span class="block-title">发货信息</span>
							<span class="addCompany" @click="addAddress('shipper')">新增企业地址</span>
							<el-row class="block-content">
								<el-form-item label="发货单位" prop="shipperID">
									<el-autocomplete  style="width:100%"
										value-key="companyName" 
										v-model="carrierbillInfo.shipperCompanyName"
										:fetch-suggestions="getShipperCompany"
										placeholder="请输入..."
										@select="handSelectShipperCompany">
									</el-autocomplete>
								</el-form-item>
							</el-row>
							<el-row class="block-content">
								<el-form-item label="发货地址" prop="shipperName">
									<input v-model="carrierbillInfo.shipperName" hidden="true"/>
									<dropdown-select 
										addressType="发货单位"
										:selected="selectedShipperAddress" 
										:isChangeCompany="isChangeShipper" 
										@select="handSelectshipperAddress" 
										:fetch-suggestions="getShipperAddress">
									</dropdown-select>
								</el-form-item>
							</el-row>
							<el-row class="block-content">
								<el-col :span="14">
									<el-form-item label="发货时间" prop="shipperDate">
										<el-date-picker 
											format="yyyy-MM-dd"
											type="date" 
											style="width:100%;" 
											placeholder="选择发货日期" 
											v-model="carrierbillInfo.shipperDate" 
											value-format="timestamp"
											@change = "handSelectDate"
											:picker-options="{ 
												disabledDate: (curDate) => {
													if (carrierbillInfo.consigneeDate) {
														return curDate > carrierbillInfo.consigneeDate
													} else {
														return false
													}
												}}" 
											>
										</el-date-picker>
									</el-form-item>
								</el-col>
								<el-col :span="10">
									<el-form-item label-width="20px" prop="shipperDateTime">
										<el-time-select
											v-model="shipperDateTime"
											:disabled = carrierbillInfo.shipperDate?false:true
											:picker-options="{ 
												start:'00:00',
												step: '00:30',
												end:'23:30',
												minTime:this.minDateTime,
												maxTime:(carrierbillInfo.consigneeDate>carrierbillInfo.shipperDate)?'':carrierbillInfo.consigneeTime
											}"
											@change="handSelectShipperTime"
											style="width:100%"
											placeholder="选择发货时间">
										</el-time-select>
									</el-form-item>
								</el-col>
							</el-row>
						</div>
					</el-col>
					<el-col :span="12">
						<div class="section-block posr">
							<span class="block-title">到货信息</span>
							<span class="addCompany" @click="addAddress('consignee')">新增企业地址</span>
							<el-row class="block-content">
								<el-form-item label="收货单位" prop="consigneeID">
									<el-autocomplete  style="width:100%"
										value-key="companyName" 
										v-model="carrierbillInfo.consigneeCompanyName"
										:fetch-suggestions="getConsigneeCompany"
										placeholder="请输入内容"
										@select="handSelectConsigneeCompany">
									</el-autocomplete>
								</el-form-item>
							</el-row>
							<el-row class="block-content">
								<el-form-item label="收货地址" prop="consigneeName">
									<input v-model="carrierbillInfo.consigneeName" hidden="true"/>
									<dropdown-select 
										addressType="收货单位" 
										:selected="selectedConsigneeAddress" 
										:isChangeCompany="isChangeConsignee" 
										@select="handSelectConsigneeAddress" 
										:fetch-suggestions="getConsigneeAddress">
									</dropdown-select>
								</el-form-item>
							</el-row>
							<el-row class="block-content">
								<el-col :span="14">
									<el-form-item label="到货时间" prop="consigneeDate">
										<el-date-picker 
											format="yyyy-MM-dd"
											type="date"
											placeholder="选择到货日期" 
											v-model="carrierbillInfo.consigneeDate" 
											value-format="timestamp"
											style="width:100%"
											@change = "handSelectDate"
											:picker-options="{ 
												disabledDate: (curDate) => {
													if (carrierbillInfo.shipperDate) {
														return curDate < carrierbillInfo.shipperDate
													} else {
														return false
													}
												}}" 
											>
										</el-date-picker>
									</el-form-item>
								</el-col>
								<el-col :span="10">
									<el-form-item label-width="20px" prop="consigneeTime">
										<el-time-select
											v-model="consigneeDateTime"
											:disabled = carrierbillInfo.consigneeDate?false:true
											:picker-options="{
												start:'00:00',
												step: '00:30',
												end:'23:30',
												minTime:(carrierbillInfo.consigneeDate>carrierbillInfo.shipperDate)?'':shipperDateTime
											}"
											value-format="timestamp"
											style="width:100%"
											placeholder="选择到货时间">
										</el-time-select>
									</el-form-item>
								</el-col>
							</el-row>
						</div>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="24">
						<p class="feeTips c1 text-center">运输距离：{{receivableDistance?Number(receivableDistance/1000).toFixed(2):''}}公里</p>
					</el-col>
				</el-row>
				<el-row>
					<div class="section-block">
						<span class="block-title">货物信息</span>
						<div class="cargoTable">
							<el-form label-width="0" size="small" :model="carrierbillInfo" ref="cargoRuleForm">
								<table class="cargoList">
									<tr>
										<th><span>*</span>货名</th>
										<th>配载方式</th>
										<th>重量</th>
										<th>体积</th>
										<th>数量</th>
										<th>单位</th>
										<th>操作</th>
									</tr>
									<tbody>
										<tr v-for="(item, index) in carrierbillInfo.carrierCargo" :key="index">
											<td>
												<el-form-item 
													label-width="0" 
													:prop="'carrierCargo.' + index + '.cargoID'" 
													:rules="[{ required: true, message: '请输入货名'}]">
													<el-autocomplete 
														style="width:100%" 
														popper-class="auto-complete-list"
														value-key="cargoName" 
														v-model="item.cargoName" 
														:fetch-suggestions="getCargos"
														placeholder="请输入..." 
														@select="handSelectCargo" 
														@input="inputSelectCargo(index)">
														<i class="el-icon-close el-input__icon" slot="suffix"  @click="clearSelect(index)"></i>
													</el-autocomplete>
												</el-form-item>
											</td>
											<td>
												<el-form-item label-width="0">
													<el-input placeholder="配载方式" style="width:100%" :value="DISPATCHTYPE[item.dispatchType]" disabled></el-input>
												</el-form-item>
											</td>
											<td style="border-spacing:0">
												<el-form-item label-width="0" :prop="'carrierCargo.' + index + '.cargoWeight'" :rules="[{ validator: checkFloat2 },{
														validator: (rule, value, callback) => {
															if (item.dispatchType=='Weight' &&(!item.cargoWeight || item.cargoWeight == '0')) {
																callback('请输入重量')
															}else{
																if (item.dispatchType=='Quantity' 
																&& (!item.cargoWeight || item.cargoWeight == '0') 
																&& (!item.cargoVolume|| item.cargoVolume == '0')) {
																	callback('体积和重量必填一项')
																} else {
																	callback()
																}
															}
														}
													}]">
													<el-input placeholder="货物重量" v-model="item.cargoWeight">
														<template slot="append">吨</template>
													</el-input>
												</el-form-item>
											</td>
											<td style="border-spacing:0">
												<el-form-item label-width="0" :prop="'carrierCargo.' + index + '.cargoVolume'" :rules="[{ validator: checkFloat2 },{
														validator: (rule, value, callback) => {
															if (item.dispatchType=='Volumn'&&(!item.cargoVolume|| item.cargoVolume == '0')) {
																callback('请输入体积')
															}else {
																if (item.dispatchType=='Quantity' 
																&& (!item.cargoWeight || item.cargoWeight == '0') 
																&& (!item.cargoVolume|| item.cargoVolume == '0')) {
																	callback('体积和重量必填一项')
																} else {
																	callback()
																}
															}
														}
													}]">
													<el-input placeholder="货物体积" v-model="item.cargoVolume">
														<template slot="append">方</template>
													</el-input>
												</el-form-item>
											</td>
											<td>
												<el-form-item label-width="0" :prop="'carrierCargo.' + index + '.cargoNum'" :rules="[{
														validator: (rule, value, callback) => {
															if (item.dispatchType=='Quantity'&&(!item.cargoNum || item.cargoNum == '0')) {
																callback('请输入数量')
															}else{
																callback()
															}
														}
													}]">
													<el-input-number v-model="item.cargoNum" :min="0"></el-input-number>
												</el-form-item>
											</td>
											<td><el-form-item label-width="0"><el-select v-model="item.cargoUnitName" placeholder="请选择" disabled>
												<el-option 
													v-for="(unit, index) in units" 
													:key="index" 
													:label="unit.unit" 
													:value="unit.unit">
												</el-option>
											</el-select></el-form-item></td>
											<td>
												<el-form-item label-width="0">
													<el-button type="text" icon="el-icon-plus" @click="addItem" v-if="index == 0">添加</el-button>
													<el-button type="text" icon="el-icon-delete" style="color:#F56C6C" @click="removeItem(index)" v-else>删除</el-button>
												</el-form-item>
											</td>
										</tr>
									</tbody>
									<tfoot>
										<tr>
											<td colspan="2" align="right">合计：</td>
											<td align="center">{{sum('cargoWeight')}}吨</td>
											<td align="center">{{sum('cargoVolume')}}方</td>
											<td align="center">{{ parseInt(sum('cargoNum'))}}</td>
											<td></td>
											<td></td>
										</tr>
									</tfoot>
								</table>
							</el-form>
						</div>
					</div>
				</el-row>
				<el-row :gutter="20">
					<el-col :span="12">
						<div class="section-block" style="min-height:120px">
							<span class="block-title">运输费用<span class="titTips">（如已配置委托方的应收运价，系统会默认算金额）</span></span>
							<el-row class="block-content">
								<div class="transFeeTips" v-if="+receivableWeightUnitPrice || +receivableVolumnUnitPrice">
									<svg-icon icon-class="info" class="infoIcon"></svg-icon>
									<p>委托方{{carrierbillInfo.consignorName}}已配置应收运价（{{receivableWeightUnitPrice}}吨/公里，{{receivableVolumnUnitPrice}}方/公里）根据货量、运输距离计算出的参考金额 {{totalPrice()}}元</p>
								</div>
								<el-form-item label="运费金额" prop="freight">
									<el-input placeholder="请输入..." v-model="carrierbillInfo.freight" @change="changeFreight"></el-input>
								</el-form-item>
							</el-row>
						</div>
					</el-col>
					<el-col :span="12">
						<div class="section-block" style="min-height:120px">
							<span class="block-title">回单要求</span>
							<el-row class="block-content">
								<el-form-item label="单据">
									<el-checkbox-group v-model="carrierbillInfo.porRequire">
										<el-checkbox label="ConsigneePor" name="porRequire">货物托运单</el-checkbox>
										<el-checkbox label="ShipperPor" name="porRequire">货物发货单</el-checkbox>
									</el-checkbox-group>
								</el-form-item>
							</el-row>
						</div>
					</el-col>
				</el-row>
				<el-row>
					<el-form-item align="center" label-width="0">
						<el-button type="primary" @click="save">保存</el-button>
						<el-button @click="back">返回</el-button>
					</el-form-item>
				</el-row>
			</el-form>
		</el-card>
		<add-com-address 
			:isVisible="addressDialog" 
			:company="currentCompany" 
			@control="handAddress">
		</add-com-address>
	</div>
</template>
<script type="text/javascript">
import { Message } from 'element-ui'
import axios from 'axios'
import { mapGetters } from 'vuex'
import CarryOrder from '../../../api/CarryOrder'
import Company from '../../../api/Company'
import { timeToTimestamp, timestampToTime,getDateTotimestamp } from '../../../common/utils'
import DropdownSelect from '../../CommonComponents/DropdownSelect'
import AddComAddress from './components/AddComAddress'
import { checkInt, checkFloat2 } from '../../../common/validator'
export default {
	data() {
		const checkShipperDateTime = (rule, value, callback) => {
			if (this.carrierbillInfo.consigneeDate && (value > this.carrierbillInfo.consigneeDate)) {
				callback(new Error('发货时间不能晚于到货时间'))
			} else {
				callback()
			}
		}
		const checkConsigneeDateTime = (rule, value, callback) => {
			if (this.carrierbillInfo.shipperDate&& (value < this.carrierbillInfo.shipperDate)) {
				callback(new Error('到货时间不能早于发货时间'))
			} else {
				callback()
			}
		}
		return {
			currentCompany: {},
			addressDialog: false,
			isChangeShipper: false,
			isChangeConsignee: false,
			placeholder1:'请选择发货地址',
			placeholder2:'请选择收货地址',
			units: [],
			minDateTime:'',
			shipperAddress:[],
			consigneeAddress:[],
			searchKeyWord:'',
			receivableDistance: 0,
			receivableVolumnUnitPrice: 0,
			receivableWeightUnitPrice: 0,
			shipperDateTime:'',
			consigneeDateTime:'',
			carrierbillInfo: {
				shipperNo: '',                  /** String 发货单号*/
				transportType: '公路运输',              /** String 运输方式*/
				commissionDate: new Date().getTime(),             /** Date 委托时间*/
				shipperID: '',                  /** Long 发货单位ID*/
				shipperCompanyName: '',         /** String 发货单位名称*/
				shipperAddressID: '',           /** Long 发货人地址ID*/
				shipperPhone: '',               /** String 发货人电话*/
				shipperAreaID: '',              /** Long 发货人区域ID*/
				shipperLocationLng: '',         /** BigDecimal 发货人地址经度*/
				shipperLocationLat: '',         /** BigDecimal 发货人地址纬度*/
				shipperLocationAddress: '',     /** String 发货人定位地址*/
				shipperName: '',                /** String 发货人名字*/
				shipperDetailAddress: '',       /** String 发货人详细地址*/
				shipperDate: '',                /** Date 发货人时间*/
				shipperTime:'',
				consigneeID: '',                /** Long 收货单位ID*/
				consigneeCompanyName: '',       /** String 收货单位名称*/
				consigneeAddressID: '',         /** Long 收货人地址ID*/
				consigneeName: '',              /** String 收货人名字*/
				consigneePhone: '',             /** String 收货人电话*/
				consigneeAreaID: '',            /** Long 收货人区域ID*/
				consigneeLocationLng: '',       /** BigDecimal 收货人地址经度*/
				consigneeLocationLat: '',       /** BigDecimal 收货人地址纬度*/
				consigneeLocationAddress: '',   /** String 收货人定位地址*/
				consigneeDetailAddress: '',     /** String 收货人详细地址*/
				consigneeDate: '',              /** Date 收货时间*/
				consigneeTime:'',
				carrierCargo: [{
					cargoID: '',
					cargoName: '',
					dispatchType: '',
					cargoWeight:'',
					cargoVolume: '',
					cargoNum: '',
					cargoUnitName: ''
				}],                    /** String货物清单（JSON串）*/
				freight: '',                    /** BigDecimal运费*/
				porRequire: []                /** String 回单要求*/
			},
			freight:'',
			selectedShipper: null,
			selectedConsignee: null,
			selectedShipperAddress: null,
			selectedConsigneeAddress: null,
			flagShipperCompanyName: '',
			flagConsigneeCompanyName: '',
			rules: {
				commissionDate: [ {required: true, message: '请选择委托时间'} ],
				consignorName: [ {required: true, message: '请输入托运人'} ],
				carrierrName: [ {required: true, message: '请输入承运人'} ],
				shipperID: [ {required: true, message: '请选择发货单位'} ],
				shipperName: [ { required: true, message: '请选择发货地址', trigger: 'change'} ],
				shipperDate: [ {required: true, message: '请选择发货时间'},{validator: checkShipperDateTime}],
				consigneeID: [ {required: true, message: '请选择收货单位'} ],
				consigneeName: [ { required: true, message: '请选择收货地址', trigger: 'change'} ],
				consigneeDate: [ {required: true, message: '请选择收货时间'},{validator: checkConsigneeDateTime} ],
				transportType: [ {required: true, message: '请选择运输方式'} ],
				freight: [ {required: true, message: '请输入运费金额'} ]
			}
		}
	},
	components: { DropdownSelect, AddComAddress},
	computed: {
		checkInt: () => checkInt,
		checkFloat2: () => checkFloat2
	},
	created() {
		this.getInfo()
		this.getUnits()
	},
	methods: {
		getInfo() {
			const carrierOrderID = this.$route.query.carrierOrderID
			CarryOrder.findById({ carrierOrderID }).then(res => {
				const carrierbillInfo = res
				if (res.porRequire.indexOf(',') > -1) {
					carrierbillInfo.porRequire = res.porRequire.split(',')
				} else {
					carrierbillInfo.porRequire = [res.porRequire]
				}
				this.selectedShipper = {
					customerAddressNum: 1
				}
				this.selectedShipperAddress = {
					customerAddressID: res.shipperAddressID,
					contactName: res.shipperName,
					contactPhone: res.shipperPhone,
					contactArea: res.shipperArea,
					locationAddress: res.shipperLocationAddress,
					detailAddress: res.shipperDetailAddress
				}
				this.selectedConsignee = {
					customerAddressNum: 1
				}
				this.selectedConsigneeAddress = {
					customerAddressID: res.consigneeAddressID,
					contactName: res.consigneeName,
					contactPhone: res.consigneePhone,
					contactArea: res.consigneeArea,
					locationAddress: res.consigneeLocationAddress,
					detailAddress: res.consigneeDetailAddress
				}
				carrierbillInfo.flagShipperCompanyName = res.shipperCompanyName
				carrierbillInfo.flagConsigneeCompanyName = res.consigneeCompanyName
				
				this.carrierbillInfo = carrierbillInfo
				if (!!this.$route.query.copy) {
					this.carrierbillInfo.shipperDate = ''
					this.carrierbillInfo.shipperDateTime = ''
					this.carrierbillInfo.consigneeDate = ''
					this.carrierbillInfo.consigneeDateTime = ''
				} else {
					this.shipperDateTime = timestampToTime(res.shipperDate)
					this.consigneeDateTime = timestampToTime(res.consigneeDate)
				}
				this.listForCalc()
				this.getMinDateTime()
			})
		},
		changeFreight(val){
			this.freight = val
		},
		handSelectDate (){
			this.$refs['ruleForm'].validateField('shipperDate')
			this.$refs['ruleForm'].validateField('consigneeDate')
			let now = new Date()
			let hour = now.getHours() < 10 ? '0' + now.getHours() : now.getHours()
			let minute = now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes()
			if(new Date(this.carrierbillInfo.shipperDate).getDate() == now.getDate()){
				if(minute > 30){
					this.minDateTime =  hour +1 +":"+"00"
				}else{
					this.minDateTime =  hour +":"+"00"
				}
			}else{
				this.minDateTime = ''
			}
			this.shipperDateTime=''
			this.consigneeDateTime=''
		},
		handSelectShipperTime(val){
			if(!val){
				this.carrierbillInfo.shipperTime=''
			}
		},
		handSelectConsigneeTime(val){
			if(!val){
				this.carrierbillInfo.consigneeTime=''
			}
		},
		getMinDateTime() {
			let now = new Date()
			let hour = now.getHours() < 10 ? '0' + now.getHours() : now.getHours()
			let minute = now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes()
			if(new Date(this.carrierbillInfo.shipperDate).getDate() == now.getDate()){
				if(minute > 30){
					this.minDateTime =  hour +1 +":"+"00"
				}else{
					this.minDateTime =  hour +":"+"00"
				}
			}else{
				this.minDateTime = ''
			}
		},
		sum(o) {
			let sum = 0
			for (let i = this.carrierbillInfo.carrierCargo.length - 1; i >= 0; i--) {
				sum += Number(this.carrierbillInfo.carrierCargo[i][o])
			}
			return sum.toFixed(2)
		},
		totalPrice() {
			let sum = 0
			if (this.receivableDistance) {
				for (let i = this.carrierbillInfo.carrierCargo.length - 1; i >= 0; i--) {
					if (this.carrierbillInfo.carrierCargo[i].dispatchType == 'Weight') {
						sum += Number(this.carrierbillInfo.carrierCargo[i].cargoWeight) 
							* this.receivableWeightUnitPrice 
							* this.receivableDistance/1000
					} else {
						sum += Number(this.carrierbillInfo.carrierCargo[i].cargoVolume) 
							* this.receivableVolumnUnitPrice 
							* this.receivableDistance/1000
					}
				}
			}
			return sum.toFixed(2)
		},
		getUnits() {
			Company.cargoUnit().find({
				current: 1,
				size: 1000
			}).then(res => {
				this.units = res.records
			})
		},
		getCargos(queryString, cb) {
			Company.cargo().find({
				current: 1,
				size: 1000,
				customerID: this.carrierbillInfo.shipperID,
				cargoName: queryString
			}).then(res => {
				const obj = {}, result = [], list = res.records
				for (let i = 0; i < list.length; i++) {
					if (!obj[list[i].cargoName]) {
						obj[list[i].cargoName]  = 1
						result.push(list[i])
					}
				}
				cb(result)
			})
		},
		clearSelect(index){
			this.carrierbillInfo.carrierCargo[index].cargoName = ''
		},
		getConsignorCompany(queryString, cb) {
			if (queryString != this.carrierbillInfo.flagConsignorName) {
				this.carrierbillInfo.ConsignorID = ''
			}
			Company.customer().suggest({
				customerType: 'Delegate',
				companyName: queryString
			}).then(res => {
				cb(res)
			})
		},
		getShipperCompany(queryString, cb) {
			if (queryString != this.carrierbillInfo.flagConsignorName) {
				this.carrierbillInfo.shipperID = ''
			}
			Company.customer().suggest({
				customerType: 'Shipper',
				companyName: queryString
			}).then(res => {cb(res) })
		},
		getConsigneeCompany(queryString, cb) {
			if (queryString != this.carrierbillInfo.flagConsigneeCompanyName) {
				this.carrierbillInfo.consigneeID = ''
			}
			Company.customer().suggest({
				customerType: 'Consignee',
				companyName: queryString

			}).then(res => { cb(res) })
		},

		getShipperAddress(queryString, cb) {
			Company.customerAddress().listOfCarrierOrder({
				customerID: this.carrierbillInfo.shipperID,
				keyword: queryString
			}).then(res => {
				cb && cb(res)
			})
		},
		getConsigneeAddress(queryString, cb){
			Company.customerAddress().listOfCarrierOrder({
				customerID: this.carrierbillInfo.consigneeID,
				keyword: queryString
			}).then(res => {
				cb && cb(res)
			})
		},
		handSelectCargo(data) {
			this.carrierbillInfo.carrierCargo.forEach(item => {
				if (item.cargoName == data.cargoName) {
					item.cargoID = data.cargoID
					item.cargoUnitName = data.cargoUnit
				}
			})
		},
		inputSelectCargo(i) {
			this.carrierbillInfo.carrierCargo[i].cargoID = ''
		},
		handSelectConsignorCompany(data) {
			this.selectedDelegate = data
			this.carrierbillInfo.consignorName = ' '
			this.carrierbillInfo.consignorID = data.customerID
			this.$nextTick(() => {
				this.carrierbillInfo.consignorName = data.companyName
				this.carrierbillInfo.flagConsignorName = data.companyName
			})
			this.listForCalc()
		},
		handSelectShipperCompany(data) {
			this.isChangeShipper = !this.isChangeShipper
			this.selectedShipper = data
			this.carrierbillInfo.shipperCompanyName = ' '
			this.carrierbillInfo.shipperID = data.customerID
			this.$nextTick(() => {
				this.carrierbillInfo.shipperCompanyName = data.companyName
				this.carrierbillInfo.flagShipperCompanyName = data.companyName
				this.getShipperAddress('', false)
			})
			this.listForCalc()
		},
		handSelectConsigneeCompany(data) {
			this.isChangeConsignee = !this.isChangeConsignee
			this.selectedConsignee = data
			this.carrierbillInfo.consigneeCompanyName = ' '
			this.carrierbillInfo.consigneeID = data.customerID
			this.$nextTick(() => {
				this.carrierbillInfo.consigneeCompanyName = data.companyName
				this.carrierbillInfo.flagConsigneeCompanyName = data.companyName
				this.getConsigneeAddress('', false)
			})
			this.listForCalc()
		},
		handSelectshipperAddress(data) {
			this.carrierbillInfo.shipperAreaID = data.areaID
			this.carrierbillInfo.shipperAddressID = data.customerAddressID
			this.carrierbillInfo.shipperName = data.contactName
			this.carrierbillInfo.shipperPhone = data.contactPhone
			this.carrierbillInfo.shipperArea = data.contactArea
			this.carrierbillInfo.shipperDetailAddress = data.detailAddress
			this.carrierbillInfo.shipperLocationAddress = data.locationAddress
			this.carrierbillInfo.shipperLocationLng = data.locationLng
			this.carrierbillInfo.shipperLocationLat = data.locationLat
			this.listForCalc()
			this.$refs['ruleForm'].validateField('shipperName')
		},
		handSelectConsigneeAddress(data) {
			this.carrierbillInfo.consigneeAreaID = data.areaID
			this.carrierbillInfo.consigneeAddressID = data.customerAddressID
			this.carrierbillInfo.consigneeName = data.contactName
			this.carrierbillInfo.consigneePhone = data.contactPhone
			this.carrierbillInfo.consigneeArea = data.contactArea
			this.carrierbillInfo.consigneeDetailAddress = data.detailAddress
			this.carrierbillInfo.consigneeLocationAddress = data.locationAddress
			this.carrierbillInfo.consigneeLocationLng = data.locationLng
			this.carrierbillInfo.consigneeLocationLat = data.locationLat
			this.listForCalc()
			this.$refs['ruleForm'].validateField('consigneeName')
		},
		clearSelectShipper(){
			this.carrierbillInfo.shipperCompanyName = ' '
			this.carrierbillInfo.shipperID = ''
		},
		clearSelectConsignee(){
			this.carrierbillInfo.consigneeCompanyName = ' '
			this.carrierbillInfo.consigneeID =''
		},
		clearSelectConsignor(){
			this.carrierbillInfo.consignorName = ' '
			this.carrierbillInfo.consignorID =''
		},
		listForCalc() {
			const customerID = this.carrierbillInfo.consignorID   /**委托客户ID*/
			const shipperCustomerID = this.carrierbillInfo.shipperID   /**发货客户ID*/
			const shipperCustomerAddressID = this.carrierbillInfo.shipperAddressID  /**发货客户地址ID*/
			const consigneeCustomerID = this.carrierbillInfo.consigneeID   /**收货客户ID*/
			const consigneeCustomerAddressID = this.carrierbillInfo.consigneeAddressID   /**收货客户地址ID*/
			if (!customerID 
				|| !shipperCustomerID 
				|| !shipperCustomerAddressID 
				|| !consigneeCustomerID 
				|| !consigneeCustomerAddressID) return
			Company.customerRoutePrice().listForCalc([{
				customerID,  
				shipperCustomerID,  
				shipperCustomerAddressID,
				consigneeCustomerID,
				consigneeCustomerAddressID
			}]).then(res => {
				this.receivableDistance = res[0].receivableDistance
				this.receivableVolumnUnitPrice = res[0].receivableVolumnUnitPrice
				this.receivableWeightUnitPrice = res[0].receivableWeightUnitPrice
				if (!this.receivableDistance) {
					console.log(111111)
					const start = this.carrierbillInfo.shipperLocationLng + ',' + this.carrierbillInfo.shipperLocationLat
					const end = this.carrierbillInfo.consigneeLocationLng + ',' + this.carrierbillInfo.consigneeLocationLat
					this.getDistance(start, end)
				}
				// if (+this.receivableVolumnUnitPrice == 0 && +this.receivableWeightUnitPrice == 0) {
				// 	this.carrierbillInfo.freight = ''
				// }
			})
		},
		/**
		 * 调用高德地图接口获取距离
		 */
		async getDistance(start, end) {
			const url = `https://restapi.amap.com/v3/distance?origins=${start}&destination=${end}&key=${this.MAPKEY}`
			const res = await axios({ url })
			if (res.data.status == 1) this.receivableDistance = res.data.results[0].distance
		},
		save() {
			new Promise((resolve, reject) => {
				this.$refs['ruleForm'].validate(valid => {
					if (!valid) {
						this.$nextTick(() => {
							Message.error($('.el-form-item__error:first').text())
						})
						return
					}
					resolve()
				})
			}).then(() => {
				this.$refs['cargoRuleForm'].validate(valid => {
					if (!valid) return
					const carrierbill = Object.assign({}, this.carrierbillInfo)
					for (let i = 0; i < carrierbill.carrierCargo.length; i++) {
						const cargo = carrierbill.carrierCargo[i]
						if (!cargo.cargoWeight) cargo.cargoWeight = 0
						if (!cargo.cargoVolume) cargo.cargoVolume = 0
						if (!cargo.cargoNum) cargo.cargoNum = 0
					}
					carrierbill.carrierCargo = JSON.stringify(carrierbill.carrierCargo)
					carrierbill.porRequire = carrierbill.porRequire.join(',')
					
					if (this.shipperDateTime) {
						carrierbill.shipperDate = getDateTotimestamp(this.carrierbillInfo.shipperDate) + timeToTimestamp(this.shipperDateTime)
					} else {
						carrierbill.shipperDate = getDateTotimestamp(this.carrierbillInfo.shipperDate) + 86399000
					}
					if (this.consigneeDateTime) {
						carrierbill.consigneeDate = getDateTotimestamp(this.carrierbillInfo.consigneeDate) + timeToTimestamp(this.consigneeDateTime)
					} else {
						carrierbill.consigneeDate = getDateTotimestamp(this.carrierbillInfo.consigneeDate) + 86399000
					}
					if (!!this.$route.query.copy) {
						delete carrierbill.carrierOrderID
						CarryOrder.add(carrierbill).then(res => {
							Message.success('成功！')
							this.$router.push({name: 'carrierbill'})
						})
					} else {
						CarryOrder.update(carrierbill).then(res => {
							Message.success('成功！')
							this.$router.push({name: 'carrierbill'})
						})
					}
				})
			})
		},
		addItem() {
			const dispatchType = this.carrierbillInfo.carrierCargo[0] ? this.carrierbillInfo.carrierCargo[0].dispatchType : 'Weight'
			this.carrierbillInfo.carrierCargo.push({
				cargoID: '',
				cargoName: '',
				cargoNum: '',
				cargoUnitName: '',
				cargoWeight: '',
				cargoVolume: '',
				dispatchType
			})
		},
		removeItem(index) {
			this.carrierbillInfo.carrierCargo.splice(index, 1)
		},
		clearSelectConsignor(){
			this.carrierbillInfo.consignorName = ' '
			this.carrierbillInfo.consignorID =''
		},
		/**
		 * 添加企业地址
		 */
		addAddress(type) {
			this.addressDialog = true
		},
		handAddress() {
			this.addressDialog = false
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
.add-cargo-btn
	position absolute
	right 20px
	top -9px
	background-color #fff
.cargoTable
	padding 10px 20px 20px
	.cargoList
		width 100%
		font-size 14px
		background #eee
		border-spacing 1px
		th
		td
			padding 5px 12px
			background #fff
		th
			color #999
			padding 10px 12px
			span
				color #f56c6c
				margin-right 4px
		tfoot
			font-size 12px
			td
				padding 10px 12px

.addCompany
	background #409eff
	color #FFF
	cursor pointer
	border-radius 4px
	padding 0 12px
	font-size 12px
	line-height 24px
	height 24px
	position absolute
	right 10px
	top -12px
.addressBox
	background  #fff
	width 100%
	border-radius 4px
	border 1px solid #dcdfe6
	box-sizing border-box
	color #606266
	display inline-block
	vertical-align top
	height 96px
	line-height 32px
	cursor pointer
	padding 0 15px
	font-size 13.3333px
	.placeholder
		color #C0C4CC
.titTips
	font-size 12px
	margin-left 10px
	color #ccc
.transFeeTips
	line-height 20px
	font-size 12px
	color #a2a2a2
	padding-left 34px
	position relative
	margin-bottom 10px
	p
		line-height 20px
	.infoIcon
		position absolute
		left 16px
		top 5px
.feeTips
	margin-bottom 10px
	font-size 12px

.section-block
	margin 10px 0
</style>