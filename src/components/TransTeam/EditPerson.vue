<template>
	<div class="main-content">
		<div class="wf-card">
			<div class="header clearfix">编辑人员</div>
			<el-form label-width="155px" size="mini">
				<el-row>
					<el-col :span="6">
						<el-form-item label="创建人">
							<el-input v-model="person.createName"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="状态">
							<el-select style="width: 100%" v-model="person.status" placeholder="请选择">
								<el-option label="通过" value="pass"></el-option>
								<el-option label="未通过" value="unpass"></el-option>
								<el-option label="其他" value="other"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="审核人">
							<el-input v-model="person.auditName"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="审核日期">
							<el-date-picker
								style="width: 100%" 
								v-model="person.auditTime"
								type="date" 
								value-format="timestamp"
								placeholder="选择日期">
							</el-date-picker>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="6">
						<el-form-item label="姓名">
							<el-input v-model="person.realName"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="家庭地址">
							<el-input v-model="person.comStaffIdentification.homeAddress"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="联系电话">
							<el-input v-model="person.mobile"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="性别">
							<el-select style="width: 100%" v-model="person.comStaffIdentification.sex" placeholder="请选择">
								<el-option label="男" value="M"></el-option>
								<el-option label="女" value="F"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="6">
						<el-form-item label="初次发证时间">
							<el-date-picker
								style="width: 100%" 
								v-model="person.comStaffIdentification.driverLicenseFirstTime"
								type="date" 
								value-format="timestamp"
								placeholder="选择日期">
							</el-date-picker>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="诚信考核等级">
							<el-select style="width: 100%" v-model="person.comStaffIdentification.integrityExamineGrade" placeholder="请选择">
								<el-option label="A" value="A"></el-option>
								<el-option label="AA" value="AA"></el-option>
								<el-option label="AAA" value="AAA"></el-option>
								<el-option label="AAAA" value="AAAA"></el-option>
								<el-option label="AAAAA" value="AAAAA"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="聘用岗位">
							<el-select style="width: 100%" multiple v-model="position" placeholder="请选择">
								<el-option label="操作员" value="Operator"></el-option>
								<el-option label="驾驶员" value="Driver"></el-option>
								<el-option label="押运员" value="Supercargo"></el-option>
								<el-option label="专职安全员" value="SafetyOfficer"></el-option>
								<el-option label="装卸管理人员" value="Stevedore"></el-option>
								<el-option label="其他人员" value="Other"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="诚信考核有效期至">
							<el-date-picker
								style="width: 100%" 
								v-model="person.comStaffIdentification.integrityExamineEndTime"
								type="date" 
								value-format="timestamp"
								placeholder="选择日期">
							</el-date-picker>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="6">
						<el-form-item label="身份证号">
							<el-input v-model="person.comStaffIdentification.idCardNum"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="准驾车型">
							<el-select style="width: 100%" multiple v-model="quasiDrivingType" placeholder="请选择">
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
					<el-col :span="6">
						<el-form-item label="合同有效期起">
							<el-date-picker
								style="width: 100%" 
								v-model="person.comStaffIdentification.laborContractBeginTime"
								type="date" 
								value-format="timestamp"
								placeholder="选择日期">
							</el-date-picker>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="合同有效期至">
							<el-date-picker
								style="width: 100%" 
								v-model="person.comStaffIdentification.laborContractEndTime"
								type="date" 
								value-format="timestamp"
								placeholder="选择日期">
							</el-date-picker>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="6">
						<el-form-item label="驾驶证审验有效期起">
							<el-date-picker
								style="width: 100%" 
								v-model="person.comStaffIdentification.driverLicExamineBeginTime"
								type="date" 
								value-format="timestamp"
								placeholder="选择日期">
							</el-date-picker>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="驾驶证审验有效期至">
							<el-date-picker
								style="width: 100%" 
								v-model="person.comStaffIdentification.driverLicExamineEndTime"
								type="date" 
								value-format="timestamp"
								placeholder="选择日期">
							</el-date-picker>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="驾驶证档案编号">
							<el-input v-model="person.comStaffIdentification.driverLicenseCode"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="职称或技术等级">
							<el-input v-model="person.comStaffIdentification.titleLever"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="6">
						<el-form-item label="从业资格证件号">
							<el-input v-model="person.comStaffIdentification.qualificationCode"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="从业资格类别">
							<el-input v-model="person.comStaffIdentification.qualificationType"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="从业资格证有效期至">
							<el-date-picker
								style="width: 100%" 
								v-model="person.comStaffIdentification.qualificationExpirationTime"
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
							<ImageUpload :files="[person.comStaffPic.idCardFrontUrl]" @imgUrlBack="handleCardFrontSuccess"/>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="身份证反面">
							<ImageUpload :files="[person.comStaffPic.idCardBackUrl]" @imgUrlBack="handleCardBackSuccess"/>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="6">
						<el-form-item label="驾驶证正面">
							<ImageUpload :files="[person.comStaffPic.driverLicFrontUrl]" @imgUrlBack="handleDriverFrontSuccess"/>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="驾驶证反面">
							<ImageUpload :files="[person.comStaffPic.driverLicBackUrl]" @imgUrlBack="handleDriverBackSuccess"/>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="从业资格证正">
							<ImageUpload :files="[person.comStaffPic.qualificationFirstPage]" @imgUrlBack="handleQualifCerFrontSuccess"/>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="从业资格证副">
							<ImageUpload :files="[person.comStaffPic.qualificationSecondPage]" @imgUrlBack="handleQualifCerBackSuccess"/>
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
import { regionData } from 'element-china-area-data'
import request from '../../common/request'
import ImageUpload from '../CommonComponents/ImageUpload'
export default {
	data() {
		return {
			distData: regionData,
			person: {
				comStaffIdentification: {
					homeAddress: ''
				},
				comStaffPic: {}
			},
			position: [],
			quasiDrivingType: [],
			otherImgs: []
		}
	},
	created() {
		this.getInfo()
	},
	methods: {
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
		getInfo() {
			let params = {
				staffID: this.$route.query.staffID
			}
			request({
				url: '/staff/findById',
				params
			}).then(res => {
				console.log(res)
				this.person = res.data.data
				this.position = res.data.data.position.split(',')
				this.quasiDrivingType = res.data.data.comStaffIdentification.quasiDrivingType.split(',')
				let resDataComStaffPic = res.data.data.comStaffPic
				let i = 1
				while (i < 6) {
					this.otherImgs.push(resDataComStaffPic['otherStaffPic' + i])
					i++
				}
			})
		},
		updateItem() {
			let data = {
				createName: this.person.createName,
				status: this.person.status,
				auditName: this.person.auditName,
				auditTime: this.person.auditTime,
				realName: this.person.realName,
				homeAddress: this.person.comStaffIdentification.homeAddress,
				mobile: this.person.mobile,
				sex: this.person.comStaffIdentification.sex,
				driverLicenseFirstTime: this.person.comStaffIdentification.driverLicenseFirstTime,
				integrityExamineGrade: this.person.comStaffIdentification.integrityExamineGrade,
				position: this.person.position,
				integrityExamineEndTime: this.person.comStaffIdentification.integrityExamineEndTime,
				idCardNum: this.person.comStaffIdentification.idCardNum,
				quasiDrivingType: this.person.comStaffIdentification.quasiDrivingType,
				laborContractBeginTime: this.person.comStaffIdentification.laborContractBeginTime,
				laborContractEndTime: this.person.comStaffIdentification.laborContractEndTime,
				driverLicExamineBeginTime: this.person.comStaffIdentification.driverLicExamineBeginTime,
				driverLicExamineEndTime: this.person.comStaffIdentification.driverLicExamineEndTime,
				driverLicenseCode: this.person.comStaffIdentification.driverLicenseCode,
				titleLever: this.person.comStaffIdentification.titleLever,
				qualificationCode: this.person.comStaffIdentification.qualificationCode,
				qualificationType: this.person.comStaffIdentification.qualificationType,
				qualificationExpirationTime: this.person.comStaffIdentification.qualificationExpirationTime,
				remark: this.person.remark,
				headPic: this.person.headPic,
				idCardFrontUrl: this.person.comStaffPic.idCardFrontUrl,
				idCardBackUrl: this.person.comStaffPic.idCardBackUrl,
				driverLicFrontUrl: this.person.comStaffPic.driverLicFrontUrl,
				driverLicBackUrl: this.person.comStaffPic.driverLicBackUrl,
				qualificationFirstPage: this.person.comStaffPic.qualificationFirstPage,
				qualificationSecondPage: this.person.comStaffPic.qualificationSecondPage,
				otherStaffPic1: this.person.comStaffPic.otherStaffPic1,
				otherStaffPic2: this.person.comStaffPic.otherStaffPic2,
				otherStaffPic3: this.person.comStaffPic.otherStaffPic3,
				otherStaffPic4: this.person.comStaffPic.otherStaffPic4,
				otherStaffPic5: this.person.comStaffPic.otherStaffPic5
			}
			data.staffID = this.$route.query.staffID
			data.position = this.position.join(',')
			data.quasiDrivingType = this.quasiDrivingType.join(',')
			console.log(data)
			request({
				url: '/staff/update',
				method: 'post',
				data
			}).then(res => {
				console.log(res.data)
				Message.success(res.data.msg)
				this.$router.push({name: 'person'})
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