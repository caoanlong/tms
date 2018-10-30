<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">添加运单</div>
			<el-form label-width="160px" :model="WaybillInfo" :rules="rules" ref="ruleForm" size="small">
				<el-row>
					<el-col :span="8">
						<el-form-item label="报文参考号">
							<el-input v-model="WaybillInfo.messageReferenceNumber" :disabled="true"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="单证名称">
							<el-input v-model="WaybillInfo.documentName" :disabled="true"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="报文版本号">
							<el-input v-model="WaybillInfo.documentVersionNumber" :disabled="true"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="8">
						<el-form-item label="发送方代码">
							<el-input v-model="WaybillInfo.senderCode" :disabled="true"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="接收方代码">
							<el-input v-model="WaybillInfo.recipientCode" :disabled="true"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="发送时间">
							<el-input v-model="WaybillInfo.messageSendingDateTime" :disabled="true"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="8">
						<el-form-item label="报文功能代码">
							<el-input v-model="WaybillInfo.messageFunctionCode" :disabled="true"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="8">
						<el-form-item label="原始单号" prop="originalAddNumber">
							<el-input v-model="WaybillInfo.originalAddNumber" placeholder="请输入原始单号"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="托运单号" prop="shippingNoteNumber">
							<el-input v-model="WaybillInfo.shippingNoteNumber" placeholder="请输入托运单号"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="承运人" prop="carrier">
							<el-input v-model="WaybillInfo.carrier" placeholder="请输入承运人"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="8">
						<el-form-item label="统一社会信用代码" prop="uniformSocialCreditCode">
							<el-input v-model="WaybillInfo.uniformSocialCreditCode" placeholder="请输入统一社会信用代码"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="许可证编号" prop="waybillLicenseNumber">
							<el-input v-model="WaybillInfo.waybillLicenseNumber" placeholder="请输入许可证编号"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="托运日期时间" prop="dteOfShipment">
							<el-input v-model="WaybillInfo.dteOfShipment" placeholder="请输入托运日期时间"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="8">
						<el-form-item label="业务类型代码" prop="serviceTypeCode">
							<el-select v-model="WaybillInfo.serviceTypeCode" placeholder="请选择业务类型" style="width:100%">
								<el-option 
									v-for="(label, value) in SERVICETYPECODE" 
									:key="value" 
									:label="value + ' ' + label" 
									:value="value">
								</el-option>
							</el-select>
						</el-form-item>
						
					</el-col>
					<el-col :span="8">
						<el-form-item label="实际发运日期时间" prop="dateActualShipment">
							<el-input v-model="WaybillInfo.dateActualShipment" placeholder="请输入实际发运日期时间"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="收货日期时间" prop="dateOfDelivery">
							<el-input v-model="WaybillInfo.dateOfDelivery" placeholder="请输入收货日期时间"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					
					<el-col :span="8">
						<el-form-item label="发货人" prop="consignor">
							<el-input v-model="WaybillInfo.consignor" placeholder="请输入发货人"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="个人证件号">
							<el-input v-model="WaybillInfo.personalNumber" placeholder="请输入个人证件号"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="装货地点" prop="loadingPlace">
							<el-input v-model="WaybillInfo.loadingPlace" placeholder="请输入装货地点"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					
					<el-col :span="8">
						<el-form-item label="国家行政区划名称">
							<el-input v-model="WaybillInfo.nameConsignorDivisions" placeholder="请输入国家行政区划名称"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="国家行政区划代码" prop="codeConsignorDivisions">
							<el-input v-model="WaybillInfo.codeConsignorDivisions" placeholder="请输入国家行政区划代码"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="8">
						<el-form-item label="收货人" prop="consignee">
							<el-input v-model="WaybillInfo.consignee" placeholder="请输入收货人"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="收货地点" prop="receivingPlace">
							<el-input v-model="WaybillInfo.receivingPlace" placeholder="请输入收货地点"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="国家行政区划名称">
							<el-input v-model="WaybillInfo.nameConsigneeDivisions" placeholder="请输入国家行政区划名称"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="8">
						<el-form-item label="国家行政区划代码" prop="codeConsigneeDivisions">
							<el-input v-model="WaybillInfo.codeConsigneeDivisions" placeholder="请输入国家行政区划代码"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="8">
						<el-form-item label="运输成本" prop="transportationCost">
							<el-input v-model="WaybillInfo.transportationCost" placeholder="请输入运输成本"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="货币总金额" prop="totalAmountMoney">
							<el-input v-model="WaybillInfo.totalAmountMoney" placeholder="请输入货币总金额"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="价格备注">
							<el-input v-model="WaybillInfo.priceRemarks" placeholder="请输入价格备注"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="8">
						<el-form-item label="牌照类型代码" prop="licensePlateCode">
							<el-select v-model="WaybillInfo.licensePlateCode" placeholder="请选择牌照类型代码" style="width:100%">
								<el-option 
									v-for="(label, value) in TRUCKPLATENUMTYPE" 
									:key="value" 
									:label="value + ' ' + label" 
									:value="value">
								</el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="车辆牌照号" prop="vehicleLicenseNumber">
							<el-input v-model="WaybillInfo.vehicleLicenseNumber" placeholder="请输入车辆牌照号"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="车辆分类代码" prop="vehicleClassificationCode">
							<el-select v-model="WaybillInfo.vehicleClassificationCode" placeholder="请选择车辆类型" style="width:100%">
								<el-option 
									v-for="(label, value) in TRUCKTYPE1" 
									:key="value" 
									:label="value + ' ' + label" 
									:value="value">
								</el-option>
							</el-select>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="8">
						<el-form-item label="车辆载质量" prop="vehicleLoadingQuality">
							<el-input v-model="WaybillInfo.vehicleLoadingQuality" placeholder="请输入车辆载质量"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="道路运输证号" prop="roadTransportNo">
							<el-input v-model="WaybillInfo.roadTransportNo" placeholder="请输入道路运输证号"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="挂车牌照号">
							<el-input v-model="WaybillInfo.trailerLicenseNumber" placeholder="请输入挂车牌照号"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="8">
						<el-form-item label="所有人" prop="thePersonal">
							<el-input v-model="WaybillInfo.thePersonal" placeholder="请输入所有人"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="许可证编号" prop="carLicenseNumber">
							<el-input v-model="WaybillInfo.carLicenseNumber" placeholder="请输入许可证编号"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="姓名" prop="name">
							<el-input v-model="WaybillInfo.name" placeholder="请输入姓名"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="8">
						<el-form-item label="从业资格证号" prop="certificateQualification">
							<el-input v-model="WaybillInfo.certificateQualification" placeholder="请输入从业资格证号"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="电话号码">
							<el-input v-model="WaybillInfo.phone" placeholder="请输入电话号码"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="8">
						<el-form-item label="货物名称" prop="nameGoods">
							<el-input v-model="WaybillInfo.nameGoods" placeholder="请输入货物名称"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="货物类型分类" prop="codeGoods">
							<el-select v-model="WaybillInfo.codeGoods" placeholder="请选择货物类型" style="width:100%">
								<el-option 
									v-for="(label, value) in CARGOTYPE" 
									:key="value" 
									:label="value + ' ' + label" 
									:value="value">
								</el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="货物项毛重" prop="goodsGross">
							<el-input v-model="WaybillInfo.goodsGross" placeholder="请输入货物项毛重"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="8">
						<el-form-item label="体积">
							<el-input v-model="WaybillInfo.volume" placeholder="请输入体积"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="总件数">
							<el-input v-model="WaybillInfo.total" placeholder="请输入总件数"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="运输方式代码" prop="transportModeCode">
							<el-select v-model="WaybillInfo.transportModeCode" placeholder="请选择运输方式" style="width:100%">
								<el-option 
									v-for="(label, value) in TRANSPORTTYPE" 
									:key="value" 
									:label="value + ' ' + label" 
									:value="value">
								</el-option>
							</el-select>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="24">
						<el-form-item>
							<el-button type="primary" @click="save">保存</el-button>
							<el-button @click.native="back">取消</el-button>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
		</el-card>
	</div>
