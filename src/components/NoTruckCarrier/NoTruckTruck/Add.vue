<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">添加车源</div>
			<el-form label-width="130px" :model="TruckInfo" :rules="rules" ref="ruleForm" size="small">
				<el-row :gutter="20">
					<el-col :span="8">
						<el-form-item label="报文参考号">
							<el-input v-model="TruckInfo.messageReferenceNumber" :disabled="true"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="单证名称">
							<el-input v-model="TruckInfo.documentName" :disabled="true"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="报文版本号">
							<el-input v-model="TruckInfo.documentVersionNumber" :disabled="true"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="20">
					<el-col :span="8">
						<el-form-item label="发送方代码">
							<el-input v-model="TruckInfo.senderCode" :disabled="true"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="接收方代码">
							<el-input v-model="TruckInfo.recipientCode" :disabled="true"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="发送日期时间">
							<el-input v-model="TruckInfo.messageSendingDateTime" :disabled="true"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="20">
					<el-col :span="8">
						<el-form-item label="报文功能代码">
							<el-input v-model="TruckInfo.messageFunctionCode" :disabled="true"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="20">
					<el-col :span="8">
						<el-form-item label="车辆牌照号" prop="vehicleNumber">
							<el-input v-model="TruckInfo.vehicleNumber" placeholder="请输入车辆牌照号"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="车辆类型" prop="vehicleClassificationCode">
							<el-select v-model="TruckInfo.vehicleClassificationCode" placeholder="请选择车辆类型" style="width:100%">
								<el-option 
									v-for="(label, value) in TRUCKTYPE1" 
									:key="value" 
									:label="value +'  '+ label" 
									:value="value">
								</el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="车辆长度" prop="vehicleLength">
							<el-input v-model="TruckInfo.vehicleLength" placeholder="请输入车辆长度"><template slot="append">mm</template></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="20">
					<el-col :span="8">
						<el-form-item label="核定载质量" prop="vehicleTonnage">
							<el-input v-model="TruckInfo.vehicleTonnage" placeholder="请输入核定载质量"><template slot="append">吨</template></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="出发地" prop="placeOfLoading">
							<el-input v-model="TruckInfo.placeOfLoading" placeholder="请输入出发地"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="出发地区代码" prop="countrySubdivisionCode">
							<el-input v-model="TruckInfo.countrySubdivisionCode" placeholder="请输入出发地区代码"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="20">
					<el-col :span="8">
						<el-form-item label="目的地" prop="goodsReceiptPlace">
							<el-input v-model="TruckInfo.goodsReceiptPlace" placeholder="请输入目的地"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="目的地地区代码" prop="destinationCountrySubdivisionCode">
							<el-input v-model="TruckInfo.destinationCountrySubdivisionCode" placeholder="请输入目的地地区代码"></el-input>
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
import { checkPlateNoNew, checkInt, checkFloat2 } from '../../../common/valid'
export default {
	data() {
		return {
			TruckInfo:{
				messageReferenceNumber:'',
				senderCode:'',
				messageFunctionCode:'',
				documentName:'车源信息',
				recipientCode:'',
				documentVersionNumber:'',
				messageSendingDateTime:'',
				notruckuserId:'',
				vehicleNumber:'',
				vehicleClassificationCode:'',
				vehicleLength:'',
				vehicleTonnage:'',
				placeOfLoading:'',
				countrySubdivisionCode:'',
				goodsReceiptPlace:'',
				destinationCountrySubdivisionCode:''
			},
			rules: {
				vehicleNumber: [ {required: true, message: '请输入车辆牌照号'}, { validator: checkPlateNoNew } ],
				vehicleClassificationCode: [ {required: true, message: '请选择车辆类型'} ],
				vehicleLength: [ {required: true, message: '请输入车辆长度'}, { validator: checkInt } ],
				vehicleTonnage: [ {required: true, message: '请输入核定载质量'}, { validator: checkFloat2 } ],
				placeOfLoading: [ {required: true, message: '请输入出发地'} ],
				countrySubdivisionCode: [ {required: true, message: '请输入出发地区代码'} ],
				goodsReceiptPlace: [ {required: true, message: '请输入目的地'} ],
				destinationCountrySubdivisionCode: [ {required: true, message: '请输入目的地地区代码'} ],
			}
		}
	},
	created() {
		this.SendingDateTime()
		this.getApkInfo()
	},
	methods: {
		getApkInfo() {
			Company.detailOfExtend().then(res => {
				this.TruckInfo.documentVersionNumber = res.data.documentVersionNumber
				this.TruckInfo.messageFunctionCode = res.data.messageFunctionCode
				this.TruckInfo.senderCode = res.data.senderCode
				this.TruckInfo.recipientCode = res.data.recipientCode
				this.TruckInfo.messageReferenceNumber = res.data.messageReferenceNumber
				this.TruckInfo.messageSendingDateTime = this.sendingDateTime
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
					Company.notruckTruckAdd({
						companyID:localStorage.getItem("companyID"),
						messageReferenceNumber: this.TruckInfo.messageReferenceNumber,
						senderCode: this.TruckInfo.senderCode,
						notruckuserId: this.TruckInfo.notruckuserId,
						messageFunctionCode: this.TruckInfo.messageFunctionCode,
						documentName: this.TruckInfo.documentName,
						recipientCode: this.TruckInfo.recipientCode,
						documentVersionNumber: this.TruckInfo.documentVersionNumber,
						messageSendingDateTime: this.TruckInfo.messageSendingDateTime,
						vehicleNumber: this.TruckInfo.vehicleNumber,
						vehicleClassificationCode: this.TruckInfo.vehicleClassificationCode,
						vehicleLength: this.TruckInfo.vehicleLength,
						vehicleTonnage: this.TruckInfo.vehicleTonnage,
						placeOfLoading: this.TruckInfo.placeOfLoading,
						countrySubdivisionCode: this.TruckInfo.countrySubdivisionCode,
						goodsReceiptPlace: this.TruckInfo.goodsReceiptPlace,
						destinationCountrySubdivisionCode: this.TruckInfo.destinationCountrySubdivisionCode
					}).then(res => {
						Message.success('成功！')
						this.$router.push({name: 'notrucktruck'})
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
