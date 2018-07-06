<template>
	<div class="main-content">
		<div class="wf-card">
			<el-form label-width="155px" size="small">
				<el-row>
					<el-col :span="24">
						<p class="divided"><svg-icon icon-class="list-tag"></svg-icon>基本信息</p>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="8">
						<el-form-item label="姓名">
							<p>{{driver.realName}}</p>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="性别">
							<p>{{driver.sex == 'M' ? '男' : '女'}}</p>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="手机号">
							<p>{{driver.mobile}}</p>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="8">
						<el-form-item label="合作关系">
							<p>{{driver.cooperateRelation == 'Attach' ? '挂靠' : '自有车辆'}}</p>
						</el-form-item>
					</el-col>
					<el-col :span="16">
						<el-form-item label="合同有效期">
							<p v-if="driver.laborContractBeginTime">{{driver.laborContractBeginTime | getdatefromtimestamp(true)}} 
								- {{driver.laborContractEndTime | getdatefromtimestamp(true)}}</p>
							<p v-else></p>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="8">
						<el-form-item label="身份证号">
							<p>{{driver.idCardNum}}</p>
						</el-form-item>
					</el-col>
					<el-col :span="16">
						<el-form-item label="身份证有效期">
							<p v-if="driver.idCardBeginTime">{{driver.idCardBeginTime | getdatefromtimestamp(true)}} 
								- {{driver.idCardExpirationTime | getdatefromtimestamp(true)}}</p>
							<p v-else></p>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="24">
						<el-form-item label="家庭地址">
							<p>{{driver.homeAddress}}</p>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="24">
						<el-form-item label="备注说明">
							<p>{{driver.remark}}</p>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="8">
						<el-form-item label="头像">
							<ImageUpload :files="[driver.headPic]" :isPreview="true"/>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="身份证正面">
							<ImageUpload :files="[driver.idCardFrontUrl]" :isPreview="true"/>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="身份证反面">
							<ImageUpload :files="[driver.idCardBackUrl]" :isPreview="true"/>
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
							<p>{{driver.driverLicenseCode}}</p>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="准驾车型">
							<p>{{driver.quasiDrivingType}}</p>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="初次领证日期">
							<p v-if="driver.driverLicenseFirstTime">{{driver.driverLicenseFirstTime | getdatefromtimestamp(true)}}</p>
							<p v-else></p>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="8">
						<el-form-item label="驾驶证有效期">
							<p v-if="driver.driverLicenseBeginTime">{{driver.driverLicenseBeginTime | getdatefromtimestamp(true)}} 
								- {{driver.driverLicenseEndTime | getdatefromtimestamp(true)}}</p>
							<p v-else></p>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="8">
						<el-form-item label="驾驶证正面">
							<ImageUpload :files="[driver.driverLicFrontUrl]" :isPreview="true"/>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="驾驶证反面">
							<ImageUpload :files="[driver.driverLicBackUrl]" :isPreview="true"/>
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
							<p>{{driver.qualificationCode}}</p>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="从业资格证类别">
							<p>{{driver.qualificationType}}</p>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="从业资格证有效期">
							<p v-if="driver.qualificationBeginTime">{{driver.qualificationBeginTime | getdatefromtimestamp(true)}} 
								- {{driver.qualificationExpirationTime | getdatefromtimestamp(true)}}</p>
							<p v-else></p>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="8">
						<el-form-item label="从业资格证正">
							<ImageUpload :files="[driver.qualificationFirstPage]" :isPreview="true"/>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="从业资格证副">
							<ImageUpload :files="[driver.qualificationSecondPage]" :isPreview="true"/>
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
import Driver from '../../../api/Driver'
import ImageUpload from '../../CommonComponents/ImageUpload'
export default {
	data() {
		return {
			driver: {}
		}
	},
	created() {
		this.getInfo()
	},
	methods:{
		getInfo() {
			let comDriverID = this.$route.query.comDriverID
			Driver.findById({ comDriverID }).then(res => {
				this.driver = res
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
	font-size 16x
	.svg-icon
		margin-right 5px
		color #909399
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