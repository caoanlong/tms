<template>
	<div class="main-content" style="min-width: 1150px">
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
								<el-form-item label="发货单位" prop="shipperCompanyName">
									<el-autocomplete  style="width:100%"
										value-key="companyName" 
										v-model="carrierbillInfo.shipperCompanyName"
										:fetch-suggestions="getRecdeliverycomp"
										placeholder="请输入..."
										@select="handSelectShipper">
									</el-autocomplete>
								</el-form-item>
							</el-row>
							<el-row class="block-content">
								<el-col :span="12">
									<el-form-item label="发货人" prop="shipperName">
										<el-input placeholder="请输入..." v-model="carrierbillInfo.shipperName"></el-input>
									</el-form-item>
								</el-col>
								<el-col :span="12">
									<el-form-item label="联系方式" prop="shipperPhone">
										<el-input placeholder="请输入..." v-model="carrierbillInfo.shipperPhone"></el-input>
									</el-form-item>
								</el-col>
							</el-row>
							<el-row class="block-content">
								<el-col :span="12">
									<el-form-item label="发货地" prop="shipperAreaID">
										<el-cascader 
											style="width:100%" 
											:options="dist" 
											change-on-select 
											v-model="selectedShipperArea" 
											@change="handleSelectedShipperArea">
										</el-cascader>
									</el-form-item>
								</el-col>
								<el-col :span="12">
									<el-form-item label="发货时间" prop="shipperDate">
										<el-date-picker 
											type="date" 
											style="width:100%" 
											placeholder="选择发货时间" 
											v-model="carrierbillInfo.shipperDate" 
											value-format="timestamp">
										</el-date-picker>
									</el-form-item>
								</el-col>
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
						</div>
					</el-col>
					<el-col :span="12">
						<div class="section-block">
							<span class="block-title">到货信息</span>
							<el-row class="block-content">
								<el-form-item label="收货单位" prop="consigneeCompanyName">
									<el-autocomplete  style="width:100%"
										value-key="companyName" 
										v-model="carrierbillInfo.consigneeCompanyName"
										:fetch-suggestions="getRecdeliverycomp"
										placeholder="请输入内容"
										@select="handSelectConsignee">
									</el-autocomplete>
								</el-form-item>
							</el-row>
							<el-row class="block-content">
								<el-col :span="12">
									<el-form-item label="收货人" prop="consigneeName">
										<el-input placeholder="请输入..." v-model="carrierbillInfo.consigneeName"></el-input>
									</el-form-item>
								</el-col>
								<el-col :span="12">
									<el-form-item label="联系方式" prop="consigneePhone">
										<el-input placeholder="请输入..." v-model="carrierbillInfo.consigneePhone"></el-input>
									</el-form-item>
								</el-col>
							</el-row>
							<el-row class="block-content">
								<el-col :span="12">
									<el-form-item label="收货地" prop="consigneeAreaID">
										<el-cascader 
											style="width:100%" 
											:options="dist" 
											change-on-select 
											v-model="selectedConsigneeArea" 
											@change="handleSelectedConsigneeArea">
										</el-cascader>
									</el-form-item>
								</el-col>
								<el-col :span="12">
									<el-form-item label="到货时间" prop="consigneeDate">
										<el-date-picker 
											type="date" 
											style="width:100%" 
											placeholder="选择到货时间" 
											v-model="carrierbillInfo.consigneeDate" 
											value-format="timestamp">
										</el-date-picker>
									</el-form-item>
								</el-col>
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
						</div>
					</el-col>
				</el-row>
				<el-row>
					<div class="section-block">
						<span class="block-title">货物信息</span>
						<el-form class="block-content" :inline="true" size="mini" :rules="cargoRules" ref="cargoRuleForm">
							<el-row>
								<el-form-item><div class="text-center cargo-title">客户单号</div></el-form-item>
								<el-form-item><div class="text-center cargo-title"><span>*</span>货名</div></el-form-item>
								<el-form-item><div class="text-center cargo-title"><span>*</span>数量</div></el-form-item>
								<el-form-item><div class="text-center cargo-title"><span>*</span>单位</div></el-form-item>
								<el-form-item><div class="text-center cargo-title">重量</div></el-form-item>
								<el-form-item><div class="text-center cargo-title">体积</div></el-form-item>
								<el-form-item><div class="text-center cargo-title">操作</div></el-form-item>
							</el-row>
							<el-row  v-for="(item, index) in carrierbillInfo.carrierCargo" :key="index">
								<el-form-item>
									<el-input placeholder="请输入..." style="width:150px" v-model="item.orderNo"></el-input>
								</el-form-item>
								<el-form-item prop="cargoName">
									<el-input placeholder="请输入..." style="width:150px" v-model="item.cargoName"></el-input>
								</el-form-item>
								<el-form-item prop="cargoNum">
									<el-input-number style="width:150px" v-model="item.cargoNum" :min="1"></el-input-number>
								</el-form-item>
								<el-form-item>
									<el-select style="width:150px" v-model="item.unit" placeholder="请选择">
										<el-option label="件" value="shanghai"></el-option>
										<el-option label="箱" value="beijing"></el-option>
									</el-select>
								</el-form-item>
								<el-form-item prop="cargoWeight">
									<el-input placeholder="货物重量" style="width:150px" v-model="item.cargoWeight">
										<template slot="append">吨</template>
									</el-input>
								</el-form-item>
								<el-form-item prop="cargoVolume">
									<el-input placeholder="货物体积" style="width:150px" v-model="item.cargoVolume">
										<template slot="append">方</template>
									</el-input>
								</el-form-item>
								<el-form-item>
									<el-button 
										type="text" 
										icon="el-icon-delete" 
										style="color:#F56C6C;position:relative;left:64px" 
										@click="removeItem(index)" 
										v-show="carrierbillInfo.carrierCargo.length > 1">
										删除
									</el-button>
								</el-form-item>
							</el-row>
							<el-button type="text" icon="el-icon-plus" class="add-cargo-btn" @click="addItem">添加</el-button>
						</el-form>
					</div>
				</el-row>
				<el-row>
					<el-col :span="12">
						<div class="section-block">
							<span class="block-title">运输费用</span>
							<el-row class="block-content">
								<el-form-item label="运费金额" prop="transPrice">
									<el-input placeholder="请输入..." v-model="carrierbillInfo.transPrice"></el-input>
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
import dist from '../../../assets/data/dist.json'
import Carrierbill from '../../../api/Carrierbill'
import SettleConfig from '../../../api/SettleConfig'
import Customer from '../../../api/Customer'
import BaiduMap from '../../../api/BaiduMap'
import CrossProxy from '../../../api/CrossProxy'
import { searchAreaByKey, areaIdToArrayId, searchLocationByCity } from '../../../common/utils'
import { checkFloat2, checkTel } from '../../../common/validators'
import distData from '../../../assets/data/distpicker.data'
import Geohash from '../../../common/Geohash'
export default {
	/*
	carrierbillInfo: {
		shipperNo: ''                 // 发货单号
		transportType: '',            // 运输方式
		commissionDate: '',           // 委托时间
		shipperCompanyName: '',       // 发货单位
		shipperName: '',              // 发货人
		shipperPhone: '',             // 发货人联系方式
		shipperAreaID: '',            // 发货地
		shipperDate: '',              // 发货时间
		shipperLocationAddress: '',   // 发货定位地址
		shipperDetailAddress: '',     // 发货详细地址
		consigneeCompanyName: '',     // 收货单位
		consigneeName: '',            // 收货人
		consigneePhone: '',           // 收货人联系方式
		consigneeAreaID: '',          // 收货地
		consigneeDate: '',            // 收货时间
		consigneeLocationAddress: '', // 收货定位地址
		consigneeDetailAddress: '',   // 收货详细地址
		transPrice: '',               // 运费金额
		porRequire: []                // 回单要求
	}
	*/
	data() {
		return {
			selectedShipperArea: [],
			selectedConsigneeArea: [],
			searchShipperAreaHash: '',
			searchConsigneeAreaHash: '',
			consignor: {},
			loading: false,
			carrierbillInfo: {
				carrierCargo:[
					{
						'weightType': 'Heavy',
						'cargoName': '',
						'cargoType': '',
						'cargoWeight': 0,
						'cargoVolume': 0,
						'cargoNum': 0
					}
				],
				carrierOrderNo:'',
				carrierrName: '',
				navicertNo: '',
				electronicWaybill: '',
				cashAmount:'',
				chargeMode:'',
				codAmount:'',
				consigneeAddressID:'',
				consigneeAmount:'',
				consigneeArea:'',
				consigneeAreaID:'',
				consigneeLocationAddress:'',
				consigneeLocationLng:'',
				consigneeLocationLat:'',
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
				shipperLocationAddress: '',
				shipperLocationLng: '',
				shipperLocationLat: '',
				shipperCompanyName:'',
				shipperDate:'',
				shipperDetailAddress:'',
				shipperID:'',
				shipperName:'',
				shipperNo:'',
				shipperPhone:'',
				invoice:'N',
				porRequire: ['NotRequired'],
				transportType: '公路运输',
				commissionDate: ''
			},
			totalPrice: 0,
			exmile: 0,
			innermile: 0,
			rules: {
				shipperNo: [
					{required: true, message: '请输入发货单号'}
				],
				commissionDate: [
					{required: true, message: '请选择委托时间'}
				],
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
				shipperLocationAddress: [
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
				consigneeLocationAddress: [
					{required: true, message: '请选择定位地址'}
				],
				consigneeDetailAddress: [
					{required: true, message: '请输入收货详细地址'}
				],
				transportType: [
					{required: true, message: '请选择运输方式'}
				],
				transPrice: [
					{required: true, message: '请输入运费金额'}
				]
			},
			cargoRules: {
				cargoName: [
					{required: true, message: '请输入货名'}
				],
				// cargoNum: [
				// 	{required: true, message: '请输入货物数量'},
				// 	{validator: checkFloat2}
				// ],
				cargoType: [
					{required: true, message: '请输入货物规格'}
				],
				cargoWeight: [
					{validator: checkFloat2}
				],
				cargoVolume: [
					{validator: checkFloat2}
				]
			}
		}
	},
	computed: {
		dist: () => dist
	},
	methods: {
		getConsignors(queryString, cb) {
			Customer.find({
				type: 'Consignor',
				companyName: queryString
			}).then(res => {
				cb(res.records)
			})
		},
		getRecdeliverycomp(queryString, cb) {
			Customer.find({
				type: 'ShipperConsignee',
				companyName: queryString
			}).then(res => {
				cb(res.records)
			})
		},
		getShipperLocation(queryString, cb) {
			if (!this.searchShipperAreaHash) {
				Message.error('请选择城市！')
				return
			}
			CrossProxy.getEleLocation({
				geohash: this.searchShipperAreaHash,
				keyword: queryString
			}).then(res => { cb(res) })
		},
		getConsigneeLocation(queryString, cb) {
			if (!this.searchConsigneeAreaHash) {
				Message.error('请选择城市！')
				return
			}
			CrossProxy.getEleLocation({
				geohash: this.searchShipperAreaHash,
				keyword: queryString
			}).then(res => { cb(res) })
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
			this.carrierbillInfo.shipperLocationAddress = data.locationAddress
			this.carrierbillInfo.shipperLocationLng = data.locationLng
			this.carrierbillInfo.shipperLocationLat = data.locationLat
			this.carrierbillInfo.shipperID = data.customerID
			this.carrierbillInfo.shipperPhone = data.contactPhone
			this.carrierbillInfo.shipperAreaID = data.companyAreaID
			this.selectedShipperArea = areaIdToArrayId(String(data.companyAreaID))
		},
		handSelectConsignee(data){
			this.carrierbillInfo.consigneeCompanyName = data.companyName
			this.carrierbillInfo.consigneeName = data.contactName
			this.carrierbillInfo.consigneeArea = data.companyArea
			this.carrierbillInfo.consigneeDetailAddress = data.detailAddress
			this.carrierbillInfo.consigneeLocationAddress = data.locationAddress
			this.carrierbillInfo.consigneeLocationLng = data.locationLng
			this.carrierbillInfo.consigneeLocationLat = data.locationLat
			this.carrierbillInfo.consigneeID = data.customerID
			this.carrierbillInfo.consigneePhone = data.contactPhone
			this.carrierbillInfo.consigneeAreaID = data.companyAreaID
			this.selectedConsigneeArea = areaIdToArrayId(String(data.companyAreaID))
		},
		handleSelectedShipperArea(data) {
			this.carrierbillInfo.shipperAreaID = data[data.length - 1]
			this.carrierbillInfo.shipperArea = searchAreaByKey(data[data.length - 1])
			if (data[1]) {
				const location = searchLocationByCity(distData[data[0]][data[1]])
				this.searchShipperAreaHash = Geohash.encode(location.latitude, location.longitude)
			}
		},
		handleSelectedConsigneeArea(data) {
			this.carrierbillInfo.consigneeAreaID = data[data.length - 1]
			this.carrierbillInfo.consigneeArea = searchAreaByKey(data[data.length - 1])
			if (data[1]) {
				const location = searchLocationByCity(distData[data[0]][data[1]])
				this.searchConsigneeAreaHash = Geohash.encode(location.latitude, location.longitude)
			}
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
					let cargos = this.carrierbillInfo.carrierCargo.map(item => {
						return {
							'weightType': item.weightType,
							'cargoName': item.cargoName,
							'cargoType': item.cargoType,
							'cargoWeight': item.cargoWeight ? item.cargoWeight : 0,
							'cargoVolume': item.cargoVolume ? item.cargoVolume : 0,
							'cargoNum': item.cargoNum ? item.cargoNum : 0
						}
					})
					Carrierbill.add({
						carrierCargoInfo: JSON.stringify(cargos),
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
						consigneeLocationAddress: this.carrierbillInfo.consigneeLocationAddress || '云南昆明',  // 新增定位
						consigneeLocationLng: this.carrierbillInfo.consigneeLocationLng || 25.05,  // 新增定位
						consigneeLocationLat: this.carrierbillInfo.consigneeLocationLat || 102.72,  // 新增定位
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
						shipperLocationAddress: this.carrierbillInfo.shipperLocationAddress || '云南昆明',  // 新增定位
						shipperLocationLng: this.carrierbillInfo.shipperLocationLng || 25.05,  // 新增定位
						shipperLocationLat: this.carrierbillInfo.shipperLocationLat || 102.72,  // 新增定位
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
				'cargoWeight': 0,
				'cargoVolume': 0,
				'cargoNum': 0
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
.cargo-title
	width 150px
	margin-right 2px
	span
		color red
</style>
