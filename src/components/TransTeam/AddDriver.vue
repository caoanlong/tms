<template>
	<div class="main-content">
		<div class="wf-card">
			<el-form label-width="155px" size="small" :model="driver" :rules="rules" ref="ruleForm">
				<el-row>
					<el-col :span="24">
						<p class="divided"><svg-icon icon-class="list-tag"></svg-icon>基本信息</p>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="8">
						<el-form-item label="姓名" prop="realName">
							<el-input v-model="driver.realName"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="性别" prop="sex">
							<el-select style="width: 100%" v-model="driver.sex" placeholder="请选择">
								<el-option label="男" value="M"></el-option>
								<el-option label="女" value="F"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="手机号" prop="mobile">
							<el-input v-model="driver.mobile"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="8">
						<el-form-item label="合作关系" prop="cooperateRelation">
							<el-select style="width: 100%" v-model="driver.cooperateRelation" placeholder="请选择">
								<el-option label="挂靠" value="Attach"></el-option>
								<el-option label="自有车辆" value="Self"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="16">
						<el-form-item label="合同有效期" prop="laborContractBeginTime">
							<el-date-picker 
								v-model="laborContractDate"
								type="daterange" 
								range-separator="至" 
								start-placeholder="开始日期" 
								end-placeholder="结束日期" 
								style="width:100%"
								@change="handSelectLaborContractDate">
							</el-date-picker>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="8">
						<el-form-item label="身份证号" prop="idCardNum">
							<el-input v-model="driver.idCardNum"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="16">
						<el-form-item label="身份证有效期">
							<el-date-picker 
								v-model="idCardDate"
								type="daterange" 
								range-separator="至" 
								start-placeholder="开始日期" 
								end-placeholder="结束日期" 
								style="width:100%"
								@change="handSelectIdCardDate">
							</el-date-picker>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="24">
						<el-form-item label="家庭地址" prop="homeAddress">
							<el-input v-model="driver.homeAddress"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="24">
						<el-form-item label="备注说明">
							<el-input type="textarea" v-model="driver.remark"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="8">
						<el-form-item label="头像">
							<ImageUpload :files="[driver.headPic]" :fixed="true" :fixedNumber="[1,1]" @imgUrlBack="handleAvatarSuccess"/>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="身份证正面">
							<ImageUpload :files="[driver.idCardFrontUrl]" @imgUrlBack="handleCardFrontSuccess"/>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="身份证反面">
							<ImageUpload :files="[driver.idCardBackUrl]" @imgUrlBack="handleCardBackSuccess"/>
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
							<el-input v-model="driver.driverLicenseCode"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="准驾车型" prop="quasiDrivingType">
							<el-select style="width: 100%" v-model="driver.quasiDrivingType" placeholder="请选择">
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
								v-model="driver.driverLicenseFirstTime"
								type="date"
								value-format="timestamp"
								placeholder="选择日期">
							</el-date-picker>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="16">
						<el-form-item label="驾驶证有效期">
							<el-date-picker 
								v-model="driverLicenseDate"
								type="daterange" 
								range-separator="至" 
								start-placeholder="开始日期" 
								end-placeholder="结束日期" 
								style="width:100%" 
								@change="handSelectDriverLicenseDate">
							</el-date-picker>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="8">
						<el-form-item label="驾驶证正面">
							<ImageUpload :files="[driver.driverLicFrontUrl]" @imgUrlBack="handleDriverFrontSuccess"/>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="驾驶证反面">
							<ImageUpload :files="[driver.driverLicBackUrl]" @imgUrlBack="handleDriverBackSuccess"/>
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
							<el-input v-model="driver.qualificationCode"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="从业资格证类别">
							<el-input v-model="driver.qualificationType"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="16">
						<el-form-item label="从业资格证有效期">
							<el-date-picker 
								v-model="qualificationDate"
								type="daterange" 
								range-separator="至" 
								start-placeholder="开始日期" 
								end-placeholder="结束日期" 
								style="width:100%" 
								@change="handSelectQualificationDate">
							</el-date-picker>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="8">
						<el-form-item label="从业资格证正">
							<ImageUpload :files="[driver.qualificationFirstPage]" @imgUrlBack="handleQualifCerFrontSuccess"/>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="从业资格证副">
							<ImageUpload :files="[driver.qualificationSecondPage]" @imgUrlBack="handleQualifCerBackSuccess"/>
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
import Driver from '../../api/Driver'
import ImageUpload from '../CommonComponents/ImageUpload'
import { checkMobile, checkIDCard } from '../../common/validators'
export default {
	data() {
		return {
			driver: {
				realName: '',
				sex: '',
				mobile: '',
				cooperateRelation: '',
				laborContractBeginTime: '',
				laborContractEndTime: '',
				idCardNum: '',
				idCardBeginTime: '',
				idCardExpirationTime: '',
				homeAddress: '',
				remark: '',
				headPic: '',
				idCardFrontUrl: '',
				idCardBackUrl: '',
				driverLicenseCode: '',
				quasiDrivingType: '',
				driverLicenseFirstTime: '',
				driverLicenseBeginTime: '',
				driverLicenseEndTime: '',
				driverLicFrontUrl: '',
				driverLicBackUrl: '',
				qualificationCode: '',
				qualificationType: '',
				qualificationBeginTime: '',
				qualificationExpirationTime: '',
				qualificationFirstPage: '',
				qualificationSecondPage: '',
			},
			laborContractDate: [],
			idCardDate: [],
			driverLicenseDate: [],
			qualificationDate: [],
			rules: {
				realName: [
					{required: true, message: '请输入姓名'},
					{min: 2, max: 10, message: '长度在 2 到 10 个字符'}
				],
				sex: [
					{ required: true, message: '请选择性别'}
				],
				mobile: [
					{required: true, message: '请输入手机号'},
					{validator: checkMobile},
				],
				laborContractBeginTime: [
					{required: true, message: '请选择合作关系'}
				],
				laborContractDate: [
					{ required: true, message: '请选择合同有效期' },
				],
				idCardNum: [
					{required: true, message: '请输入身份证号'},
					{validator: checkIDCard}
				],
				homeAddress: [
					{required: true, message: '请输入住址'},
				],
				quasiDrivingType: [
					{ required: true, message: '请选择准驾车型'}
				]
			}
		}
	},
	methods: {
		handSelectLaborContractDate(date) {
			this.driver.laborContractBeginTime = date[0].getTime()
			this.driver.laborContractEndTime = date[1].getTime()
		},
		handSelectIdCardDate(date) {
			this.driver.idCardBeginTime = date[0].getTime()
			this.driver.idCardExpirationTime = date[1].getTime()
		},
		handSelectDriverLicenseDate(date) {
			this.driver.driverLicenseBeginTime = date[0].getTime()
			this.driver.driverLicenseEndTime = date[1].getTime()
		},
		handSelectQualificationDate(date) {
			this.driver.qualificationBeginTime = date[0].getTime()
			this.driver.qualificationExpirationTime = date[1].getTime()
		},
		disabledDate(curDate) {
			return new Date() < curDate
		},
		handleAvatarSuccess(res) {
			this.driver.headPic = res[0]
		},
		handleCardFrontSuccess(res) {
			this.driver.idCardFrontUrl = res[0]
		},
		handleCardBackSuccess(res) {
			this.driver.idCardBackUrl = res[0]
		},
		handleDriverFrontSuccess(res) {
			this.driver.driverLicFrontUrl = res[0]
		},
		handleDriverBackSuccess(res) {
			this.driver.driverLicBackUrl = res[0]
		},
		handleQualifCerFrontSuccess(res) {
			this.driver.qualificationFirstPage = res[0]
		},
		handleQualifCerBackSuccess(res) {
			this.driver.qualificationSecondPage = res[0]
		},
		createItem() {
			let data = this.driver
			!data.laborContractBeginTime && (data.laborContractBeginTime = '')
			!data.laborContractEndTime && (data.laborContractEndTime = '')
			!data.idCardBeginTime && (data.idCardBeginTime = '')
			!data.idCardExpirationTime && (data.idCardExpirationTime = '')
			!data.driverLicenseBeginTime && (data.driverLicenseBeginTime = '')
			!data.driverLicenseEndTime && (data.driverLicenseEndTime = '')
			!data.qualificationBeginTime && (data.qualificationBeginTime = '')
			!data.qualificationExpirationTime && (data.qualificationExpirationTime = '')
			!data.headPic && (data.headPic = '')
			!data.idCardFrontUrl && (data.idCardFrontUrl = '')
			!data.idCardBackUrl && (data.idCardBackUrl = '')
			!data.driverLicFrontUrl && (data.driverLicFrontUrl = '')
			!data.driverLicBackUrl && (data.driverLicBackUrl = '')
			!data.qualificationFirstPage && (data.qualificationFirstPage = '')
			!data.qualificationSecondPage && (data.qualificationSecondPage = '')
			this.$refs['ruleForm'].validate(valid => {
				if (valid) {
					Driver.add(data).then(res => {
						Message.success(res.data.msg)
						this.$router.push({name: 'driver'})
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