</template>
<script type="text/javascript">
import { Message } from 'element-ui'
import request from '../../../common/request'
import Company from '../../../api/Company'
import { checkInt, checkFloat2 ,yyyymmddhhmmss} from '../../../common/valid'
export default {
	data() {
		return {
			TruckType: [],
			CargoType: [],
			notruck_transport:[],
			notruck_LicensePlate:[],
			notruck_business:[],
			WaybillInfo:{
				messageReferenceNumber:'',
				senderCode:'',
				messageFunctionCode:'',
				documentName:'无车承运人电子路单',
				recipientCode:'',
				documentVersionNumber:'',
				messageSendingDateTime:'',
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
			},
			rules: {
				originalAddNumber:[ {required: true, message: '请输入原始单号'} ],
				shippingNoteNumber:[ {required: true, message: '请输入托运单号'} ],
				carrier:[ {required: true, message: '请输入承运人'} ],
				uniformSocialCreditCode:[ {required: true, message: '请输入统一社会信用代码'} ],
				waybillLicenseNumber:[ {required: true, message: '请输入许可证编号'} ],
				dteOfShipment:[ {required: true, message: '请输入托运日期时间'} ,{ validator: yyyymmddhhmmss }],
				serviceTypeCode:[ {required: true, message: '请选择业务类型代码'} ],
				dateActualShipment:[ {required: true, message: '请输入实际发运日期时间'} ,{ validator: yyyymmddhhmmss }],
				dateOfDelivery:[ {required: true, message: '请输入收货日期时间'} ,{ validator: yyyymmddhhmmss }],
				consignor:[ {required: true, message: '请输入发货人'} ],
				loadingPlace:[ {required: true, message: '请输入装货地点'} ],
				codeConsignorDivisions:[ {required: true, message: '请输入国家行政区划代码'} ],
				consignee:[ {required: true, message: '请输入收货人'} ],
				receivingPlace:[ {required: true, message: '请输入收货地点'} ],
				codeConsigneeDivisions:[ {required: true, message: '请输入国家行政区划代码'} ],
				transportationCost:[ {required: true, message: '请输入运输成本'}, { validator: checkFloat2 }  ],
				totalAmountMoney:[ {required: true, message: '请输入货币总金额'}, { validator: checkFloat2 }  ],
				licensePlateCode:[ {required: true, message: '请选择牌照类型代码'} ],
				vehicleLicenseNumber:[ {required: true, message: '请输入车辆牌照号'} ],
				vehicleClassificationCode:[ {required: true, message: '请选择车辆分类代码'} ],
				vehicleLoadingQuality:[ {required: true, message: '请输入车辆载质量'}, { validator: checkFloat2 }  ],
				roadTransportNo:[ {required: true, message: '请输入道路运输证号'} ],
				thePersonal:[ {required: true, message: '请输入所有人'} ],
				carLicenseNumber:[ {required: true, message: '请输入许可证编号'} ],
				name:[ {required: true, message: '请输入姓名'} ],
				certificateQualification:[ {required: true, message: '请输入从业资格证号'} ],
				nameGoods:[ {required: true, message: '请输入货物名称'} ],
				codeGoods:[ {required: true, message: '请选择货物类型分类'} ],
				total:[ {required: true, message: '请输入总件数'},{ validator: checkInt }],
				volume:[ {required: true, message: '请输入体积'},{ validator: checkInt }],
				goodsGross:[ {required: true, message: '请输入货物项毛重'}, { validator: checkInt }  ],
				transportModeCode:[ {required: true, message: '请选择运输方式代码'} ]
			}
		}
	},
	created() {
		this.SendingDateTime()
		this.getWaybillInfo()
	},
	methods: {
		getWaybillInfo() {
			Company.detailOfExtend().then(res => {
				this.WaybillInfo.documentVersionNumber = res.data.documentVersionNumber
				this.WaybillInfo.messageFunctionCode = res.data.messageFunctionCode
				this.WaybillInfo.senderCode = res.data.senderCode
				this.WaybillInfo.recipientCode = res.data.recipientCode
				this.WaybillInfo.messageReferenceNumber = res.data.messageReferenceNumber
				this.WaybillInfo.messageSendingDateTime = this.sendingDateTime
			})
		},
		SendingDateTime(){
			let now = new Date()
			let year = now.getFullYear()
			let month = now.getMonth() + 1 < 10 ? '0' + (now.getMonth() + 1) : now.getMonth() + 1
			let date = now.getDate() < 10 ? '0' + now.getDate() : now.getDate()
			let hour = now.getHours() < 10 ? '0' + now.getHours() : now.getHours()
			let minute = now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes()
			let second = now.getSeconds() < 10 ? '0' + now.getSeconds() : now.getSeconds()
			this.sendingDateTime =  year + '' + month + '' + date + '' + hour + '' + minute + '' + second;
		},
		save() {
			this.$refs['ruleForm'].validate(valid => {
				if (!valid) {
					this.$nextTick(() => {
						Message.error($('.el-form-item__error:first').text())
						return
					})
				} else {
					Company.notruckCarryOrder().add({
						companyID:localStorage.getItem("companyID"),
						messageReferenceNumber: this.WaybillInfo.messageReferenceNumber,
						senderCode: this.WaybillInfo.senderCode,
						messageFunctionCode: this.WaybillInfo.messageFunctionCode,
						documentName: this.WaybillInfo.documentName,
						recipientCode: this.WaybillInfo.recipientCode,
						uniformSocialCreditCode:this.WaybillInfo.uniformSocialCreditCode,
						documentVersionNumber: this.WaybillInfo.documentVersionNumber,
						messageSendingDateTime: this.WaybillInfo.messageSendingDateTime,
						notruckuserId: this.WaybillInfo.notruckuserId,
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
						consignor:this.WaybillInfo.consignor,
						loadingPlace:this.WaybillInfo.loadingPlace,
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
					}).then(res => {
						Message.success('成功！')
						this.$router.push({name: 'notruckcarryorder'})
					})
				}
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
