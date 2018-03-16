<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>查看人员</span>
			</div>
			<el-form label-width="155px">
				<el-row>
					<el-col :span="6">
						<el-form-item label="创建人">
							<p>{{person.creater}}</p>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="状态">
							<p>{{person.status}}</p>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="审核人">
							<p>{{person.auditor}}</p>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="审核日期">
							<p>{{person.auditorDate}}</p>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="6">
						<el-form-item label="姓名">
							<p>{{person.name}}</p>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="家庭地址">
							<el-tooltip class="item" effect="dark" :content="person.familyAddress" placement="top">
								<p>{{person.familyAddress}}</p>
							</el-tooltip>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="联系电话">
							<p>{{person.mobile}}</p>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="性别">
							<p>{{person.sex}}</p>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="6">
						<el-form-item label="初次发证时间">
							<p>{{person.initCerDate}}</p>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="诚信考核等级">
							<p>{{person.integrityLevel}}</p>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="聘用岗位">
							<p>{{person.post}}</p>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="诚信考核有效期至">
							<p>{{person.integrityValidTo}}</p>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="6">
						<el-form-item label="身份证号">
							<p>{{person.cardId}}</p>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="准驾车型">
							<p>{{person.quasiDrivingModel.join(',')}}</p>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="合同有效期起">
							<p>{{person.contractValidFrom}}</p>
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
							<el-upload 
								class="avatar-uploader" 
								action="http://39.108.245.177:3001/uploadImg" 
								:show-file-list="false" 
								:on-success="handleAvatarSuccess">
								<img v-if="person.avatar" :src="person.avatar" class="avatar">
								<i v-else class="el-icon-plus avatar-uploader-icon"></i>
							</el-upload>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="身份证正面">
							<el-upload 
								class="avatar-uploader" 
								action="http://39.108.245.177:3001/uploadImg" 
								:show-file-list="false" 
								:on-success="handleCardFrontSuccess">
								<img v-if="person.cardFront" :src="person.cardFront" class="avatar">
								<i v-else class="el-icon-plus avatar-uploader-icon"></i>
							</el-upload>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="身份证反面">
							<el-upload 
								class="avatar-uploader" 
								action="http://39.108.245.177:3001/uploadImg" 
								:show-file-list="false" 
								:on-success="handleCardBackSuccess">
								<img v-if="person.cardBack" :src="person.cardBack" class="avatar">
								<i v-else class="el-icon-plus avatar-uploader-icon"></i>
							</el-upload>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="6">
						<el-form-item label="驾驶证正面">
							<el-upload 
								class="avatar-uploader" 
								action="http://39.108.245.177:3001/uploadImg" 
								:show-file-list="false" 
								:on-success="handleDriverFrontSuccess">
								<img v-if="person.driverFront" :src="person.driverFront" class="avatar">
								<i v-else class="el-icon-plus avatar-uploader-icon"></i>
							</el-upload>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="驾驶证反面">
							<el-upload 
								class="avatar-uploader" 
								action="http://39.108.245.177:3001/uploadImg" 
								:show-file-list="false" 
								:on-success="handleDriverBackSuccess">
								<img v-if="person.driverBack" :src="person.driverBack" class="avatar">
								<i v-else class="el-icon-plus avatar-uploader-icon"></i>
							</el-upload>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="从业资格证正">
							<el-upload 
								class="avatar-uploader" 
								action="http://39.108.245.177:3001/uploadImg" 
								:show-file-list="false" 
								:on-success="handleQualifCerFrontSuccess">
								<img v-if="person.qualifCerFront" :src="person.qualifCerFront" class="avatar">
								<i v-else class="el-icon-plus avatar-uploader-icon"></i>
							</el-upload>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="从业资格证副">
							<el-upload 
								class="avatar-uploader" 
								action="http://39.108.245.177:3001/uploadImg" 
								:show-file-list="false" 
								:on-success="handleQualifCerBackSuccess">
								<img v-if="person.qualifCerBack" :src="person.qualifCerBack" class="avatar">
								<i v-else class="el-icon-plus avatar-uploader-icon"></i>
							</el-upload>
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
		</el-card>
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