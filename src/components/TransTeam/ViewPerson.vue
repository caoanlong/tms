<template>
	<div class="main-content">
		<div class="wf-card">
			<div class="header clearfix">查看人员</div>
			<el-form label-width="155px">
				<el-row>
					<el-col :span="8">
						<el-form-item label="创建人">
							<p>{{person.createName}}</p>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="状态">
							<p v-if="person.status == 'Passed'">通过</p>
							<p v-else-if="person.status == 'NotPassed'">不通过</p>
							<p v-else-if="person.status == 'Other'">其他</p>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="审核人">
							<p>{{person.auditName}}</p>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="8">
						<el-form-item label="审核日期">
							<p v-if="person.auditTime">{{person.auditTime | getdatefromtimestamp(true)}}</p>
							<p v-else></p>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="姓名">
							<p>{{person.realName}}</p>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="家庭地址">
							<el-tooltip class="item" effect="dark" :content="person.comStaffIdentification.homeAddress" placement="top">
								<p>{{person.comStaffIdentification.homeAddress}}</p>
							</el-tooltip>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="8">
						<el-form-item label="联系电话">
							<p>{{person.mobile}}</p>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="性别">
							<p>{{person.comStaffIdentification.sex == 'M' ? '男' : '女'}}</p>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="驾驶证初次领证日期">
							<p v-if="person.comStaffIdentification.driverLicenseFirstTime">{{person.comStaffIdentification.driverLicenseFirstTime | getdatefromtimestamp(true)}}</p>
							<p v-else></p>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="8">
						<el-form-item label="诚信考核等级">
							<p>{{person.comStaffIdentification.integrityExamineGrade}}</p>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="聘用岗位">
							<p>
								<span v-for="item in (person.position ? person.position.split(',') : 0)" :key="item">{{postMap[item]}},</span>
							</p>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="诚信考核有效期至">
							<p v-if="person.comStaffIdentification.integrityExamineEndTime">{{person.comStaffIdentification.integrityExamineEndTime  | getdatefromtimestamp(true)}}</p>
							<p v-else></p>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="8">
						<el-form-item label="身份证号">
							<p>{{person.comStaffIdentification.idCardNum}}</p>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="准驾车型">
							<p>{{person.comStaffIdentification.quasiDrivingType}}</p>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="合同有效期起">
							<p v-if="person.comStaffIdentification.laborContractBeginTime">{{person.comStaffIdentification.laborContractBeginTime  | getdatefromtimestamp(true)}}</p>
							<p v-else></p>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="8">
						<el-form-item label="合同有效期至">
							<p v-if="person.comStaffIdentification.laborContractEndTime">{{person.comStaffIdentification.laborContractEndTime  | getdatefromtimestamp(true)}}</p>
							<p v-else></p>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="驾驶证审验有效期起">
							<p v-if="person.comStaffIdentification.driverLicExamineBeginTime">{{person.comStaffIdentification.driverLicExamineBeginTime  | getdatefromtimestamp(true)}}</p>
							<p v-else></p>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="驾驶证审验有效期至">
							<p v-if="person.comStaffIdentification.driverLicExamineEndTime">{{person.comStaffIdentification.driverLicExamineEndTime  | getdatefromtimestamp(true)}}</p>
							<p v-else></p>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="8">
						<el-form-item label="驾驶证档案编号">
							<p>{{person.comStaffIdentification.driverLicenseCode}}</p>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="职称或技术等级">
							<p>{{person.comStaffIdentification.titleLever}}</p>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="从业资格证件号">
							<p>{{person.comStaffIdentification.qualificationCode}}</p>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="8">
						<el-form-item label="从业资格类别">
							<p>{{person.comStaffIdentification.qualificationType}}</p>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="从业资格证有效期至">
							<p v-if="person.comStaffIdentification.qualificationExpirationTime">{{person.comStaffIdentification.qualificationExpirationTime  | getdatefromtimestamp(true)}}</p>
							<p v-else></p>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="24">
						<el-form-item label="备注说明">
							<p>{{person.remark}}</p>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="6">
						<el-form-item label="头像">
							<ImageUpload :files="[person.headPic]" :isPreview="true"/>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="身份证正面">
							<ImageUpload :files="[person.comStaffPic.idCardFrontUrl]" :isPreview="true"/>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="身份证反面">
							<ImageUpload :files="[person.comStaffPic.idCardBackUrl]" :isPreview="true"/>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="6">
						<el-form-item label="驾驶证正面">
							<ImageUpload :files="[person.comStaffPic.driverLicFrontUrl]" :isPreview="true"/>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="驾驶证反面">
							<ImageUpload :files="[person.comStaffPic.driverLicBackUrl]" :isPreview="true"/>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="从业资格证正">
							<ImageUpload :files="[person.comStaffPic.qualificationFirstPage]" :isPreview="true"/>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="从业资格证副">
							<ImageUpload :files="[person.comStaffPic.qualificationSecondPage]" :isPreview="true"/>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="24">
						<el-form-item label="其他照片">
							<ImageUpload :files="otherImgs" :limitNum="9" :isPreview="true"/>
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
import Staff from '../../api/Staff'
import ImageUpload from '../CommonComponents/ImageUpload'
export default {
	data() {
		return {
			distData: regionData,
			person: {
				comStaffIdentification: {},
				comStaffPic: {}
			},
			otherImgs: [],
			postMap: {
				"Operator": "操作员",
				"Driver": "驾驶员",
				"Supercargo": "押运员",
				"SafetyOfficer": "专职安全员",
				"Stevedore": "装卸管理人员",
				"Other": "其他人员"
			}
		}
	},
	created() {
		this.getInfo()
	},
	methods: {
		getInfo() {
			let staffID = this.$route.query.staffID
			Staff.findById({ staffID }).then(res => {
				this.person = res
				let resDataComStaffPic = res.comStaffPic
				let i = 1
				while (i < 6) {
					this.otherImgs.push(resDataComStaffPic['otherStaffPic' + i])
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
.el-form-item__content
	p
		margin 0
		border-bottom 1px solid #dcdfe6
		padding 0 15px
		min-height 32px
		font-family 'sans-serif'
		line-height 32px
		color #999
		font-size 12px
</style>