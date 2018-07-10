<template>
	<div class="main-content" ref="truck">
		<el-card class="box-card">
			<el-row class="section-block" style="margin-bottom:20px">
				<span class="block-title">基本信息</span>
				<div class="block-content">
					<el-row style="margin-bottom: 10px">
						<el-col :span="12">
							<div>
								<span class="tit">车辆编号</span>
								<span class="ctt">{{truck.code}}</span>
							</div>
							<div>
								<span class="tit">车牌号码</span>
								<span class="ctt">{{truck.plateNo}}</span>
							</div>
							<div>
								<span class="tit">车牌颜色</span>
								<span class="ctt">{{truck.plateNoColor}}</span>
							</div>
							<div>
								<span class="tit">车辆归属</span>
								<span class="ctt" v-if="truck.cooperateRelation == 'Self'">自有</span>
								<span class="ctt" v-else-if="truck.cooperateRelation == 'Attach'">挂靠</span>
							</div>
						</el-col>
						<el-col :span="12">
							<div>
								<span class="tit">车辆类别</span>
								<span class="ctt" v-if="truck.truckCategory == 'WholeVehicle'">整车</span>
								<span class="ctt" v-else-if="truck.truckCategory == 'Tractor'">牵引车</span>
								<span class="ctt" v-else-if="truck.truckCategory == 'Trailer'">挂车</span>
							</div>
							<div>
								<span class="tit">挂车牌号码</span>
								<span class="ctt">{{truck.trailerPlateNo}}</span>
							</div>
							<div>
								<span class="tit">车辆类型</span>
								<span class="ctt" v-if="truck.truckType == 'ContainerTrailer'">集装箱挂车</span>
								<span class="ctt" v-else-if="truck.truckType == 'Van'">厢式货车</span>
								<span class="ctt" v-else-if="truck.truckType == 'HeavySemitrailerTractor'">重型半挂牵引车</span>
								<span class="ctt" v-else-if="truck.truckType == 'HeavyVan'">重型厢式货车</span>
								<span class="ctt" v-else-if="truck.truckType == 'HeavyContainerSemitrailer'">重型集装箱半挂车</span>
							</div>
							<div>
								<span class="tit">司机</span>
								<span class="ctt">{{truck.primaryDriverName}}</span>
							</div>
						</el-col>
					</el-row>
					<el-row style="margin-bottom: 10px">
						<div class="uploadTruckPicItem">
							<ImageUpload :width="180" :height="120" :files="[truck.truckFrontPic]" :isPreview="true"/>
						</div>
						<div class="uploadTruckPicItem">
							<ImageUpload :width="180" :height="120" :files="[truck.truckSidePic1]" :isPreview="true"/>
						</div>
						<div class="uploadTruckPicItem">
							<ImageUpload :width="180" :height="120" :files="[truck.truckSidePic2]" :isPreview="true"/>
						</div>
					</el-row>
				</div>
			</el-row>
			<el-row class="section-block" style="margin-bottom:20px">
				<span class="block-title">所属单位/车主</span>
				<div class="block-content">
					<el-row style="margin-bottom: 10px">
						<el-col :span="12">
							<div>
								<span class="tit">车主/单位名称</span>
								<span class="ctt">{{truck.carOwnerName}}</span>
							</div>
							<div>
								<span class="tit">车主/单位地址</span>
								<span class="ctt">{{truck.carOwnerAddress}}</span>
							</div>
						</el-col>
						<el-col :span="12">
							<div>
								<span class="tit">车主/单位电话</span>
								<span class="ctt">{{truck.carOwnerMobile}}</span>
							</div>
							<div>
								<span class="tit">所有权类型</span>
								<span class="ctt">{{truck.propertyType}}</span>
							</div>
						</el-col>
					</el-row>
				</div>
			</el-row>
			<el-row class="section-block" style="margin-bottom:20px">
				<span class="block-title">行驶证</span>
				<div class="block-content">
					<el-row style="margin-bottom: 10px">
						<el-col :span="12">
							<div>
								<span class="tit">注册日期</span>
								<span class="ctt">{{truck.driverLicRegisterTime | getdatefromtimestamp(true)}}</span>
							</div>
							<div>
								<span class="tit">有效期从</span>
								<span class="ctt">{{truck.driverLicBeginTime | getdatefromtimestamp(true)}}至{{truck.driverLicExpiresTime | getdatefromtimestamp(true)}}</span>
							</div>
						</el-col>
						<el-col :span="12">
							<div>
								<span class="tit">发证日期</span>
								<span class="ctt">{{truck.driverLicIssueTime | getdatefromtimestamp(true)}}</span>
							</div>
						</el-col>
					</el-row>
					<el-row style="margin-bottom: 10px">
						<div class="uploadTruckPicItem">
							<ImageUpload :width="180" :height="120" :files="[truck.driverLicPic]" :isPreview="true"/>
						</div>
						<div class="uploadTruckPicItem">
							<ImageUpload :width="180" :height="120" :files="[truck.driverLicSidePic]" :isPreview="true"/>
						</div>
					</el-row>
				</div>
			</el-row>
			<el-row class="section-block" style="margin-bottom:20px">
				<span class="block-title">道路运输许可证</span>
				<div class="block-content">
					<el-row style="margin-bottom: 10px">
						<el-col :span="12">
							<div>
								<span class="tit">许可证号</span>
								<span class="ctt">{{truck.roadTransportNo}}</span>
							</div>
							<div>
								<span class="tit">经营范围</span>
								<span class="ctt">{{truck.businessScope}}</span>
							</div>
							<div>
								<span class="tit">许可运输品</span>
								<span class="ctt">{{truck.roadTransportGoods}}</span>
							</div>
						</el-col>
						<el-col :span="12">
							<div>
								<span class="tit">年审日期到</span>
								<span class="ctt">{{truck.roadTransportLicAnnualPeriod | getdatefromtimestamp(true)}}</span>
							</div>
							<div>
								<span class="tit">许可运输品是否剧毒</span>
								<span class="ctt">{{truck.roadTransportGoodsIsPoisonous == 'Y' ? '是' : '否'}}</span>
							</div>
						</el-col>
					</el-row>
					<el-row style="margin-bottom: 10px">
						<div class="uploadTruckPicItem">
							<ImageUpload :width="180" :height="120" :files="[truck.roadTransportPic]" :isPreview="true"/>
						</div>
						<div class="uploadTruckPicItem">
							<ImageUpload :width="180" :height="120" :files="[truck.roadTransportSidePic]" :isPreview="true"/>
						</div>
					</el-row>
				</div>
			</el-row>
			<el-row class="section-block" style="margin-bottom:20px">
				<span class="block-title">GPS</span>
				<div class="block-content">
					<el-row style="margin-bottom: 10px">
						<el-col :span="12">
							<div>
								<span class="tit">入网号</span>
								<span class="ctt">{{truck.gpsNetworkNo}}</span>
							</div>
							<div>
								<span class="tit">序列号</span>
								<span class="ctt">{{truck.gpsSerialNumber}}</span>
							</div>
							<div>
								<span class="tit">有效期从</span>
								<span class="ctt">{{truck.gpsValidBeginDate | getdatefromtimestamp(true)}}至{{truck.gpsValidEndDate | getdatefromtimestamp(true)}}</span>
							</div>
							<div>
								<span class="tit">费用</span>
								<span class="ctt">{{truck.gpsCostAmount}}</span>
							</div>
						</el-col>
						<el-col :span="12">
							<div>
								<span class="tit">卡号</span>
								<span class="ctt">{{truck.gpsCardNo}}</span>
							</div>
							<div>
								<span class="tit">安装时间</span>
								<span class="ctt">{{truck.gpsSetupTime | getdatefromtimestamp(true)}}</span>
							</div>
							<div>
								<span class="tit">类型</span>
								<span class="ctt">{{truck.gpsType}}</span>
							</div>
						</el-col>
					</el-row>
					<el-row style="margin-bottom: 10px">
						<div class="uploadTruckPicItem">
							<ImageUpload :width="180" :height="120" :files="[truck.gpsEquippedCertifyPic]" :isPreview="true"/>
						</div>
						<div class="uploadTruckPicItem">
							<ImageUpload :width="180" :height="120" :files="[truck.gpsEquippedCertifyPic2]" :isPreview="true"/>
						</div>
					</el-row>
				</div>
			</el-row>
		</el-card>
		<el-card class="box-card">
			<div slot="header" class="clearfix"><span>保险信息</span></div>
			<el-row class="section-block" style="margin-bottom:20px">
				<span class="block-title">交强险</span>
				<div class="block-content">
					<el-row style="margin-bottom: 10px">
						<el-col :span="12">
							<div>
								<span class="tit">保险公司</span>
								<span class="ctt">{{truck.saliInsuranceVendor}}</span>
							</div>
							<div>
								<span class="tit">保险到期日</span>
								<span class="ctt">{{truck.saliInsuranceExpires | getdatefromtimestamp(true)}}</span>
							</div>
							<div>
								<span class="tit">车船税金额</span>
								<span class="ctt">{{truck.saliInsuranceTaxAmount}}</span>
							</div>
						</el-col>
						<el-col :span="12">
							<div>
								<span class="tit">保险单号</span>
								<span class="ctt">{{truck.saliInsuranceNo}}</span>
							</div>
							<div>
								<span class="tit">保险金额</span>
								<span class="ctt">{{truck.saliInsuranceAmount}}</span>
							</div>
						</el-col>
					</el-row>
					<el-row style="margin-bottom: 10px">
						<div class="uploadTruckPicItem">
							<ImageUpload :width="180" :height="120" :files="[truck.saliInsurancePic]" :isPreview="true"/>
						</div>
						<div class="uploadTruckPicItem">
							<ImageUpload :width="180" :height="120" :files="[truck.saliInsurancePic2]" :isPreview="true"/>
						</div>
					</el-row>
				</div>
			</el-row>
			<el-row class="section-block" style="margin-bottom:20px">
				<span class="block-title">商业险</span>
				<div class="block-content">
					<el-row style="margin-bottom: 10px">
						<el-col :span="12">
							<div>
								<span class="tit">保险单号</span>
								<span class="ctt">{{truck.bizInsuranceNo}}</span>
							</div>
							<div>
								<span class="tit">保险金额</span>
								<span class="ctt">{{truck.bizInsuranceAmount}}</span>
							</div>
						</el-col>
						<el-col :span="12">
							<div>
								<span class="tit">保险到期日</span>
								<span class="ctt">{{truck.bizInsuranceExpires | getdatefromtimestamp(true)}}</span>
							</div>
						</el-col>
					</el-row>
					<el-row style="margin-bottom: 10px">
						<div class="uploadTruckPicItem">
							<ImageUpload :width="180" :height="120" :files="[truck.bizInsurancePic]" :isPreview="true"/>
						</div>
						<div class="uploadTruckPicItem">
							<ImageUpload :width="180" :height="120" :files="[truck.bizInsurancePic2]" :isPreview="true"/>
						</div>
					</el-row>
				</div>
			</el-row>
			<el-row class="section-block" style="margin-bottom:20px">
				<span class="block-title">承运险</span>
				<div class="block-content">
					<el-row style="margin-bottom: 10px">
						<el-col :span="12">
							<div>
								<span class="tit">保险单号</span>
								<span class="ctt">{{truck.carrierRiskInsuranceNo}}</span>
							</div>
							<div>
								<span class="tit">保险金额</span>
								<span class="ctt">{{truck.carrierRiskInsuranceAmount}}</span>
							</div>
						</el-col>
						<el-col :span="12">
							<div>
								<span class="tit">保险到期日</span>
								<span class="ctt">{{truck.carrierRiskInsuranceExpires | getdatefromtimestamp(true)}}</span>
							</div>
						</el-col>
					</el-row>
					<el-row style="margin-bottom: 10px">
						<div class="uploadTruckPicItem">
							<ImageUpload :width="180" :height="120" :files="[truck.carrierRiskInsurancePic]" :isPreview="true"/>
						</div>
						<div class="uploadTruckPicItem">
							<ImageUpload :width="180" :height="120" :files="[truck.carrierRiskInsurancePic2]" :isPreview="true"/>
						</div>
					</el-row>
				</div>
			</el-row>
			<el-row class="section-block" style="margin-bottom:20px">
				<span class="block-title">货运险</span>
				<div class="block-content">
					<el-row style="margin-bottom: 10px">
						<el-col :span="12">
							<div>
								<span class="tit">保险单号</span>
								<span class="ctt">{{truck.cargoInsuranceNo}}</span>
							</div>
							<div>
								<span class="tit">保险金额</span>
								<span class="ctt">{{truck.cargoInsuranceAmount}}</span>
							</div>
						</el-col>
						<el-col :span="12">
							<div>
								<span class="tit">保险到期日</span>
								<span class="ctt">{{truck.cargoInsuranceExpireDate | getdatefromtimestamp(true)}}</span>
							</div>
						</el-col>
					</el-row>
				</div>
			</el-row>
			<el-row class="section-block" style="margin-bottom:20px">
				<span class="block-title">保险备注</span>
				<div class="block-content">
					<el-row style="margin-bottom: 10px">
						<div>
							<span class="tit">保险备注</span>
							<span class="ctt">{{truck.insuranceNote}}</span>
						</div>
					</el-row>
				</div>
			</el-row>
		</el-card>
		<el-card class="box-card">
			<div slot="header" class="clearfix"><span>技术参数</span></div>
			<el-row class="section-block" style="margin-bottom:20px">
				<span class="block-title">技术参数</span>
				<div class="block-content">
					<el-row style="margin-bottom: 10px">
						<el-col :span="8">
							<div>
								<span class="tit">车长</span>
								<span class="ctt">{{truck.length}}</span>
							</div>
							<div>
								<span class="tit">装载重量</span>
								<span class="ctt">{{truck.loads}}</span>
							</div>
						</el-col>
						<el-col :span="8">
							<div>
								<span class="tit">车宽</span>
								<span class="ctt">{{truck.width}}</span>
							</div>
							<div>
								<span class="tit">装载体积</span>
								<span class="ctt">{{truck.loadVolume}}</span>
							</div>
						</el-col>
						<el-col :span="8">
							<div>
								<span class="tit">车高</span>
								<span class="ctt">{{truck.high}}</span>
							</div>
						</el-col>
					</el-row>
				</div>
			</el-row>
		</el-card>
		<el-card class="box-card">
			<div slot="header" class="clearfix"><span>其他信息</span></div>
			<el-row class="section-block" style="margin-bottom:20px">
				<span class="block-title">罐体</span>
				<div class="block-content">
					<el-row style="margin-bottom: 10px">
						<el-col :span="12">
							<div>
								<span class="tit">罐体类型</span>
								<span class="ctt">{{truck.cannedType}}</span>
							</div>
							<div>
								<span class="tit">罐体检测有效期至</span>
								<span class="ctt">{{truck.tankQCExpires | getdatefromtimestamp(true)}}</span>
							</div>
							<div>
								<span class="tit">压力表监测有效期至</span>
								<span class="ctt">{{truck.pressureGaugeQCExpires | getdatefromtimestamp(true)}}</span>
							</div>
						</el-col>
						<el-col :span="12">
							<div>
								<span class="tit">容积</span>
								<span class="ctt">{{truck.tankVolume}}</span>
							</div>
							<div>
								<span class="tit">安全阀监测有效期至</span>
								<span class="ctt">{{truck.safetyValvesQCExpires | getdatefromtimestamp(true)}}</span>
							</div>
						</el-col>
					</el-row>
					<el-row style="margin-bottom: 10px">
						<div class="uploadTruckPicItem">
							<ImageUpload :width="180" :height="120" :files="[truck.cannedMonitorTableCertificatePic1]" :isPreview="true"/>
						</div>
						<div class="uploadTruckPicItem">
							<ImageUpload :width="180" :height="120" :files="[truck.cannedMonitorTableCertificatePic2]" :isPreview="true"/>
						</div>
					</el-row>
				</div>
			</el-row>
			<el-row class="section-block" style="margin-bottom:20px">
				<span class="block-title">保证金</span>
				<div class="block-content">
					<el-row style="margin-bottom: 10px">
						<el-col :span="12">
							<div>
								<span class="tit">金额</span>
								<span class="ctt">{{truck.securityDepositAmount}}</span>
							</div>
							<div>
								<span class="tit">二次安全保证金金额</span>
								<span class="ctt">{{truck.secondSecurityDepositAmount}}</span>
							</div>
							<div>
								<span class="tit">缴费日期</span>
								<span class="ctt">{{truck.securityDepositPayDate | getdatefromtimestamp(true)}}</span>
							</div>
							<div>
								<span class="tit">保证金备注</span>
								<span class="ctt">{{truck.securityDepositNote}}</span>
							</div>
						</el-col>
						<el-col :span="12">
							<div>
								<span class="tit">日期</span>
								<span class="ctt">{{truck.securityDepositDate | getdatefromtimestamp(true)}}</span>
							</div>
							<div>
								<span class="tit">二次安全保证金日期</span>
								<span class="ctt">{{truck.secondSecurityDepositDate | getdatefromtimestamp(true)}}</span>
							</div>
						</el-col>
					</el-row>
				</div>
			</el-row>
			<el-row class="section-block" style="margin-bottom:20px">
				<span class="block-title">技术等级</span>
				<div class="block-content">
					<el-row style="margin-bottom: 10px">
						<el-col :span="12">
							<div>
								<span class="tit">等级评定</span>
								<span class="ctt">{{truck.rank}}</span>
							</div>
							<div>
								<span class="tit">下次评级日期</span>
								<span class="ctt">{{truck.nextRankEvaluteTime | getdatefromtimestamp(true)}}</span>
							</div>
						</el-col>
						<el-col :span="12">
							<div>
								<span class="tit">评级日期</span>
								<span class="ctt">{{truck.rankEvaluteTime | getdatefromtimestamp(true)}}</span>
							</div>
							<div>
								<span class="tit">审验备注</span>
								<span class="ctt">{{truck.rankRemark}}</span>
							</div>
						</el-col>
					</el-row>
					<el-row style="margin-bottom: 10px">
						<div class="uploadTruckPicItem">
							<ImageUpload :width="180" :height="120" :files="[truck.technicalRankPic]" :isPreview="true"/>
						</div>
						<div class="uploadTruckPicItem">
							<ImageUpload :width="180" :height="120" :files="[truck.technicalRankPic2]" :isPreview="true"/>
						</div>
					</el-row>
				</div>
			</el-row>
			<el-row class="section-block" style="margin-bottom:20px">
				<span class="block-title">二级维护</span>
				<div class="block-content">
					<el-row style="margin-bottom: 10px">
						<el-col :span="12">
							<div>
								<span class="tit">维护日期</span>
								<span class="ctt">{{truck.secondaMaintainTime | getdatefromtimestamp(true)}}</span>
							</div>
						</el-col>
						<el-col :span="12">
							<div>
								<span class="tit">下次维护</span>
								<span class="ctt">{{truck.nextSecondLevel | getdatefromtimestamp(true)}}</span>
							</div>
						</el-col>
					</el-row>
				</div>
			</el-row>
			<el-row class="section-block" style="margin-bottom:20px">
				<span class="block-title">管理协议</span>
				<div class="block-content">
					<el-row style="margin-bottom: 10px">
						<el-col :span="12">
							<div>
								<span class="tit">金额</span>
								<span class="ctt">{{truck.managementAgreementAmount}}</span>
							</div>
							<div>
								<span class="tit">安全责任书到期日</span>
								<span class="ctt">{{truck.safetyLiabilityLetterExpireDate | getdatefromtimestamp(true)}}</span>
							</div>
							<div>
								<span class="tit">协议备注</span>
								<span class="ctt">{{truck.managementAgreementNote}}</span>
							</div>
						</el-col>
						<el-col :span="12">
							<div>
								<span class="tit">缴费日期</span>
								<span class="ctt">{{truck.managementAgreementPayDate | getdatefromtimestamp(true)}}</span>
							</div>
							<div>
								<span class="tit">元/轴/月</span>
								<span class="ctt">{{truck.managementAgreementMoneyPerMonth}}</span>
							</div>
						</el-col>
						<div>
							<span class="tit">有效期</span>
							<span class="ctt">{{truck.managementAgreementBeginDate | getdatefromtimestamp(true)}}至{{truck.managementAgreementExpireDate | getdatefromtimestamp(true)}}</span>
						</div>
					</el-row>
				</div>
			</el-row>
			<el-row class="section-block" style="margin-bottom:20px">
				<span class="block-title">其他</span>
				<div class="block-content">
					<el-row style="margin-bottom: 10px">
						<div class="uploadTruckPicItem">
							<ImageUpload :width="180" :height="120" :files="[truck.purchaseInvoicePic]" :isPreview="true"/>
						</div>
						<div class="uploadTruckPicItem">
							<ImageUpload :width="180" :height="120" :files="[truck.vehicleCertificatePic]" :isPreview="true"/>
						</div>
						<div class="uploadTruckPicItem">
							<ImageUpload :width="180" :height="120" :files="[truck.vehicleRegistrationCertificatePic]" :isPreview="true"/>
						</div>
						<div class="uploadTruckPicItem">
							<ImageUpload :width="180" :height="120" :files="[truck.otherTruckPic1]" :isPreview="true"/>
						</div>
						<div class="uploadTruckPicItem">
							<ImageUpload :width="180" :height="120" :files="[truck.otherTruckPic2]" :isPreview="true"/>
						</div>
						<div class="uploadTruckPicItem">
							<ImageUpload :width="180" :height="120" :files="[truck.otherTruckPic3]" :isPreview="true"/>
						</div>
					</el-row>
				</div>
			</el-row>
		</el-card>
		<div class="formHandle text-center" ref="btns">
			<el-button @click="back">返回</el-button>
			<el-button type="primary" @click="print">预览打印</el-button>	
		</div>
	</div>
