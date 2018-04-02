<template>
	<div class="login-container">
		<div class="login-box">
			<h1 class="login-title">TMS管理系统</h1>
			<div class="form">
				<div class="tabs">
					<div 
						class="tab-item" 
						:class="{'active': loginOrRegister == 'login'}" 
						@click="handleTabClick('login')">登录</div>
					<div class="spit-line"></div>
					<div 
						class="tab-item" 
						:class="{'active': loginOrRegister == 'register'}" 
						@click="handleTabClick('register')">注册</div>
				</div>
				<form class="login" v-show="loginOrRegister == 'login'">
					<div class="ipt">
						<svg-icon class="ico" icon-class="customer"></svg-icon>
						<input type="text" name="username" placeholder="请输入用户名" v-model="login.username">
					</div>
					<div class="ipt">
						<svg-icon class="ico" icon-class="password"></svg-icon>
						<input :type="passwordType" name="password" placeholder="请输入密码" v-model="login.assword">
						<span class="ico show-pwd" @click="showPwd">
							<svg-icon icon-class="eye"/>
						</span>
					</div>
					<el-button class="login-btn" type="primary" @click="handLogin">登录</el-button>
				</form>
				<form class="register" v-show="loginOrRegister == 'register'">
					<div class="ipt">
						<svg-icon class="ico" icon-class="customer"></svg-icon>
						<input type="text" name="username" placeholder="请输入手机号" v-model="register.mobile">
					</div>
					<div class="ipt">
						<svg-icon class="ico" icon-class="email"></svg-icon>
						<input type="text" name="vcode" placeholder="请输入验证码" v-model="register.vcode">
						<el-button style="width: 100px" type="default" size="mini" :disabled="isGetVCode" @click="getVCode">{{getVcodeText}}</el-button>
					</div>
					<div class="ipt">
						<svg-icon class="ico" icon-class="password"></svg-icon>
						<input type="text" name="password" placeholder="请输入密码" v-model="register.password">
					</div>
					<div class="ipt">
						<svg-icon class="ico" icon-class="peoples"></svg-icon>
						<input type="text" name="contact" placeholder="请输入联系人" v-model="register.contact">
					</div>
					<div class="ipt">
						<svg-icon class="ico" icon-class="excel"></svg-icon>
						<input type="text" name="company" placeholder="请输入公司名称" v-model="register.company">
					</div>
					<div class="ipt" style="background: none;border: none">
						<el-select 
							class="sel" 
							placeholder="请选择公司所在省份" 
							v-model="register.province" 
							@change="handProvince">
							<el-option 
								v-for="province in provinces" 
								:key="province.value" 
								:label="province.label" 
								:value="province.value"></el-option>
						</el-select>
						<div style="flex: 0 0 10px"></div>
						<el-select 
							class="sel" 
							placeholder="请输入公司所在城市" 
							v-model="register.city" 
							@change="handCity">
							<el-option 
								v-for="city in citys" 
								:key="city.value" 
								:label="city.label" 
								:value="city.value"></el-option>
						</el-select>
					</div>
					<div class="ipt">
						<svg-icon class="ico" icon-class="home-icon"></svg-icon>
						<input type="text" name="address" placeholder="请输入公司所在地址" v-model="register.address">
					</div>
					<el-button class="login-btn" type="primary" @click="handRegister">注册</el-button>
				</form>
			</div>
		</div>
	</div>
</template>
<script>
import request from "../common/request"
import { Message } from 'element-ui'
import { regionData } from 'element-china-area-data'
export default {
	name: 'App',
	data() {
		return {
			// 登录提交的参数
			login: {
				username: '',
				password: '',
			},
			// 注册提交的参数
			register: {
				mobile: '',
				vcode: '',
				password: '',
				contact: '',
				company: '',
				province: '',
				city: '',
				address: ''
			},
			// 控制显示与隐藏密码
			passwordType: 'password',
			// 控制显示登录或者注册
			loginOrRegister: 'login',
			wait: 30,
			isGetVCode: false,
			getVcodeText: '获取验证码',
			citys: []
		}
	},
	computed: {
		provinces: () => regionData.map(item => {
			return {
				label: item.label,
				value: item.value
			}
		})
	},
	methods: {
		/**
		 * 	tab标签切换
		 * 	@param tab 当前选择
		 */
		handleTabClick(tab) {
			this.loginOrRegister = tab
		},
		/**
		 * 	省份选择
		 * 	@param data 当前选择的省份
		 */
		handProvince(data) {
			this.register.province = data
			this.register.city = ''
			for (let i = 0; i < regionData.length; i++) {
				if (data === regionData[i].value) {
					this.citys = regionData[i].children
				}
			}
		},
		/**
		 * 	城市选择
		 * 	@param data 当前选择的城市
		 */
		handCity(data) {
			this.register.city = data
		},
		/**
		 * 	显示与隐藏密码
		 */
		showPwd() {
			if (this.passwordType === 'password') {
				this.passwordType = 'text'
			} else {
				this.passwordType = 'password'
			}
		},
		/**
		 * 	获取短信验证码
		 */
		getVCode() {
			if (this.isGetVCode) return
			this.timeGo()
			let data = {
				mobile: this.register.mobile,
			}
			request({
				url: '/common/vcode',
				data
			}).then(res => {
				console.log(res.data)
			})
		},
		/**
		 * 	登录
		 */
		handLogin() {
			let data = {
				username: this.login.username,
				password: this.login.password
			}
			request({
				url: '/mem/login',
				method: 'POST',
				data
			}).then(res => {
				console.log(res.data)
			})
		},
		/**
		 * 	注册
		 */
		handRegister() {

		},
		/**
		 * 	倒计时
		 */
		timeGo() {
			if (this.wait == 0) {
				this.getVcodeText = '重新获取'
				this.isGetVCode = false
				this.wait = 30
				return
			} else {
				this.isGetVCode = true
				this.getVcodeText = this.wait+'s'
				this.wait--
				setTimeout(() => {
					this.timeGo()
				}, 1000)
			}
		}
	}
}
</script>
<style lang="stylus" scoped>
	.login-container
		display flex
		justify-content center
		align-items center
		height 100%
		background-color #424242
		.login-box
			width 480px
			height 740px
			.login-title
				text-align center
				color #fff
			.form
				padding 0 15px 30px 15px
				background-color #fff
				border-radius 8px
				box-shadow 0 10px 30px rgba(0, 0, 0, .2)
				.tabs
					display flex
					height 50px
					line-height 50px
					color #303133
					.spit-line
						flex 0 0 1px
						background-color #e4e7ed
					.tab-item
						flex 1
						text-align center
						cursor pointer
						border-bottom 1px solid #e4e7ed
						&:hover
							color #409EFF
						&.active
							color #409EFF
							border none
				.ipt
					display flex
					align-items center
					align-content space-between
					width 100%
					height 44px
					margin-top 20px
					border-radius 5px
					border 1px solid #e4e7ed
					padding 5px
					background-color #eee
					.ico
						flex 0 0 30px
						color #ccc
						&.show-pwd
							font-size 16px
							cursor pointer
							user-select none
					input
						flex 1
						display block
						height 36px
						line-height 36px
						border none
						outline none
						background none
						-webkit-appearance none
					.sel
						flex 1
					.btn
						flex 1
				.login-btn
					width 100%
					margin-top 20px
</style>
