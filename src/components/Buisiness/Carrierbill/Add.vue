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
						<div class="section-block">
							<span class="block-title">发货信息</span>
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
								<el-form-item label="发货人" prop="shipperName">
									<el-autocomplete  style="width:100%"
										value-key="contactName" 
										v-model="carrierbillInfo.shipperName"
										:fetch-suggestions="getShipper"
										placeholder="请输入..."
										@select="handSelectShipper">
									</el-autocomplete>
								</el-form-item>
							</el-row>
							<el-row class="block-content">
								<el-form-item label="联系方式" prop="shipperPhone">
									<el-input placeholder="请输入..." v-model="carrierbillInfo.shipperPhone" @input="inputShipperPhone"></el-input>
								</el-form-item>
							</el-row>
							<el-row class="block-content">
								<el-form-item label="发货地" prop="shipperAreaID">
									<dist-picker :distList="selectedShipperArea" @hand-select="handleSelectedShipperArea"></dist-picker>
								</el-form-item>
							</el-row>
							<el-row class="block-content">
								<el-form-item label="定位地址" prop="shipperLocationAddress">
									<el-autocomplete  style="width:100%"
										value-key="name" 
										prefix-icon="el-icon-location"
										v-model="carrierbillInfo.shipperLocationAddress"
										:fetch-suggestions="getShipperLocation"
										placeholder="请输入..."
										@select="handSelectShipperLocation">
									</el-autocomplete>
								</el-form-item>
							</el-row>
							<el-row class="block-content">
								<el-form-item label="详细地址" prop="shipperDetailAddress">
									<el-input placeholder="请输入..." v-model="carrierbillInfo.shipperDetailAddress"></el-input>
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
										value-format="timestamp">
									</el-date-picker>
								</el-form-item>
							</el-row>
						</div>
					</el-col>
					<el-col :span="12">
						<div class="section-block">
							<span class="block-title">到货信息</span>
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
								<el-form-item label="收货人" prop="consigneeName">
									<el-autocomplete  style="width:100%"
										value-key="contactName" 
										v-model="carrierbillInfo.consigneeName"
										:fetch-suggestions="getConsignee"
										placeholder="请输入..."
										@select="handSelectConsignee">
									</el-autocomplete>
								</el-form-item>
							</el-row>
							<el-row class="block-content">
								<el-form-item label="联系方式" prop="consigneePhone">
									<el-input placeholder="请输入..." v-model="carrierbillInfo.consigneePhone" @input="inputConsigneePhone"></el-input>
								</el-form-item>
							</el-row>
							<el-row class="block-content">
								<el-form-item label="收货地" prop="consigneeAreaID">
									<dist-picker :distList="selectedConsigneeArea" @hand-select="handleSelectedConsigneeArea"></dist-picker>
								</el-form-item>
							</el-row>
							<el-row class="block-content">
								<el-form-item label="定位地址" prop="consigneeLocationAddress">
									<el-autocomplete  style="width:100%"
										value-key="name" 
										prefix-icon="el-icon-location" 
										v-model="carrierbillInfo.consigneeLocationAddress"
										:fetch-suggestions="getConsigneeLocation"
										placeholder="请输入..."
										@select="handSelectConsigneeLocation">
									</el-autocomplete>
								</el-form-item>
							</el-row>
							<el-row class="block-content">
								<el-form-item label="详细地址" prop="consigneeDetailAddress">
									<el-input placeholder="请输入..." v-model="carrierbillInfo.consigneeDetailAddress"></el-input>
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
										value-format="timestamp">
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
																callback()
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
															}else{
																callback()
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
import { checkInt, checkFloat2 } from '../../../common/validator'
export default {
	data() {
		return {
			units: [],
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
					dispatchType:'',
					cargoWeight:'',
					cargoVolume: '',
					cargoNum: '',
					cargoUnitName: ''
				}],                    /** String货物清单（JSON串）*/
				freight: '',                    /** BigDecimal运费*/
				porRequire: []                /** String 回单要求*/
				
			},
			selectedShipperArea: [],
			selectedConsigneeArea: [],
			searchShipperAreaHash: '',
			searchConsigneeAreaHash: '',
			rules: {
				shipperNo: [ {required: true, message: '请输入发货单号'} ],
				commissionDate: [ {required: true, message: '请选择委托时间'} ],
				consignorName: [ {required: true, message: '请输入托运人'} ],
				carrierrName: [ {required: true, message: '请输入承运人'} ],
				shipperID: [ {required: true, message: '请选择发货单位'} ],
				shipperName: [ { required: true, message: '请输入发货人'} ],
				shipperPhone: [ { required: true, validator: checkTel} ],
				shipperDate: [ {required: true, message: '请选择发货时间', trigger: 'change'} ],
				shipperAreaID: [ {required: true, message: '请选择发货地'} ],
				shipperLocationAddress: [ {required: true, message: '请选择定位地址'} ],
				// shipperDetailAddress: [ { required: true, message: '请输入发货详细地址'} ],
				consigneeID: [ {required: true, message: '请选择收货单位'} ],
				consigneeName: [ { required: true, message: '请输入收货人'} ],
				consigneePhone: [ { required: true, validator: checkTel} ],
				consigneeDate: [ {required: true, message: '请选择收货时间', trigger: 'change'} ],
				consigneeAreaID: [ {required: true, message: '请选择收货地'} ],
				consigneeLocationAddress: [ {required: true, message: '请选择定位地址'} ],
				// consigneeDetailAddress: [ {required: true, message: '请输入收货详细地址'} ],
				transportType: [ {required: true, message: '请选择运输方式'} ],
				freight: [ {required: true, message: '请输入运费金额'} ]
			}
		}
	},
	components: { DistPicker },
	computed: {
		checkInt: () => checkInt,
		checkFloat2: () => checkFloat2
	},
	created() {
		this.getUnits()
	},
	methods: {
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
			this.carrierbillInfo.shipperID = ''
			Customer.find({
				customerType: 'Shipper',
				keyword: queryString
			}).then(res => { cb(res.records) })
		},
		getConsigneeCompany(queryString, cb) {
			this.carrierbillInfo.consigneeID = ''
			Customer.find({
				customerType: 'Consignee',
				keyword: queryString
			}).then(res => { cb(res.records) })
		},
		getShipperLocation(queryString, cb) {
			if (!this.searchShipperAreaHash) {
				Message.error('请选择发货地！')
				return
			}
			CrossProxy.getEleLocation({
				geohash: this.searchShipperAreaHash,
				keyword: queryString
			}).then(res => { cb(res) })
		},
		getConsigneeLocation(queryString, cb) {
			if (!this.searchConsigneeAreaHash) {
				Message.error('请选择收货地！')
				return
			}
			CrossProxy.getEleLocation({
				geohash: this.searchConsigneeAreaHash,
				keyword: queryString
			}).then(res => { cb(res) })
		},
		getShipper(queryString, cb) {
			CustomerAddress.find({
				current: 1,
				size: 10,
				contactName: queryString,
				customerID: this.carrierbillInfo.shipperID
			}).then(res => { cb(res.records) })
		},
		getConsignee(queryString, cb) {
			CustomerAddress.find({
				current: 1,
				size: 10,
				contactName: queryString,
				customerID: this.carrierbillInfo.consigneeID
			}).then(res => { cb(res.records) })
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
			this.carrierbillInfo.shipperCompanyName = ' '
			this.carrierbillInfo.shipperID = data.customerID
			this.$nextTick(() => {
				this.carrierbillInfo.shipperCompanyName = data.companyName
			})
		},
		handSelectConsigneeCompany(data) {
			this.carrierbillInfo.consigneeCompanyName = ' '
			this.carrierbillInfo.consigneeID = data.customerID
			this.$nextTick(() => {
				this.carrierbillInfo.consigneeCompanyName = data.companyName
			})
		},
		handSelectShipper(data) {
			this.carrierbillInfo.shipperName = data.contactName
			this.carrierbillInfo.shipperArea = data.companyArea
			this.carrierbillInfo.shipperDetailAddress = data.detailAddress
			this.carrierbillInfo.shipperLocationAddress = data.locationAddress
			this.carrierbillInfo.shipperLocationLng = data.locationLng
			this.carrierbillInfo.shipperLocationLat = data.locationLat
			this.carrierbillInfo.shipperPhone = data.contactPhone
			this.carrierbillInfo.shipperAreaID = data.areaID
			this.carrierbillInfo.shipperAddressID = data.customerAddressID
			this.selectedShipperArea = areaIdToArrayId(data.areaID)
			// 取不到区县取城市
			let location = null
			if (this.selectedShipperArea[2]) {
				location = searchLocationByCity(distData[this.selectedShipperArea[1]][this.selectedShipperArea[2]])
			}
			if (this.selectedShipperArea[1] && !this.selectedShipperArea[2] || !location) {
				location = searchLocationByCity(distData[this.selectedShipperArea[0]][this.selectedShipperArea[1]])
			}
			this.searchShipperAreaHash = Geohash.encode(location.latitude, location.longitude)
		},
		inputShipperPhone() {
			this.carrierbillInfo.shipperAddressID = ''
		},
		handSelectConsignee(data) {
			this.carrierbillInfo.consigneeName = data.contactName
			this.carrierbillInfo.consigneeArea = data.companyArea
			this.carrierbillInfo.consigneeDetailAddress = data.detailAddress
			this.carrierbillInfo.consigneeLocationAddress = data.locationAddress
			this.carrierbillInfo.consigneeLocationLng = data.locationLng
			this.carrierbillInfo.consigneeLocationLat = data.locationLat
			this.carrierbillInfo.consigneePhone = data.contactPhone
			this.carrierbillInfo.consigneeAreaID = data.areaID
			this.carrierbillInfo.consigneeAddressID = data.customerAddressID
			this.selectedConsigneeArea = areaIdToArrayId(data.areaID)
			// 取不到区县取城市
			let location = null
			if (this.selectedConsigneeArea[2]) {
				location = searchLocationByCity(distData[this.selectedConsigneeArea[1]][this.selectedConsigneeArea[2]])
			}
			if (this.selectedConsigneeArea[1] && !this.selectedConsigneeArea[2] || !location) {
				location = searchLocationByCity(distData[this.selectedConsigneeArea[0]][this.selectedConsigneeArea[1]])
			}
			this.searchConsigneeAreaHash = Geohash.encode(location.latitude, location.longitude)
		},
		inputConsigneePhone() {
			this.carrierbillInfo.consigneeAddressID = ''
		},
		handleSelectedShipperArea(data) {
			if (!data) return
			this.carrierbillInfo.shipperAreaID = data[data.length - 1]
			this.carrierbillInfo.shipperArea = searchAreaByKey(data[data.length - 1])
			// 取不到区县取城市
			let location = null
			let currentData = ''
			if (data[2]) {
				location = searchLocationByCity(distData[data[1]][data[2]])
				if (location) currentData = data[2]
			}
			if (data[1] && !data[2] || !location) {
				location = searchLocationByCity(distData[data[0]][data[1]])
				if (location) currentData = data[1]
			}
			if (this.selectedShipperArea[1] != currentData && this.selectedShipperArea[2] != currentData) {
				this.carrierbillInfo.shipperLocationAddress = ''
			}
			this.searchShipperAreaHash = Geohash.encode(location.latitude, location.longitude)
		},
		handleSelectedConsigneeArea(data) {
			if (!data) return
			this.carrierbillInfo.consigneeAreaID = data[data.length - 1]
			this.carrierbillInfo.consigneeArea = searchAreaByKey(data[data.length - 1])
			// 取不到区县取城市
			let location = null
			let currentData = ''
			if (data[2]) {
				location = searchLocationByCity(distData[data[1]][data[2]])
				if (location) currentData = data[2]
			}
			if (data[1] && !data[2] || !location) {
				location = searchLocationByCity(distData[data[0]][data[1]])
				if (location) currentData = data[1]
			}
			if (this.selectedConsigneeArea[1] != currentData && this.selectedConsigneeArea[1] != currentData) {
				this.carrierbillInfo.consigneeLocationAddress= ''
			}
			this.searchConsigneeAreaHash = Geohash.encode(location.latitude, location.longitude)
		},
		handSelectShipperLocation(data) {
			this.carrierbillInfo.shipperLocationLng = data.longitude
			this.carrierbillInfo.shipperLocationLat = data.latitude
		},
		handSelectConsigneeLocation(data) {
			this.carrierbillInfo.consigneeLocationLng = data.longitude
			this.carrierbillInfo.consigneeLocationLat = data.latitude
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
					Carrierbill.add(carrierbill).then(res => {
						Message.success(res.data.msg)
						this.$router.push({name: 'carrierbill'})
					})
				})
			})
		},
		addItem() {
			this.carrierbillInfo.carrierCargo.push({
				customizedNo: '',
				cargoNameID: '',
				cargoName: '',
				cargoNum: '',
				cargoUnitName: '',
				cargoWeight: '',
				cargoVolume: ''
			})
		},
		removeItem(index) {
			this.carrierbillInfo.carrierCargo.splice(index, 1)
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

			
</style>