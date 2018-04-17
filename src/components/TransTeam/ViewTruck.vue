<template>
	<div class="main-content" style="min-width: 1200px">
		<div class="wf-card">
			<div class="header clearfix">查看车辆</div>
			<el-form label-width="155px">
				<el-row>
					<el-col :span="6">
						<el-form-item label="状态">
							<p>{{truck.status}}</p>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="审核人">
							<p>{{truck.auditName}}</p>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="审核日期">
							<p v-if="truck.auditTime">{{truck.auditTime | getdatefromtimestamp(true)}}</p>
							<p v-else></p>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="6">
						<el-form-item label="所属地区">
							<p v-if="truck.areaID">{{truck.areaID | searchAreaByKey()}}</p>
							<p v-else></p>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="所属企业">
							<p>{{truck.companyName}}</p>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="自编号">
							<p>{{truck.code}}</p>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="6">
						<el-form-item label="车辆类别">
							<p>{{truck.truckCategory}}</p>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="车辆类型">
							<p>{{truck.truckType}}</p>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="车牌颜色">
							<p>{{truck.plateNoColor}}</p>
						</el-form-item>
					</el-col>
					<el-col :span="6" v-if="truck.trailerPlateNo">
						<el-form-item label="挂车车牌">
							<p>{{truck.trailerPlateNo}}</p>
						</el-form-item>
					</el-col>
					<el-col :span="6" v-else>	
						<el-form-item label="车牌号">
							<p>{{truck.plateNo}}</p>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="6">
						<el-form-item label="车长">
							<p>{{truck.length + '毫米'}}</p>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="车宽">
							<p>{{truck.width + '毫米'}}</p>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="车高">
							<p>{{truck.high + '毫米'}}</p>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="6">
						<el-form-item label="载重">
							<p>{{truck.loads + '吨'}}</p>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="装载方数">
							<p>{{truck.loadVolume + '平方米'}}</p>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="牵引质量">
							<p>{{truck.tractiveTonnage ? (truck.tractiveTonnage + '吨') : ''}}</p>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="总质量">
							<p>{{truck.totalWeight ? (truck.totalWeight + '吨') : ''}}</p>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="6">
						<el-form-item label="罐体类型">
							<p>{{truck.cannedType}}</p>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="罐体容积">
							<p>{{truck.tankVolume + '平方米'}}</p>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="6">
						<el-form-item label="罐体检测有效期至">
							<p v-if="truck.tankQCExpires">{{truck.tankQCExpires | getdatefromtimestamp(true)}}</p>
							<p v-else></p>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="安全阀检测有效期至">
							<p v-if="truck.safetyValvesQCExpires">{{truck.safetyValvesQCExpires | getdatefromtimestamp(true)}}</p>
							<p v-else></p>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="压力表检测有效期至">
							<p v-if="truck.pressureGaugeQCExpires">{{truck.pressureGaugeQCExpires | getdatefromtimestamp(true)}}</p>
							<p v-else></p>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="6">
						<el-form-item label="汽车生产厂家">
							<p>{{truck.manufacturer}}</p>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="品牌型号">
							<p>{{truck.carBrandModel}}</p>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="发动机号">
							<p>{{truck.engineNO}}</p>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="车架号">
							<p>{{truck.vehicleFrameNO}}</p>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="6">
						<el-form-item label="核载人数">
							<p>{{truck.personsCapacity}}</p>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="车身颜色">
							<p>{{truck.carBodyColor}}</p>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="是否喷涂警示标志">
							<p>{{truck.hasWarnMark == 'Y' ? '是' : '否'}}</p>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="8">
						<el-form-item label="行驶证注册日期">
							<p v-if="truck.driverLicRegisterTime">{{truck.driverLicRegisterTime | getdatefromtimestamp(true)}}</p>
							<p v-else></p>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="行驶证发证日期">
							<p v-if="truck.driverLicIssueTime">{{truck.driverLicIssueTime | getdatefromtimestamp(true)}}</p>
							<p v-else></p>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="行驶证审验效期至">
							<p v-if="truck.driverLicExamineExpires">{{truck.driverLicExamineExpires | getdatefromtimestamp(true)}}</p>
							<p v-else></p>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="6">
						<el-form-item label="道路运输证号">
							<p>{{truck.roadTransportNo}}</p>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="经营范围">
							<p>{{truck.businessScope}}</p>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="道路运输证年审期至">
							<p v-if="truck.roadTransportLicAnnualPeriod">{{truck.roadTransportLicAnnualPeriod | getdatefromtimestamp(true)}}</p>
							<p v-else></p>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="6">
						<el-form-item label="所有人或单位">
							<p>{{truck.carOwnerName}}</p>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="所有人联系电话">
							<p>{{truck.carOwnerMobile}}</p>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="所有人登记地址">
							<p>{{truck.carOwnerAddress}}</p>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="6">
						<el-form-item label="实际车主姓名">
							<p>{{truck.curDriverName}}</p>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="实际车主电话">
							<p>{{truck.curDriverMobile}}</p>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="实际车主现住址">
							<p>{{truck.curDriverAddress}}</p>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="6">
						<el-form-item label="所有权">
							<p>{{truck.propertyType}}</p>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="经营证号">
							<p>{{truck.businessLicenseNo}}</p>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="经营性质">
							<p>{{truck.businessNature}}</p>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="6">
						<el-form-item label="等级评定">
							<p>{{truck.rank}}</p>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="下次等评日期">
							<p v-if="truck.nextRankEvaluteTime">{{truck.nextRankEvaluteTime | getdatefromtimestamp(true)}}</p>
							<p v-else></p>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="二级维护日期">
							<p v-if="truck.secondaMaintainTime">{{truck.secondaMaintainTime | getdatefromtimestamp(true)}}</p>
							<p v-else></p>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="下次二级维护日期">
							<p v-if="truck.nextSecondLevel">{{truck.nextSecondLevel | getdatefromtimestamp(true)}}</p>
							<p v-else></p>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="6">
						<el-form-item label="承运人责任险有效期至">
							<p v-if="truck.carrierRiskInsuranceExpires">{{truck.carrierRiskInsuranceExpires | getdatefromtimestamp(true)}}</p>
							<p v-else></p>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="交强险有效期至">
							<p v-if="truck.saLIInsuranceExpires">{{truck.saLIInsuranceExpires | getdatefromtimestamp(true)}}</p>
							<p v-else></p>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="商业险有效期至">
							<p v-if="truck.bizInsuranceExpires">{{truck.bizInsuranceExpires | getdatefromtimestamp(true)}}</p>
							<p v-else></p>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="6">
						<el-form-item label="GPS类型">
							<p>{{truck.gpSType}}</p>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="GPS入网号">
							<p>{{truck.gpSNetworkNo}}</p>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="GPS卡号">
							<p>{{truck.gpSCardNo}}</p>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="GPS序列号">
							<p>{{truck.gpSSerialNumber}}</p>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="6">
						<el-form-item label="GPS安装时间">
							<p v-if="truck.gpSSetupTime">{{truck.gpSSetupTime | getdatefromtimestamp(true)}}</p>
							<p v-else></p>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="6">
						<el-form-item label="车辆照片(正面)">
							<ImageUpload :files="[truck.truckFrontPic]" :isPreview="true"/>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="车辆照片(侧面1)">
							<ImageUpload :files="[truck.truckSidePic1]" :isPreview="true"/>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="车辆照片(侧面2)">
							<ImageUpload :files="[truck.truckSidePic2]" :isPreview="true"/>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="6">
						<el-form-item label="机动车行驶证(正)">
							<ImageUpload :files="[truck.driverLicPic]" :isPreview="true"/>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="机动车行驶证(副)">
							<ImageUpload :files="[truck.driverLicSidePic]" :isPreview="true"/>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="道路运输许可证(正)">
							<ImageUpload :files="[truck.roadTransportPic]" :isPreview="true"/>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="道路运输许可证(副)">
							<ImageUpload :files="[truck.roadTransportSidePic]" :isPreview="true"/>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="24">
						<el-form-item label="其他照片">
							<ImageUpload :files="otherImgs" :isPreview="true" :limitNum="5"/>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="24">
						<el-form-item>
							<el-button @click="back">返回</el-button>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
		</div>
	</div>
