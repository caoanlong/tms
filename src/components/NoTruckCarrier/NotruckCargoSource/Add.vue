<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">添加货源</div>
			<el-form label-width="120px" :model="CargoInfo" :rules="rules" ref="ruleForm" size="small">
				<el-row :gutter="20">
					<el-col :span="8">
						<el-form-item label="报文参考号">
							<el-input v-model="CargoInfo.messageReferenceNumber" :disabled="true"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="单证名称">
							<el-input v-model="CargoInfo.documentName" :disabled="true"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="报文版本号">
							<el-input v-model="CargoInfo.documentVersionNumber" :disabled="true"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="20">
					<el-col :span="8">
						<el-form-item label="发送方代码">
							<el-input v-model="CargoInfo.senderCode" :disabled="true"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="接收方代码">
							<el-input v-model="CargoInfo.recipientCode" :disabled="true"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="发送日期时间">
							<el-input v-model="CargoInfo.messageSendingDateTime" :disabled="true"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="20">
					<el-col :span="8">
						<el-form-item label="报文功能代码">
							<el-input v-model="CargoInfo.messageFunctionCode" :disabled="true"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="20">
					<el-col :span="8">
						<el-form-item label="发货人" prop="consignor">
							<el-input v-model="CargoInfo.consignor"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="出发地"  prop="placeOfLoading">
							<el-input v-model="CargoInfo.placeOfLoading"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="出发地区代码"  prop="countrySubdivisionCode">
							<el-input v-model="CargoInfo.countrySubdivisionCode"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="20">
					<el-col :span="8">
						<el-form-item label="收货人"  prop="consignee">
							<el-input v-model="CargoInfo.consignee"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="目的地"  prop="goodsReceiptPlace">
							<el-input v-model="CargoInfo.goodsReceiptPlace"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="目的地区代码"  prop="destinationCountrySubdivisionCode">
							<el-input v-model="CargoInfo.destinationCountrySubdivisionCode"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="20">
					<el-col :span="8">
						<el-form-item label="费用总金额"  prop="totalMonetaryAmount">
							<el-input v-model="CargoInfo.totalMonetaryAmount"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="车辆类型"  prop="vehicleClassificationCode">
							<el-select v-model="CargoInfo.vehicleClassificationCode" placeholder="请选择车辆类型" style="width:100%">
								<el-option 
									v-for="(label, value) in TRUCKTYPE1" 
									:key="value" 
									:label="value +'  '+ label" 
									:value="value">
								</el-option>
							</el-select>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="20">
					<el-col :span="8">
						<el-form-item label="货物名称"  prop="descriptionOfGoods">
							<el-input v-model="CargoInfo.descriptionOfGoods"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="货物类型分类"  prop="cargoTypeClassificationCode">
							<el-select v-model="CargoInfo.cargoTypeClassificationCode" placeholder="请选择货物类型" style="width:100%">
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
						<el-form-item label="货物项毛重"  prop="goodsItemGrossWeight">
							<el-input v-model="CargoInfo.goodsItemGrossWeight"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="20">
					<el-col :span="24">
						<el-form-item>
							<el-button type="primary" @click="save">保存</el-button>
							<el-button @click="back">取消</el-button>
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
import { checkPlateNoNew, checkInt, checkFloat2 } from '../../../common/valid'
export default {
	data() {
		return {
			sendingDateTime:'',
			CargoType: [],
			TruckType: [],
			selectedShipperArea:[],
			selectedConsigneeArea:[],
			CargoInfo:{
				messageReferenceNumber:'',
				senderCode:'',
				messageFunctionCode:'',
				countrySubdivisionCode:'',
				destinationCountrySubdivisionCode:'',
				descriptionOfGoods:'',
				documentName:'货源信息',
				recipientCode:'',
				consignor:'',
				notruckuserId:'',
				consignee:'',
				totalMonetaryAmount:'',
				cargoTypeClassificationCode:'',
				documentVersionNumber:'',
				messageSendingDateTime:'',
				placeOfLoading:'',
				goodsReceiptPlace:'',
				vehicleClassificationCode:'',
				goodsItemGrossWeight:''
			},
			rules: {
				consignor: [ {required: true, message: '请输入发货人'} ],
				placeOfLoading: [ {required: true, message: '请输入出发地'} ],
				countrySubdivisionCode: [ {required: true, message: '请输入出发地区代码'} ],
				consignee: [ {required: true, message: '请输入收货人'} ],
				goodsReceiptPlace: [ {required: true, message: '请输入目的地'}],
				destinationCountrySubdivisionCode: [ {required: true, message: '请输入目的地区代码'} ],
				totalMonetaryAmount: [ {required: true, message: '请输入费用总金额'}, { validator: checkFloat2 } ],
				vehicleClassificationCode: [ {required: true, message: '请选择车辆类型'} ],
				descriptionOfGoods: [ {required: true, message: '请输入货物名称'} ],
				cargoTypeClassificationCode: [ {required: true, message: '请选择货物类型'} ],
				goodsItemGrossWeight: [ {required: true, message: '请输入货物项毛重'} ,{ validator: checkInt } ],
			}
		}
	},
	created() {
		this.SendingDateTime()
		this.getApkInfo()
	},
	methods: {
		getApkInfo() {
			Company.info().detailOfExtend().then(res => {
				this.CargoInfo.documentVersionNumber = res.data.documentVersionNumber
				this.CargoInfo.messageFunctionCode = res.data.messageFunctionCode
				this.CargoInfo.senderCode = res.data.senderCode
				this.CargoInfo.recipientCode = res.data.recipientCode
				this.CargoInfo.messageReferenceNumber = res.data.messageReferenceNumber
				this.CargoInfo.messageSendingDateTime = this.sendingDateTime
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
		/**选择发货地 */
		handleSelectedShipperArea() {},
		/**选择收货地 */
		handleSelectedConsigneeArea() {},
		save() {
			this.$refs['ruleForm'].validate(valid => {
				if (!valid) {
					this.$nextTick(() => {
						Message.error($('.el-form-item__error:first').text())
						return
					})
				} else {
					Company.notruckCargoSource().add({
						companyID:localStorage.getItem("companyID"),
						messageReferenceNumber:this.CargoInfo.messageReferenceNumber,
						documentName:this.CargoInfo.documentName,
						documentVersionNumber:this.CargoInfo.documentVersionNumber,
						senderCode:this.CargoInfo.senderCode,
						recipientCode:this.CargoInfo.recipientCode,
						messageSendingDateTime:this.CargoInfo.messageSendingDateTime,
						messageFunctionCode:this.CargoInfo.messageFunctionCode,
						consignor:this.CargoInfo.consignor,
						placeOfLoading:this.CargoInfo.placeOfLoading,
						countrySubdivisionCode:this.CargoInfo.countrySubdivisionCode,
						consignee:this.CargoInfo.consignee,
						goodsReceiptPlace:this.CargoInfo.goodsReceiptPlace,
						destinationCountrySubdivisionCode:this.CargoInfo.destinationCountrySubdivisionCode,
						totalMonetaryAmount:this.CargoInfo.totalMonetaryAmount,
						vehicleClassificationCode:this.CargoInfo.vehicleClassificationCode,
						descriptionOfGoods:this.CargoInfo.descriptionOfGoods,
						cargoTypeClassificationCode:this.CargoInfo.cargoTypeClassificationCode,
						goodsItemGrossWeight:this.CargoInfo.goodsItemGrossWeight
					}).then(res => {
						Message.success('成功！')
						this.$router.push({name: 'notruckcargosource'})
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
