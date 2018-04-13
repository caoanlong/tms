<template>
	<div class="main-content">
		<div class="wf-card">
			<div class="header clearfix">查看运费模板</div>
			<el-row>
				<div class="split-item">
					<span class="num">1</span>
					<span class="tit">配置运算项</span>
				</div>
			</el-row>
			<el-row>
				<el-col :span="24">
					<el-form label-width="120px" style="display: flex">
						<el-form-item label="托运人" style="flex: 1">
							<p>{{templateFreight.consignorName}}</p>
						</el-form-item>
						<el-form-item style="flex: 1"></el-form-item>
						<el-form-item style="flex: 1"></el-form-item>
					</el-form>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="24">
					<p class="divided">
						<svg-icon icon-class="list-tag"></svg-icon>从哪</p>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="24">
					
					<el-form label-width="120px" style="display: flex">
						<el-form-item label="发货单位" style="flex: 1">
							<p>{{templateFreight.shipperCompanyName}}</p>
						</el-form-item>
						<el-form-item label="发货地" style="flex: 1">
							<p>{{templateFreight.shipperArea}}</p>
						</el-form-item>
						<el-form-item label="详细地址" style="flex: 1">
							<p>{{templateFreight.shipperDetailAddress}}</p>
						</el-form-item>
					</el-form>
				</el-col>
			</el-row>
			<el-row>
					<el-col :span="24">
						<p class="divided">
							<svg-icon icon-class="list-tag"></svg-icon>到哪</p>
					</el-col>
				</el-row>
				<el-row>
				<el-col :span="24">
					
					<el-form label-width="120px" style="display: flex">
						<el-form-item label="收货单位" style="flex: 1">
							<p>{{templateFreight.consigneeCompanyName}}</p>
						</el-form-item>
						<el-form-item label="收货地" style="flex: 1">
							<p>{{templateFreight.consigneeArea}}</p>
						</el-form-item>
						<el-form-item label="详细地址" style="flex: 1">
							<p>{{templateFreight.consigneeDetailAddress}}</p>
						</el-form-item>
					</el-form>
				</el-col>
				</el-row>
				<el-row>
					<el-col :span="24">
						<p class="divided">
							<svg-icon icon-class="list-tag"></svg-icon>对内</p>
					</el-col>
				</el-row>
				<el-row>
				<el-col :span="24">
					
					<el-form label-width="120px" style="display: flex">
						<el-form-item label="对内运距" style="flex: 1">
							<p>{{templateFreight.mileage}}</p>
						</el-form-item>
						<el-form-item label="对内TKM" style="flex: 1">
							<p>{{templateFreight.internalUnitPrice}}</p>
						</el-form-item>
						<el-form-item label="对内运费" style="flex: 1">
							<p>{{templateFreight.internalPrice}}</p>
						</el-form-item>
					</el-form>
				</el-col>
				</el-row>
				<el-row>
					<el-col :span="24">
						<p class="divided">
							<svg-icon icon-class="list-tag"></svg-icon>对外</p>
					</el-col>
				</el-row>
				<el-row>
				<el-col :span="24">
					
					<el-form label-width="120px" style="display: flex">
						<el-form-item label="对外运距" style="flex: 1">
							<p>{{templateFreight.externalMileage}}</p>
						</el-form-item>
						<el-form-item label="对外TKM" style="flex: 1">
							<p>{{templateFreight.externalUnitPrice}}</p>
						</el-form-item>
						<el-form-item label="对外运费" style="flex: 1">
							<p>{{templateFreight.externalPrice}}</p>
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
						<p class="divided">
							<svg-icon icon-class="list-tag"></svg-icon>对内付款方式占比</p>
					</el-col>
				<el-col :span="24">
					
					<el-form label-width="120px" style="display: flex">
						<el-form-item label="现付" style="flex: 1">
							<p>{{templateFreight.internalCashRate}}%</p>
						</el-form-item>
						<el-form-item label="到付" style="flex: 1">
							<p>{{templateFreight.internalCodRate}}%</p>
						</el-form-item>
						<el-form-item label="回单付" style="flex: 1">
							<p>{{templateFreight.internalPorRate}}%</p>
						</el-form-item>
						<el-form-item label="月结" style="flex: 1">
							<p>{{templateFreight.internalAbschlussRate}}%</p>
						</el-form-item>
						<el-form-item label="收方到货付" style="flex: 1">
							<p>{{templateFreight.internalConsigneeCodRate}}%</p>
						</el-form-item>
					</el-form>
				</el-col>
				<el-col :span="24">
						<p class="divided"><svg-icon icon-class="list-tag"></svg-icon>对外收款方式占比</p>
					</el-col>
				<el-col :span="24">
					
					<el-form label-width="120px" style="display: flex">
						<el-form-item label="现付" style="flex: 1">
							<p>{{templateFreight.externalCashRate}}%</p>
						</el-form-item>
						<el-form-item label="到付" style="flex: 1">
							<p>{{templateFreight.externalCodRate}}%</p>
						</el-form-item>
						<el-form-item label="回单付" style="flex: 1">
							<p>{{templateFreight.externalPorRate}}%</p>
						</el-form-item>
						<el-form-item label="月结" style="flex: 1">
							<p>{{templateFreight.externalAbschlussRate}}%</p>
						</el-form-item>
						<el-form-item label="收方到货付" style="flex: 1">
							<p>{{templateFreight.externalConsigneeCodRate}}%</p>
						</el-form-item>
					</el-form>
				</el-col>
			</el-row>
			<el-row type="flex" class="row-bg" justify="space-around">
				<el-col :span="12">
					<el-form label-width="120px">
						<el-form-item>
							<el-button @click="back">返回</el-button>
						</el-form-item>
					</el-form>
				</el-col>
			</el-row>
		</div>
	</div>
</template>
<script type="text/javascript">
import request from '../../common/request'
export default {
	data() {
		return {
			templateFreight: {}
		}
	},
	created() {
		this.getInfo()
	},
	methods: {
		getInfo() {
			let params = {
				transporPriceID: this.$route.query.transporPriceID
			}
			request({
				url: '/transportPrice/findById',
				params
			}).then(res => {
				this.templateFreight = res.data.data
			})
		},
		back() {
			this.$router.go(-1)
		}
	}
}

</script>
<style lang="stylus" scoped>

.el-form-item__content
	p
		margin 0
		border 1px solid #fff
		border-bottom-color #dcdfe6
		padding 0 15px
		height 40px
		font-family 'sans-serif'
		line-height 40px
		color #999
		font-size 14px
.divided
	padding 10px 15px 5px 30px
	margin-top 0
	color #C0C4CC
	border-bottom 1px solid #f2f2f2
	font-size 14px
	.svg-icon
		margin-right 5px
		color #909399
</style>