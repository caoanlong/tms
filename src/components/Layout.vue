<template>
	<div>
	<div class="header">
		<div class="top-bar">
			<navbar @listenToChild = "showDialog"></navbar>
			<tags-view></tags-view>
		</div>
	</div>
	<div class="app-wrapper clearfix">
		<sidebar class="sidebar-container"></sidebar>
		<div class="main-container right-container" >
			<breadcrumb class="breadcrumb-container"></breadcrumb>
			<app-main></app-main>
		</div>
	</div>
	<el-dialog :visible.sync="companyInfoDialog" custom-class="companyInfoDialog">
		<div class="baseInfo"  @click="viewCompanyInfoDialog = true">
			<div class="companylogo">
				<img :src="companyDetail.logoUrl ? resizeImg(companyDetail.logoUrl, '_100x100.') : defaultImg" />
			</div>
			<p class="companyName">{{companyDetail.name}}</p>
			<p class="companyArea">所在地区：{{companyDetail.areaName}}</p>
			<p class="companyAddress">联系地址：{{companyDetail.address}}</p>
			<p class="servicesTel">客服电话：{{companyDetail.phone}}</p>
		</div>
		<div class="otherInfo">
			<p class="companyType">企业类型：{{companyDetail.enterpriseType}}</p>
			<p class="companySort">所属行业：{{companyDetail.industry}}</p>
		</div>
		<div class="footer">
			<span class="sysV">危化标准版</span>
			<span class="editCompanyInfo" @click="editCompanyInfoDialog = true"><svg-icon icon-class="edit"></svg-icon> 修改企业资料</span>
		</div>
		<!-- 企业资料详情 -->
		<el-dialog title="企业资料详情" :visible.sync="viewCompanyInfoDialog" append-to-body custom-class="viewCompanyInfoDialog" top="5vh">
			
			<el-form label-width="140px" size="small">
				<el-row :gutter="20">
					<el-col :span="24">
						<el-form-item label="企业Logo">
							<ImageUpload :files="[companyDetail.logoUrl]" @imgUrlBack="handleAvatarSuccess" :fixed="true" class="fl" :limitNum="1" :isPreview="true"/>
						</el-form-item>
					</el-col>
					<el-col :span="24">
						<el-form-item label="企业名称" prop="name">
							<p>{{companyDetail.name}}</p>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="20">
						<el-col :span="12">
							<el-form-item label="企业类型">
								<p>{{companyDetail.enterpriseType}}</p>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="所属行业">
								<p>{{companyDetail.industry}}</p>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="24">
							<el-form-item label="所在地区">
								<p v-if="companyDetail.areaID">{{companyDetail.areaID | searchAreaByKey}}</p>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="24">
							<el-form-item label="详细地址" prop="address">
								<p>{{companyDetail.address}}</p>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row :gutter="20">
						<el-col :span="12">
							<el-form-item label="联系人" prop="contactsName">
								<p>{{companyDetail.contactsName}}</p>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="联系电话" prop="contactsMobile">
								<p>{{companyDetail.contactsMobile}}</p>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row :gutter="20">
						<el-col :span="24">
							<el-form-item label="是否经营性运输">
								<p v-if="companyDetail.operationalFlag=='Y'">是</p>
								<p v-else>否</p>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row :gutter="20">
						<el-col :span="12">
							<el-form-item label="传真">
								<p>{{companyDetail.fax}}</p>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="客服电话">
								<p>{{companyDetail.phone}}</p>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row :gutter="20">
						<el-col>
							<el-form-item label="邮政编码">
								<p>{{companyDetail.zipCode}}</p>
							</el-form-item>
						</el-col>
						<el-col>
							<el-form-item label="邮箱">
								<p>{{companyDetail.email}}</p>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="24">
							<el-form-item label="经营类型">
								<p>{{companyDetail.businessType}}</p>
							</el-form-item>
						</el-col>
					</el-row>
			</el-form>
		</el-dialog>
		<!-- 企业资料详情 -->
		<!-- 修改企业资料 -->
		<el-dialog title="修改企业资料" :visible.sync="editCompanyInfoDialog" append-to-body custom-class="editCompanyInfoDialog" top="5vh">
			<el-form label-width="140px" size="small" :model="companyDetail" :rules="rules1" ref="ruleForm1">
				<el-row :gutter="20">
					<el-col :span="24">
						<el-form-item label="企业Logo" prop="logoUrl">
							<ImageUpload :files="[companyDetail.logoUrl]" @imgUrlBack="handleAvatarSuccess" :fixed="true" class="fl" :limitNum="1"/>
							<p class="tips fl">上传的企业Logo，将在点击底部保存按钮保存后生效</p>
						</el-form-item>
					</el-col>
					<el-col :span="24">
						<el-form-item label="企业名称" prop="name">
							<el-input placeholder="请输入企业名称" v-model="companyDetail.name"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="20">
						<el-col :span="12">
							<el-form-item label="企业类型">
								<el-select style="width: 100%" placeholder="请选择企业类型" v-model="companyDetail.enterpriseType">
									<el-option label="其他" value="其他"></el-option>
									<el-option label="原材料生产商" value="原材料生产商"></el-option>
									<el-option label="制造厂商" value="制造厂商"></el-option>
									<el-option label="贸易商" value="贸易商"></el-option>
									<el-option label="分销商" value="分销商"></el-option>
									<el-option label="物流企业" value="物流企业"></el-option>
									<el-option label="个体经营者" value="个体经营者"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="所属行业">
								<el-select style="width: 100%" placeholder="请选择所属行业" v-model="companyDetail.industry">
									<el-option label="其他" value="其他"></el-option>
									<el-option label="危险品" value="危险品"></el-option>
									<el-option label="快消品" value="快消品"></el-option>
									<el-option label="生鲜冷链" value="生鲜冷链"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="24">
							<el-form-item label="所在地区" prop="areaName">
								<el-cascader style="width:100%" :options="dist" 
                                change-on-select v-model="selectedArea" @change="handleSelectedArea">
                            </el-cascader>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="24">
							<el-form-item label="详细地址" prop="address">
								<el-input placeholder="请输入详细地址" v-model="companyDetail.address"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row :gutter="20">
						<el-col :span="12">
							<el-form-item label="联系人" prop="contactsName">
								<el-input placeholder="请输入联系人" v-model="companyDetail.contactsName"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="联系电话" prop="contactsMobile">
								<el-input placeholder="请输入联系电话" v-model="companyDetail.contactsMobile"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row :gutter="20">
						<el-col :span="24">
							<el-form-item label="是否经营性运输">
								<el-switch v-model="companyDetail.operationalFlag" active-value="Y" inactive-value="N">
								</el-switch>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row :gutter="20">
						<el-col :span="12">
							<el-form-item label="传真" prop="fax">
								<el-input placeholder="请输入传真" v-model="companyDetail.fax"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="客服电话" prop="phone">
								<el-input placeholder="请输入客服电话" v-model="companyDetail.phone"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row :gutter="20">
						<el-col>
							<el-form-item label="邮政编码" prop="zipCode">
								<el-input placeholder="请输入邮政编码" v-model="companyDetail.zipCode"></el-input>
							</el-form-item>
						</el-col>
						<el-col>
							<el-form-item label="邮箱" prop="email">
								<el-input placeholder="请输入邮箱" v-model="companyDetail.email"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="24">
							<el-form-item label="经营类型">
								<el-input type="textarea" resize="none" v-model="companyDetail.businessType">
								</el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="24">
							<el-form-item>
								<el-button @click="cancelEditcompanyInfo">取消</el-button>
								<el-button type="primary" @click="saveCompanyInfo">保存</el-button>
							</el-form-item>
						</el-col>
					</el-row>
			</el-form>
		</el-dialog>
		<!-- 修改企业资料 -->
	</el-dialog>
	<el-dialog title="账号设置" :visible.sync="accountInfoDialog" custom-class="accountInfoDialog" top="10vh">
		<el-tabs tab-position="left" style="height:300px">
			<el-tab-pane label="个人资料">
				<el-form label-width="80px" size="small" :model="MemDetail">
					<el-row :gutter="20">
						<el-col :span="6">
							<div class="userFace">
								<ImageUpload :files="[MemDetail.headPic]" @imgUrlBack="handleAvatarSuccess1" :fixed="true" :limitNum="1"></ImageUpload>
							</div>
						</el-col>
						<el-col :span="18">
							<el-form-item label="我的姓名">
								<el-input placeholder="请输入" v-model="MemDetail.realName"></el-input>
							</el-form-item>
							<el-form-item label="手机号码">
								<el-input placeholder="请输入手机号码" v-model="MemDetail.mobile" disabled></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<div class="otherInfo">
							<p>企业名称：{{MemDetail.companyName}}</p>
							<p>企业角色：{{MemDetail.roleName}}</p>
						</div>
					</el-row>
					<el-row>
						<el-col :span="24" class="text-center">
							<el-button size="small" @click="accountInfoDialog = false" >取消</el-button>
							<el-button type="primary" @click="saveMemInfo" size="small">保存</el-button>
						</el-col>
					</el-row>
				</el-form>
			</el-tab-pane>
			<el-tab-pane label="密码修改">
				<el-form label-width="100px" size="small" :model="memPwd" :rules="rules" ref="ruleForm">
					<!-- 为了取消chrome自动填充密码 -->
					<input type="password" id="disabledAutoComplete" name="disabledAutoComplete" style="display:none">
					<!-- 为了取消chrome自动填充密码 -->
					<el-row>
						<el-form-item label="旧密码" prop="oldPassword">
							<el-input type="password" auto-complete="off" placeholder="请输入旧密码" v-model="memPwd.oldPassword" trigger-on-focus="false"></el-input>
						</el-form-item>
					</el-row>
					<el-row>
						<el-form-item label="新密码" prop="newPassword">
							<el-input type="password" auto-complete="off" placeholder="请输入新密码" v-model="memPwd.newPassword" trigger-on-focus="false"></el-input>
						</el-form-item>
					</el-row>
					<el-row>
						<el-form-item label="确认新密码" prop="confirmPassword">
							<el-input type="password" auto-complete="off" placeholder="请再次输入新密码" v-model="memPwd.confirmPassword" trigger-on-focus="false"></el-input>
						</el-form-item>
					</el-row>
					<el-row>
						<el-col :span="24" class="text-center">
							<el-button size="small" @click="accountInfoDialog = false">取消</el-button>
							<el-button type="primary" size="small" @click="changePassword">保存</el-button>
						</el-col>
					</el-row>
				</el-form>
			</el-tab-pane>
		</el-tabs>
	</el-dialog>
	</div>
