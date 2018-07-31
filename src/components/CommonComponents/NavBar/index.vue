<template>
	<div class="fixHead">
		<div class="logo" @click="sendToParent('companyInfo')">
			<!-- <img v-if="userInfo && userInfo.logoUrl" :src="imgUrl + userInfo.logoUrl">
			<img v-else src="../../../assets/imgs/defaultLogo.png" height="50" width="180"> -->
			<img :src="userInfo && userInfo.logoUrl ? resizeImg(userInfo.logoUrl, '_100x100.') : defaultImg" />
			<span class="companyName">{{companyName}}</span>
		</div>
		<el-menu class="navbar" mode="horizontal">
			<div class="right-menu">
				<el-tooltip effect="dark" content="navbar.theme" placement="bottom"></el-tooltip>
				<el-dropdown class="avatar-container right-menu-item">
					<div class="avatar-wrapper">
						<img class="user-avatar" :src="userInfo && userInfo.headPic ? resizeImg(userInfo.headPic, '_100x100.') : errorImg">
						<span class="user-text">你好！{{name}}</span>
						<i class="el-icon-caret-bottom"></i>
					</div>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item>
							<span @click="sendToParent('accountInfo')" style="display:block;">账号设置</span>
						</el-dropdown-item>
						<el-dropdown-item>
							<span @click="logout" style="display:block;">退出</span>
						</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
			</div>
		</el-menu>
		
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
import { defaultImg } from '../../../assets/icons/icons'
import { resizeImg } from '../../../common/utils'
export default {
	computed: {
		...mapGetters([
			'name',
			'companyName',
			'userInfo',
		]),
		defaultImg: () => defaultImg,
		errorImg: () => require('../../../assets/imgs/avatar.gif'),
		resizeImg: () => resizeImg
	},
	methods: {
		logout() {
			this.$store.dispatch('loginOut').then(() => {
				location.reload()
			})
		},
		sendToParent(type){
			this.$emit('listenToChild',type,true)
		}
	}
}
</script>
<style lang="stylus" scoped>
.navbar
	float right
	height 50px
	line-height 50px
	border-radius 0px !important
	background #424242
	.right-menu
		float right
		height 100%
		&:focus
		 outline none
		.right-menu-item
			display inline-block
			margin 0 8px
		.screenfull
			height 20px
		.international
			vertical-align top
		.theme-switch
			vertical-align 15px
		.avatar-container
			height 50px
			margin-right 30px
			.avatar-wrapper
				height 50px
				cursor pointer
				position relative
				.user-avatar
					width 30px
					height 30px
					border-radius 15px
					display inline-block
					vertical-align middle
				.user-text
					padding-left 5px
					height 30px
					line-height 30px
					display inline-block
					vertical-align middle
				.el-icon-caret-bottom
					font-size 12px
.logo
	padding 9px
	position absolute
	left 0
	top 0
	cursor pointer
	img
		width 32px
		height 32px
		border-radius 8px
		vertical-align top
	.companyName
		font-size 18px
		line-height 32px
		margin-left 9px
		color #fff

		
</style>

