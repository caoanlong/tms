<template>
	<div class="main-content">
		<div class="wf-card">
			<div class="header clearfix">编辑人员</div>
			<el-form label-width="155px" size="mini">
				<el-row>
					<el-col :span="6">
						<el-form-item label="创建人">
							<el-input v-model="person.creater"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="状态">
							<el-select style="width: 100%" v-model="person.status" placeholder="请选择">
								<el-option label="通过" value="通过"></el-option>
								<el-option label="未通过" value="未通过"></el-option>
								<el-option label="其他" value="其他"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="审核人">
							<el-input v-model="person.auditor"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="审核日期">
							<el-date-picker
								style="width: 100%" 
								v-model="person.auditorDate"
								type="date"
								placeholder="选择日期">
							</el-date-picker>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="6">
						<el-form-item label="姓名">
							<el-input v-model="person.name"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="家庭地址">
							<el-input v-model="person.familyAddress"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="联系电话">
							<el-input v-model="person.mobile"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="性别">
							<el-select style="width: 100%" v-model="person.sex" placeholder="请选择">
								<el-option label="男" value="男"></el-option>
								<el-option label="女" value="女"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="6">
						<el-form-item label="初次发证时间">
							<el-date-picker
								style="width: 100%" 
								v-model="person.initCerDate"
								type="date"
								placeholder="选择日期">
							</el-date-picker>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="诚信考核等级">
							<el-select style="width: 100%" v-model="person.integrityLevel" placeholder="请选择">
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
							<el-select style="width: 100%" multiple v-model="person.post" placeholder="请选择">
								<el-option label="操作员" value="操作员"></el-option>
								<el-option label="驾驶员" value="驾驶员"></el-option>
								<el-option label="押运员" value="押运员"></el-option>
								<el-option label="专职安全员" value="专职安全员"></el-option>
								<el-option label="装卸管理人员" value="装卸管理人员"></el-option>
								<el-option label="其他人员" value="其他人员"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="诚信考核有效期至">
							<el-date-picker
								style="width: 100%" 
								v-model="person.integrityValidTo"
								type="date"
								placeholder="选择日期">
							</el-date-picker>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="6">
						<el-form-item label="身份证号">
							<el-input v-model="person.cardId"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="准驾车型">
							<el-select style="width: 100%" multiple v-model="person.quasiDrivingModel" placeholder="请选择">
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
								v-model="person.contractValidFrom"
								type="date"
								placeholder="选择日期">
							</el-date-picker>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="合同有效期至">
							<el-date-picker
								style="width: 100%" 
								v-model="person.contractValidTo"
								type="date"
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
								v-model="person.driverLicFrom"
								type="date"
								placeholder="选择日期">
							</el-date-picker>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="驾驶证审验有效期至">
							<el-date-picker
								style="width: 100%" 
								v-model="person.driverLicTo"
								type="date"
								placeholder="选择日期">
							</el-date-picker>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="驾驶证档案编号">
							<el-input v-model="person.driverNum"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="职称或技术等级">
							<el-input v-model="person.techLevel"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="6">
						<el-form-item label="从业资格证件号">
							<el-input v-model="person.qualifCerNum"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="从业资格类别">
							<el-input v-model="person.qualifCerType"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="从业资格证有效期至">
							<el-date-picker
								style="width: 100%" 
								v-model="person.qualifCerValidTo"
								type="date"
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
							<ImageUpload :files="[person.avatar]" :fixed="true" :fixedNumber="[1,1]" @imgUrlBack="handleAvatarSuccess"/>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="身份证正面">
							<ImageUpload :files="[person.cardFront]" @imgUrlBack="handleCardFrontSuccess"/>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="身份证反面">
							<ImageUpload :files="[person.cardBack]" @imgUrlBack="handleCardBackSuccess"/>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="6">
						<el-form-item label="驾驶证正面">
							<ImageUpload :files="[person.driverFront]" @imgUrlBack="handleDriverFrontSuccess"/>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="驾驶证反面">
							<ImageUpload :files="[person.driverBack]" @imgUrlBack="handleDriverBackSuccess"/>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="从业资格证正">
							<ImageUpload :files="[person.qualifCerFront]" @imgUrlBack="handleQualifCerFrontSuccess"/>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="从业资格证副">
							<ImageUpload :files="[person.qualifCerBack]" @imgUrlBack="handleQualifCerBackSuccess"/>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="24">
						<el-form-item label="其他照片">
							<ImageUpload :files="person.otherImgs" :limitNum="9" @imgUrlBack="imgUrlBack"/>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="24">
						<el-form-item>
							<el-button type="primary" @click="add">立即保存</el-button>
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
import ImageUpload from '../CommonComponents/ImageUpload'
export default {
	data() {
		return {
			distData: regionData,
			person: {
				creater: '王小川',
				status: '通过',
				auditor: '李华',
				auditorDate: '2018-02-12',
				name: '刘贵权',
				familyAddress: '昆明安宁市太平镇太平南路安化小区49幢2单元8号',
				mobile: '13700698494',
				sex: '男',
				initCerDate: '2016-07-19',
				integrityLevel: 'AA',
				post: '操作员',
				integrityValidTo: '2018-02-12',
				cardId: '530128197203081814',
				quasiDrivingModel: ['A2','C1','B1'],
				contractValidFrom: '2018-02-12',
				contractValidTo: '2018-02-12',
				driverLicFrom: '2018-02-12',
				driverLicTo: '2018-02-12',
				driverNum: '81972030818',
				techLevel: '3',
				qualifCerNum: '81972030818',
				qualifCerType: '',
				qualifCerValidTo: '2018-02-12',
				remark: '技术娴熟',
				avatar: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1228597946,2213646161&fm=27&gp=0.jpg',
				cardFront: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=487786100,3325501203&fm=27&gp=0.jpg',
				cardBack: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1501101382,1888955963&fm=200&gp=0.jpg',
				driverFront: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2026613133,3896773094&fm=27&gp=0.jpg',
				driverBack: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2312140842,1360670990&fm=27&gp=0.jpg',
				qualifCerFront: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=4247498801,2121138548&fm=27&gp=0.jpg',
				qualifCerBack: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2657127002,3761086305&fm=27&gp=0.jpg',
				otherImgs: [
					'http://img0.imgtn.bdimg.com/it/u=211127819,408382177&fm=200&gp=0.jpg',
					'http://img5.imgtn.bdimg.com/it/u=3769120177,158294962&fm=27&gp=0.jpg',
					'http://img5.imgtn.bdimg.com/it/u=1636995595,1602982972&fm=27&gp=0.jpg'
				]
			}
		}
	},
	created() {
	},
	methods: {
		handleAvatarSuccess(res, file) {
			this.person.avatar = 'http://39.108.245.177:4000' + res.data
		},
		handleCardFrontSuccess(res, file) {
			this.person.cardFront = 'http://39.108.245.177:4000' + res.data
		},
		handleCardBackSuccess(res, file) {
			this.person.cardBack = 'http://39.108.245.177:4000' + res.data
		},
		handleDriverFrontSuccess(res, file) {
			this.person.driverFront = 'http://39.108.245.177:4000' + res.data
		},
		handleDriverBackSuccess(res, file) {
			this.person.driverBack = 'http://39.108.245.177:4000' + res.data
		},
		handleQualifCerFrontSuccess(res, file) {
			this.person.qualifCerFront = 'http://39.108.245.177:4000' + res.data
		},
		handleQualifCerBackSuccess(res, file) {
			this.person.qualifCerBack = 'http://39.108.245.177:4000' + res.data
		},
		imgUrlBack(files) {
			console.log(files)
			this.person.otherImgs = files
		},
		add() {
			Message.success('保存成功！')
			this.$router.push({name: 'person'})
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