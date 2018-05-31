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
							<el-input v-model="person.realName" disabled></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="性别" prop="sex">
							<el-select style="width: 100%" v-model="person.sex" placeholder="请选择" disabled>
								<el-option label="男" value="M"></el-option>
								<el-option label="女" value="F"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="手机号" prop="mobile">
							<el-input v-model="person.mobile"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="8">
						<el-form-item label="合作关系">
							<el-select style="width: 100%" v-model="person.integrityExamineGrade" placeholder="请选择">
								<el-option label="单位挂靠" value="单位挂靠"></el-option>
								<el-option label="个人挂靠" value="个人挂靠"></el-option>
								<el-option label="自有车辆" value="自有车辆"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="合同有效期">
							<el-date-picker type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" style="width:100%">
							</el-date-picker>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="8">
						<el-form-item label="身份证号" prop="idCardNum">
							<el-input v-model="person.idCardNum" disabled></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="身份证有效期">
							<el-date-picker type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" style="width:100%">
							</el-date-picker>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="24">
						<el-form-item label="家庭地址" prop="homeAddress">
							<el-input v-model="person.homeAddress"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="24">
						<el-form-item label="备注说明">
							<el-input type="textarea" v-model="person.remark"></el-input>
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
							<el-input v-model="person.driverLicenseCode"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="准驾车型">
							<el-select style="width: 100%" v-model="person.quasiDrivingType" placeholder="请选择">
								<el-option label="A1" value="A1"></el-option>
								<el-option label="A2" value="A2"></el-option>
								<el-option label="A3" value="A3"></el-option>
								<el-option label="B1" value="B1"></el-option>
								<el-option label="B2" value="B2"></el-option>
								<el-option label="C1" value="C1"></el-option>
								<el-option label="C2" value="C2"></el-option>
								<el-option label="C3" value="C3"></el-option>
								<el-option label="C4" value="C4"></el-option>
								<el-option label="C5" value="C5"></el-option>
								<el-option label="D" value="D"></el-option>
								<el-option label="E" value="E"></el-option>
								<el-option label="F" value="F"></el-option>
								<el-option label="M" value="M"></el-option>
								<el-option label="N" value="N"></el-option>
								<el-option label="P" value="P"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="初次领证日期">
							<el-date-picker 
								:picker-options="{disabledDate}"
								:editable="false"
								style="width: 100%" 
								v-model="person.driverLicenseFirstTime"
								type="date"
								value-format="timestamp"
								placeholder="选择日期">
							</el-date-picker>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="8">
						<el-form-item label="驾驶证有效期">
							<el-date-picker type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" style="width:100%">
							</el-date-picker>
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
							<el-input v-model="person.qualificationCode"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="从业资格证类别">
							<el-input v-model="person.qualificationType"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="从业资格证有效期">
							<el-date-picker type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" style="width:100%">
							</el-date-picker>
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
							<el-button type="primary" @click="createItem">立即保存</el-button>
							<el-button @click="back">取消</el-button>
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
			quasiDrivingType: [],
			position: [],
			otherImgs: [],
			rules: {
				createName: [
					{required: true, message: '请输入创建人', trigger: 'blur'},
					{validator: limitLength50, trigger: 'blur'},
				],
				status: [
					{ required: true, message: '请选择状态', trigger: 'change' }
				],
				auditName: [
					{required: true, message: '请输入审核人', trigger: 'blur'},
					{validator: limitLength50, trigger: 'blur'},
				],
				auditTime: [
					{required: true, message: '请输入审核时间', trigger: 'blur'}
				],
				realName: [
					{ required: true, message: '请选择姓名', trigger: 'blur' },
					{validator: limitLength50, trigger: 'blur'},
				],
				homeAddress: [
					{required: true, message: '请输入家庭地址', trigger: 'blur'},
					{validator: limitLength100, trigger: 'blur'}
				],
				mobile: [
					{required: true, validator: checkMobile, trigger: 'blur'},
				],
				sex: [
					{ required: true, message: '请选择性别', trigger: 'change' }
				],
				position: [
					{required: true, message: '请选择岗位', trigger: 'change'}
				],
				idCardNum: [
					{required: true, validator: checkIDCard, trigger: 'blur'}
				]
			}
		}
	},
	computed: {
		...mapGetters(['name', 'mobile'])
	},
	watch: {
		position: {
			handler(newVal) {
				if (newVal.includes('Operator')) {
					this.person.auditName = this.name
					this.person.mobile = this.mobile
				}
			},
			deep: true
		}
	},
	methods: {
		disabledDate(curDate) {
			return new Date() < curDate
		},
		handleAvatarSuccess(res) {
			this.person.headPic = res[0]
		},
		handleCardFrontSuccess(res) {
			this.person.idCardFrontUrl = res[0]
		},
		handleCardBackSuccess(res) {
			this.person.idCardBackUrl = res[0]
		},
		handleDriverFrontSuccess(res) {
			this.person.driverLicFrontUrl = res[0]
		},
		handleDriverBackSuccess(res) {
			this.person.driverLicBackUrl = res[0]
		},
		handleQualifCerFrontSuccess(res) {
			this.person.qualificationFirstPage = res[0]
		},
		handleQualifCerBackSuccess(res) {
			this.person.qualificationSecondPage = res[0]
		},
		imgUrlBack(files) {
			this.otherImgs = files
			for (let i = 0; i < files.length; i++) {
				this.person['otherStaffPic' + (i + 1)] = files[i]
			}
		},
		changePost(e) {
			this.person.position = e.join(',')
		},
		getInfo() {
			let params = {
				staffID: this.$route.query.staffID
			}
			request({
				url: '/staff/findById',
				params
			}).then(res => {
				let data = res.data.data
				this.person = {
					createName: data.createName,
					status: data.status,
					auditName: data.auditName,
					auditTime: data.auditTime,
					realName: data.realName,
					homeAddress: data.comStaffIdentification.homeAddress,
					mobile: data.mobile,
					sex: data.comStaffIdentification.sex,
					driverLicenseFirstTime: data.comStaffIdentification.driverLicenseFirstTime || '',
					integrityExamineGrade: data.comStaffIdentification.integrityExamineGrade,
					position: data.position,
					integrityExamineEndTime: data.comStaffIdentification.integrityExamineEndTime || '',
					idCardNum: data.comStaffIdentification.idCardNum,
					quasiDrivingType: data.comStaffIdentification.quasiDrivingType,
					laborContractBeginTime: data.comStaffIdentification.laborContractBeginTime || '',
					laborContractEndTime: data.comStaffIdentification.laborContractEndTime || '',
					driverLicExamineBeginTime: data.comStaffIdentification.driverLicExamineBeginTime || '',
					driverLicExamineEndTime: data.comStaffIdentification.driverLicExamineEndTime || '',
					driverLicenseCode: data.comStaffIdentification.driverLicenseCode,
					titleLever: data.comStaffIdentification.titleLever,
					qualificationCode: data.comStaffIdentification.qualificationCode,
					qualificationType: data.comStaffIdentification.qualificationType,
					qualificationExpirationTime: data.comStaffIdentification.qualificationExpirationTime || '',
					remark: data.remark,
					headPic: data.headPic,
					idCardFrontUrl: data.comStaffPic.idCardFrontUrl,
					idCardBackUrl: data.comStaffPic.idCardBackUrl,
					driverLicFrontUrl: data.comStaffPic.driverLicFrontUrl,
					driverLicBackUrl: data.comStaffPic.driverLicBackUrl,
					qualificationFirstPage: data.comStaffPic.qualificationFirstPage,
					qualificationSecondPage: data.comStaffPic.qualificationSecondPage,
					otherStaffPic1: data.comStaffPic.otherStaffPic1,
					otherStaffPic2: data.comStaffPic.otherStaffPic2,
					otherStaffPic3: data.comStaffPic.otherStaffPic3,
					otherStaffPic4: data.comStaffPic.otherStaffPic4,
					otherStaffPic5: data.comStaffPic.otherStaffPic5
				}
				this.position = data.position.split(',')
				let resDataComStaffPic = data.comStaffPic
				let i = 1
				while (i < 6) {
					this.otherImgs.push(resDataComStaffPic['otherStaffPic' + i])
					i++
				}
			})
		},
		updateItem() {
			let data = this.person
			data.staffID = this.$route.query.staffID
			if(!data.integrityExamineEndTime) {
				data.integrityExamineEndTime = ''
			}
			if(!data.driverLicenseFirstTime) {
				data.driverLicenseFirstTime = ''
			}
			if(!data.laborContractBeginTime) {
				data.laborContractBeginTime = ''
			}
			if(!data.laborContractEndTime) {
				data.laborContractEndTime = ''
			}
			if(!data.laborContractBeginTime) {
				data.laborContractBeginTime = ''
			}
			if(!data.laborContractEndTime) {
				data.laborContractEndTime = ''
			}
			if(!data.driverLicExamineBeginTime) {
				data.driverLicExamineBeginTime = ''
			}
			if(!data.driverLicExamineEndTime) {
				data.driverLicExamineEndTime = ''
			}
			if(!data.qualificationExpirationTime) {
				data.qualificationExpirationTime = ''
			}
			if(!data.headPic) {
				data.headPic = ''
			}
			if(!data.idCardFrontUrl) {
				data.idCardFrontUrl = ''
			}
			if(!data.idCardBackUrl) {
				data.idCardBackUrl = ''
			}
			if(!data.driverLicFrontUrl) {
				data.driverLicFrontUrl = ''
			}
			if(!data.driverLicBackUrl) {
				data.driverLicBackUrl = ''
			}
			if(!data.qualificationFirstPage) {
				data.qualificationFirstPage = ''
			}
			if(!data.qualificationSecondPage) {
				data.qualificationSecondPage = ''
			}
			for (let i = 1; i < 6; i++) {
				if(!data['otherStaffPic' + i]) {
					data['otherStaffPic' + i] = ''
				}
			}
			this.$refs['ruleForm'].validate(valid => {
				if (valid) {
					request({
						url: '/staff/update',
						method: 'post',
						data
					}).then(res => {
						console.log(res.data)
						Message.success(res.data.msg)
						this.$router.push({name: 'person'})
					})
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
.divided
	padding 10px 15px 5px
	margin-top 0
	color #C0C4CC
	border-bottom 1px solid #f2f2f2
	font-size 16px
	.svg-icon
		margin-right 5px
		color #909399
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
</style>