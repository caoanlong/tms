<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">查看货源</div>
			<el-row>
				<el-col :span="8">
					<el-form label-width="120px">
						<el-form-item label="报文参考号：">
							<p>{{CargoInfo.messageReferenceNumber}}</p>
						</el-form-item>
						<el-form-item label="发送方代码：">
							<p>{{CargoInfo.senderCode}}</p>
						</el-form-item>
						<el-form-item label="报文功能代码：">
							<p>{{CargoInfo.messageFunctionCode}}</p>
						</el-form-item>
						<el-form-item label="出发地区代码：">
							<p>{{CargoInfo.countrySubdivisionCode}}</p>
						</el-form-item>
						<el-form-item label="目的地区代码：">
							<p>{{CargoInfo.destinationCountrySubdivisionCode}}</p>
						</el-form-item>
						<el-form-item label="货物名称：">
							<p>{{CargoInfo.descriptionOfGoods}}</p>
						</el-form-item>
					</el-form>
				</el-col>
				<el-col :span="8">
					<el-form label-width="120px">
						<el-form-item label="单证名称：">
							<p>{{CargoInfo.documentName}}</p>
						</el-form-item>
						<el-form-item label="接收方代码：">
							<p>{{CargoInfo.recipientCode}}</p>
						</el-form-item>
						<el-form-item label="发货人：">
							<p>{{CargoInfo.consignor}}</p>
						</el-form-item>
						<el-form-item label="收货人：">
							<p>{{CargoInfo.consignee}}</p>
						</el-form-item>
						<el-form-item label="费用总金额：">
							<p>{{CargoInfo.totalMonetaryAmount}}</p>
						</el-form-item>
						<el-form-item label="货物类型分类：">
							<p>{{CargoInfo.cargoTypeClassificationCode}}</p>
						</el-form-item>
					</el-form>
				</el-col>
				<el-col :span="8">
					<el-form label-width="120px">
						<el-form-item label="报文版本号：">
							<p>{{CargoInfo.documentVersionNumber}}</p>
						</el-form-item>
						<el-form-item label="发送日期时间：">
							<p>{{CargoInfo.messageSendingDateTime}}</p>
						</el-form-item>
						<el-form-item label="出发地：">
							<p>{{CargoInfo.placeOfLoading}}</p>
						</el-form-item>
						<el-form-item label="目的地：">
							<p>{{CargoInfo.goodsReceiptPlace}}</p>
						</el-form-item>
						<el-form-item label="车辆类型：">
							<p>{{CargoInfo.vehicleClassificationCode}}</p>
						</el-form-item>
						<el-form-item label="货物项毛重：">
							<p>{{CargoInfo.goodsItemGrossWeight}}</p>
						</el-form-item>
					</el-form>
				</el-col>
				<el-col :span="24">
					<el-form label-width="120px">
						<el-form-item>
							<el-button @click="back">返回</el-button>
						</el-form-item>
					</el-form>
				</el-col>
			</el-row>
		</el-card>
	</div>
</template>
<script type="text/javascript">
import { Message } from 'element-ui'
import NotruckCargosource from '../../../api/NotruckCargosource'
export default {
	data() {
		return {
			CargoInfo:{}
		}
	},
	created() {
		this.getCargoInfo()
	},
	methods: {
		getCargoInfo() {
			const goodsId = this.$route.query.goodsId
			NotruckCargosource.findById({ goodsId }).then(res => {
				this.CargoInfo = res
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
	.el-input__inner
		vertical-align top
</style>