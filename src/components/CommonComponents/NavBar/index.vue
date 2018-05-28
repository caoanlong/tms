<template>
	<el-menu class="navbar" mode="horizontal">
		<div class="misName">运输管理后台</div>
		<div class="right-menu">
			<el-tooltip effect="dark" content="navbar.theme" placement="bottom"></el-tooltip>
			<el-dropdown class="avatar-container right-menu-item">
				<div class="avatar-wrapper">
					<img class="user-avatar" src="errorImg" @error="errorImg">
					<span class="user-text">你好！{{name}}</span>
					<i class="el-icon-caret-bottom"></i>
				</div>
				<el-dropdown-menu slot="dropdown">
					<!-- <router-link :to="{name: 'userprofile'}">
						<el-dropdown-item>个人资料</el-dropdown-item>
					</router-link>
					<el-dropdown-item divided>
						<span @click="logout" style="display:block;">退出</span>
					</el-dropdown-item> -->

					<el-dropdown-item>
						<span @click="logout" style="display:block;">退出</span>
					</el-dropdown-item>
				</el-dropdown-menu>
			</el-dropdown>
		</div>
	</el-menu>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
	computed: {
		...mapGetters([
			'name'
		])
	},
	methods: {
		logout() {
			this.$store.dispatch('loginOut').then(() => {
				location.reload()
			})
		},
		errorImg (e) {
			e.target.src = require('../../../assets/imgs/avatar.gif')
			e.target.onerror = null
		}
	}
}
</script>

<style lang="stylus" scoped>
.navbar
	width 100%
	height 50px
	line-height 50px
	border-radius 0px !important
	background #424242
	.misName
		display inline-block
		color #ebebeb
		margin-left 15px
		font-size 18px
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
</style>