</template>
<script type="text/javascript">
import { Message } from 'element-ui'
import { regionData } from 'element-china-area-data'
import ImageUpload from '../CommonComponents/ImageUpload'
import request from '../../common/request'
export default {
	data() {
		return {
			distData: regionData,
			truck: {},
			otherImgs: []
		}
	},
	created() {
		this.getInfo()
	},
	methods: {
		getInfo() {
			let params = {
				truckID: this.$route.query.truckID
			}
			request({
				url: '/truck/info',
				params
			}).then(res => {
				console.log(res.data.data)
				this.truck = res.data.data
				let resDataComStaffPic = res.data.data
				let i = 1
				while (i < 6) {
					this.otherImgs.push(resDataComStaffPic['otherTruckPic' + i])
					i++
				}
			})
		},
		back() {
			this.$router.go(-1)
		}
	},
	components: {
		ImageUpload
	}
}

</script>
<style lang="stylus" scoped>
.avatar-uploader
	line-height 1
	width 100px
	height 100px
	overflow hidden
	border 1px dashed #d9d9d9
	border-radius 6px
	&:hover 
		border-color #409eff
	.avatar-uploader-icon
		font-size 28px
		color #8c939d
		width 98px
		height 98px
		line-height 98px
		text-align center
	.avatar
		width 98px
		height 98px
		display block
		vertical-align top
.el-form-item__content
	p
		margin 0
		box-sizing border-box
		border 1px solid #fff
		border-bottom-color #dcdfe6
		padding 0 15px
		height 40px
		line-height 40px
		color #999
		font-size 14px
		overflow hidden
		white-space nowrap
		text-overflow ellipsis      
</style>