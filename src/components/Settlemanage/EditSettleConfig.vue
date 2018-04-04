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
							<el-select
								style="width: 100%" 
								v-model="selectConsignor"
								filterable
								remote
								placeholder="请输入关键词"
								:remote-method="getConsigners" 
								:loading="loading"
								@change="handConsignorSelect">
								<el-option
									v-for="item in consigners"
									:key="item.customerID"
									:label="item.companyName"
									:value="item">
								</el-option>
							</el-select>
						</el-form-item>
					</el-form>
				</el-col>
				<el-col :span="24">
					<p class="divided"><svg-icon icon-class="list-tag"></svg-icon>从哪</p>
					<el-form label-width="100px" style="display: flex">
						<el-form-item label="发货单位" style="flex: 1">
							<el-select
								style="width: 100%" 
								v-model="selectShipper"
								filterable
								remote
								placeholder="请输入关键词"
								:remote-method="getShiperConsigners1" 
								:loading="loading"
								@change="handShipperConsignorSelect1">
								<el-option
									v-for="item in shiperConsigners1"
									:key="item.customerID"
									:label="item.companyName"
									:value="item">
								</el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="发货地" style="flex: 1">
							<el-cascader
								style="width: 100%"
								:options="distData"
								v-model="selectShipperArea"
								@change="handShiperAreaSelect">
							</el-cascader>
						</el-form-item>
						<el-form-item label="详细地址" style="flex: 1">
							<el-input placeholder="请输入..." v-model="templateFreight.shipperDetailAddress"></el-input>
						</el-form-item>
					</el-form>
				</el-col>
				<el-col :span="24">
					<p class="divided"><svg-icon icon-class="list-tag" ></svg-icon>到哪</p>
					<el-form label-width="100px" style="display: flex">
						<el-form-item label="收货单位" style="flex: 1">
							<el-select
								style="width: 100%" 
								v-model="selectConsignee"
								filterable
								remote
								placeholder="请输入关键词"
								:remote-method="getShiperConsigners2" 
								:loading="loading"
								@change="handShipperConsignorSelect2">
								<el-option
									v-for="item in shiperConsigners2"
									:key="item.customerID"
									:label="item.companyName"
									:value="item">
								</el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="收货地" style="flex: 1">
							<el-cascader
								style="width: 100%"
								:options="distData"
								v-model="selectConsigneeArea"
								@change="handConsignorAreaSelect">
							</el-cascader>
						</el-form-item>
						<el-form-item label="详细地址" style="flex: 1">
							<el-input placeholder="请输入..." v-model="templateFreight.consigneeDetailAddress"></el-input>
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
				<el-button type="primary" @click="update">立即保存</el-button>
				<el-button @click="back">取消</el-button>
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
import { Message } from 'element-ui'
import { regionData } from 'element-china-area-data'
import request from '../../common/request'
export default {
	data() {
		return {
			loading: false,
			distData: regionData,
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
			consigners: [], // 托运人
			shiperConsigners1: [], // 收发货单位
			shiperConsigners2: [], // 收发货单位
			selectConsignor: '', // 选择的托运人
			selectShipper: '', // 选择的收发货单位(发货单位)
			selectConsignee: '', // 选择的收发货单位(收货单位)
			selectShipperArea: [],
			selectConsigneeArea: []
		}
	},
	created() {
		this.getInfo()
	},
	methods: {
		getConsigners(companyName) {
			if (companyName !== '') {
				this.loading = true
				let params = {
					companyName,
					type: 'Consignor'
				}
				request({
					url: '/customer/findList',
					params
				}).then(res => {
					this.loading = false
					this.consigners = res.data.data.records
				})
			} else {
				this.consigners = []
			}
		},
		getShiperConsigners1(companyName) {
			if (companyName !== '') {
				this.loading = true
				let params = {
					companyName,
					type: 'ShipperConsignee'
				}
				request({
					url: '/customer/findList',
					params
				}).then(res => {
					this.loading = false
					this.shiperConsigners1 = res.data.data.records
				})
			} else {
				this.shiperConsigners1 = []
			}
		},
		getShiperConsigners2(companyName) {
			if (companyName !== '') {
				this.loading = true
				let params = {
					companyName,
					type: 'ShipperConsignee'
				}
				request({
					url: '/customer/findList',
					params
				}).then(res => {
					this.loading = false
					this.shiperConsigners2 = res.data.data.records
				})
			} else {
				this.shiperConsigners2 = []
			}
		},
		handConsignorSelect(data) {
			this.templateFreight.consignorID = data.customerID
			this.templateFreight.consignorName = data.companyName
		},
		handShipperConsignorSelect1(data) {
			this.templateFreight.shipperID = data.customerID
			this.templateFreight.shipperCompanyName = data.companyName
		},
		handShipperConsignorSelect2(data) {
			this.templateFreight.consigneeID = data.customerID
			this.templateFreight.consigneeCompanyName = data.companyName
		},
		handShiperAreaSelect(data) {
			this.templateFreight.shipperAreaID = data[data.length-1]
		},
		handConsignorAreaSelect(data) {
			this.templateFreight.consigneeAreaID = data[data.length-1]
		},
		getInfo() {
			let params = {
				transporPriceID: this.$route.query.transporPriceID
			}
			request({
				url: '/transportPrice/findById',
				params
			}).then(res => {
				console.log(res.data.data)
				this.templateFreight = res.data.data
				this.selectConsignor = res.data.data.consignorName
				this.selectShipper = res.data.data.shipperCompanyName
				this.selectConsignee = res.data.data.consigneeCompanyName
			})
		},
		update() {
			let data = this.templateFreight
			request({
				url: '/transportPrice/update',
				method:'post',
				data
			}).then(res => {
				Message.success('保存成功！')
				this.$router.push({name: 'settleconfig'})
			})
		},
		back() {
			this.$router.go(-1)
		}
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