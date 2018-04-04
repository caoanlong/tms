<template>
	<div class="main-content">
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
							<p>{{truck.auditor}}</p>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="审核日期">
							<p>{{truck.auditorDate}}</p>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="6">
						<el-form-item label="所属地区">
							<p>{{truck.comTruckRegisterInfo.area}}</p>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="所属企业">
							<p>{{truck.comTruckRegisterInfo.companyName}}</p>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="自编号">
							<p>{{truck.comTruck.code}}</p>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="6">
						<el-form-item label="车辆类别">
							<p>{{truck.comTruck.truckCategory}}</p>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="车辆类型">
							<p>{{truck.comTruck.truckType}}</p>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="车牌颜色">
							<p>{{truck.comTruck.plateNoColor}}</p>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="车牌号">
							<p>{{truck.comTruck.plateNo}}</p>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="6">
						<el-form-item label="挂车车牌">
							<p>{{truck.comTruck.trailerPlateNo}}</p>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="车长">
							<p>{{truck.comTruck.length + '米'}}</p>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="车宽">
							<p>{{truck.comTruck.width + '米'}}</p>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="车高">
							<p>{{truck.comTruck.high + '米'}}</p>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="6">
						<el-form-item label="载重">
							<p>{{truck.comTruck.loads}}</p>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="装载方数">
							<p>{{truck.comTruck.loadVolume}}</p>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="牵引质量">
							<p>{{truck.comTruck.tractiveTonnage}}</p>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="6">
						<el-form-item label="罐体类型">
							<p>{{truck.comTruck.cannedType}}</p>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="罐体容积">
							<p>{{truck.comTruck.tankVolume}}</p>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="6">
						<el-form-item label="罐体检测有效期至">
							<p>{{truck.comTruckRegisterInfo.tankQCExpires | getdatefromtimestamp(true)}}</p>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="安全阀检测有效期至">
							<p>{{truck.comTruckRegisterInfo.safetyValvesQCExpires | getdatefromtimestamp(true)}}</p>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="压力表检测有效期至">
							<p>{{truck.comTruckRegisterInfo.pressureGaugeQCExpires | getdatefromtimestamp(true)}}</p>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="6">
						<el-form-item label="汽车生产厂家">
							<p>{{truck.comTruckRegisterInfo.manufacturer}}</p>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="品牌型号">
							<p>{{truck.comTruckRegisterInfo.carBrandModel}}</p>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="发动机号">
							<p>{{truck.comTruckRegisterInfo.engineNO}}</p>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="车架号">
							<p>{{truck.comTruckRegisterInfo.vehicleFrameNO}}</p>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="6">
						<el-form-item label="核载人数">
							<p>{{truck.comTruckRegisterInfo.personsCapacity}}</p>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="车身颜色">
							<p>{{truck.comTruckRegisterInfo.carBodyColor}}</p>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="是否喷涂警示标志">
							<p>{{truck.comTruckRegisterInfo.hasWarnMark == 'Y' ? '是' : '否'}}</p>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="6">
						<el-form-item label="行驶证注册日期">
							<p>{{truck.comTruckRegisterInfo.driverLicRegisterTime | getdatefromtimestamp(true)}}</p>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="行驶证发证日期">
							<p>{{truck.comTruckRegisterInfo.driverLicIssueTime | getdatefromtimestamp(true)}}</p>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="行驶证审验效期至">
							<p>{{truck.comTruckRegisterInfo.driverLicExamineExpires | getdatefromtimestamp(true)}}</p>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="6">
						<el-form-item label="道路运输证号">
							<p>{{truck.roadTransNum}}</p>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="经营范围">
							<p>{{truck.businessScope}}</p>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="道路运输证年审期至">
							<p>{{truck.roadTransYearTo}}</p>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="6">
						<el-form-item label="所有人或单位">
							<p>{{truck.owner}}</p>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="所有人联系电话">
							<p>{{truck.ownerMobile}}</p>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="所有人登记地址">
							<p>{{truck.ownerAddress}}</p>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="6">
						<el-form-item label="实际车主姓名">
							<p>{{truck.truckOwnerName}}</p>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="实际车主电话">
							<p>{{truck.truckOwnerMobile}}</p>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="实际车主现住址">
							<p>{{truck.truckOwnerAddress}}</p>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="6">
						<el-form-item label="所有权">
							<p>{{truck.ownership}}</p>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="经营证号">
							<p>{{truck.businessLicNum}}</p>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="6">
						<el-form-item label="等级评定">
							<p>{{truck.levelEval}}</p>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="下次等评日期">
							<p>{{truck.nextLevelEvalDate}}</p>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="二级维护日期">
							<p>{{truck.secondMaintainDate}}</p>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="下次二级维护日期">
							<p>{{truck.nextSecondMaintainDate}}</p>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="6">
						<el-form-item label="承运人责任险有效期至">
							<p>{{truck.carrierValid}}</p>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="交强险有效期至">
							<p>{{truck.strongInsValid}}</p>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="商业险有效期至">
							<p>{{truck.commercialInsValid}}</p>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="6">
						<el-form-item label="GPS类型">
							<p>{{truck.gpsType}}</p>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="GPS入网号">
							<p>{{truck.gpsNetNum}}</p>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="GPS卡号">
							<p>{{truck.gpsCardNum}}</p>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="GPS序列号">
							<p>{{truck.gpsSerialNum}}</p>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="6">
						<el-form-item label="GPS安装时间">
							<p>{{truck.gpsInstallTime}}</p>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="6">
						<el-form-item label="车辆照片">
							<ImageUpload :files="[truck.truckPhoto]" :isPreview="true"/>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="机动车行驶证">
							<ImageUpload :files="[truck.driverLicImg]" :isPreview="true"/>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="道路运输许可证">
							<ImageUpload :files="[truck.roadTransImg]" :isPreview="true"/>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="24">
						<el-form-item label="其他照片">
							<ImageUpload :files="truck.otherImgs" :isPreview="true" :limitNum="9" @imgUrlBack="imgUrlBack"/>
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
			truck: {}
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
				// let resDataComStaffPic = res.data.data.comStaffPic
				// let i = 1
				// while (i < 6) {
				// 	this.otherImgs.push(resDataComStaffPic['otherStaffPic' + i])
				// 	i++
				// }
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
		border 1px solid #fff
		border-bottom-color #dcdfe6
		padding 0 15px
		height 40px
		font-family 'sans-serif'
		line-height 40px
		color #999
		font-size 12px
		overflow hidden
		white-space nowrap
		text-overflow ellipsis      
</style>