</template>
<script type="text/javascript">
import { Message } from 'element-ui'
import ImageUpload from '../../CommonComponents/ImageUpload'
import Truck from '../../../api/Truck'
export default {
	data() {
		return {
			truck: {}
		}
	},
	components: { ImageUpload },
	created() {
		this.getInfo()
	},
	methods: {
		print() {
			let truckElem = this.$refs.truck
			const btnsElem = this.$refs.btns
			const winElem = window.document.body.innerHTML
			truckElem.removeChild(btnsElem)
			window.document.body.innerHTML = truckElem.innerHTML
			// document.execCommand('print')
			window.print()
			window.document.body.innerHTML = winElem
			window.location.reload()
		},
		getInfo() {
			const truckID = this.$route.query.truckID
			Truck.findById({ truckID }).then(res => {
				this.truck = res
			})
		},
		back() {
			this.$router.go(-1)
		}
	}
}

</script>
<style lang="stylus" scoped>
.section-block
	margin 10px 0 0
.uploadTruckPicItem
	display inline-block
	margin-right 10px
	p
		margin 0
		text-align center
		font-size 12px
		color #999
.box-card
	margin-bottom 10px
.el-checkbox-group
	display inline-block
	margin-left 40px
.block-content
	font-size 14px
	line-height 2
	.tit
		display inline-block
		width 126px
		text-align right
		margin-right 10px
		color #333
		font-weight bold
	.ctt
		display inline-block
		text-align left
		color #666
</style>