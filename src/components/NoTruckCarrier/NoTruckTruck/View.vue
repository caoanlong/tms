<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">查看车源</div>
			<el-row>
				<el-col :span="8">
					<el-form label-width="130px">
						<el-form-item label="报文参考号">
							<p>{{TruckInfo.messageReferenceNumber}}</p>
						</el-form-item>
						<el-form-item label="发送方代码">
							<p>{{TruckInfo.senderCode}}</p>
						</el-form-item>
						<el-form-item label="报文功能代码">
							<p>{{TruckInfo.messageFunctionCode}}</p>
						</el-form-item>
						<el-form-item label="车辆长度">
							<p>{{TruckInfo.vehicleLength}}</p>
						</el-form-item>
						<el-form-item label="出发地区代码">
							<p>{{TruckInfo.countrySubdivisionCode}}</p>
						</el-form-item>
					</el-form>
				</el-col>
				<el-col :span="8">
					<el-form label-width="130px">
						<el-form-item label="单证名称">
							<p>{{TruckInfo.documentName}}</p>
						</el-form-item>
						<el-form-item label="接收方代码">
							<p>{{TruckInfo.recipientCode}}</p>
						</el-form-item>
						<el-form-item label="车辆牌照号">
							<p>{{TruckInfo.vehicleNumber}}</p>
						</el-form-item>
						<el-form-item label="核定载质量">
							<p>{{TruckInfo.vehicleTonnage}}</p>
						</el-form-item>
						<el-form-item label="目的地地区代码">
							<p>{{TruckInfo.destinationCountrySubdivisionCode}}</p>
						</el-form-item>
					</el-form>
				</el-col>
				<el-col :span="8">
					<el-form label-width="130px">
						<el-form-item label="报文版本号">
							<p>{{TruckInfo.documentVersionNumber}}</p>
						</el-form-item>
						<el-form-item label="发送日期时间">
							<p>{{TruckInfo.messageSendingDateTime}}</p>
						</el-form-item>
						<el-form-item label="车辆类型">
							<p>{{TruckInfo.vehicleClassificationCode}}</p>
						</el-form-item>
						<el-form-item label="出发地">
							<p>{{TruckInfo.placeOfLoading}}</p>
						</el-form-item>
						<el-form-item label="目的地">
							<p>{{TruckInfo.goodsReceiptPlace}}</p>
						</el-form-item>
					</el-form>
				</el-col>
				<el-col :span="24">
					<el-form label-width="130px">
						<p>{{TruckInfo.name}}</p>
					</el-form>
				</el-col>
				<el-col :span="24">
					<el-form label-width="130px">
						<el-form-item>
							<el-button @click.native="back">返回</el-button>
						</el-form-item>
					</el-form>
				</el-col>
			</el-row>
		</el-card>
	</div>
</template>
<script type="text/javascript">
import { Message } from 'element-ui'
import NoTruckTruck from '../../../api/NoTruckTruck'
export default {
	data() {
		return {
			TruckInfo:{}
		}
	},
	created() {
		this.getTruckInfo()
	},
	methods: {
		getTruckInfo() {
			const notrucksourceId = this.$route.query.notrucksourceId
			NoTruckTruck.findById({ notrucksourceId }).then(res => {
				this.TruckInfo = res
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