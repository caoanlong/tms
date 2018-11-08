<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">编辑运费模板</div>	
			<el-row>
				<div class="split-item">
					<span class="num">1</span>
					<span class="tit">配置运算项</span>
				</div>
			</el-row>
			<el-form label-width="100px" size="mini" :model="templateFreight" :rules="rules" ref="ruleForm">
				<el-row>
					<el-col :span="8">
						<el-form-item label="托运人">
							<el-autocomplete 
								style="width: 100%" 
								value-key="companyName" 
								v-model="templateFreight.consignorName"
								:fetch-suggestions="getConsignors"
								placeholder="请输入内容">
							</el-autocomplete>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="24">
						<p class="divided">
							<svg-icon icon-class="list-tag"></svg-icon>从哪</p>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="8">
						<el-form-item label="发货单位">
							<el-autocomplete 
								style="width: 100%" 
								value-key="companyName" 
								v-model="templateFreight.shipperCompanyName"
								:fetch-suggestions="getRecdeliverycomp"
								placeholder="请输入内容"
								@select="handSelectShipper">
							</el-autocomplete>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="12">
						<el-form-item label="发货地">
							<DistPicker @selectChange="handleSelectedArea" :selected="selectedArea"/>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="详细地址">
							<el-input placeholder="详细地址" v-model="templateFreight.shipperDetailAddress"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="24">
						<p class="divided">
							<svg-icon icon-class="list-tag"></svg-icon>到哪</p>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="8">
						<el-form-item label="收货单位">
							<el-autocomplete 
								style="width: 100%" 
								value-key="companyName" 
								v-model="templateFreight.consigneeCompanyName"
								:fetch-suggestions="getRecdeliverycomp"
								placeholder="请输入内容"
								@select="handSelectConsignee">
							</el-autocomplete>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="12">
						<el-form-item label="收货地" prop="consigneeAreaID">
							<DistPicker @selectChange="handleSelectedArea1" :selected="selectedArea1"/>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="详细地址" prop="consigneeDetailAddress">
							<el-input placeholder="详细地址" v-model="templateFreight.consigneeDetailAddress"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="24">
						<p class="divided">
							<svg-icon icon-class="list-tag"></svg-icon>对内</p>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="8">
						<el-form-item label="对内运距" prop="mileage">
							<el-input placeholder="请输入..." v-model="templateFreight.mileage"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="对内TKM" prop="internalUnitPrice">
							<el-input placeholder="请输入..." v-model="templateFreight.internalUnitPrice"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="对内运费" prop="internalPrice">
							<el-input placeholder="请输入..." v-model="templateFreight.internalPrice"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="24">
						<p class="divided">
							<svg-icon icon-class="list-tag"></svg-icon>对外</p>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="8">
						<el-form-item label="对外运距" prop="externalMileage">
							<el-input placeholder="请输入..." v-model="templateFreight.externalMileage"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="对外TKM" prop="externalUnitPrice">
							<el-input placeholder="请输入..." v-model="templateFreight.externalUnitPrice"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="对外运费" prop="externalPrice">
							<el-input placeholder="请输入..." v-model="templateFreight.externalPrice"></el-input>
						</el-form-item>
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
						<p class="divided">
							<svg-icon icon-class="list-tag"></svg-icon>对内付款方式占比</p>
					</el-col>
					<el-col :span="24" style="display:flex">
						<el-form-item style="flex:1" label="现付" prop="internalCashRate">
							<el-input placeholder="请输入..." v-model="templateFreight.internalCashRate">
								<span slot="suffix">%</span>
							</el-input>
						</el-form-item>
						<el-form-item style="flex:1" label="到付" prop="internalCodRate">
							<el-input placeholder="请输入..." v-model="templateFreight.internalCodRate">
								<span slot="suffix">%</span>
							</el-input>
						</el-form-item>
						<el-form-item style="flex:1" label="回单付" prop="internalPorRate">
							<el-input placeholder="请输入..." v-model="templateFreight.internalPorRate">
								<span slot="suffix">%</span>
							</el-input>
						</el-form-item>
						<el-form-item style="flex:1" label="月结" prop="internalAbschlussRate">
							<el-input placeholder="请输入..." v-model="templateFreight.internalAbschlussRate">
								<span slot="suffix">%</span>
							</el-input>
						</el-form-item>
						<el-form-item style="flex:1" label="收方到货付" prop="internalConsigneeCodRate">
							<el-input placeholder="请输入..." v-model="templateFreight.internalConsigneeCodRate">
								<span slot="suffix">%</span>
							</el-input>
						</el-form-item>
					</el-col>
					<el-col :span="24">
						<p class="divided"><svg-icon icon-class="list-tag"></svg-icon>对外收款方式占比</p>
					</el-col>
					<el-col :span="24" style="display:flex">
						<el-form-item style="flex:1" label="现付" prop="externalCashRate">
							<el-input placeholder="请输入..." v-model="templateFreight.externalCashRate">
								<span slot="suffix">%</span>
							</el-input>
						</el-form-item>
						<el-form-item style="flex:1" label="到付" prop="externalCodRate">
							<el-input placeholder="请输入..." v-model="templateFreight.externalCodRate">
								<span slot="suffix">%</span>
							</el-input>
						</el-form-item>
						<el-form-item style="flex:1" label="回单付" prop="externalPorRate">
							<el-input placeholder="请输入..." v-model="templateFreight.externalPorRate">
								<span slot="suffix">%</span>
							</el-input>
						</el-form-item>
						<el-form-item style="flex:1" label="月结" prop="externalAbschlussRate">
							<el-input placeholder="请输入..." v-model="templateFreight.externalAbschlussRate">
								<span slot="suffix">%</span>
							</el-input>
						</el-form-item>
						<el-form-item style="flex:1" label="收方到货付" prop="externalConsigneeCodRate">
							<el-input placeholder="请输入..." v-model="templateFreight.externalConsigneeCodRate">
								<span slot="suffix">%</span>
							</el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<div class="handle">
					<el-button type="primary" @click="update">立即保存</el-button>
					<el-button @click="back">取消</el-button>
				</div>
			</el-form>
		</el-card>
	</div>
