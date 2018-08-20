<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">添加货源</div>
			<el-row>
				<el-col :span="8">
					<el-form label-width="120px">
						<el-form-item label="报文参考号：">
							<el-input v-model="apkInfo.messageReferenceNumber" :disabled="true"></el-input>
						</el-form-item>
						<el-form-item label="发送方代码：">
							<el-input v-model="apkInfo.senderCode" :disabled="true"></el-input>
						</el-form-item>
						<el-form-item label="报文功能代码：">
							<el-input v-model="apkInfo.messageFunctionCode" :disabled="true"></el-input>
						</el-form-item>
						<el-form-item label="出发地区代码：">
							<el-input v-model="CargoInfo.countrySubdivisionCode"></el-input>
						</el-form-item>
						<el-form-item label="目的地区代码：">
							<el-input v-model="CargoInfo.destinationCountrySubdivisionCode"></el-input>
						</el-form-item>
						<el-form-item label="货物名称：">
							<el-input v-model="CargoInfo.descriptionOfGoods"></el-input>
						</el-form-item>
					</el-form>
				</el-col>
				<el-col :span="8">
					<el-form label-width="120px">
						<el-form-item label="单证名称：">
							<el-input v-model="apkInfo.documentName" :disabled="true"></el-input>
						</el-form-item>
						<el-form-item label="接收方代码：">
							<el-input v-model="apkInfo.recipientCode" :disabled="true"></el-input>
						</el-form-item>
						<el-form-item label="发货人：">
							<el-input v-model="CargoInfo.consignor"></el-input>
						</el-form-item>
						<el-form-item label="收货人：">
							<el-input v-model="CargoInfo.consignee"></el-input>
						</el-form-item>
						<el-form-item label="费用总金额：">
							<el-input v-model="CargoInfo.totalMonetaryAmount"></el-input>
						</el-form-item>
						<el-form-item label="货物类型分类：">
							<el-select v-model="CargoInfo.cargoTypeClassificationCode" placeholder="请选择货物类型" style="width:100%">
								<el-option v-for="item in CargoType" :key="item.ConstStd_ID" :label="item.Value +' ' + item.Name" :value="item.Value">
								</el-option>
							</el-select>
						</el-form-item>
					</el-form>
				</el-col>
				<el-col :span="8">
					<el-form label-width="120px">
						<el-form-item label="报文版本号">
							<el-input v-model="apkInfo.documentVersionNumber" :disabled="true"></el-input>
						</el-form-item>
						<el-form-item label="发送日期时间">
							<el-input v-model="apkInfo.messageSendingDateTime" :disabled="true"></el-input>
						</el-form-item>
						<el-form-item label="出发地">
							<el-input v-model="CargoInfo.placeOfLoading"></el-input>
						</el-form-item>
						<el-form-item label="目的地">
							<el-input v-model="CargoInfo.goodsReceiptPlace"></el-input>
						</el-form-item>
						<el-form-item label="车辆类型">
							<el-select v-model="CargoInfo.vehicleClassificationCode" placeholder="请选择车辆类型" style="width:100%">
								<el-option v-for="item in TruckType" :key="item.ConstStd_ID" :label="item.Value +' ' + item.Name" :value="item.Value">
								</el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="货物项毛重">
							<el-input v-model="CargoInfo.goodsItemGrossWeight"></el-input>
						</el-form-item>
					</el-form>
				</el-col>
				<el-col :span="24">
					<el-form label-width="120px">
						<el-form-item>
							<el-button type="primary" @click="SaveCargo">保存</el-button>
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
import NotruckCargosource from '../../../api/NotruckCargosource'
export default {
	data() {
		return {
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
			TruckType: [],
			CargoType: [],
			CargoInfo:{
				countrySubdivisionCode:'',
				destinationCountrySubdivisionCode:'',
				descriptionOfGoods:'',
				consignor:'',
				consignee:'',
				totalMonetaryAmount:'',
				cargoTypeClassificationCode:'',
				placeOfLoading:'',
				goodsReceiptPlace:'',
				vehicleClassificationCode:'',
				goodsItemGrossWeight:''
			}
		}
	},
	created() {
		this.getAPK()
		this.getConstant('CargoType')
		this.getConstant('TruckType')
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
		getAPK() {
			NotruckCargosource.findAPK().then(res => {
				this.apkInfo = res
			})
		},
		SaveCargo() {
			NotruckCargosource.add({
				messageReferenceNumber: this.apkInfo.messageReferenceNumber,
				senderCode: this.apkInfo.senderCode,
				messageFunctionCode: this.apkInfo.messageFunctionCode,
				documentName: this.apkInfo.documentName,
				recipientCode: this.apkInfo.recipientCode,
				documentVersionNumber: this.apkInfo.documentVersionNumber,
				messageSendingDateTime: this.apkInfo.messageSendingDateTime,
				notruckuserId: this.apkInfo.notruckuserId,
				countrySubdivisionCode: this.CargoInfo.countrySubdivisionCode,
				destinationCountrySubdivisionCode: this.CargoInfo.destinationCountrySubdivisionCode,
				descriptionOfGoods: this.CargoInfo.descriptionOfGoods,
				consignor: this.CargoInfo.consignor,
				consignee: this.CargoInfo.consignee,
				totalMonetaryAmount: this.CargoInfo.totalMonetaryAmount,
				cargoTypeClassificationCode: this.CargoInfo.cargoTypeClassificationCode,
				placeOfLoading: this.CargoInfo.placeOfLoading,
				goodsReceiptPlace: this.CargoInfo.goodsReceiptPlace,
				vehicleClassificationCode: this.CargoInfo.vehicleClassificationCode,
				goodsItemGrossWeight: this.CargoInfo.goodsItemGrossWeight
			}).then(res => {
				Message.success(res.data.message)
				this.$router.push({name: 'notruckcargosource'})
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