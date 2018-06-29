<template>
	<div class="main-content">
		<div class="wf-card">
			<div class="header clearfix">编辑车源</div>
			<el-row>
				<el-col :span="8">
					<el-form label-width="130px">
						<el-form-item label="报文参考号">
							<el-input v-model="TruckInfo.messageReferenceNumber" :disabled="true"></el-input>
						</el-form-item>
						<el-form-item label="发送方代码">
							<el-input v-model="TruckInfo.senderCode" :disabled="true"></el-input>
						</el-form-item>
						<el-form-item label="报文功能代码">
							<el-input v-model="TruckInfo.messageFunctionCode" :disabled="true"></el-input>
						</el-form-item>
						<el-form-item label="车辆长度">
							<el-select v-model="TruckInfo.vehicleLength" placeholder="请选择车辆类型" style="width:100%">
								<el-option v-for="item in TruckLength" :key="item.ConstStd_ID" :label="item.Name " :value="item.Value">
								</el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="出发地区代码">
							<el-input v-model="TruckInfo.countrySubdivisionCode"></el-input>
						</el-form-item>
					</el-form>
				</el-col>
				<el-col :span="8">
					<el-form label-width="130px">
						<el-form-item label="单证名称">
							<el-input v-model="TruckInfo.documentName" :disabled="true"></el-input>
						</el-form-item>
						<el-form-item label="接收方代码">
							<el-input v-model="TruckInfo.recipientCode" :disabled="true"></el-input>
						</el-form-item>
						<el-form-item label="车辆牌照号">
							<el-input v-model="TruckInfo.vehicleNumber"></el-input>
						</el-form-item>
						<el-form-item label="核定载质量">
							<el-input v-model="TruckInfo.vehicleTonnage"></el-input>
						</el-form-item>
						<el-form-item label="目的地地区代码">
							<el-input v-model="TruckInfo.destinationCountrySubdivisionCode"></el-input>
						</el-form-item>
					</el-form>
				</el-col>
				<el-col :span="8">
					<el-form label-width="130px">
						<el-form-item label="报文版本号">
							<el-input v-model="TruckInfo.documentVersionNumber" :disabled="true"></el-input>
						</el-form-item>
						<el-form-item label="发送日期时间">
							<el-input v-model="TruckInfo.messageSendingDateTime" :disabled="true"></el-input>
						</el-form-item>
						<el-form-item label="车辆类型">
							<el-select v-model="TruckInfo.vehicleClassificationCode" placeholder="请选择车辆类型" style="width:100%">
								<el-option v-for="item in TruckType" :key="item.ConstStd_ID" :label="item.Name " :value="item.Value">
								</el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="出发地">
							<el-input v-model="TruckInfo.placeOfLoading"></el-input>
						</el-form-item>
						<el-form-item label="目的地">
							<el-input v-model="TruckInfo.goodsReceiptPlace"></el-input>
						</el-form-item>
					</el-form>
				</el-col>
				<el-col :span="24">
					<el-form label-width="130px">
						<el-form-item>
							<el-button type="primary" @click="SaveTruck">保存</el-button>
							<el-button @click.native="back">取消</el-button>
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
import NoTrucksource from '../../../api/NoTrucksource'
export default {
	data() {
		return {
			TruckType: [],
			TruckLength: [],
			TruckInfo: {
				vehicleNumber: '',
				vehicleClassificationCode: '',
				vehicleLength: '',
				vehicleTonnage: '',
				placeOfLoading: '',
				countrySubdivisionCode: '',
				goodsReceiptPlace: '',
				notruckuserId:'',
				destinationCountrySubdivisionCode: ''
			}
		}
	},
	created() {
		this.getConstant('TruckType')
		this.getConstant('TruckLength')
		this.getTruckInfo()
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
		getTruckInfo() {
			const notrucksourceId = this.$route.query.notrucksourceId
			NoTrucksource.findById({ notrucksourceId }).then(res => {
				this.TruckInfo = res
			})
		},
		SaveTruck() {
			NoTrucksource.update({
				notrucksourceId: this.$route.query.notrucksourceId,
				vehicleNumber: this.TruckInfo.vehicleNumber,
				vehicleClassificationCode: this.TruckInfo.vehicleClassificationCode,
				vehicleLength: this.TruckInfo.vehicleLength,
				vehicleTonnage: this.TruckInfo.vehicleTonnage,
				placeOfLoading: this.TruckInfo.placeOfLoading,
				countrySubdivisionCode: this.TruckInfo.countrySubdivisionCode,
				goodsReceiptPlace: this.TruckInfo.goodsReceiptPlace,
				notruckuserId:this.TruckInfo.notruckuserId,
				destinationCountrySubdivisionCode: this.TruckInfo.destinationCountrySubdivisionCode
			}).then(res => {
				Message.success(res.data.message)
				this.$router.push({ name: 'notrucksource' })
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
