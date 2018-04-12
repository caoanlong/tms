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
			<el-form label-width="100px" size="mini">
				<el-row>
					<el-col :span="8">
						<el-form-item label="托运人">
							<el-select style="width: 100%" v-model="templateFreight.consignorName" filterable remote placeholder="请输入托运人关键词" :remote-method="getConsignor" :loading="loading" @change="getConsignorDetail">
								<el-option v-for="item in ConsignorList" :key="item.companyName" :label="item.companyName" :value="item.customerID">
								</el-option>
							</el-select>
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
							<el-select style="width: 100%" v-model="templateFreight.shipperCompanyName" filterable remote placeholder="请输入托运人关键词" :remote-method="getRecdeliverycomp" :loading="loading" @change="shipperDetail">
								<el-option v-for="item in Recdeliverycomp" :key="item.companyName" :label="item.companyName" :value="item.companyName">
								</el-option>
							</el-select>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="12">
						<el-form-item label="发货地">
							<DistPicker @selectChange="handleSelectedArea" :selected="selectedArea" />
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
							<el-select style="width: 100%" v-model="templateFreight.consigneeCompanyName" filterable remote placeholder="请输入收货单位关键词" :remote-method="getRecdeliverycomp" :loading="loading" @change="consigneeDetail">
								<el-option v-for="item in Recdeliverycomp" :key="item.companyName" :label="item.companyName" :value="item.companyName">
								</el-option>
							</el-select>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="12">
						<el-form-item label="收货地">
							<DistPicker @selectChange="handleSelectedArea1" :selected="selectedArea1"/>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="详细地址">
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
						<el-form-item label="对内运距">
							<el-input placeholder="请输入..." v-model="templateFreight.mileage"></el-input>
						</el-form-item>
					</el-col>
					</el-col>
					<el-col :span="8">
						<el-form-item label="对内TKM">
							<el-input placeholder="请输入..." v-model="templateFreight.internalUnitPrice"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item placeholder="请输入..." label="对内运费">
							<el-input v-model="templateFreight.internalPrice"></el-input>
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
						<el-form-item label="对外运距">
							<el-input placeholder="请输入..." v-model="templateFreight.externalMileage"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item placeholder="请输入..." label="对外TKM">
							<el-input v-model="templateFreight.externalUnitPrice"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item placeholder="请输入..." label="对外运费">
							<el-input v-model="templateFreight.externalPrice"></el-input>
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
						<el-form-item style="flex:1" label="现付">
							<el-input placeholder="请输入..." v-model="templateFreight.internalCashRate">
								<span slot="suffix">%</span>
							</el-input>
						</el-form-item>
						<el-form-item style="flex:1" label="到付">
							<el-input placeholder="请输入..." v-model="templateFreight.internalCodRate">
								<span slot="suffix">%</span>
							</el-input>
						</el-form-item>
						<el-form-item style="flex:1" label="回单付">
							<el-input placeholder="请输入..." v-model="templateFreight.internalPorRate">
								<span slot="suffix">%</span>
							</el-input>
						</el-form-item>
						<el-form-item style="flex:1" label="月结">
							<el-input placeholder="请输入..." v-model="templateFreight.internalAbschlussRate">
								<span slot="suffix">%</span>
							</el-input>
						</el-form-item>
						<el-form-item style="flex:1" label="收方到货付">
							<el-input placeholder="请输入..." v-model="templateFreight.internalConsigneeCodRate">
								<span slot="suffix">%</span>
							</el-input>
						</el-form-item>
					</el-col>
					<el-col :span="24">
						<p class="divided"><svg-icon icon-class="list-tag"></svg-icon>对外收款方式占比</p>
					</el-col>
					<el-col :span="24" style="display:flex">
						<el-form-item style="flex:1" label="现付">
							<el-input placeholder="请输入..." v-model="templateFreight.externalCashRate">
								<span slot="suffix">%</span>
							</el-input>
						</el-form-item>
						<el-form-item style="flex:1" label="到付">
							<el-input placeholder="请输入..." v-model="templateFreight.externalCodRate">
								<span slot="suffix">%</span>
							</el-input>
						</el-form-item>
						<el-form-item style="flex:1" label="回单付">
							<el-input placeholder="请输入..." v-model="templateFreight.externalPorRate">
								<span slot="suffix">%</span>
							</el-input>
						</el-form-item>
						<el-form-item style="flex:1" label="月结">
							<el-input placeholder="请输入..." v-model="templateFreight.externalAbschlussRate">
								<span slot="suffix">%</span>
							</el-input>
						</el-form-item>
						<el-form-item style="flex:1" label="收方到货付">
							<el-input placeholder="请输入..." v-model="templateFreight.externalConsigneeCodRate">
								<span slot="suffix">%</span>
							</el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<div class="handle">
					<el-button type="primary" @click="add">立即保存</el-button>
					<el-button @click="back">取消</el-button>
				</div>
			</el-form>
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
			}
		}
	},
	created() {
	},
	methods: {
		getConsignor(e) {
			let params = {
				type: 'Consignor',
			}
			request({
				url: '/customer/findList',
				params
			}).then(res => {
				console.log('托运人')
				console.log(res.data)
				this.ConsignorList= res.data.data.records
				let arr = this.ConsignorList.filter(item => {
					return item.customerID == e
				})
				
			})
		},
		// 获取托运人详情
		getConsignorDetail(e){
			let arr = this.ConsignorList.filter(item => {
				return item.customerID == e
			})
			console.log('托运人详情')
			console.log(e)
			this.templateFreight.consignorName = arr[0].companyName
			this.templateFreight.consignorID = arr[0].customerID
		},
		getRecdeliverycomp() {
			let params = {
				type: 'ShipperConsignee',
			}
			request({
				url: '/customer/findList',
				params
			}).then(res => {
				this.Recdeliverycomp = res.data.data.records
			})
		},
		shipperDetail(e){
			let arr = this.Recdeliverycomp.filter(item => {
				return item.companyName == e
			})
			this.templateFreight.shipperDetailAddress = arr[0].detailAddress
			this.templateFreight.shipperID = arr[0].customerID
			this.templateFreight.shipperCompanyName =arr[0].companyName

			let areaID = String(arr[0].companyAreaID)
			this.templateFreight.shipperAreaID =areaID
			this.selectedArea = [(areaID.substr(0, 2) + '0000'), (areaID.substr(0, 4) + '00'), areaID]
			this.templateFreight.shipperArea = searchAreaByKey(areaID)
		},
		consigneeDetail(e){
			let arr = this.Recdeliverycomp.filter(item => {
				return item.companyName == e
			})
			this.templateFreight.consigneeDetailAddress = arr[0].detailAddress
			this.templateFreight.consigneeID = arr[0].customerID
			this.templateFreight.consigneeCompanyName =arr[0].companyName
			let areaID = String(arr[0].companyAreaID)
			this.templateFreight.consigneeAreaID =areaID
			this.selectedArea1 = [(areaID.substr(0, 2) + '0000'), (areaID.substr(0, 4) + '00'), areaID]
			this.templateFreight.consigneeArea = searchAreaByKey(areaID)
		},
		add() {
			let data = this.templateFreight
			
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
			this.templateFreight.shipperAreaID = data
		},
		handleSelectedArea1(data) {
			this.templateFreight.consigneeAreaID = data
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