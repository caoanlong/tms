<template>
	<div class="main-content">
		<div class="wf-card">
			<div class="header clearfix">编辑人员</div>
			<el-form label-width="155px" size="mini" :model="person" :rules="rules" ref="ruleForm">
				<el-row>
					<el-col :span="8">
						<el-form-item label="创建人" prop="createName">
							<el-input v-model="person.createName"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="状态" prop="status">
							<el-select style="width: 100%" v-model="person.status" placeholder="请选择">
								<el-option label="通过" value="Passed"></el-option>
								<el-option label="未通过" value="NotPassed"></el-option>
								<el-option label="其他" value="Other"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="审核人" prop="auditName">
							<el-input v-model="person.auditName"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="8">
						<el-form-item label="审核日期" prop="auditTime">
							<el-date-picker 
								:picker-options="{disabledDate}"
								:editable="false"
								style="width: 100%" 
								v-model="person.auditTime"
								type="date" 
								value-format="timestamp"
								placeholder="选择日期">
							</el-date-picker>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="姓名" prop="realName">
							<el-input v-model="person.realName" disabled></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="家庭地址" prop="homeAddress">
							<el-input v-model="person.homeAddress"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="8">
						<el-form-item label="联系电话" prop="mobile">
							<el-input v-model="person.mobile"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="性别" prop="sex">
							<el-select style="width: 100%" v-model="person.sex" placeholder="请选择">
								<el-option label="男" value="M"></el-option>
								<el-option label="女" value="F"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="驾驶证初次领证日期">
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
						<el-form-item label="诚信考核等级">
							<el-select style="width: 100%" v-model="person.integrityExamineGrade" placeholder="请选择">
								<el-option label="无" value=""></el-option>
								<el-option label="A" value="A"></el-option>
								<el-option label="AA" value="AA"></el-option>
								<el-option label="AAA" value="AAA"></el-option>
								<el-option label="AAAA" value="AAAA"></el-option>
								<el-option label="AAAAA" value="AAAAA"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="聘用岗位" prop="position">
							<el-select style="width: 100%" multiple v-model="position" placeholder="请选择" @change="changePost">
								<el-option label="操作员" value="Operator"></el-option>
								<el-option label="押运员" value="Supercargo"></el-option>
								<el-option label="专职安全员" value="SafetyOfficer"></el-option>
								<el-option label="装卸管理人员" value="Stevedore"></el-option>
								<el-option label="其他人员" value="Other"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="诚信考核有效期至">
							<el-date-picker 
								:editable="false"
								style="width: 100%" 
								v-model="person.integrityExamineEndTime"
								type="date" 
								value-format="timestamp"
								placeholder="选择日期">
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
						<el-form-item label="合同有效期起">
							<el-date-picker 
								:picker-options="{disabledDate}"
								:editable="false"
								style="width: 100%" 
								v-model="person.laborContractBeginTime"
								type="date" 
								value-format="timestamp"
								placeholder="选择日期">
							</el-date-picker>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="8">
						<el-form-item label="合同有效期至">
							<el-date-picker 
								:editable="false"
								style="width: 100%" 
								v-model="person.laborContractEndTime"
								type="date" 
								value-format="timestamp"
								placeholder="选择日期">
							</el-date-picker>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="驾驶证审验有效期起">
							<el-date-picker 
								:picker-options="{disabledDate}"
								:editable="false"
								style="width: 100%" 
								v-model="person.driverLicExamineBeginTime"
								type="date" 
								value-format="timestamp"
								placeholder="选择日期">
							</el-date-picker>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="驾驶证审验有效期至">
							<el-date-picker 
								:editable="false"
								style="width: 100%" 
								v-model="person.driverLicExamineEndTime"
								type="date" 
								value-format="timestamp"
								placeholder="选择日期">
							</el-date-picker>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="8">
						<el-form-item label="驾驶证档案编号">
							<el-input v-model="person.driverLicenseCode"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="职称或技术等级">
							<el-input v-model="person.titleLever"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="从业资格证件号">
							<el-input v-model="person.qualificationCode"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="8">
						<el-form-item label="从业资格类别">
							<el-input v-model="person.qualificationType"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="从业资格证有效期至">
							<el-date-picker 
								:editable="false"
								style="width: 100%" 
								v-model="person.qualificationExpirationTime"
								type="date" 
								value-format="timestamp"
								placeholder="选择日期">
							</el-date-picker>
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
					<el-col :span="6">
						<el-form-item label="头像">
							<ImageUpload :files="[person.headPic]" :fixed="true" :fixedNumber="[1,1]" @imgUrlBack="handleAvatarSuccess"/>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="身份证正面">
							<ImageUpload :files="[person.idCardFrontUrl]" @imgUrlBack="handleCardFrontSuccess"/>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="身份证反面">
							<ImageUpload :files="[person.idCardBackUrl]" @imgUrlBack="handleCardBackSuccess"/>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="6">
						<el-form-item label="驾驶证正面">
							<ImageUpload :files="[person.driverLicFrontUrl]" @imgUrlBack="handleDriverFrontSuccess"/>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="驾驶证反面">
							<ImageUpload :files="[person.driverLicBackUrl]" @imgUrlBack="handleDriverBackSuccess"/>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="从业资格证正">
							<ImageUpload :files="[person.qualificationFirstPage]" @imgUrlBack="handleQualifCerFrontSuccess"/>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="从业资格证副">
							<ImageUpload :files="[person.qualificationSecondPage]" @imgUrlBack="handleQualifCerBackSuccess"/>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="24">
						<el-form-item label="其他照片">
							<ImageUpload :files="otherImgs" :limitNum="5" @imgUrlBack="imgUrlBack"/>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="24">
						<el-form-item>
							<el-button type="primary" @click="updateItem">立即保存</el-button>
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
import Staff from '../../api/Staff'
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
	created() {
		this.getInfo()
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
			let staffID = this.$route.query.staffID
			Staff.findById({ staffID }).then(res => {
				this.person = {
					createName: res.createName,
					status: res.status,
					auditName: res.auditName,
					auditTime: res.auditTime,
					realName: res.realName,
					homeAddress: res.comStaffIdentification.homeAddress,
					mobile: res.mobile,
					sex: res.comStaffIdentification.sex,
					driverLicenseFirstTime: res.comStaffIdentification.driverLicenseFirstTime || '',
					integrityExamineGrade: res.comStaffIdentification.integrityExamineGrade,
					position: res.position,
					integrityExamineEndTime: res.comStaffIdentification.integrityExamineEndTime || '',
					idCardNum: res.comStaffIdentification.idCardNum,
					quasiDrivingType: res.comStaffIdentification.quasiDrivingType,
					laborContractBeginTime: res.comStaffIdentification.laborContractBeginTime || '',
					laborContractEndTime: res.comStaffIdentification.laborContractEndTime || '',
					driverLicExamineBeginTime: res.comStaffIdentification.driverLicExamineBeginTime || '',
					driverLicExamineEndTime: res.comStaffIdentification.driverLicExamineEndTime || '',
					driverLicenseCode: res.comStaffIdentification.driverLicenseCode,
					titleLever: res.comStaffIdentification.titleLever,
					qualificationCode: res.comStaffIdentification.qualificationCode,
					qualificationType: res.comStaffIdentification.qualificationType,
					qualificationExpirationTime: res.comStaffIdentification.qualificationExpirationTime || '',
					remark: res.remark,
					headPic: res.headPic,
					idCardFrontUrl: res.comStaffPic.idCardFrontUrl,
					idCardBackUrl: res.comStaffPic.idCardBackUrl,
					driverLicFrontUrl: res.comStaffPic.driverLicFrontUrl,
					driverLicBackUrl: res.comStaffPic.driverLicBackUrl,
					qualificationFirstPage: res.comStaffPic.qualificationFirstPage,
					qualificationSecondPage: res.comStaffPic.qualificationSecondPage,
					otherStaffPic1: res.comStaffPic.otherStaffPic1,
					otherStaffPic2: res.comStaffPic.otherStaffPic2,
					otherStaffPic3: res.comStaffPic.otherStaffPic3,
					otherStaffPic4: res.comStaffPic.otherStaffPic4,
					otherStaffPic5: res.comStaffPic.otherStaffPic5
				}
				this.position = res.position.split(',')
				let resDataComStaffPic = res.comStaffPic
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
			if(!data.integrityExamineEndTime) data.integrityExamineEndTime = ''
			if(!data.driverLicenseFirstTime) data.driverLicenseFirstTime = ''
			if(!data.laborContractBeginTime) data.laborContractBeginTime = ''
			if(!data.laborContractEndTime) data.laborContractEndTime = ''
			if(!data.laborContractBeginTime) data.laborContractBeginTime = ''
			if(!data.laborContractEndTime) data.laborContractEndTime = ''
			if(!data.driverLicExamineBeginTime) data.driverLicExamineBeginTime = ''
			if(!data.driverLicExamineEndTime) data.driverLicExamineEndTime = ''
			if(!data.qualificationExpirationTime) data.qualificationExpirationTime = ''
			if(!data.headPic) data.headPic = ''
			if(!data.idCardFrontUrl) data.idCardFrontUrl = ''
			if(!data.idCardBackUrl) data.idCardBackUrl = ''
			if(!data.driverLicFrontUrl) data.driverLicFrontUrl = ''
			if(!data.driverLicBackUrl) data.driverLicBackUrl = ''
			if(!data.qualificationFirstPage) data.qualificationFirstPage = ''
			if(!data.qualificationSecondPage) data.qualificationSecondPage = ''
			for (let i = 1; i < 6; i++) {
				if(!data['otherStaffPic' + i]) data['otherStaffPic' + i] = ''
			}
			this.$refs['ruleForm'].validate(valid => {
				if (valid) {
					delete data.realName
					delete data.idCardNum
					Staff.update(data).then(res => {
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