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
								<el-form-item label="发货单位" prop="shipperCompanyName">
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
									<el-input placeholder="请输入..." v-model="carrierbillInfo.shipperPhone"></el-input>
								</el-form-item>
							</el-row>
							<el-row class="block-content">
								<el-form-item label="发货地" prop="shipperAreaID">
									<el-cascader 
										style="width:100%" 
										:options="dist" 
										change-on-select 
										v-model="selectedShipperArea" 
										@change="handleSelectedShipperArea">
									</el-cascader>
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
									<el-input placeholder="请输入..." v-model="carrierbillInfo.consigneePhone"></el-input>
								</el-form-item>
							</el-row>
							<el-row class="block-content">
								<el-form-item label="收货地" prop="consigneeAreaID">
									<el-cascader 
										style="width:100%" 
										:options="dist" 
										change-on-select 
										v-model="selectedConsigneeArea" 
										@change="handleSelectedConsigneeArea">
									</el-cascader>
								</el-form-item>
							</el-row>
							<el-row class="block-content">
								<el-form-item label="到货时间" prop="consigneeDate">
									<el-date-picker 
										:picker-options="{ disabledDate: (curDate) => new Date() > curDate }"
										format="yyyy-MM-dd HH:mm"
										type="datetime" 
										style="width:100%" 
										placeholder="选择到货时间" 
										v-model="carrierbillInfo.consigneeDate" 
										value-format="timestamp">
									</el-date-picker>
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
						</div>
					</el-col>
				</el-row>
				<el-row>
					<div class="section-block">
						<span class="block-title">货物信息</span>
						<el-row style="margin: 0 20px">
							<div class="text-center cargo-title">客户单号</div>
							<div class="text-center cargo-title"><span>*</span>货名</div>
							<div class="text-center cargo-title"><span>*</span>数量</div>
							<div class="text-center cargo-title"><span>*</span>单位</div>
							<div class="text-center cargo-title">重量</div>
							<div class="text-center cargo-title">体积</div>
							<div class="text-center cargo-title">操作</div>
						</el-row>
						<el-form class="block-content" :model="carrierbillInfo" :inline="true" size="mini" ref="cargoRuleForm">
							<el-row  v-for="(item, index) in carrierbillInfo.carrierCargo" :key="index">
								<el-form-item>
									<el-input placeholder="请输入..." style="width:130px" v-model="item.customizedNo"></el-input>
								</el-form-item>
								<el-form-item :prop="'carrierCargo.' + index + '.cargoName'" :rules="[{ required: true, message: '请输入货名'}]">
									<el-autocomplete 
										style="width:130px" 
										value-key="cargoName" 
										v-model="item.cargoName"
										:fetch-suggestions="getCargos"
										placeholder="请输入..."
										@select="handSelectCargo">
									</el-autocomplete>
								</el-form-item>
								<el-form-item :prop="'carrierCargo.' + index + '.cargoNum'" :rules="[{ required: true, message: '请输入数量'}, { validator: checkInt }]">
									<el-input-number style="width:130px" v-model="item.cargoNum" :min="1"></el-input-number>
								</el-form-item>
								<el-form-item :prop="'carrierCargo.' + index + '.cargoUnitName'" :rules="[{ required: true, message: '请选择单位'}]">
									<el-select style="width:130px" v-model="item.cargoUnitName" placeholder="请选择">
										<el-option v-for="unit in units" :key="unit.unit" :label="unit.unit" :value="unit.unit"></el-option>
									</el-select>
								</el-form-item>
								<el-form-item prop="cargoWeight">
									<el-input placeholder="货物重量" style="width:130px" v-model="item.cargoWeight">
										<template slot="append">吨</template>
									</el-input>
								</el-form-item>
								<el-form-item prop="cargoVolume">
									<el-input placeholder="货物体积" style="width:130px" v-model="item.cargoVolume">
										<template slot="append">方</template>
									</el-input>
								</el-form-item>
								<el-form-item>
									<el-button 
										type="text" 
										icon="el-icon-delete" 
										style="color:#F56C6C;position:relative;left:40px" 
										@click="removeItem(index)" 
										v-show="carrierbillInfo.carrierCargo.length > 1">
										删除
									</el-button>
								</el-form-item>
							</el-row>
							<el-button type="text" icon="el-icon-plus" class="add-cargo-btn" @click="addItem">添加</el-button>
						</el-form>
						<el-row style="margin: 0 20px 10px 20px">
							<div class="text-center cargo-title"></div>
							<div class="text-center cargo-title">合计：</div>
							<div class="text-center cargo-title">{{sum('cargoNum')}}</div>
							<div class="text-center cargo-title"></div>
							<div class="text-center cargo-title">{{sum('cargoWeight')}}吨</div>
							<div class="text-center cargo-title">{{sum('cargoVolume')}}方</div>
						</el-row>
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
import dist from '../../../assets/data/dist.json'
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
import { checkInt } from '../../../common/validator'
export default {
	data() {
		return {
			units: [],
			carrierbillInfo: {
				shipperNo: '',                  /** String 发货单号*/
				transportType: '公路运输',              /** String 运输方式*/
				commissionDate: '',             /** Date 委托时间*/
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
					cargoNum: '',
					cargoUnitName: '',
					cargoWeight: '',
					cargoVolume: ''
				}],                     /** String货物清单（JSON串）*/
				freight: '',                    /** BigDecimal运费*/
				porRequire: []                  /** String 回单要求*/
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
				shipperCompanyName: [ {required: true, message: '请输入发货单位'} ],
				shipperName: [ { required: true, message: '请输入发货人'} ],
				shipperPhone: [ { required: true, validator: checkTel} ],
				shipperDate: [ {required: true, message: '请选择发货时间', trigger: 'change'} ],
				shipperAreaID: [ {required: true, message: '请选择发货地'} ],
				shipperLocationAddress: [ {required: true, message: '请选择定位地址'} ],
				// shipperDetailAddress: [ { required: true, message: '请输入发货详细地址'} ],
				consigneeCompanyName: [ {required: true, message: '请输入收货单位'} ],
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
	computed: {
		dist: () => dist,
		checkInt: () => checkInt
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
			return sum
		},
		getUnits() {
			CargoUnit.find({
				current: 1,
				size: 1000
			}).then(res => {
				this.units = res.records
				this.getInfo()
			})
		},
		getCargos(queryString, cb) {
			CargoGeneralName.find({
				current: 1,
				size: 1000,
				customerID: this.carrierbillInfo.shipperID,
				cargoName: queryString
			}).then(res => { cb(res.records) })
		},
		getShipperCompany(queryString, cb) {
			Customer.find({
				customerType: 'Shipper',
				keyword: queryString
			}).then(res => { cb(res.records) })
		},
		getConsigneeCompany(queryString, cb) {
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
		handSelectShipperCompany(data) {
			this.carrierbillInfo.shipperCompanyName = data.companyName
			this.carrierbillInfo.shipperID = data.customerID
		},
		handSelectConsigneeCompany(data) {
			this.carrierbillInfo.consigneeCompanyName = data.companyName
			this.carrierbillInfo.consigneeID = data.customerID
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
			if (this.selectedShipperArea[1]) {
				const location = searchLocationByCity(distData[this.selectedShipperArea[0]][this.selectedShipperArea[1]])
				this.searchShipperAreaHash = Geohash.encode(location.latitude, location.longitude)
			}
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
			if (this.selectedConsigneeArea[1]) {
				const location = searchLocationByCity(distData[this.selectedConsigneeArea[0]][this.selectedConsigneeArea[1]])
				this.searchConsigneeAreaHash = Geohash.encode(location.latitude, location.longitude)
			}
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
					if (!valid) {
						this.$nextTick(() => {
							Message.error($('.el-form-item__error:first').text())
							return
						})
					}
					resolve()
				})
			}).then(() => {
				new Promise((resolve, reject) => {
					this.$refs['cargoRuleForm'].validate(valid => {
						if (!valid) return 
						resolve()
					})
				}).then(() => {
					const carrierbill = Object.assign({}, this.carrierbillInfo)
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
		getInfo() {
			const carrierOrderID = this.$route.query.carrierOrderID
			Carrierbill.findById({ carrierOrderID }).then(res => {
				this.carrierbillInfo = res
				if (res.porRequire.indexOf(',') > -1) {
					this.carrierbillInfo.porRequire = res.porRequire.split(',')
				} else {
					this.carrierbillInfo.porRequire = [res.porRequire]
				}
				this.selectedShipperArea = areaIdToArrayId(res.shipperAreaID)
				this.selectedConsigneeArea = areaIdToArrayId(res.consigneeAreaID)
			})
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
	display inline-block
	width 130px
	line-height 2
	margin-right 10px
	span
		color red
</style>
