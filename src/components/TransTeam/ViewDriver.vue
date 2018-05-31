<template>
	<div class="main-content">
		<div class="wf-card">
			<el-form label-width="155px" size="small" :model="person" :rules="rules" ref="ruleForm">
				<el-row>
					<el-col :span="24">
						<p class="divided"><svg-icon icon-class="list-tag"></svg-icon>基本信息</p>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="8">
						<el-form-item label="姓名" prop="realName">
							<p>111</p>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="性别" prop="sex">
							<p>111</p>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="手机号" prop="mobile">
							<p>111</p>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="8">
						<el-form-item label="合作关系">
							<p>111</p>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="合同有效期">
							<p>111</p>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="8">
						<el-form-item label="身份证号" prop="idCardNum">
							<p>111</p>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="身份证有效期">
							<p>111</p>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="24">
						<el-form-item label="家庭地址" prop="homeAddress">
							<p>111</p>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="24">
						<el-form-item label="备注说明">
							<p>111</p>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="8">
						<el-form-item label="头像">
							<ImageUpload :files="[person.headPic]" :fixed="true" :fixedNumber="[1,1]" @imgUrlBack="handleAvatarSuccess"/>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="身份证正面">
							<ImageUpload :files="[person.idCardFrontUrl]" @imgUrlBack="handleCardFrontSuccess"/>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="身份证反面">
							<ImageUpload :files="[person.idCardBackUrl]" @imgUrlBack="handleCardBackSuccess"/>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="24">
						<p class="divided"><svg-icon icon-class="list-tag"></svg-icon>驾驶证信息</p>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="8">
						<el-form-item label="驾驶证档案编号">
							<p>111</p>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="准驾车型">
							<p>111</p>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="初次领证日期">
							<p>111</p>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="8">
						<el-form-item label="驾驶证有效期">
							<p>111</p>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="8">
						<el-form-item label="驾驶证正面">
							<ImageUpload :files="[person.driverLicFrontUrl]" @imgUrlBack="handleDriverFrontSuccess"/>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="驾驶证反面">
							<ImageUpload :files="[person.driverLicBackUrl]" @imgUrlBack="handleDriverBackSuccess"/>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="24">
						<p class="divided"><svg-icon icon-class="list-tag"></svg-icon>从业资格证</p>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="8">
						<el-form-item label="从业资格证编号">
							<p>111</p>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="从业资格证类别">
							<p>111</p>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="从业资格证有效期">
							<p>111</p>
						</el-form-item>
					</el-col>
					
				</el-row>
				
				
				<el-row>
					<el-col :span="8">
						<el-form-item label="从业资格证正">
							<ImageUpload :files="[person.qualificationFirstPage]" @imgUrlBack="handleQualifCerFrontSuccess"/>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="从业资格证副">
							<ImageUpload :files="[person.qualificationSecondPage]" @imgUrlBack="handleQualifCerBackSuccess"/>
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
import { mapGetters } from 'vuex'
import request from '../../common/request'
import ImageUpload from '../CommonComponents/ImageUpload'
import { checkMobile, checkIDCard, limitLength50, limitLength100 } from '../../common/validators'
export default {
	data() {
		return {
			person: {
				createName: '',
				status: '',
				auditName: '',
				auditTime: '',
				realName: '',
				homeAddress: '',
				mobile: '',
				sex: '',
				driverLicenseFirstTime: '',
				integrityExamineGrade: '',
				position: '',
				integrityExamineEndTime: '',
				idCardNum: '',
				quasiDrivingType: '',
				laborContractBeginTime: '',
				laborContractEndTime: '',
				driverLicExamineBeginTime: '',
				driverLicExamineEndTime: '',
				driverLicenseCode: '',
				titleLever: '',
				qualificationCode: '',
				qualificationType: '',
				qualificationExpirationTime: '',
				remark: '',
				headPic: '',
				idCardFrontUrl: '',
				idCardBackUrl: '',
				driverLicFrontUrl: '',
				driverLicBackUrl: '',
				qualificationFirstPage: '',
				qualificationSecondPage: '',
				otherStaffPic1: '',
				otherStaffPic2: '',
				otherStaffPic3: '',
				otherStaffPic4: '',
				otherStaffPic5: ''
			},
		}
	},
	methods:{
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
.divided
	padding 10px 15px 5px
	margin-top 0
	color #C0C4CC
	border-bottom 1px solid #f2f2f2
	font-size 16x
	.svg-icon
		margin-right 5px
		color #909399
.el-form-item__content
	p
		margin 0
		border 1px solid #fff
		border-bottom-color #dcdfe6
		padding 0 15px
		min-height 40px
		font-family 'sans-serif'
		line-height 40px
		color #999
		font-size 12px
</style>