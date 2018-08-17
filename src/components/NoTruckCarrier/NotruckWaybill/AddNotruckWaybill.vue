<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">添加运单</div>
			<el-row>
				<el-col :span="8">
					<el-form label-width="160px">
						<el-form-item label="报文参考号">
							<el-input v-model="apkInfo.messageReferenceNumber" :disabled="true"></el-input>
						</el-form-item>
						<el-form-item label="发送方代码">
							<el-input v-model="apkInfo.senderCode" :disabled="true"></el-input>
						</el-form-item>
						<el-form-item label="报文功能代码">
							<el-input v-model="apkInfo.messageFunctionCode" :disabled="true"></el-input>
						</el-form-item>
						<el-form-item label="承运人">
							<el-input v-model="WaybillInfo.carrier"></el-input>
						</el-form-item>
						<el-form-item label="托运日期时间">
							<el-input v-model="WaybillInfo.dteOfShipment"></el-input>
						</el-form-item>
						<el-form-item label="收货日期时间">
							<el-input v-model="WaybillInfo.dateOfDelivery"></el-input>
						</el-form-item>
						<el-form-item label="装货地点">
							<el-input v-model="WaybillInfo.loadingPlace"></el-input>
						</el-form-item>
						<el-form-item label="收货人">
							<el-input v-model="WaybillInfo.consignee"></el-input>
						</el-form-item>
						<el-form-item label="国家行政区划代码">
							<el-input v-model="WaybillInfo.codeConsigneeDivisions"></el-input>
						</el-form-item>
						<el-form-item label="价格备注">
							<el-input v-model="WaybillInfo.priceRemarks"></el-input>
						</el-form-item>
						<el-form-item label="车辆分类代码">
							<el-select v-model="WaybillInfo.vehicleClassificationCode" placeholder="请选择车辆类型" style="width:100%">
								<el-option v-for="item in TruckType" :key="item.ConstStd_ID" :label="item.Value +' '+ item.Name " :value="item.Value">
								</el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="挂车牌照号">
							<el-input v-model="WaybillInfo.trailerLicenseNumber"></el-input>
						</el-form-item>
						<el-form-item label="姓名">
							<el-input v-model="WaybillInfo.name"></el-input>
						</el-form-item>
						<el-form-item label="货物名称">
							<el-input v-model="WaybillInfo.nameGoods"></el-input>
						</el-form-item>
						<el-form-item label="体积">
							<el-input v-model="WaybillInfo.volume"></el-input>
						</el-form-item>
					</el-form>
				</el-col>
				<el-col :span="8">
					<el-form label-width="160px">
						<el-form-item label="单证名称">
							<el-input v-model="apkInfo.documentName" :disabled="true"></el-input>
						</el-form-item>
						<el-form-item label="接收方代码">
							<el-input v-model="apkInfo.recipientCode" :disabled="true"></el-input>
						</el-form-item>
						<el-form-item label="原始单号">
							<el-input v-model="WaybillInfo.originalAddNumber"></el-input>
						</el-form-item>
						<el-form-item label="统一社会信用代码">
							<el-input v-model="WaybillInfo.uniformSocialCreditCode"></el-input>
						</el-form-item>
						<el-form-item label="业务类型代码">
							<el-select v-model="WaybillInfo.serviceTypeCode" placeholder="请选择业务类型" style="width:100%">
								<el-option v-for="item in notruck_business" :key="item.ConstStd_ID" :label="item.NAME" :value="item.VALUE">
								</el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="发货人">
							<el-input v-model="WaybillInfo.consignor"></el-input>
						</el-form-item>
						<el-form-item label="国家行政区划名称">
							<el-input v-model="WaybillInfo.nameConsignorDivisions"></el-input>
						</el-form-item>
						<el-form-item label="收货地点">
							<el-input v-model="WaybillInfo.receivingPlace"></el-input>
						</el-form-item>
						<el-form-item label="运输成本">
							<el-input v-model="WaybillInfo.transportationCost"></el-input>
						</el-form-item>
						<el-form-item label="牌照类型代码">
							<el-select v-model="WaybillInfo.licensePlateCode" placeholder="请选择运输方式" style="width:100%">
								<el-option v-for="item in notruck_LicensePlate" :key="item.Dict_ID" :label="item.NAME" :value="item.VALUE">
								</el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="车辆载质量">
							<el-input v-model="WaybillInfo.vehicleLoadingQuality"></el-input>
						</el-form-item>
						<el-form-item label="所有人">
							<el-input v-model="WaybillInfo.thePersonal"></el-input>
						</el-form-item>
						<el-form-item label="从业资格证号">
							<el-input v-model="WaybillInfo.certificateQualification"></el-input>
						</el-form-item>
						<el-form-item label="货物类型分类">
							<el-select v-model="WaybillInfo.codeGoods" placeholder="请选择货物类型" style="width:100%">
								<el-option v-for="item in CargoType" :key="item.ConstStd_ID" :label="item.Value +' '+ item.Name" :value="item.Value">
								</el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="总件数">
							<el-input v-model="WaybillInfo.total"></el-input>
						</el-form-item>
					</el-form>
				</el-col>
				<el-col :span="8">
					<el-form label-width="160px">
						<el-form-item label="报文版本号">
							<el-input v-model="apkInfo.documentVersionNumber" :disabled="true"></el-input>
						</el-form-item>
						<el-form-item label="发送时间">
							<el-input v-model="apkInfo.messageSendingDateTime" :disabled="true"></el-input>
						</el-form-item>
						<el-form-item label="托运单号">
							<el-input v-model="WaybillInfo.shippingNoteNumber"></el-input>
						</el-form-item>
						<el-form-item label="许可证编号">
							<el-input v-model="WaybillInfo.waybillLicenseNumber"></el-input>
						</el-form-item>
						<el-form-item label="实际发运日期时间">
							<el-input v-model="WaybillInfo.dateActualShipment"></el-input>
						</el-form-item>
						<el-form-item label="个人证件号">
							<el-input v-model="WaybillInfo.personalNumber"></el-input>
						</el-form-item>
						<el-form-item label="国家行政区划代码">
							<el-input v-model="WaybillInfo.codeConsignorDivisions"></el-input>
						</el-form-item>
						<el-form-item label="国家行政区划名称">
							<el-input v-model="WaybillInfo.nameConsigneeDivisions"></el-input>
						</el-form-item>
						<el-form-item label="货币总金额">
							<el-input v-model="WaybillInfo.totalAmountMoney"></el-input>
						</el-form-item>
						<el-form-item label="车辆牌照号">
							<el-input v-model="WaybillInfo.vehicleLicenseNumber"></el-input>
						</el-form-item>
						<el-form-item label="道路运输证号">
							<el-input v-model="WaybillInfo.roadTransportNo"></el-input>
						</el-form-item>
						<el-form-item label="许可证编号">
							<el-input v-model="WaybillInfo.carLicenseNumber"></el-input>
						</el-form-item>
						<el-form-item label="电话号码">
							<el-input v-model="WaybillInfo.phone"></el-input>
						</el-form-item>
						<el-form-item label="货物项毛重">
							<el-input v-model="WaybillInfo.goodsGross"></el-input>
						</el-form-item>
						<el-form-item label="运输方式代码">
							<el-select v-model="WaybillInfo.transportModeCode" placeholder="请选择运输方式" style="width:100%">
								<el-option v-for="item in notruck_transport" :key="item.Dict_ID" :label="item.NAME" :value="item.VALUE">
								</el-option>
							</el-select>
						</el-form-item>
					</el-form>
				</el-col>
				<el-col :span="24">
					<el-form label-width="160px">
						<el-form-item label="自由文本">
							<el-input type="textarea" v-model="WaybillInfo.networkAccessAddress" resize="none"></el-input>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" @click="save">保存</el-button>
							<el-button @click="back">取消</el-button>
						</el-form-item>
					</el-form>
				</el-col>
			</el-row>
		</el-card>
	</div>
