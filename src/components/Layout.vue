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
	<div class="fullBg" v-if="showMask"></div>
	<!-- 公司信息 -->
	<div class="companyInfoDialog" v-if="showCompanyInfo">
		<div class="baseInfo">
			<div class="companylogo">
				<img v-if="userInfo && userInfo.logoUrl" :src="imgUrl + userInfo.logoUrl">
				<img v-else src="../assets/imgs/defaultLogo.png" height="128" width="128">
			</div>
			<p class="companyName">昆明安化物流有限公司</p>
			<p class="companyArea">所在地区：云南昆明</p>
			<p class="companyAddress">联系地址：云南昆明官渡区彩云北路235号，浩宏驾驶广场23栋2340室</p>
			<p class="servicesTel">客服电话：400236548</p>
		</div>
		<div class="otherInfo">
			<p class="companyType">企业类型：物流公司</p>
			<p class="companySort">经营行业：危险品运输</p>
		</div>
		<div class="footer">
			<span class="sysV">危化标准版</span>
			<span class="editCompanyInfo" @click="editCompanyInfo"><svg-icon icon-class="edit"></svg-icon> 修改企业资料</span>
		</div>
		<span class="close" @click="closeDialog('companyInfo')"><svg-icon icon-class="close"></svg-icon></span>
	</div>
	<div class="editCompanyInfoDialog" v-if="showEditCompanyInfo">
		<div class="dialogTit">
			编辑公司信息<span class="close" @click="closeDialog('editCompanyInfo')"><svg-icon icon-class="close"></svg-icon></span>
		</div>
		<div class="dialogBody">
			<el-form label-width="140px" size="small">
				<div class="section-block">
					<span class="block-title">基本信息</span>
					<el-row :gutter="20">
						<el-col :span="12">
							<el-form-item label="企业名称">
								<el-input placeholder="请输入企业名称"></el-input>
							</el-form-item>
							<el-form-item label="定位地址">
								<el-input></el-input>
							</el-form-item>
							<el-form-item label="详细地址">
								<el-input placeholder="请输入详细地址"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="企业Logo">
								<ImageUpload :limitNum="1"></ImageUpload>
								<p class="tips">上传的企业Logo，将在点击底部保存按钮保存后生效</p>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row :gutter="20">
						<el-col :span="12">
							<el-form-item label="负责人">
								<el-input placeholder="请输入负责人"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="联系电话">
								<el-input placeholder="请输入联系电话"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row :gutter="20">
						<el-col :span="12">
							<el-form-item label="邮政编码">
								<el-input placeholder="请输入邮政编码"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="邮箱">
								<el-input placeholder="请输入邮箱"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row :gutter="20">
						<el-col :span="12">
							<el-form-item label="传真">
								<el-input placeholder="请输入传真"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="客服电话">
								<el-input placeholder="请输入客服电话"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row :gutter="20">
						<el-col :span="12">
							<el-form-item label="企业类型">
								<el-select style="width: 100%" placeholder="请选择企业类型">
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
								<el-select style="width: 100%" placeholder="请选择所属行业">
									<el-option label="其他" value="其他"></el-option>
									<el-option label="危险品" value="危险品"></el-option>
									<el-option label="快消品" value="快消品"></el-option>
									<el-option label="生鲜冷链" value="生鲜冷链"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row :gutter="20">
						<el-col :span="12">
							<el-form-item label="经营类型">
								<el-select style="width: 100%" placeholder="请选择经营类型">
									<el-option label="经营类型1" value="经营类型1"></el-option>
									<el-option label="经营类型2" value="经营类型2"></el-option>
									<el-option label="经营类型3" value="经营类型3"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="是否经营性运输">
								<el-switch>
								</el-switch>
							</el-form-item>
						</el-col>
					</el-row>
				</div>
			</el-form>

		</div>
		<div class="dialogFooter">
			<el-button size="small" @click="closeDialog('editCompanyInfo')">取消</el-button>
			<el-button type="primary" size="small">保存</el-button>
		</div>
	</div>
	<!-- 账号设置 -->
	<div class="personInfoDialog" v-if="showPersonInfo">
			个人信息
		</div>
	</div>
</template>
<script type="text/javascript">
import Sidebar from './CommonComponents/SideBar'
import Navbar from './CommonComponents/NavBar'
import AppMain from './CommonComponents/AppMain'
import TagsView from './CommonComponents/TagsView'
import Breadcrumb from './CommonComponents/Breadcrumb'
import { mapGetters } from 'vuex'
import ImageUpload from './CommonComponents/ImageUpload'
export default {
	data(){
		return{
			showMask:false,
			showCompanyInfo:false,
			showEditCompanyInfo:false,
			showPersonInfo:false
		}
	},
	name: 'layout',
	computed: {
		sidebar() {
			return this.$store.state.app.sidebar
		},
		...mapGetters([
			'userInfo',
		])
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
		showDialog(type, boo) {
			if(type == 'companyInfo'){
				this.showCompanyInfo= boo
				this.showMask = boo
			}else {
				this.showPensonInfo= boo
				this.showMask = boo
			}
		},
		editCompanyInfo(){
			this.showCompanyInfo=false
			this.showEditCompanyInfo=true
		},
		closeDialog(name){
			console.log(name)
			if(name=='companyInfo'){
				this.showMask = false
				this.showCompanyInfo = false
			}else if(name =='editCompanyInfo'){
				this.showEditCompanyInfo = false
				this.showCompanyInfo= true

			}
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
.personInfoDialog
	position fixed
	left 50%
	top 50%
	width 660px
	transform translate(-50%, -50%)
	background #fff
	overflow hidden
	border-radius 10px
	z-index 2001
	.baseInfo
		min-height 178px
		position relative
		background #409EFF
		color #fff
		padding 30px 20px 20px 168px
		p
			margin 0
			padding 0
			font-size 14px
			line-height 24px
			&.companyName
				font-size 24px
				line-height 40px
				margin-bottom 10px
		.companylogo
			width 128px
			height 128px
			position absolute
			left 20px
			top 30px
			img
				width 128px
				height 128px
				border-radius 10px
	.otherInfo
		padding 20px
		p
			margin 0
			padding 0
			font-size 16px
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
	.close
		position absolute
		top 10px
		right 10px
		width 24px
		height 24px
		text-align center
		line-height 24px
		font-size 24px
		cursor pointer
		color #fff
.editCompanyInfoDialog
	position fixed
	left 50%
	top 50%
	width 660px
	transform translate(-50%, -50%)
	background #fff
	overflow hidden
	border-radius 10px
	z-index 2001
	.dialogTit
		height 40px
		line-height 40px
		padding 0 15px
		.close
			float right
			height 40px
			text-align center
			line-height 40px
			font-size 18px
			cursor pointer
			color #666
	.dialogFooter
		height 52px
		padding 10px 0
		text-align center
</style>