</template>

<script type="text/javascript">
import { Message } from 'element-ui'
import DistPicker from '../../CommonComponents/DistPicker'
import request from '../../../common/request'
import SettleConfig from '../../../api/SettleConfig'
import { searchAreaByKey, areaIdToArrayId } from '../../../common/utils'
import { checkFloat } from '../../../common/validators'
export default {
	data() {
		return {
			loading: false,
			ConsignorList:[],
			Recdeliverycomp:[],
			selectedArea:[],
			selectedArea1:[],
			templateFreight: {
				consigneeArea: '',	//收货地	string	
				consigneeAreaID: '',	//收货地id	string	
				consigneeCompanyName: '',	//收货公司名称	string	
				consigneeDetailAddress: '',	//收货详细地址	string	
				consigneeID: '',	//收货单位id	number	
				consignorID: '',	//托运人id	number	
				consignorName: '',	//托运人名称	string	
				externalAbschlussRate: '',	//对外月结比率	number	
				externalCashRate: '',	//对外现付比率	number	
				externalCodRate: '',	//对外到付比率	number	
				externalConsigneeCodRate: '',	//对外收货方到付比率	number	
				externalMileage: '',	//对外运距	number	
				externalPorRate: '',	//对外回单比率	number	
				externalPrice: '',	//对外运价	number	
				externalUnitPrice: '',	//对外TKM	number	
				internalAbschlussRate: '',	//对内月结比率	number	
				internalCashRate: '',	//对内现付比率	number	
				internalCodRate: '',	//对内到付比率	number	
				internalConsigneeCodRate: '',	//对内收货方到付比率	number	
				internalPorRate: '',	//对内回单比率	number	
				internalPrice: '',	//对内运价	number	
				internalUnitPrice: '',	//对内TKM	number	
				mileage: '',	//对内运距	number	
				shipperArea: '',	//发货地	string	
				shipperAreaID: '',	//发货地id	number	
				shipperCompanyName: '',	//发货公司名称	string	
				shipperDetailAddress: '',	//发货详细地址	string	
				shipperID: ''
			},
			rules: {
				shipperAreaID: [
					{ required: true, message: '请选择发货地区', trigger: 'change' }
				],
				shipperDetailAddress: [
					{required: true, message: '请输入发货详细地址', trigger: 'blur'}
				],
				consigneeAreaID: [
					{ required: true, message: '请选择收货地区', trigger: 'change' }
				],
				consigneeDetailAddress: [
					{required: true, message: '请输入收货详细地址', trigger: 'blur'}
				],
				mileage: [
					{required: true, validator: checkFloat, trigger: 'blur'}
				],
				internalUnitPrice: [
					{required: true, validator: checkFloat, trigger: 'blur'}
				],
				internalPrice: [
					{required: true, validator: checkFloat, trigger: 'blur'}
				],
				externalMileage: [
					{required: true, validator: checkFloat, trigger: 'blur'}
				],
				externalUnitPrice: [
					{required: true, validator: checkFloat, trigger: 'blur'}
				],
				externalPrice: [
					{required: true, validator: checkFloat, trigger: 'blur'}
				],
			}
		}
	},
	created() {
		this.getInfo()
	},
	activated() {
		if(!this.$route.query.cache) {
			this.getInfo()
		}
	},
	methods: {
		getConsignors(queryString, cb) {
			let params = {
				type: 'Consignor',
				companyName: queryString
			}
			request({
				url: '/customer/findList',
				params
			}).then(res => {
				let list = res.data.data.records
				cb(list)
			})
		},
		getRecdeliverycomp(queryString, cb) {
			let params = {
				type: 'ShipperConsignee',
				companyName: queryString
			}
			request({
				url: '/customer/findList',
				params
			}).then(res => {
				cb(res.data.data.records)
			})
		},
		handSelectShipper(data){
			this.templateFreight.shipperDetailAddress = data.detailAddress
			this.templateFreight.shipperID = data.customerID
			this.templateFreight.shipperCompanyName =data.companyName

			let areaID = String(data.companyAreaID)
			this.templateFreight.shipperAreaID = areaID
			this.selectedArea = [(areaID.substr(0, 2) + '0000'), (areaID.substr(0, 4) + '00'), areaID]
			this.templateFreight.shipperArea = searchAreaByKey(areaID)
		},
		handSelectConsignee(data){
			this.templateFreight.consigneeDetailAddress = data.detailAddress
			this.templateFreight.consigneeID = data.customerID
			this.templateFreight.consigneeCompanyName =data.companyName

			let areaID = String(data.companyAreaID)
			this.templateFreight.consigneeAreaID = areaID
			this.selectedArea1 = [(areaID.substr(0, 2) + '0000'), (areaID.substr(0, 4) + '00'), areaID]
			this.templateFreight.consigneeArea = searchAreaByKey(areaID)
		},
		handleSelectedArea(data) {
			this.templateFreight.shipperAreaID = data
		},
		handleSelectedArea1(data) {
			this.templateFreight.consigneeAreaID = data
		},
		getInfo() {
			let transporPriceID = this.$route.query.transporPriceID
			SettleConfig.findById({ transporPriceID }).then(res => {
				this.templateFreight = res
				this.selectedArea = areaIdToArrayId(res.shipperAreaID)
				this.selectedArea1 = areaIdToArrayId(res.consigneeAreaID)
				this.templateFreight.internalCashRate = res.internalCashRate *100
				this.templateFreight.internalCodRate = res.internalCodRate *100
				this.templateFreight.internalPorRate = res.internalPorRate *100
				this.templateFreight.internalAbschlussRate = res.internalAbschlussRate *100
				this.templateFreight.internalConsigneeCodRate = res.internalConsigneeCodRate *100
				this.templateFreight.externalCashRate = res.externalCashRate *100
				this.templateFreight.externalCodRate = res.externalCodRate *100
				this.templateFreight.externalPorRate = res.externalPorRate *100
				this.templateFreight.externalAbschlussRate = res.externalAbschlussRate *100
				this.templateFreight.externalConsigneeCodRate = res.externalConsigneeCodRate *100
			})
		},
		update() {
			let data = this.templateFreight
			new Promise((resolve, reject) => {
				this.$refs['ruleForm'].validate(valid => {
					if (valid) {
						resolve()
					} else {
						reject()
					}
				})
			}).then(() => {
				let internalCashRate = Number(data.internalCashRate)
				let internalCodRate = Number(data.internalCodRate)
				let internalPorRate = Number(data.internalPorRate)
				let internalAbschlussRate = Number(data.internalAbschlussRate)
				let internalConsigneeCodRate = Number(data.internalConsigneeCodRate)
				if ((internalCashRate + internalCodRate + internalPorRate + internalAbschlussRate + internalConsigneeCodRate) != 100) {
					Message.error('对内付款方式占比各项之和必须等于100%！')
					return
				}
				let externalCashRate = Number(data.externalCashRate)
				let externalCodRate = Number(data.externalCodRate)
				let externalPorRate = Number(data.externalPorRate)
				let externalAbschlussRate = Number(data.externalAbschlussRate)
				let externalConsigneeCodRate = Number(data.externalConsigneeCodRate)
				if ((externalCashRate + externalCodRate + externalPorRate + externalAbschlussRate + externalConsigneeCodRate) != 100) {
					Message.error('对外收款方式占比各项之和必须等于100%！')
					return
				}
				let params = {}
				Object.assign(params, data)
				params.internalCashRate = internalCashRate / 100
				params.internalCodRate = internalCodRate / 100
				params.internalPorRate = internalPorRate / 100
				params.internalAbschlussRate = internalAbschlussRate / 100
				params.internalConsigneeCodRate = internalConsigneeCodRate / 100
				params.externalCashRate = externalCashRate / 100
				params.externalCodRate = externalCodRate / 100
				params.externalPorRate = externalPorRate / 100
				params.externalAbschlussRate = externalAbschlussRate / 100
				params.externalConsigneeCodRate = externalConsigneeCodRate / 100
				SettleConfig.update(params).then(res => {
					Message.success('保存成功！')
					this.$router.push({name: 'settleconfig'})
				})
			})
		},
		back() {
			this.$router.push({name: 'settleconfig'})
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