</template>
<script type="text/javascript">
import { Message } from 'element-ui'
import request from '../../../common/request'
import NotruckWaybill from '../../../api/NotruckWaybill'
export default {
	data() {
		return {
			TruckType: [],
			CargoType: [],
			notruck_transport:[],
			notruck_LicensePlate:[],
			notruck_business:[],
			apkInfo:{
				messageReferenceNumber:'',
				senderCode:'',
				messageFunctionCode:'',
				documentName:'',
				recipientCode:'',
				documentVersionNumber:'',
				messageSendingDateTime:'',
				notruckuserId:''
			},
			WaybillInfo:{
				carrier:'',
				dteOfShipment:'',
				dateOfDelivery:'',
				name:'',
				consignee:'',
				codeConsigneeDivisions:'',
				priceRemarks:'',
				vehicleClassificationCode:'',
				trailerLicenseNumber:'',
				name:'',
				nameGoods:'',
				volume:'',
				originalAddNumber:'',
				name:'',
				serviceTypeCode:'',
				name:'',
				nameConsignorDivisions:'',
				receivingPlace:'',
				transportationCost:'',
				licensePlateCode:'',
				vehicleLoadingQuality:'',
				thePersonal:'',
				certificateQualification:'',
				codeGoods:'',
				total:'',
				shippingNoteNumber:'',
				waybillLicenseNumber:'',
				dateActualShipment:'',
				personalNumber:'',
				codeConsignorDivisions:'',
				nameConsigneeDivisions:'',
				totalAmountMoney:'',
				vehicleLicenseNumber:'',
				roadTransportNo:'',
				carLicenseNumber:'',
				phone:'',
				goodsGross:'',
				transportModeCode:'',
				networkAccessAddress:''
			}
		}
	},
	created() {
		this.getAPK()
		this.getConstant('CargoType')
		this.getConstant('TruckType')
		this.getDict('notruck_transport')	
		this.getDict('notruck_LicensePlate')	
		this.getDict('notruck_business')
	},
	methods: {
		getConstant(Type) {
			let params = {
				Type
			}
			request({
				url: '/base_conststand/list/type',
				method: 'get',
				params
			}).then(res => {
				if (res.data.code == 0) {
					this[Type] = res.data.data
				} else {
					Message.error(res.data.msg)
				}
			})
		},
		getDict(TYPE) {
			let params = {
				TYPE
			}
			request({
				url: '/sys_dict/list/type',
				method: 'get',
				params
			}).then(res => {
				if (res.data.code == 0) {
					this[TYPE] = res.data.data
				} else {
					Message.error(res.data.msg)
				}
			})
		},
		getAPK() {
			NotruckWaybill.findAPK().then(res => {
				this.apkInfo = res
			})
		},
		save() {
			NotruckWaybill.add({
				messageReferenceNumber: this.apkInfo.messageReferenceNumber,
				senderCode: this.apkInfo.senderCode,
				messageFunctionCode: this.apkInfo.messageFunctionCode,
				documentName: this.apkInfo.documentName,
				recipientCode: this.apkInfo.recipientCode,
				documentVersionNumber: this.apkInfo.documentVersionNumber,
				messageSendingDateTime: this.apkInfo.messageSendingDateTime,
				notruckuserId: this.apkInfo.notruckuserId,
				carrier: this.WaybillInfo.carrier,
				dteOfShipment: this.WaybillInfo.dteOfShipment,
				dateOfDelivery: this.WaybillInfo.dateOfDelivery,
				name: this.WaybillInfo.name,
				consignee: this.WaybillInfo.consignee,
				codeConsigneeDivisions: this.WaybillInfo.codeConsigneeDivisions,
				priceRemarks: this.WaybillInfo.priceRemarks,
				vehicleClassificationCode: this.WaybillInfo.vehicleClassificationCode,
				trailerLicenseNumber: this.WaybillInfo.trailerLicenseNumber,
				name: this.WaybillInfo.name,
				nameGoods: this.WaybillInfo.nameGoods,
				volume: this.WaybillInfo.volume,
				originalAddNumber: this.WaybillInfo.originalAddNumber,
				name: this.WaybillInfo.name,
				serviceTypeCode: this.WaybillInfo.serviceTypeCode,
				name: this.WaybillInfo.name,
				nameConsignorDivisions: this.WaybillInfo.nameConsignorDivisions,
				receivingPlace: this.WaybillInfo.receivingPlace,
				transportationCost: this.WaybillInfo.transportationCost,
				licensePlateCode: this.WaybillInfo.licensePlateCode,
				vehicleLoadingQuality: this.WaybillInfo.vehicleLoadingQuality,
				thePersonal: this.WaybillInfo.thePersonal,
				certificateQualification: this.WaybillInfo.certificateQualification,
				codeGoods: this.WaybillInfo.codeGoods,
				total: this.WaybillInfo.total,
				shippingNoteNumber: this.WaybillInfo.shippingNoteNumber,
				waybillLicenseNumber: this.WaybillInfo.waybillLicenseNumber,
				dateActualShipment: this.WaybillInfo.dateActualShipment,
				personalNumber: this.WaybillInfo.personalNumber,
				codeConsignorDivisions: this.WaybillInfo.codeConsignorDivisions,
				nameConsigneeDivisions: this.WaybillInfo.nameConsigneeDivisions,
				totalAmountMoney: this.WaybillInfo.totalAmountMoney,
				vehicleLicenseNumber: this.WaybillInfo.vehicleLicenseNumber,
				roadTransportNo: this.WaybillInfo.roadTransportNo,
				carLicenseNumber: this.WaybillInfo.carLicenseNumber,
				phone: this.WaybillInfo.phone,
				goodsGross: this.WaybillInfo.goodsGross,
				transportModeCode: this.WaybillInfo.transportModeCode,
				networkAccessAddress: this.WaybillInfo.networkAccessAddress
			}).then(res => {
				Message.success(res.data.message)
				this.$router.push({name: 'notruckwaybill'})
			})
		},
		back() {
			this.$router.go(-1)
		}
	}
}

</script>
<style lang="stylus" scoped>

</style>
