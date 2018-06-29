<template>
	<div class="main-content">
		<div class="wf-card">
			<div class="header clearfix">编辑货源</div>
			<el-row>
				<el-col :span="8">
					<el-form label-width="120px">
						<el-form-item label="报文参考号">
							<el-input v-model="CargoInfo.messageReferenceNumber" :disabled="true"></el-input>
						</el-form-item>
						<el-form-item label="发送方代码">
							<el-input v-model="CargoInfo.senderCode" :disabled="true"></el-input>
						</el-form-item>
						<el-form-item label="报文功能代码">
							<el-input v-model="CargoInfo.messageFunctionCode" :disabled="true"></el-input>
						</el-form-item>
						<el-form-item label="出发地区代码">
							<el-input v-model="CargoInfo.countrySubdivisionCode"></el-input>
						</el-form-item>
						<el-form-item label="目的地区代码">
							<el-input v-model="CargoInfo.destinationCountrySubdivisionCode"></el-input>
						</el-form-item>
						<el-form-item label="货物名称">
							<el-input v-model="CargoInfo.descriptionOfGoods"></el-input>
						</el-form-item>
					</el-form>
				</el-col>
				<el-col :span="8">
					<el-form label-width="120px">
						<el-form-item label="单证名称">
							<el-input v-model="CargoInfo.documentName" :disabled="true"></el-input>
						</el-form-item>
						<el-form-item label="接收方代码">
							<el-input v-model="CargoInfo.recipientCode" :disabled="true"></el-input>
						</el-form-item>
						<el-form-item label="发货人">
							<el-input v-model="CargoInfo.consignor"></el-input>
						</el-form-item>
						<el-form-item label="收货人">
							<el-input v-model="CargoInfo.consignee"></el-input>
						</el-form-item>
						<el-form-item label="费用总金额">
							<el-input v-model="CargoInfo.totalMonetaryAmount"></el-input>
						</el-form-item>
						<el-form-item label="货物类型分类">
							<el-select v-model="CargoInfo.cargoTypeClassificationCode" placeholder="请选择货物类型" style="width:100%">
								<el-option v-for="item in CargoType" :key="item.ConstStd_ID" :label="item.Name " :value="item.Value">
								</el-option>
							</el-select>
						</el-form-item>
					</el-form>
				</el-col>
				<el-col :span="8">
					<el-form label-width="120px">
						<el-form-item label="报文版本号">
							<el-input v-model="CargoInfo.documentVersionNumber" :disabled="true"></el-input>
						</el-form-item>
						<el-form-item label="发送日期时间">
							<el-input v-model="CargoInfo.messageSendingDateTime" :disabled="true"></el-input>
						</el-form-item>
						<el-form-item label="出发地">
							<el-input v-model="CargoInfo.placeOfLoading"></el-input>
						</el-form-item>
						<el-form-item label="目的地">
							<el-input v-model="CargoInfo.goodsReceiptPlace"></el-input>
						</el-form-item>
						<el-form-item label="车辆类型">
							<el-select v-model="CargoInfo.vehicleClassificationCode" placeholder="请选择车辆类型" style="width:100%">
								<el-option v-for="item in TruckType" :key="item.ConstStd_ID" :label="item.Name " :value="item.Value">
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
		</div>
	</div>
</template>
<script type="text/javascript">
import { Message } from 'element-ui'
import request from '../../../common/request'
import NotruckCargosource from '../../../api/NotruckCargosource'
export default {
	data() {
		return {
			CargoType: [],
			TruckType: [],
			CargoInfo:{
				messageReferenceNumber:'',
				senderCode:'',
				messageFunctionCode:'',
				countrySubdivisionCode:'',
				destinationCountrySubdivisionCode:'',
				descriptionOfGoods:'',
				documentName:'',
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
			}
		}
	},
	created() {
		this.getConstant('CargoType')
		this.getConstant('TruckType')
		this.getCargoInfo()
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
		getCargoInfo() {
			const goodsId = this.$route.query.goodsId
			NotruckCargosource.findById({ goodsId }).then(res => {
				this.CargoInfo = res
			})
		},
		SaveCargo() {
			NotruckCargosource.update({
				goodsId: this.$route.query.goodsId,
				notruckuserId:this.CargoInfo.notruckuserId,
				messageReferenceNumber:this.CargoInfo.messageReferenceNumber,
				senderCode:this.CargoInfo.senderCode,
				messageFunctionCode:this.CargoInfo.messageFunctionCode,
				countrySubdivisionCode:this.CargoInfo.countrySubdivisionCode,
				destinationCountrySubdivisionCode:this.CargoInfo.destinationCountrySubdivisionCode,
				descriptionOfGoods:this.CargoInfo.descriptionOfGoods,
				documentName:this.CargoInfo.documentName,
				recipientCode:this.CargoInfo.recipientCode,
				countrySubdivisionCode:this.CargoInfo.countrySubdivisionCode,
				destinationCountrySubdivisionCode:this.CargoInfo.destinationCountrySubdivisionCode,
				descriptionOfGoods:this.CargoInfo.descriptionOfGoods,
				consignor:this.CargoInfo.consignor,
				consignee:this.CargoInfo.consignee,
				totalMonetaryAmount:this.CargoInfo.totalMonetaryAmount,
				cargoTypeClassificationCode:this.CargoInfo.cargoTypeClassificationCode,
				placeOfLoading:this.CargoInfo.placeOfLoading,
				goodsReceiptPlace:this.CargoInfo.goodsReceiptPlace,
				vehicleClassificationCode:this.CargoInfo.vehicleClassificationCode,
				goodsItemGrossWeight:this.CargoInfo.goodsItemGrossWeight
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