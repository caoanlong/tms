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
		<div class="dialogFooter">
			<span class="sysV">危化标准版</span>
			<span class="editCompanyInfo"><svg-icon icon-class="edit"></svg-icon> 修改企业资料</span>
		</div>
		<div class="personInfoDialog" v-if="showPersonInfo">
			个人信息
		</div>
		<span class="close" @click="closeDialog('companyInfo')"><svg-icon icon-class="close"></svg-icon></span>
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
	export default {
		data(){
			return{
				showCompanyInfo:false,
				showMask:false,
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
			Breadcrumb
		},
		methods:{
			showDialog:function(data,data1){
				console.log(data)
				if(data=='companyInfo'){
					this.showCompanyInfo= data1
					this.showMask = data1

				}else{
					this.showPensonInfo= data1
					this.showMask = data1
				}
			},
			closeDialog(type){
				if(type='companyInfo'){
					this.showMask=false
					this.showCompanyInfo=false
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
	.dialogFooter
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
</style>