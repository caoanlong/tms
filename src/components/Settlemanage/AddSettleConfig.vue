<template>
	<div class="main-content">
		<div class="wf-card">
			<div class="header clearfix">添加运费模板</div>
			<el-row>
				<div class="split-item">
					<span class="num">1</span>
					<span class="tit">配置运算项</span>
				</div>
			</el-row>
			<el-row>
				<el-col :span="8">
					<el-form label-width="100px">
						<el-form-item label="托运人">
							<el-select style="width: 100%"  v-model="Shippers.consignorID" filterable remote placeholder="请输入托运人关键词" :remote-method="getShippers" :loading="loading" @change="getConsignorDetail">
								<el-option v-for="item in Shippers" :key="item.Shippers" :label="item.companyName" :value="item.customerID">
								</el-option>
							</el-select>
						</el-form-item>
					</el-form>
				</el-col>
				<el-col :span="24">
					<p class="divided"><svg-icon icon-class="list-tag"></svg-icon>从哪</p>
					<el-form label-width="100px" style="display: flex">
						<el-form-item label="发货单位" style="flex: 1">
							<el-select style="width: 100%"  v-model="shipperDetail.shipperCompanyName" filterable remote placeholder="请输入托运人关键词" :remote-method="getRecdeliverycomp" :loading="loading" @change="getShipperDetail">
								<el-option v-for="item in Recdeliverycomp" :key="item.Recdeliverycomp" :label="item.companyName" :value="item.companyName">
								</el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="发货地" style="flex: 1">
							<el-input placeholder="发货详细地址" v-model="selectedArea" disabled></el-input>
						</el-form-item>
						<el-form-item label="详细地址" style="flex: 1">
							<el-input placeholder="发货详细地址" v-model="shipperDetail.detailAddress" disabled></el-input>
						</el-form-item>
					</el-form>
				</el-col>
				<el-col :span="24">
					<p class="divided"><svg-icon icon-class="list-tag" ></svg-icon>到哪</p>
					<el-form label-width="100px" style="display: flex">
						<el-form-item label="收货单位" style="flex: 1">
							<el-select style="width: 100%"  v-model="ConsigneeDetail.CompanyName" filterable remote placeholder="请输入收货单位关键词" :remote-method="getRecdeliverycomp" :loading="loading" @change="getConsigneeDetail">
								<el-option v-for="item in Recdeliverycomp" :key="item.Recdeliverycomp" :label="item.companyName" :value="item.companyName">
								</el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="收货地" style="flex: 1">
							<el-input placeholder="收货地" v-model="selectedArea1" disabled></el-input>
						</el-form-item>
						<el-form-item label="详细地址" style="flex: 1">
							<el-input placeholder="收货详细地址" v-model="ConsigneeDetail.detailAddress" disabled></el-input>
						</el-form-item>
					</el-form>
				</el-col>
				<el-col :span="24">
					<p class="divided"><svg-icon icon-class="list-tag"></svg-icon>对内</p>
					<el-form label-width="100px" style="display: flex">
						<el-form-item label="对内运距" style="flex: 1">
							<el-input placeholder="请输入..." v-model="templateFreight.mileage"></el-input>
						</el-form-item>
						<el-form-item label="对内TKM" style="flex: 1">
							<el-input placeholder="请输入..." v-model="templateFreight.internalUnitPrice"></el-input>
						</el-form-item>
						<el-form-item placeholder="请输入..." label="对内运费" style="flex: 1">
							<el-input v-model="templateFreight.internalPrice"></el-input>
						</el-form-item>
					</el-form>
				</el-col>
				<el-col :span="24">
					<p class="divided"><svg-icon icon-class="list-tag"></svg-icon>对外</p>
					<el-form label-width="100px" style="display: flex">
						<el-form-item label="对外运距" style="flex: 1">
							<el-input placeholder="请输入..." v-model="templateFreight.externalMileage"></el-input>
						</el-form-item>
						<el-form-item placeholder="请输入..." label="对外TKM" style="flex: 1">
							<el-input v-model="templateFreight.externalUnitPrice"></el-input>
						</el-form-item>
						<el-form-item placeholder="请输入..." label="对外运费" style="flex: 1">
							<el-input v-model="templateFreight.externalPrice"></el-input>
						</el-form-item>
					</el-form>
				</el-col>
			</el-row>
			<el-row>
				<div class="split-item">
					<span class="num">2</span>
					<span class="tit">配置收费方式</span>
				</div>
			</el-row>
			<el-row>
				<el-col :span="24">
					<p class="divided"><svg-icon icon-class="list-tag"></svg-icon>对内付款方式占比</p>
					<el-form label-width="100px" style="display: flex">
						<el-form-item label="现付" style="flex: 1">
							<el-input placeholder="请输入..." v-model="templateFreight.internalCashRate"></el-input>
						</el-form-item>
						<el-form-item label="到付" style="flex: 1">
							<el-input placeholder="请输入..." v-model="templateFreight.internalCodRate"></el-input>
						</el-form-item>
						<el-form-item label="回单付" style="flex: 1">
							<el-input placeholder="请输入..." v-model="templateFreight.internalPorRate"></el-input>
						</el-form-item>
						<el-form-item label="月结" style="flex: 1">
							<el-input placeholder="请输入..." v-model="templateFreight.internalAbschlussRate"></el-input>
						</el-form-item>
						<el-form-item label="收方到货付" style="flex: 1">
							<el-input placeholder="请输入..." v-model="templateFreight.internalConsigneeCodRate"></el-input>
						</el-form-item>
					</el-form>
				</el-col>
				<el-col :span="24">
					<p class="divided"><svg-icon icon-class="list-tag"></svg-icon>对外收款方式占比</p>
					<el-form label-width="100px" style="display: flex">
						<el-form-item label="现付" style="flex: 1">
							<el-input placeholder="请输入..." v-model="templateFreight.externalCashRate"></el-input>
						</el-form-item>
						<el-form-item label="到付" style="flex: 1">
							<el-input placeholder="请输入..." v-model="templateFreight.externalCodRate"></el-input>
						</el-form-item>
						<el-form-item label="回单付" style="flex: 1">
							<el-input placeholder="请输入..." v-model="templateFreight.externalPorRate"></el-input>
						</el-form-item>
						<el-form-item label="月结" style="flex: 1">
							<el-input placeholder="请输入..." v-model="templateFreight.externalAbschlussRate"></el-input>
						</el-form-item>
						<el-form-item label="收方到货付" style="flex: 1">
							<el-input placeholder="请输入..." v-model="templateFreight.externalConsigneeCodRate"></el-input>
						</el-form-item>
					</el-form>
				</el-col>
			</el-row>
			<div class="handle">
				<el-button type="primary" @click="add">立即保存</el-button>
				<el-button @click="back">取消</el-button>
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
import { Message } from 'element-ui'
import DistPicker from '../CommonComponents/DistPicker'
import request from '../../common/request'
import { searchAreaByKey } from '../../common/utils'
export default {
	data() {
		return {
			loading: false,
			//托运人
			Shippers:{
				companyName:'',
				customerID:'',
			},
			Recdeliverycomp:{},
			// 发货人
			shipperDetail: {
				companyName:'',
				contactName:'',
				companyArea:'',
				detailAddress:'',
				companyID:'',
				customerID:''
			},
			// 收货人
			ConsigneeDetail: {
				companyName:'',
				contactName:'',
				companyArea:'',
				detailAddress:'',
				companyID:'',
				customerID:''
			},
			selectedArea: '', //发货地id
			selectedArea1: '',  // 收货地id
			templateFreight: {
				externalAbschlussRate:'', //对外月结比率
				externalCashRate:'', //对外现付比率
				externalCodRate:'', //对外到付比率
				externalConsigneeCodRate:'', //对外收货方到付比率
				externalMileage:'', //对外运距
				externalPorRate:'', //对外回单比率
				externalPrice:'', //对外运价
				externalUnitPrice:'', //对外TKM
				internalAbschlussRate:'', //对内月结比率
				internalCashRate:'', //对内现付比率
				internalCodRate:'', //对内到付比率
				internalConsigneeCodRate:'', //对内收货方到付比率
				internalPorRate:'', //对内回单比率
				internalPrice:'', //对内运价
				internalUnitPrice:'', //对内TKM
				mileage:'' //对内运距
			}
		}
	},
	created() {
	},
	methods: {
		getShippers(e) {
			let params = {
				type: 'Consignor',
			}
			request({
				url: '/customer/findList',
				params
			}).then(res => {
				console.log('托运人')
				console.log(res.data)
				this.Shippers = res.data.data.records
				let arr = this.Shippers.filter(item => {
					return item.companyName == e
					
				})
				
			})
		},
		// 获取托运人详情
		getConsignorDetail(e){
			let arr = this.Shippers.filter(item => {
				return item.customerID == e
			})
			console.log('托运人详情')
			console.log(arr[0])
			this.Shippers.companyArea = arr[0].companyArea
			this.Shippers.companyName = arr[0].companyName
			this.Shippers.contactName = arr[0].contactName
			this.Shippers.contactPhone = arr[0].contactPhone
			this.Shippers.customerID = arr[0].customerID
			this.Shippers.detailAddress = arr[0].detailAddress
		},
		getRecdeliverycomp() {
			let params = {
				type: 'ShipperConsignee',
			}
			request({
				url: '/customer/findList',
				params
			}).then(res => {
				console.log('发货人，收货人列表')
				console.log(res.data.data)
				this.Recdeliverycomp = res.data.data.records
			})
		},
		getShipperDetail(e){
			let arr = this.Recdeliverycomp.filter(item => {
				return item.companyName == e
			})
			console.log('发货人详情')
			console.log(arr[0])
			this.shipperDetail.contactName = arr[0].contactName
			this.shipperDetail.contactPhone = arr[0].contactPhone
			this.shipperDetail.companyArea = arr[0].companyArea
			this.shipperDetail.detailAddress = arr[0].detailAddress
			this.shipperDetail.companyID = arr[0].companyID
			this.shipperDetail.companyName =arr[0].companyName
			this.shipperDetail.customerID = arr[0].customerID
			let areaID = String(arr[0].companyAreaID)
			this.templateFreight.shipperAreaID =areaID
			this.selectedArea = searchAreaByKey(areaID)
		},
		getConsigneeDetail(e){
			let arr = this.Recdeliverycomp.filter(item => {
				return item.companyName == e
			})
			console.log('收货人详情')
			console.log(arr[0])
			this.ConsigneeDetail.contactName = arr[0].contactName
			this.ConsigneeDetail.contactPhone = arr[0].contactPhone
			this.ConsigneeDetail.companyArea = arr[0].companyArea
			this.ConsigneeDetail.detailAddress = arr[0].detailAddress
			this.ConsigneeDetail.companyID = arr[0].companyID
			this.ConsigneeDetail.customerID = arr[0].customerID
			this.ConsigneeDetail.companyName = arr[0].companyName
			let areaID = String(arr[0].companyAreaID)
			this.templateFreight.consigneeAreaID =areaID
			this.selectedArea1 = searchAreaByKey(areaID)
		},
		add() {
			let data = {
				// consigneeArea:this.templateFreight.consigneeArea, //收货地
				consigneeAreaID:this.templateFreight.consigneeAreaID,  //收货地id
				consigneeCompanyName:this.ConsigneeDetail.companyName,  //收货公司名称
				consigneeDetailAddress:this.ConsigneeDetail.detailAddress,  //收货详细地址
				consigneeID:this.ConsigneeDetail.customerID,  //收货单位id

				consignorID:this.Shippers.customerID,  //托运人id
				consignorName:this.Shippers.companyName,  //托运人名称

				externalAbschlussRate:this.templateFreight.externalAbschlussRate,  //对外月结比率
				externalCashRate:this.templateFreight.externalCashRate,  //对外现付比率
				externalCodRate:this.templateFreight.externalCodRate,  //对外到付比率
				externalConsigneeCodRate:this.templateFreight.externalConsigneeCodRate,  //对外收货方到付比率
				externalMileage:this.templateFreight.externalMileage,  //对外运距
				externalPorRate:this.templateFreight.externalPorRate,  //对外回单比率
				externalPrice:this.templateFreight.externalPrice,  //对外运价
				externalUnitPrice:this.templateFreight.externalUnitPrice,  //对外TKM

				internalAbschlussRate:this.templateFreight.internalAbschlussRate,  //对内月结比率
				internalCashRate:this.templateFreight.internalCashRate,  //对内现付比率
				internalCodRate:this.templateFreight.internalCodRate,  //对内到付比率
				internalConsigneeCodRate:this.templateFreight.internalConsigneeCodRate,  //对内收货方到付比率
				internalPorRate:this.templateFreight.internalPorRate,  //对内回单比率
				internalPrice:this.templateFreight.internalPrice,  //对内运价
				internalUnitPrice:this.templateFreight.internalUnitPrice,  //对内TKM
				mileage:this.templateFreight.mileage,  //对内运距

				// shipperArea:this.templateFreight.shipperArea,  //发货地
				shipperAreaID:this.templateFreight.shipperAreaID,  //发货地id
				shipperCompanyName:this.shipperDetail.companyName,  //发货公司名称
				shipperDetailAddress:this.shipperDetail.detailAddress,  //发货详细地址
				shipperID:this.shipperDetail.customerID  //发货单位id
			}
			console.log(data)
			// return
			request({
				url: '/transportPrice/add',
				method:'post',
				data
			}).then(res => {
				console.log(res.data)
				Message.success('保存成功！')
				this.$router.push({name: 'settleconfig'})
			})
		},
		handleSelectedArea(data) {
			this.selectedArea = data
		},
		handleSelectedArea1(data) {
			this.selectedArea1 = data
		},
		back() {
			this.$router.go(-1)
		}
	},
	components: {
		DistPicker
	}
}

</script>
<style lang="stylus" scoped>
.divided
	// background #f7f7f7
	padding 10px 15px 5px 30px
	margin-top 0
	color #C0C4CC
	border-bottom 1px solid #f2f2f2
	font-size 14px
	.svg-icon
		margin-right 5px
		color #909399
.handle
	text-align center
</style>