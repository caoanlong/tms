<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">查看运单</div>
			<el-row>
				<el-col :span="8">
					<el-form label-width="160px">
						<el-form-item label="报文参考号">
							<p>{{WaybillInfo.messageReferenceNumber}}</p>
						</el-form-item>
						<el-form-item label="发送方代码">
							<p>{{WaybillInfo.senderCode}}</p>
						</el-form-item>
						<el-form-item label="报文功能代码">
							<p>{{WaybillInfo.messageFunctionCode}}</p>
						</el-form-item>
						<el-form-item label="承运人">
							<p>{{WaybillInfo.carrier}}</p>
						</el-form-item>
						<el-form-item label="托运日期时间">
							<p>{{WaybillInfo.dteOfShipment}}</p>
						</el-form-item>
						<el-form-item label="收货日期时间">
							<p>{{WaybillInfo.dateOfDelivery}}</p>
						</el-form-item>
						<el-form-item label="装货地点">
							<p>{{WaybillInfo.name}}</p>
						</el-form-item>
						<el-form-item label="收货人">
							<p>{{WaybillInfo.consignee}}</p>
						</el-form-item>
						<el-form-item label="国家行政区划代码">
							<p>{{WaybillInfo.codeConsigneeDivisions}}</p>
						</el-form-item>
						<el-form-item label="价格备注">
							<p>{{WaybillInfo.priceRemarks}}</p>
						</el-form-item>
						<el-form-item label="车辆分类代码">
							<p>{{WaybillInfo.vehicleClassificationCode}}</p>
						</el-form-item>
						<el-form-item label="挂车牌照号">
							<p>{{WaybillInfo.trailerLicenseNumber}}</p>
						</el-form-item>
						<el-form-item label="姓名">
							<p>{{WaybillInfo.name}}</p>
						</el-form-item>
						<el-form-item label="货物名称">
							<p>{{WaybillInfo.nameGoods}}</p>
						</el-form-item>
						<el-form-item label="体积">
							<p>{{WaybillInfo.volume}}</p>
						</el-form-item>
					</el-form>
				</el-col>
				<el-col :span="8">
					<el-form label-width="160px">
						<el-form-item label="单证名称">
							<p>{{WaybillInfo.documentName}}</p>
						</el-form-item>
						<el-form-item label="接收方代码">
							<p>{{WaybillInfo.recipientCode}}</p>
						</el-form-item>
						<el-form-item label="原始单号">
							<p>{{WaybillInfo.originalAddNumber}}</p>
						</el-form-item>
						<el-form-item label="统一社会信用代码">
							<p>{{WaybillInfo.name}}</p>
						</el-form-item>
						<el-form-item label="业务类型代码">
							<p>{{WaybillInfo.serviceTypeCode}}</p>
						</el-form-item>
						<el-form-item label="发货人">
							<p>{{WaybillInfo.name}}</p>
						</el-form-item>
						<el-form-item label="国家行政区划名称">
							<p>{{WaybillInfo.nameConsignorDivisions}}</p>
						</el-form-item>
						<el-form-item label="收货地点">
							<p>{{WaybillInfo.receivingPlace}}</p>
						</el-form-item>
						<el-form-item label="运输成本">
							<p>{{WaybillInfo.transportationCost}}</p>
						</el-form-item>
						<el-form-item label="牌照类型代码">
							<p>{{WaybillInfo.licensePlateCode}}</p>
						</el-form-item>
						<el-form-item label="车辆载质量">
							<p>{{WaybillInfo.vehicleLoadingQuality}}</p>
						</el-form-item>
						<el-form-item label="所有人">
							<p>{{WaybillInfo.thePersonal}}</p>
						</el-form-item>
						<el-form-item label="从业资格证号">
							<p>{{WaybillInfo.certificateQualification}}</p>
						</el-form-item>
						<el-form-item label="货物类型分类">
							<p>{{WaybillInfo.codeGoods}}</p>
						</el-form-item>
						<el-form-item label="总件数">
							<p>{{WaybillInfo.total}}</p>
						</el-form-item>
					</el-form>
				</el-col>
				<el-col :span="8">
					<el-form label-width="160px">
						<el-form-item label="报文版本号">
							<p>{{WaybillInfo.documentVersionNumber}}</p>
						</el-form-item>
						<el-form-item label="发送时间">
							<p>{{WaybillInfo.messageSendingDateTime}}</p>
						</el-form-item>
						<el-form-item label="托运单号">
							<p>{{WaybillInfo.shippingNoteNumber}}</p>
						</el-form-item>
						<el-form-item label="许可证编号">
							<p>{{WaybillInfo.waybillLicenseNumber}}</p>
						</el-form-item>
						<el-form-item label="实际发运日期时间">
							<p>{{WaybillInfo.dateActualShipment}}</p>
						</el-form-item>
						<el-form-item label="个人证件号">
							<p>{{WaybillInfo.personalNumber}}</p>
						</el-form-item>
						<el-form-item label="国家行政区划代码">
							<p>{{WaybillInfo.codeConsignorDivisions}}</p>
						</el-form-item>
						<el-form-item label="国家行政区划名称">
							<p>{{WaybillInfo.nameConsigneeDivisions}}</p>
						</el-form-item>
						<el-form-item label="货币总金额">
							<p>{{WaybillInfo.totalAmountMoney}}</p>
						</el-form-item>
						<el-form-item label="车辆牌照号">
							<p>{{WaybillInfo.vehicleLicenseNumber}}</p>
						</el-form-item>
						<el-form-item label="道路运输证号">
							<p>{{WaybillInfo.roadTransportNo}}</p>
						</el-form-item>
						<el-form-item label="许可证编号">
							<p>{{WaybillInfo.carLicenseNumber}}</p>
						</el-form-item>
						<el-form-item label="电话号码">
							<p>{{WaybillInfo.phone}}</p>
						</el-form-item>
						<el-form-item label="货物项毛重">
							<p>{{WaybillInfo.goodsGross}}</p>
						</el-form-item>
						<el-form-item label="运输方式代码">
							<p>{{WaybillInfo.transportModeCode}}</p>
						</el-form-item>
					</el-form>
				</el-col>
				<el-col :span="24">
					<el-form label-width="160px">
						<el-form-item label="自由文本">
							<p>{{WaybillInfo.networkAccessAddress}}</p>
						</el-form-item>
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
import NotruckCarryOrder from '../../../api/NotruckCarryOrder'
export default {
	data() {
		return {
			WaybillInfo:{}
		}
	},
	created() {
		this.getWaybillInfo()
	},
	methods: {
		getWaybillInfo(pageIndex) {
			const wayId = this.$route.query.wayId
			NotruckCarryOrder.findById({ wayId }).then(res => {
				this.WaybillInfo = res
			})
		},
		back() {
			this.$router.go(-1)
		}
	}
}

</script>
<style lang="stylus" scoped>
.el-textarea
	textarea
		resize none
		min-height 99px!important
.el-grop-tit
	margin 0 -20px 20px
	padding 10px 20px
	border-top 1px solid #ebeef5
	border-bottom 1px solid #ebeef5
	background #f8f8f8
	color #42b983
	p
		margin 0
		font-size 14px
		border-left 3px solid #42b983
		padding-left 5px
	&:first-child
		margin-top -21px
.card-footer
	padding 20px
	border-top 1px solid #ebeef5
	margin 0 -20px -20px
	.el-form-item
		margin-bottom 0
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