</template>
<script type="text/javascript">
import { Message } from 'element-ui'
import Sidebar from './CommonComponents/SideBar'
import Navbar from './CommonComponents/NavBar'
import AppMain from './CommonComponents/AppMain'
import TagsView from './CommonComponents/TagsView'
import Breadcrumb from './CommonComponents/Breadcrumb'
import { mapGetters } from 'vuex'
import ImageUpload from './CommonComponents/ImageUpload'
import dist from '../assets/data/dist.json'
import distData from '../assets/data/distpicker.data'
import CompanyInfo from '../api/CompanyInfo'
import Member from '../api/Member'
import { defaultImg } from '../assets/icons/icons'
import { resizeImg,areaIdToArrayId,searchAreaByKey } from '../common/utils'
import { checkTel,checkZipCode, checkEmail,checkFax} from '../common/validator'
export default {
	data(){
		return{
			companyInfoDialog:false,
			editCompanyInfoDialog: false,
			viewCompanyInfoDialog:false,
			accountInfoDialog: false,
			selectedArea: [],
			companyDetail:{},
			MemDetail:{},
			memPwd:{
				oldPassword:'',
				newPassword:'',
				confirmPassword:''
			},
			rules: {
				oldPassword: [
					{required: true, message: '请输入旧密码'},
					{min: 8, max: 16, message: '密码必须是8-16位字母、下划线、数字'}
				],
				newPassword: [
					{required: true, message: '请输入新密码'},
					{min: 8, max: 16, message: '密码必须是8-16位字母、下划线、数字'}
				],
				confirmPassword: [
					{required: true, message: '请再次输入新密码'},
					{min: 8, max: 16, message: '密码必须是8-16位字母、下划线、数字'},
					{validator: (rule, value, callback) => {
						value == this.memPwd.newPassword ? callback() : callback(new Error('两次输入密码不一致!'))
					}}
				],
			},
			rules1: {
				logoUrl: [
					{required: true, message: '请上传公司logo'},
				],
				name: [
					{required: true, message: '请输入企业名称'},
				],
				areaName: [
					{required: true, message: '请选择公司所在区域'},
				],
				address: [
					{required: true, message: '请输入公司详细地址'},
				],
				contactsMobile: [
					{validator: checkTel},
				],
				phone: [
					{validator: checkTel},
				],
				fax: [
					{validator: checkFax},
				],
				zipCode:[
					{validator: checkZipCode}
				],
				email:[
					{validator: checkEmail}
				]
			}
		}
	},
	name: 'layout',
	computed: {
		sidebar() {
			return this.$store.state.app.sidebar
		},
		...mapGetters([
			'userInfo',
		]),
		dist: () => dist,
		defaultImg: () => defaultImg,
		resizeImg: () => resizeImg
	},
	components: {
		Navbar,
		Sidebar,
		AppMain,
		TagsView,
		Breadcrumb,
		ImageUpload
	},
	methods:{
		getCompanyInfo() {
			CompanyInfo.findById({
				companyID: this.userInfo.companyID
			}).then(res => {
				this.companyDetail = res
				this.selectedArea = areaIdToArrayId(res.areaID)
			})
		},
		saveCompanyInfo(){
			let data = this.memPwd
			this.$refs['ruleForm1'].validate(valid => {
				if (valid) {
					CompanyInfo.modify(this.companyDetail).then(res => {
						Message.success('保存成功！')
						this.editCompanyInfoDialog = false
					})
				}
			})
		},
		cancelEditcompanyInfo(){
			this.getCompanyInfo()
			this.editCompanyInfoDialog = false
		},
		getMemInfo(){
			Member.detail().then(res =>{
				this.MemDetail = res.data.data
				
			})
		},
		saveMemInfo(){
			Member.modify({
				headPic: this.MemDetail.headPic,
				realName: this.MemDetail.realName
			}).then(res =>{
				Message.success('保存成功！')
				this.accountInfoDialog = false
				this.$store.dispatch('getUserInfo')
			})
		},
		changePassword(){
			const data = this.memPwd
			this.$refs['ruleForm'].validate(valid => {
				if (valid) {
					Member.changePwd(data).then(res =>{
						console.log(data)
						Message.success('保存成功！')
						this.accountInfoDialog = false
					})
				}
			})
		},
		showDialog(type, boo) {
			if(type == 'companyInfo'){
				this.companyInfoDialog = true
				this.getCompanyInfo()
			}else if(type == 'accountInfo'){
				this.accountInfoDialog = true
				this.getMemInfo()
			}
		},
		handleSelectedArea(data) {
            this.companyDetail.areaID = data[data.length - 1]
        },
        handleAvatarSuccess(res) {
			this.companyDetail.logoUrl = res.length == 0 ? '' : res[0]
		},
        handleAvatarSuccess1(res) {
			this.MemDetail.headPic = res.length == 0 ? '': res[0]
		}
	}
}
</script>
<style lang="stylus" scoped>
.app-wrapper
	position relative
	height 100%
	padding-top 84px
	margin-left 180px
