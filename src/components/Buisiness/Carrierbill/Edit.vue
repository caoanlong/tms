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
								<el-form-item label="发货时间" prop="shipperDate">
									<el-date-picker 
										format="yyyy-MM-dd HH:mm"
										type="datetime" 
										style="width:100%" 
										placeholder="选择发货时间" 
										v-model="carrierbillInfo.shipperDate" 
										value-format="timestamp"
										default-time="00:00:00"
										@change = "handSelectDate"
										:picker-options="{ disabledDate: (curDate) => curDate > carrierbillInfo.consigneeDate?carrierbillInfo.consigneeDate:''}" 
										>
									</el-date-picker>
								</el-form-item>
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
								<el-form-item label="到货时间" prop="consigneeDate">
									<el-date-picker 
										format="yyyy-MM-dd HH:mm"
										type="datetime" 
										style="width:100%" 
										placeholder="选择到货时间" 
										v-model="carrierbillInfo.consigneeDate" 
										value-format="timestamp"
										default-time="00:00:00"
										@change = "handSelectDate"
										:picker-options="{ disabledDate: (curDate) => curDate < carrierbillInfo.shipperDate?carrierbillInfo.shipperDate:''}" 
										>
									</el-date-picker>
								</el-form-item>
							</el-row>
						</div>
					</el-col>
				</el-row>
				<el-row>
					<div class="section-block">
						<span class="block-title">货物信息</span>
						<div class="cargoTable">
							<el-form label-width="0" size="small" :model="carrierbillInfo" ref="cargoRuleForm">
								<table class="cargoList">
									<tr>
										<th>客户单号</th>
										<th><span>*</span>货名</th>
										<th><span>*</span>配载方式</th>
										<th>重量</th>
										<th>体积</th>
										<th>数量</th>
										<th>单位</th>
										<th>操作</th>
									</tr>
									<tbody>
										<tr v-for="(item, index) in carrierbillInfo.carrierCargo" :key="index">
											<td><el-form-item label-width="0"><el-input placeholder="请输入..." v-model="item.customizedNo"></el-input></el-form-item></td>
											<td>
												<el-form-item label-width="0" :prop="'carrierCargo.' + index + '.cargoName'" :rules="[{ required: true, message: '请输入货名'}]">
													<el-autocomplete style="width:120px" popper-class="auto-complete-list"
													value-key="cargoName" v-model="item.cargoName" :fetch-suggestions="getCargos"
													placeholder="请输入..." @select="handSelectCargo" @input="inputSelectCargo(index)">
													</el-autocomplete>
												</el-form-item>
											</td>
											<td>
												<el-form-item label-width="0" :prop="'carrierCargo.' + index + '.dispatchType'" :rules="[{ required: true, message: '请选择配载方式'}]">
													<el-select v-model="item.dispatchType" placeholder="请选择配载方式" style="width:120px">
														<el-option label="按数量配载" value="Quantity"></el-option>
														<el-option label="按体积配载" value="Volumn"></el-option>
														<el-option label="按重量配载" value="Weight"></el-option>
													</el-select>
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
													<el-input placeholder="货物体积" v-model="item.cargoVolume"><template slot="append">方</template></el-input>
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
											<td><el-form-item label-width="0"><el-select v-model="item.cargoUnitName" placeholder="请选择">
												<el-option v-for="(unit, index) in units" :key="index" :label="unit.unit" :value="unit.unit"></el-option>
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
											<td colspan="3" align="right">合计：</td>
											<td align="center">{{sum('cargoWeight')}}吨</td>
											<td align="center">{{sum('cargoVolume')}}方</td>
											<td align="center">{{ parseInt(sum('cargoNum'))}}</td>
											<td colspan="2"></td>
										</tr>
									</tfoot>
								</table>
							</el-form>
						</div>
					</div>
				</el-row>
				<el-row>
					<el-col :span="12">
						<div class="section-block">
							<span class="block-title">运输费用</span>
							<el-row class="block-content">
								<el-form-item label="运费金额" prop="freight">
									<el-input placeholder="请输入..." v-model="carrierbillInfo.freight"></el-input>
								</el-form-item>
							</el-row>
						</div>
					</el-col>
					<el-col :span="12">
						<div class="section-block">
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
import { mapGetters } from 'vuex'
import Carrierbill from '../../../api/Carrierbill'
import Customer from '../../../api/Customer'
import CrossProxy from '../../../api/CrossProxy'
import CustomerAddress from '../../../api/CustomerAddress'
import CargoUnit from '../../../api/CargoUnit'
import CargoGeneralName from '../../../api/CargoGeneralName'
import { searchAreaByKey, areaIdToArrayId, searchLocationByCity } from '../../../common/utils'
import { checkTel } from '../../../common/validators'
import distData from '../../../assets/data/distpicker.data'
import Geohash from '../../../common/Geohash'
import DistPicker from '../../CommonComponents/DistPicker2'
import DropdownSelect from '../../CommonComponents/DropdownSelect'
import AddComAddress from './components/AddComAddress'
import { checkInt, checkFloat2 } from '../../../common/validator'
export default {
	data() {
		const checkShipperDateTime = (rule, value, callback) => {
			if (this.carrierbillInfo.consigneeDate&& (value >= this.carrierbillInfo.consigneeDate)) {
				callback(new Error('发货时间不能等于或晚于到货时间'))
			} else {
				callback()
			}
		}
		const checkConsigneeDateTime = (rule, value, callback) => {
			if (this.carrierbillInfo.shipperDate&& (value <= this.carrierbillInfo.shipperDate)) {
				callback(new Error('到货时间不能等于或早于发货时间'))
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
			shipperAddress:[],
			consigneeAddress:[],
			searchKeyWord:'',
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
				carrierCargo: [{
					customizedNo: '',
					cargoNameID: '',
					cargoName: '',
					dispatchType:'Weight',
					cargoWeight:'',
					cargoVolume: '',
					cargoNum: '',
					cargoUnitName: ''
				}],                    /** String货物清单（JSON串）*/
				freight: '',                    /** BigDecimal运费*/
				porRequire: []                /** String 回单要求*/
				
			},
			selectedShipper: null,
			selectedConsignee: null,
			selectedShipperAddress: null,
			selectedConsigneeAddress: null,
			flagShipperCompanyName: '',
			flagConsigneeCompanyName: '',
			rules: {
				shipperNo: [ {required: true, message: '请输入发货单号'} ],
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
			Carrierbill.findById({ carrierOrderID }).then(res => {
				this.carrierbillInfo = res
				if (res.porRequire.indexOf(',') > -1) {
					this.carrierbillInfo.porRequire = res.porRequire.split(',')
				} else {
					this.carrierbillInfo.porRequire = [res.porRequire]
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
					contactName:res.consigneeName,
					contactPhone:res.consigneePhone,
					contactArea:res.consigneeArea,
					locationAddress:res.consigneeLocationAddress,
					detailAddress:res.consigneeDetailAddress
				}
				this.carrierbillInfo.flagShipperCompanyName = res.shipperCompanyName
				this.carrierbillInfo.flagConsigneeCompanyName = res.consigneeCompanyName
			})
			
		},
		handSelectDate(){
			this.$refs['ruleForm'].validateField('shipperDate')
			this.$refs['ruleForm'].validateField('consigneeDate')
		},
		sum(o) {
			let sum = 0
			for (let i = this.carrierbillInfo.carrierCargo.length - 1; i >= 0; i--) {
				sum += Number(this.carrierbillInfo.carrierCargo[i][o])
			}
			return sum.toFixed(2)
		},
		getUnits() {
			CargoUnit.find({
				current: 1,
				size: 1000
			}).then(res => {
				this.units = res.records
			})
		},
		getCargos(queryString, cb) {
			CargoGeneralName.find({
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
		getShipperCompany(queryString, cb) {
			if (queryString != this.carrierbillInfo.flagShipperCompanyName) {
				this.carrierbillInfo.shipperID = ''
			}
			Customer.find({
				customerType: 'Shipper',
				keyword: queryString
			}).then(res => {cb(res.records) })
		},
		getConsigneeCompany(queryString, cb) {
			if (queryString != this.carrierbillInfo.flagConsigneeCompanyName) {
				this.carrierbillInfo.consigneeID = ''
			}
			Customer.find({
				customerType: 'Consignee',
				keyword: queryString
			}).then(res => { cb(res.records) })
		},
		getShipperAddress(queryString, cb){
			Customer.addressSuggest({
				customerID: this.carrierbillInfo.shipperID,
				keyword: queryString
			}).then(res => {
				cb && cb(res)
			})
		},
		getConsigneeAddress(queryString, cb){
			Customer.addressSuggest({
				customerID: this.carrierbillInfo.consigneeID,
				keyword: queryString
			}).then(res => {
				cb && cb(res)
			})
		},
		handSelectCargo(data) {
			this.carrierbillInfo.carrierCargo.forEach(item => {
				if (item.cargoName == data.cargoName) {
					item.cargoNameID = data.cargoNameID
					item.cargoUnitName = data.cargoUnit
				}
			})
		},
		inputSelectCargo(i) {
			this.carrierbillInfo.carrierCargo[i].cargoNameID = ''
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
					Carrierbill.update(carrierbill).then(res => {
						Message.success(res.data.msg)
						this.$router.push({name: 'carrierbill'})
					})
				})
			})
		},
		addItem() {
			const dispatchType = this.carrierbillInfo.carrierCargo[0] ? this.carrierbillInfo.carrierCargo[0].dispatchType : 'Weight'
			this.carrierbillInfo.carrierCargo.push({
				customizedNo: '',
				cargoNameID: '',
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
</style>