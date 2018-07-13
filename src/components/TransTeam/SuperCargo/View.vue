<template>
	<div class="main-content" ref="superCargo" style="padding-left:180px">
		<el-card class="box-card">
			<el-row class="section-block" style="margin-bottom:20px">
				<span class="block-title">基本信息</span>
				<div class="block-content">
					<el-row style="margin-bottom: 10px">
						<el-col :span="9">
							<div>
								<span class="tit">姓名</span>
								<span class="ctt">{{superCargo.realName}}</span>
							</div>
							<div>
								<span class="tit">联系方式</span>
								<span class="ctt">{{superCargo.mobile}}</span>
							</div>
							<div>
								<span class="tit">住址</span>
								<span class="ctt">{{superCargo.homeAddress}}</span>
							</div>
							<div>
								<span class="tit">岗位</span>
								<span class="ctt" v-if="superCargo.supercargoType == 'Driver'">驾驶员</span>
								<span class="ctt" v-else-if="superCargo.supercargoType == 'Supercargo'">押运员</span>
								<span class="ctt" v-else-if="superCargo.supercargoType == 'SupercargoDriver'">押运员、驾驶员</span>
							</div>
							<div>
								<span class="tit">备注</span>
								<span class="ctt">{{superCargo.remark}}</span>
							</div>
						</el-col>
						<el-col :span="9">
							<div>
								<span class="tit">性别</span>
								<span class="ctt">{{superCargo.sex == 'Y' ? '男' : '女'}}</span>
							</div>
							<div>
								<span class="tit">合作关系</span>
								<span class="ctt">{{superCargo.cooperateRelation == 'Self' ? '自有车辆' : '挂靠'}}</span>
							</div>
							<div>
								<span class="tit">合同有效期</span>
								<span class="ctt" v-if="superCargo.laborContractEndTime">{{superCargo.laborContractEndTime | getdatefromtimestamp(true)}}</span>
							</div>
							<div>
								<span class="tit">职称/技术等级</span>
								<span class="ctt">{{superCargo.titleLever}}</span>
							</div>
						</el-col>
						<el-col :span="6">
							<ImageUpload :width="120" :height="120" :files="[superCargo.headPic]" :isPreview="true"/>
						</el-col>
					</el-row>
				</div>
			</el-row>
			<el-row class="section-block" style="margin-bottom:20px">
				<span class="block-title">身份证</span>
				<div class="block-content">
					<el-row style="margin-bottom: 10px">
						<el-col :span="9">
							<div>
								<span class="tit">身份证号</span>
								<span class="ctt">{{superCargo.idCardNum}}</span>
							</div>
						</el-col>
						<el-col :span="9">
							<div>
								<span class="tit">有效期</span>
								<span class="ctt" v-if="superCargo.idCardBeginTime">{{superCargo.idCardBeginTime | getdatefromtimestamp(true)}}至{{superCargo.idCardExpirationTime | getdatefromtimestamp(true)}}</span>
							</div>
						</el-col>
					</el-row>
					<el-row style="margin-bottom: 10px">
						<div class="uploadTruckPicItem">
							<ImageUpload :width="180" :height="120" :files="[superCargo.idCardFrontUrl]" :isPreview="true"/>
						</div>
						<div class="uploadTruckPicItem">
							<ImageUpload :width="180" :height="120" :files="[superCargo.idCardBackUrl]" :isPreview="true"/>
						</div>
					</el-row>
				</div>
			</el-row>
			<el-row class="section-block">
				<span class="block-title">卫生员合格证</span>
				<div class="block-content">
					<el-row style="margin-bottom: 10px">
						<div class="uploadTruckPicItem">
							<ImageUpload :width="180" :height="120" :files="[superCargo.hygienistsCertificateOfApprovalPic1]" :isPreview="true"/>
						</div>
						<div class="uploadTruckPicItem">
							<ImageUpload :width="180" :height="120" :files="[superCargo.hygienistsCertificateOfApprovalPic2]" :isPreview="true"/>
						</div>
					</el-row>
				</div>
			</el-row>
		</el-card>
		<el-card class="box-card">
			<div slot="header" class="clearfix"><span>驾驶员信息</span></div>
			<el-row class="section-block" style="margin-bottom:20px">
				<span class="block-title">驾驶证</span>
				<div class="block-content">
					<el-row style="margin-bottom: 10px">
						<el-col :span="12">
							<div>
								<span class="tit">驾驶证号</span>
								<span class="ctt">{{superCargo.driverLicenseNum}}</span>
							</div>
							<div>
								<span class="tit">准驾车型</span>
								<span class="ctt">{{superCargo.quasiDrivingType}}</span>
							</div>
							<div>
								<span class="tit">有效期</span>
								<span class="ctt" v-if="superCargo.driverLicenseBeginTime">{{superCargo.driverLicenseBeginTime | getdatefromtimestamp(true)}}至{{superCargo.driverLicenseEndTime | getdatefromtimestamp(true)}}</span>
							</div>
						</el-col>
						<el-col :span="12">
							<div>
								<span class="tit">档案编号</span>
								<span class="ctt">{{superCargo.driverLicenseCode}}</span>
							</div>
							<div>
								<span class="tit">初次领证日期</span>
								<span class="ctt" v-if="superCargo.driverLicenseFirstTime">{{superCargo.driverLicenseFirstTime | getdatefromtimestamp(true)}}</span>
							</div>
						</el-col>
					</el-row>
					<el-row style="margin-bottom: 10px">
						<div class="uploadTruckPicItem">
							<ImageUpload :width="180" :height="120" :files="[superCargo.driverLicFrontUrl]" :isPreview="true"/>
						</div>
						<div class="uploadTruckPicItem">
							<ImageUpload :width="180" :height="120" :files="[superCargo.driverLicCopyFrontUrl]" :isPreview="true"/>
						</div>
					</el-row>
				</div>
			</el-row>
			<el-row class="section-block" style="margin-bottom:20px">
				<span class="block-title">危货从业资格证</span>
				<div class="block-content">
					<el-row style="margin-bottom: 10px">
						<el-col :span="12">
							<div>
								<span class="tit">证号</span>
								<span class="ctt">{{superCargo.qualificationNum}}</span>
							</div>
							<div>
								<span class="tit">准驾车型</span>
								<span class="ctt">{{superCargo.qualificationQuasiDrivingType}}</span>
							</div>
							<div>
								<span class="tit">初次领证日期</span>
								<span class="ctt" v-if="superCargo.qualificationIssueDate">{{superCargo.qualificationIssueDate | getdatefromtimestamp(true)}}</span>
							</div>
							<div>
								<span class="tit">从业资格类别</span>
								<span class="ctt">类别{{superCargo.qualificationType}}</span>
							</div>
						</el-col>
						<el-col :span="12">
							<div>
								<span class="tit">编号</span>
								<span class="ctt">{{superCargo.qualificationCode}}</span>
							</div>
							<div>
								<span class="tit">是否新证</span>
								<span class="ctt">{{superCargo.qualificationIsNewest == 'Y' ? '是' : '否'}}</span>
							</div>
							<div>
								<span class="tit">有效期</span>
								<span class="ctt" v-if="superCargo.qualificationBeginDate">{{superCargo.qualificationBeginDate | getdatefromtimestamp(true)}}至{{superCargo.qualificationExpirationDate | getdatefromtimestamp(true)}}</span>
							</div>
						</el-col>
					</el-row>
					<el-row style="margin-bottom: 10px">
						<div class="uploadTruckPicItem">
							<ImageUpload :width="180" :height="120" :files="[superCargo.qualificationFirstPage]" :isPreview="true"/>
						</div>
						<div class="uploadTruckPicItem">
							<ImageUpload :width="180" :height="120" :files="[superCargo.qualificationSecondPage]" :isPreview="true"/>
						</div>
						<div class="uploadTruckPicItem">
							<ImageUpload :width="180" :height="120" :files="[superCargo.qualificationThirdPage]" :isPreview="true"/>
						</div>
					</el-row>
				</div>
			</el-row>
			<el-row class="section-block" style="margin-bottom:20px">
				<span class="block-title">驾驶员继续再教育合格证</span>
				<div class="block-content">
					<el-row style="margin-bottom: 10px">
						<div>
							<span class="tit">继续教育时间</span>
							<span class="ctt" v-if="superCargo.continueEducationCertificationEndDate">{{superCargo.continueEducationCertificationEndDate | getdatefromtimestamp(true)}}</span>
						</div>
					</el-row>
					<el-row style="margin-bottom: 10px">
						<div class="uploadTruckPicItem">
							<ImageUpload :width="180" :height="120" :files="[superCargo.continueEducationCertificationPic1]" :isPreview="true"/>
						</div>
						<div class="uploadTruckPicItem">
							<ImageUpload :width="180" :height="120" :files="[superCargo.continueEducationCertificationPic2]" :isPreview="true"/>
						</div>
					</el-row>
				</div>
			</el-row>
			<el-row class="section-block" style="margin-bottom:20px">
				<span class="block-title">诚信考核记录</span>
				<div class="block-content">
					<el-row style="margin-bottom: 10px">
						<el-col :span="9">
							<div>
								<span class="tit">诚信等级</span>
								<span class="ctt">{{superCargo.integrityExamineGrade}}</span>
							</div>
						</el-col>
						<el-col :span="9">
							<div>
								<span class="tit">合格至</span>
								<span class="ctt" v-if="superCargo.integrityExamineEndTime">{{superCargo.integrityExamineEndTime | getdatefromtimestamp(true)}}</span>
							</div>
						</el-col>
					</el-row>
					<el-row style="margin-bottom: 10px">
						<div class="uploadTruckPicItem">
							<ImageUpload :width="180" :height="120" :files="[superCargo.integrityExaminePic1]" :isPreview="true"/>
						</div>
						<div class="uploadTruckPicItem">
							<ImageUpload :width="180" :height="120" :files="[superCargo.integrityExaminePic2]" :isPreview="true"/>
						</div>
					</el-row>
				</div>
			</el-row>
			<el-row :gutter="20" style="margin-bottom:20px">
				<el-col :span="12">
					<div class="section-block">
						<span class="block-title">违章和记分记录</span>
						<div class="block-content">
							<el-row style="margin-bottom: 10px">
								<div class="uploadTruckPicItem">
									<ImageUpload :width="180" :height="120" :files="[superCargo.endorsementPic1]" :isPreview="true"/>
								</div>
								<div class="uploadTruckPicItem">
									<ImageUpload :width="180" :height="120" :files="[superCargo.endorsementPic2]" :isPreview="true"/>
								</div>
							</el-row>
						</div>
					</div>
				</el-col>
				<el-col :span="12">
					<div class="section-block">
						<span class="block-title">三年无重大交通事故证明</span>
						<div class="block-content">
							<el-row style="margin-bottom: 10px">
								<div class="uploadTruckPicItem">
									<ImageUpload :width="180" :height="120" :files="[superCargo.noMajorAccidentsIn3YearsPic1]" :isPreview="true"/>
								</div>
								<div class="uploadTruckPicItem">
									<ImageUpload :width="180" :height="120" :files="[superCargo.noMajorAccidentsIn3YearsPic2]" :isPreview="true"/>
								</div>
							</el-row>
						</div>
					</div>
				</el-col>
			</el-row>
			<el-row class="section-block">
				<span class="block-title">驾驶员身体条件证明</span>
				<div class="block-content">
					<el-row style="margin-bottom: 10px">
						<div class="uploadTruckPicItem">
							<ImageUpload :width="180" :height="120" :files="[superCargo.driverHealthCertificatePic1]" :isPreview="true"/>
						</div>
						<div class="uploadTruckPicItem">
							<ImageUpload :width="180" :height="120" :files="[superCargo.driverHealthCertificatePic2]" :isPreview="true"/>
						</div>
					</el-row>
				</div>
			</el-row>
		</el-card>
		<el-card class="box-card" v-if="superCargo.supercargoType == 'Supercargo' || superCargo.supercargoType == 'SupercargoDriver'">
			<div slot="header" class="clearfix"><span>押运员信息</span></div>
			<el-row class="section-block" style="margin-bottom:20px">
				<span class="block-title">押运员从业资格证</span>
				<div class="block-content">
					<el-row style="margin-bottom: 10px">
						<el-col :span="12">
							<div>
								<span class="tit">证号</span>
								<span class="ctt">{{superCargo.escortLicenseNum}}</span>
							</div>
							<div>
								<span class="tit">从业资格类别</span>
								<span class="ctt">{{superCargo.escortLicenseType}}</span>
							</div>
							<div>
								<span class="tit">初次领证日期</span>
								<span class="ctt" v-if="superCargo.escortLicenseFirstTime">{{superCargo.escortLicenseFirstTime | getdatefromtimestamp(true)}}</span>
							</div>
						</el-col>
						<el-col :span="12">
							<div>
								<span class="tit">编号</span>
								<span class="ctt">{{superCargo.escortLicenseCode}}</span>
							</div>
							<div>
								<span class="tit">准驾车型</span>
								<span class="ctt">{{superCargo.escortLicenseQuasiDrivingType}}</span>
							</div>
							<div>
								<span class="tit">有效期</span>
								<span class="ctt" v-if="superCargo.escortLicenseBeginDate">{{superCargo.escortLicenseBeginDate | getdatefromtimestamp(true)}}至{{superCargo.escortLicenseExpireDate | getdatefromtimestamp(true)}}</span>
							</div>
						</el-col>
					</el-row>
					<el-row style="margin-bottom: 10px">
						<div class="uploadTruckPicItem">
							<ImageUpload :width="180" :height="120" :files="[superCargo.escortLicensePic1]" :isPreview="true"/>
						</div>
						<div class="uploadTruckPicItem">
							<ImageUpload :width="180" :height="120" :files="[superCargo.escortLicensePic2]" :isPreview="true"/>
						</div>
					</el-row>
				</div>
			</el-row>
		</el-card>
		<el-card class="box-card">
			<el-row class="section-block">
				<span class="block-title">其他</span>
				<div class="block-content">
					<el-row style="margin-bottom: 10px">
						<div class="uploadTruckPicItem">
							<ImageUpload :width="180" :height="120" :files="otherPic" :limitNum="4" :isPreview="true"/>
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
import SuperCargo from '../../../api/SuperCargo'
export default {
	data() {
		return {
			otherPic: [],
			superCargo: {}
		}
	},
	components: { ImageUpload },
	created() {
		this.getInfo()
	},
	methods: {
		print() {
			let superCargoElem = this.$refs.superCargo
			const btnsElem = this.$refs.btns
			const winElem = window.document.body.innerHTML
			superCargoElem.removeChild(btnsElem)
			window.document.body.innerHTML = superCargoElem.innerHTML
			// document.execCommand('print')
			window.print()
			window.document.body.innerHTML = winElem
			window.location.reload()
		},
		getInfo() {
			const comSupercargoID = this.$route.query.comSupercargoID
			SuperCargo.findById({ comSupercargoID }).then(res => {
				this.superCargo = res
				this.otherPic = res.otherPic1.split(',')
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
		width 100px
		text-align right
		margin-right 10px
		color #333
		font-weight bold
	.ctt
		display inline-block
		text-align left
		color #666
</style>