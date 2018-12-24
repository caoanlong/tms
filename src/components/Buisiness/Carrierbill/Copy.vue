<template>
	<div class="main-content" style="min-width: 1050px">
		<el-card class="box-card hasTit">
			<el-form label-width="100px" size="small" :model="carrierbillInfo" :rules="rules" ref="ruleForm">
				<el-row>
					<el-col :span="8">
						<el-form-item label="发货单号" prop="shipperNo">
							<el-input placeholder="请输入..." v-model="carrierbillInfo.shipperNo"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="委托方">
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
					<el-col :span="8">
						<el-form-item label="委托时间">
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
				<el-row :gutter="20">
					<el-col :span="12">
						<div class="section-block posr">
							<span class="block-title">发货信息</span>
							<span class="addCompany" @click="addAddress('shipper')">新增企业地址</span>
							<el-row class="block-content">
                                <el-form-item label="发货方" prop="shipperID">
									<el-autocomplete  style="width:100%"
										value-key="companyName" 
										v-model="carrierbillInfo.shipperCompanyName"
										:fetch-suggestions="getShipperCompany"
										placeholder="请输入..." 
										@select="handSelectShipperCompany">
										<i class="el-icon-close el-input__icon" slot="suffix"  @click="clearSelectShipper"></i>
									</el-autocomplete>
								</el-form-item>
							</el-row>
							<el-row class="block-content">
								<el-form-item label="发货地址" prop="shipperAreaID">
									<input v-model="carrierbillInfo.shipperAreaID" hidden="true"/>
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
											@change = "handSelectShipperDate"
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
									<el-form-item label-width="20px" prop="shipperTime">
										<el-time-select
											v-model="shipperDateTime"
											:disabled = carrierbillInfo.shipperDate?false:true
											:picker-options="{ 
												start:'00:00',
												step: '00:30',
												end:'23:30',
												minTime:this.minDateTime,
												maxTime:(carrierbillInfo.consigneeDate>carrierbillInfo.shipperDate)?'':this.consigneeDateTime
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
                                <el-form-item label="到货方" prop="consigneeID">
									<el-autocomplete  style="width:100%"
										value-key="companyName" 
										v-model="carrierbillInfo.consigneeCompanyName"
										:fetch-suggestions="getConsigneeCompany"
										placeholder="请输入..."
										@select="handSelectConsigneeCompany">
										<i class="el-icon-close el-input__icon" slot="suffix"  @click="clearSelectConsignee"></i>
									</el-autocomplete>
								</el-form-item>
							</el-row>
							<el-row class="block-content">
								<el-form-item label="到货地址" prop="consigneeAreaID">
									<input v-model="carrierbillInfo.consigneeAreaID" hidden="true"/>
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
											@change = "handSelectConsigneeDate"
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
												minTime:(carrierbillInfo.consigneeDate>carrierbillInfo.shipperDate)?'':this.shipperDateTime
											}"
                                            @change="handSelectConsigneeTime"
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
					<div class="section-block">
						<span class="block-title">产品信息</span>
						<div class="cargoTable">
							<el-form label-width="0" size="small" :model="carrierbillInfo" ref="cargoRuleForm">
								<table class="cargoList">
									<tr>
										<th><span>*</span>产品名称</th>
										<th width="130">配载方式</th>
										<th width="200">数量</th>
										<th width="200">重量</th>
										<th>操作</th>
									</tr>
									<tbody>
										<tr v-for="(item, index) in carrierbillInfo.carrierCargo" :key="index">
											<td>
												<el-form-item 
													label-width="0" 
													:prop="'carrierCargo.' + index + '.cargoID'" 
													:rules="[{ required: true, message: '请选择'}]">
													<el-autocomplete 
														style="width:100%" 
														popper-class="auto-complete-list"
														value-key="cargoName" 
														v-model="item.cargoName" 
														:fetch-suggestions="getCargos"
														placeholder="请输入..." 
														@select="handSelectCargo"
														@input="inputSelectCargo(index)">
														<template slot-scope="{ item }">
															{{ item.cargoName }}<span class="dispatchType">（{{item.dispatchType=='Weight'?'按重量配载':'按体积配载' }}）</span>
														</template>
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
												<el-form-item 
													label-width="0" 
													:prop="'carrierCargo.' + index + '.cargoNum'" 
													:rules="[{ validator: checkInt }]">
													<el-input placeholder="货物数量" v-model="item.cargoNum">
														<template slot="append">袋</template>
													</el-input>
												</el-form-item>
											</td>
											<td style="border-spacing:0">
												<el-form-item 
													label-width="0" 
													:prop="'carrierCargo.' + index + '.cargoWeight'" 
													:rules="[{ validator: checkFloat2 }, {
														validator: (rule, value, callback) => {
															if (!item.cargoWeight) {
																callback('请输入重量')
															} else {
																callback()
															}
														}
													}]">
													<el-input placeholder="货物重量" v-model="item.cargoWeight">
														<template slot="append">吨</template>
													</el-input>
												</el-form-item>
											</td>
											<td  align="center">
												<el-form-item label-width="0">
													<el-button type="text" icon="el-icon-plus" @click="addItem" v-if="index == 0">添加</el-button>
													<el-button type="text" icon="el-icon-delete" style="color:#F56C6C" @click="removeItem(index)" v-else>删除</el-button>
												</el-form-item>
											</td>
										</tr>
									</tbody>
									<tfoot>
										<tr>
											<td align="right" colspan="2">合计：</td>
											<td align="center">{{parseInt(sum('cargoNum'))}}袋</td>
											<td align="center">{{sum('cargoWeight')}}吨</td>
											<td align="center"></td>
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
							<span class="block-title">运输费用</span>
							<el-row class="block-content">
								<el-form-item label="应收金额" prop="freight">
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
import { timeToTimestamp, timestampToTime, formattimestamp } from '../../../common/utils'
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
			units: [],
			minDateTime:'',
			shipperDateTime:'',
			consigneeDateTime:'',
			carrierbillInfo: {
				shipperNo: '',                  /** String 发货单号*/
				transportType: '公路运输',
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
				shipperNo: [{ required: true, message: "请输入发货单号" }],
				carrierrName: [ {required: true, message: '请输入承运人'} ],
				shipperID: [ {required: true, message: '请选择发货单位'} ],
				shipperAreaID: [ { required: true, message: '请选择发货地址', trigger: 'change'} ],
				shipperDate: [ 
					{required: true, message: '请选择发货时间'},
					{validator: checkShipperDateTime}
				],
				consigneeID: [ {required: true, message: '请选择收货单位'} ],
				consigneeAreaID: [ { required: true, message: '请选择收货地址', trigger: 'change'} ],
				consigneeDate: [ 
					{required: true, message: '请选择收货时间'},
					{validator: checkConsigneeDateTime} 
				],
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
	},
	activated() {
		if(!this.$route.query.cache) {
			this.getInfo()
		}
	},
	methods: {
		getInfo() {
			const carrierOrderID = this.$route.query.carrierOrderID
			CarryOrder.findById({ carrierOrderID, isEdit: true }).then(res => {
				const carrierbillInfo = res
				if (res.porRequire) {
					if (res.porRequire.indexOf(',') > -1) {
						carrierbillInfo.porRequire = res.porRequire.split(',')
					} else {
						carrierbillInfo.porRequire = [res.porRequire]
					}
				} else {
					carrierbillInfo.porRequire = []
				}
				this.selectedShipper = {
					customerAddressNum: 1,
					companyAreaID: res.shipperAreaID,
					customerID: res.shipperID,
					companyName: res.shipperCompanyName,
					contactName: res.shipperName,
					contactPhone: res.shipperPhone
				}
				this.selectedShipperAddress = {
					areaID: res.shipperAreaID,
					customerAddressID: res.shipperAddressID,
					contactName: res.shipperName,
					contactPhone: res.shipperPhone,
					contactArea: res.shipperArea,
					locationAddress: res.shipperLocationAddress,
					detailAddress: res.shipperDetailAddress
				}
				this.selectedConsignee = {
					customerAddressNum: 1,
					companyAreaID: res.consigneeAreaID,
					customerID: res.consigneeID,
					companyName: res.consigneeCompanyName,
					contactName: res.consigneeName,
					contactPhone: res.consigneePhone
				}
				this.selectedConsigneeAddress = {
					areaID: res.consigneeAreaID,
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
                this.carrierbillInfo.shipperDate = ''
                this.carrierbillInfo.consigneeTime = ''
                this.carrierbillInfo.consigneeDate = ''
                this.carrierbillInfo.consigneeTime = ''

				this.getMinDateTime()
			})
		},
		changeFreight(val){
			this.freight = val
		},
		handSelectShipperDate(){
			this.$refs['ruleForm'].validateField('shipperDate')
			this.getMinDateTime()
			this.shipperDateTime=''
		},
		handSelectShipperTime(val){
			this.shipperDateTime = val ? val : ''
		},
		handSelectConsigneeDate(){
			this.$refs['ruleForm'].validateField('consigneeDate')
			this.getMinDateTime()
			this.consigneeDateTime=''
		},
		handSelectConsigneeTime(val){
			this.consigneeDateTime = val ? val : ''
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
		getCargos(queryString, cb) {
			Company.cargoFind({
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
			this.carrierbillInfo.carrierCargo[index].cargoID = ''
		},
		getConsignorCompany(queryString, cb) {
			if (queryString != this.carrierbillInfo.flagConsignorName) {
				this.carrierbillInfo.ConsignorID = ''
			}
			Company.customerSuggest({
				customerType: 'Delegate',
				companyName: queryString
			}).then(res => { cb(res) })
		},
		getShipperCompany(queryString, cb) {
			if (queryString != this.carrierbillInfo.flagConsignorName) {
				this.carrierbillInfo.shipperID = ''
			}
			Company.customerSuggest({
				customerType: 'Shipper',
				companyName: queryString
			}).then(res => {cb(res) })
		},
		getConsigneeCompany(queryString, cb) {
			if (queryString != this.carrierbillInfo.flagConsigneeCompanyName) {
				this.carrierbillInfo.consigneeID = ''
			}
			Company.customerSuggest({
				customerType: 'Consignee',
				companyName: queryString
			}).then(res => { cb(res) })
		},

		getShipperAddress(queryString, cb) {
			Company.customerAddressListOfCarrierOrder({
				customerID: this.carrierbillInfo.shipperID,
				keyword: queryString
			}).then(res => { cb && cb(res) })
		},
		getConsigneeAddress(queryString, cb){
			Company.customerAddressListOfCarrierOrder({
				customerID: this.carrierbillInfo.consigneeID,
				keyword: queryString
			}).then(res => { cb && cb(res) })
		},
		handSelectCargo(data) {
			this.carrierbillInfo.carrierCargo.forEach(item => {
				if (item.cargoName == data.cargoName) {
					item.cargoID = data.cargoID
					item.cargoUnitName = data.cargoUnit
					item.dispatchType = data.dispatchType
					item.cargoWeight = ''
					item.cargoVolume = ''
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
		async save() {
            const valid1 = await this.$refs["ruleForm"].validate()
            if (!valid1) return
            const valid2 = await this.$refs["cargoRuleForm"].validate()
            if (!valid2) return
            const carrierbill = Object.assign({}, this.carrierbillInfo)
            for (let i = 0; i < carrierbill.carrierCargo.length; i++) {
                const cargo = carrierbill.carrierCargo[i];
                if (!cargo.cargoWeight) cargo.cargoWeight = 0;
                if (!cargo.cargoVolume) cargo.cargoVolume = 0;
                if (!cargo.cargoNum) cargo.cargoNum = 0;
            }
            carrierbill.carrierCargo = JSON.stringify(carrierbill.carrierCargo);
            carrierbill.porRequire = carrierbill.porRequire.join(",");
            if (this.shipperDateTime) {
                carrierbill.shipperDate = String(Number(formattimestamp(carrierbill.shipperDate)) + Number(timeToTimestamp(this.shipperDateTime)))
            } else {
                carrierbill.shipperDate = String(Number(formattimestamp(carrierbill.shipperDate)) + 86399000)
            }
            if (this.consigneeDateTime) {
                carrierbill.consigneeDate = String(Number(formattimestamp(carrierbill.consigneeDate)) + Number(timeToTimestamp(this.consigneeDateTime)))
            } else {
                carrierbill.consigneeDate = String(Number(formattimestamp(carrierbill.consigneeDate)) + 86399000)
            }
			carrierbill.freight = this.freight ? this.freight : this.carrierbillInfo.freight
            delete carrierbill.carrierOrderID
            CarryOrder.add(carrierbill).then(res => {
                Message.success('成功！')
                this.$router.push({name: 'carrierbill'})
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
            if (type == "shipper") {
                this.currentCompany = this.selectedShipper
            } else {
                this.currentCompany = this.selectedConsignee
            }
            this.addressDialog = true
        },
		handAddress() {
			this.addressDialog = false
		},
		back() {
			this.$router.push({ name: 'carrierbill' })
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
.dispatchType
	font-size 12px
	color #bbb
	margin-right 5px

</style>