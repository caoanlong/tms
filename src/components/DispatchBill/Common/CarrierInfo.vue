<template>
	<div>
		<el-row>
			<el-col :span="8">
				<el-form label-width="120px">
					<el-form-item label="发货人">
						<p>{{carrierBill.shipperName}}</p>
					</el-form-item>
					<el-form-item label="发货时间">
						<p>{{carrierBill.shipperDate | getdatefromtimestamp(true)}}</p>
					</el-form-item>
				</el-form>
			</el-col>
			<el-col :span="8">
				<el-form label-width="120px">
					<el-form-item label="委托时间">
						<p></p>
					</el-form-item>
				</el-form>
			</el-col>
			<el-col :span="8">
				<el-form label-width="120px">
					<el-form-item label="发货单号">
						<p>{{carrierBill.shipperNo}}</p>
					</el-form-item>
				</el-form>
			</el-col>
			<el-col :span="6">
				<el-form label-width="120px">
					<el-form-item label="发货地">
						<p>{{carrierBill.shipperArea}}</p>
					</el-form-item>
				</el-form>
			</el-col>
			<el-col :span="10">
				<el-form label-width="20px">
					<el-form-item>
						<p>{{carrierBill.shipperDetailAddress}}</p>
					</el-form-item>
				</el-form>
			</el-col>
		</el-row>
		<el-row>
			<el-col :span="8">
				<el-form label-width="120px">
					<el-form-item label="收货人">
						<p>{{carrierBill.consigneeName}}</p>
					</el-form-item>
				</el-form>
			</el-col>
			<el-col :span="8">
				<el-form label-width="120px">
					<el-form-item label="到货时间">
						<p>{{carrierBill.consigneeDate | getdatefromtimestamp(true)}}</p>
					</el-form-item>
				</el-form>
			</el-col>
		</el-row>
		<el-row>
			<el-col :span="8">
				<el-form label-width="120px">
					<el-form-item label="运输方式">
						<p></p>
					</el-form-item>
				</el-form>
			</el-col>
			<el-col :span="6">
				<el-form label-width="120px">
					<el-form-item label="卸货地">
						<p>{{carrierBill.consigneeArea}}</p>
					</el-form-item>
				</el-form>
			</el-col>
			<el-col :span="10">
				<el-form label-width="20px">
					<el-form-item>
						<p>{{carrierBill.consigneeDetailAddress}}</p>
					</el-form-item>
				</el-form>
			</el-col>
		</el-row>
		<hr v-if="!isOnly"/>
	</div>
</template>
<script type="text/javascript">
	export default {
		props: {
			isOnly: {
				type: Boolean,
				default: false
			},
			carrierBill: {
				type: Object,
				default: {}
			}
		}
	}
</script>
<style lang="stylus">
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
			font-size 12px
</style>