.header
	position fixed
	top 0
	left 0
	right 0
	height 84px
	z-index 1001
	padding-left 180px
	background #424242
.right-container
	padding-top 60px
	.breadcrumb-container
		position fixed
		top 84px
		z-index 100
		left 180px
		right 0
		padding 0 20px
		background-color #ffffff
		border-bottom 1px solid #dddddd
.fullBg
	position fixed
	top 0
	right 0
	bottom 0
	left 0
	background rgba(0,0,0,.3)
	z-index 1999
.companyInfoDialog
.accountInfoDialog
	.baseInfo
		min-height 150px
		position relative
		background #409EFF
		color #fff
		padding 20px 20px 20px 150px
		p
			margin 0
			padding 0
			font-size 14px
			line-height 24px
			&.companyName
				font-size 18px
				margin-bottom 10px
		.companylogo
			width 110px
			height 110px
			position absolute
			left 20px
			top 20px
			img
				width 110px
				height 110px
				border-radius 10px
	.otherInfo
		padding 20px
		p
			margin 0
			padding 0
			font-size 14px
			line-height 30px
	.footer
		height 72px
		padding 20px
		.sysV
			height 32px
			line-height 32px
			padding 0 30px 0 20px
			background url('../assets/imgs/sysv.png') no-repeat right center #409EFF
			color #fff
			font-size 14px
			display block
			float left
		.editCompanyInfo
			line-height 32px
			float right
			font-size 14px
			color #409EFF
			cursor pointer
.editCompanyInfoDialog
	.tips
		font-size 12px
		color #999
		margin 0 0 0 10px
.accountInfoDialog
	.otherInfo
		border 1px solid #dcdfe6
		margin 15px 0
		padding 15px
		border-radius 4px
		p
			font-size 14px
			color #999
.viewCompanyInfoDialog
	p
		margin 0
		line-height 32px
		min-height 32px
		border-bottom 1px solid #ddd
		color #999
</style>