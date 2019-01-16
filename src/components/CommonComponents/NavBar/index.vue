<template>
	<div class="fixHead">
		<div class="headL">
			<div class="logo" @click="sendToParent('companyInfo')">
				<img :src="userInfo && userInfo.logoUrl ? resizeImg(userInfo.logoUrl, '_100x100.') : defaultImg" />
				<span class="companyName">{{companyName}}</span>
			</div>
			<div class="organization" @click="changeOrganization">
				{{loginOrganizationName}} 
				<span>切换 <i class="el-icon-arrow-down"></i></span>
			</div>
		</div>
		<el-menu class="navbar" mode="horizontal">
			<div class="right-menu">
				<el-tooltip effect="dark" content="navbar.theme" placement="bottom"></el-tooltip>
				<el-dropdown class="avatar-container right-menu-item">
					<div class="avatar-wrapper">
						<img class="user-avatar" :src="userInfo && userInfo.headPic ? resizeImg(userInfo.headPic, '_100x100.') : errorImg">
						<span class="user-text">你好！{{userInfo && userInfo.realName ? userInfo.realName : name}}</span>
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
		<el-dialog
			title="切换组织"
			:visible.sync="dialogVisible"
			:append-to-body="true"
			width="30%">
			<table class="dialog-table">
				<thead>
					<tr>
						<th width="60">选择</th>
						<th>组织名称</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="item in orgs" :key="item.id" @click="handSelectOrg(item)">
						<td class="wf-check">
							<span 
								class="checkbox" 
								:class="selectedOrgs.id == item.id ? 'selected' : ''">
							</span>
						</td>
						<td align="center"><span>{{item.name}}</span></td>
					</tr>
				</tbody>
			</table>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="handChange">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
import { Message } from 'element-ui'
import { mapGetters } from 'vuex'
import { defaultImg } from '../../../assets/icons/icons'
import { resizeImg } from '../../../common/utils'
import SysMember from '../../../api/SysMember'
import Organization from '../../../api/Organization'
export default {
	data(){
		return {
			dialogVisible: false,
			orgs: [],
			selectedOrgs: {}
		};
	},
	computed: {
		...mapGetters([
			'name',
			'companyName',
			'loginOrganizationID',
			'loginOrganizationName',
			'userInfo'
		]),
		defaultImg: () => defaultImg,
		errorImg: () => require('../../../assets/imgs/avatar.gif'),
		resizeImg: () => resizeImg
	},
	created() {
		this.selectedOrgs = {
			id: this.loginOrganizationID,
			name: this.loginOrganizationName
		}
	},
	methods: {
		logout() {
			this.$store.dispatch('loginOut').then(() => {
				location.reload()
			})
		},
		getOrgs() {
			SysMember.organizationList().then(res => {
				this.orgs = res
			})
		},
		changeOrganization() {
			this.dialogVisible = true
			this.getOrgs()
		},
		handSelectOrg(data) {
			this.selectedOrgs = data
		},
		handChange() {
			Organization.selectOrganization({
				organizationID: this.selectedOrgs.id
			}).then(res => {
				this.dialogVisible = false
				Message.success('切换成功！')
				this.$store.dispatch('getUserInfo')
				// this.$store.dispatch('getMenu')
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
	background #5974c8
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
.headL
	position absolute
	left 0
	top 0
	height 50px
	color #fff
	.logo
		padding 9px
		cursor pointer
		display inline-block
		img
			width 32px
			height 32px
			border-radius 8px
			vertical-align top
		.companyName
			font-size 20px
			line-height 32px
			margin-left 9px
	.organization
		font-size 14px
		display inline-block
		margin-left 20px
		cursor pointer
.dialog-table
	font-size 12px
	background #dcdfe6
	border-spacing 1px
	width 100%
    th
		background #f2f2f2
		color #666
		padding 10px 15px
	td
		padding 10px 15px
		background #fff
	.wf-check
		position relative
		text-align center
		.checkbox
			display block
			width 14px
			height 14px
			margin 0 auto
			background url("../../../assets/imgs/checkbox.png") no-repeat 0 0
			cursor pointer
			&:hover
				background-position -14px 0
			&.selected
				background-position -28px 0
</style>

