<template>
	<div class="login-container">
		<div class="login-box">
			<h1 class="login-title">TMS管理系统</h1>
			<div class="form">
				<div class="tabs">
					<div 
						v-show="loginOrRegister != 'findpassword'"
						class="tab-item" 
						:class="{'active': loginOrRegister == 'login'}" 
						@click="handleTabClick('login')">登录</div>
					<div class="spit-line" v-show="loginOrRegister != 'findpassword'"></div>
					<div 
						v-show="loginOrRegister != 'findpassword'"
						class="tab-item" 
						:class="{'active': loginOrRegister == 'register'}" 
						@click="handleTabClick('register')">注册</div>
					<div v-show="loginOrRegister == 'findpassword'" class="tab-item active">找回密码</div>
				</div>
				<!-- 登录 -->
				<form class="login" v-show="loginOrRegister == 'login'" autocomplete="off">
					<div class="ipt">
						<svg-icon class="ico" icon-class="customer"></svg-icon>
						<input autocomplete="off" type="text" name="username" placeholder="请输入用户名" v-model="login.username">
					</div>
					<div class="ipt">
						<svg-icon class="ico" icon-class="password"></svg-icon>
						<input autocomplete="off" :type="passwordType" name="password" placeholder="请输入密码" v-model="login.password">
						<span class="ico show-pwd" @click="showPwd">
							<svg-icon icon-class="eye"/>
						</span>
					</div>
					<div class="txt-btn" @click="handleTabClick('findpassword')">忘记密码?</div>
					<el-button class="login-btn" type="primary" @click="handLogin">登录</el-button>
				</form>
				<!-- 注册 -->
				<form class="register" v-show="loginOrRegister == 'register'" autocomplete="off">
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
						<input :type="passwordType" name="password" placeholder="请输入密码" v-model="register.password">
						<span class="ico show-pwd" @click="showPwd">
							<svg-icon icon-class="eye"/>
						</span>
					</div>
					<div class="ipt">
						<svg-icon class="ico" icon-class="peoples"></svg-icon>
						<input type="text" name="contact" placeholder="请输入联系人" v-model="register.contact">
					</div>
					<div class="ipt">
						<svg-icon class="ico" icon-class="excel"></svg-icon>
						<input type="text" name="company" placeholder="请输入公司名称" v-model="register.company">
					</div>
					<div class="ipt" style="background: none;border: none;padding:5px 0">
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
				<!-- 忘记密码 -->
				<form class="findpassword" v-show="loginOrRegister == 'findpassword'">
					<div class="ipt">
						<svg-icon class="ico" icon-class="customer"></svg-icon>
						<input type="text" name="mobile" placeholder="请输入手机号" v-model="findPassword.mobile">
					</div>
					<div class="ipt">
						<svg-icon class="ico" icon-class="email"></svg-icon>
						<input type="text" name="vcode" placeholder="请输入验证码" v-model="findPassword.vcode">
						<el-button style="width: 100px" type="default" size="mini" :disabled="isGetVCode" @click="getVCode">{{getVcodeText}}</el-button>
					</div>
					<div class="ipt">
						<svg-icon class="ico" icon-class="password"></svg-icon>
						<input :type="passwordType" name="password" placeholder="请输入密码" v-model="findPassword.password">
						<span class="ico show-pwd" @click="showPwd">
							<svg-icon icon-class="eye"/>
						</span>
					</div>
					<div class="ipt">
						<svg-icon class="ico" icon-class="password"></svg-icon>
						<input :type="passwordType" name="confirmPassword" placeholder="请重复输入密码" v-model="findPassword.confirmPassword">
						<span class="ico show-pwd" @click="showPwd">
							<svg-icon icon-class="eye"/>
						</span>
					</div>
					<div class="txt-btn">
						<div class="lg-btn" @click="handleTabClick('login')">登录</div>
						<div class="rg-btn" @click="handleTabClick('register')">注册</div>
					</div>
					<el-button class="login-btn" type="primary" @click="handFindPassword">提交</el-button>
				</form>
			</div>
		</div>
	</div>
</template>
<script>
import request from "../common/request"
import { Message } from 'element-ui'
import { regionData } from 'element-china-area-data'
import { isPoneAvailable, isVerCodeAvailable } from '../common/validators'
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
			// 找回提交的参数
			findPassword: {
				mobile: '',
				vcode: '',
				password: '',
				confirmPassword: ''
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

			let params = {}

			if (this.loginOrRegister == 'register') {
				if (this.register.mobile == '') {
					Message.error('手机号不能为空！')
					return
				}
				if (!isPoneAvailable(this.register.mobile)) {
					Message.error('请输入正确的手机号！')
					return
				}
				params = {
					mobile: this.register.mobile
				}
			} else if (this.loginOrRegister == 'findpassword') {
				if (this.findPassword.mobile == '') {
					Message.error('手机号不能为空！')
					return
				}
				if (!isPoneAvailable(this.findPassword.mobile)) {
					Message.error('请输入正确的手机号！')
					return
				}
				params = {
					mobile: this.findPassword.mobile,
					type: 'forget'
				}
			}

			this.timeGo()
			console.log(params)
			request({
				url: '/common/vcode',
				params
			}).then(res => {
				console.log(res.data)
				Message({
					type: 'info',
					message: res.data.data,
					duration: 3 * 1000
				})
			})
		},
		/**
		 * 	登录
		 */
		handLogin() {
			if (!this.login.username.trim()) {
				Message.error('用户名不能为空！')
				return
			}
			if (this.login.username.length > 50) {
				Message.error('用户名过长！')
				return
			}
			if (!this.login.password.trim()) {
				Message.error('用户名不能为空！')
				return
			}
			if (this.login.password.length > 32) {
				Message.error('密码过长！')
				return
			}
			let data = {
				username: this.login.username,
				password: this.login.password
			}
			request({
				url: '/mem/login',
				method: 'POST',
				data
			}).then(res => {
				if (res.data.code == 200) {
					Message.success('成功！')
					new Promise((resolve, reject) => {
						this.$store.dispatch('login', res.headers['authorization'])
						resolve()
					}).then(() => {
						this.$store.dispatch('getUserInfo')
						this.$router.push({name: 'home'})
					})
				}
			})
		},
		/**
		 * 	注册
		 */
		handRegister() {
			if (!this.register.mobile.trim()) {
				Message.error('手机号不能为空！')
				return
			}
			if (!isPoneAvailable(this.register.mobile)) {
				Message.error('请输入正确的手机号！')
				return
			}
			if (!this.register.vcode.trim()) {
				Message.error('验证码不能为空！')
				return
			}
			if (this.register.vcode.length != 6) {
				Message.error('请输入正确长度的验证码！')
				return
			}
			if (!this.register.password.trim()) {
				Message.error('密码不能为空！')
				return
			}
			if (this.register.password.length > 32) {
				Message.error('密码过长！')
				return
			}
			if (!this.register.contact.trim()) {
				Message.error('联系人不能为空！')
				return
			}
			if (!this.register.company.trim()) {
				Message.error('公司不能为空！')
				return
			}
			if (this.register.company.length > 100) {
				Message.error('公司名过长！')
				return
			}
			if (!this.register.province.trim() || !this.register.city.trim()) {
				Message.error('省份和城市必选！')
				return
			}
			if (!this.register.address.trim()) {
				Message.error('详细地址不能为空！')
				return
			}
			if (this.register.address.length > 100) {
				Message.error('地址过长！')
				return
			}
			let data = {
				mobile: this.register.mobile,
				vcode: this.register.vcode,
				password: this.register.password,
				contact: this.register.contact,
				company: this.register.company,
				province: this.register.province,
				city: this.register.city,
				address: this.register.address
			}
			request({
				url: '/mem/register',
				method: 'POST',
				data
			}).then(res => {
				if (res.data.code == 200) {
					Message.success('成功！')
					new Promise((resolve, reject) => {
						this.$store.dispatch('register', res.headers['authorization'])
						resolve()
					}).then(() => {
						this.$store.dispatch('getUserInfo')
						this.$router.push({name: 'home'})
					})
				}
			})
		},
		/**
		 * 	找回密码
		 */
		handFindPassword() {
			if (!this.findPassword.mobile.trim()) {
				Message.error('手机号不能为空！')
				return
			}
			if (!isPoneAvailable(this.findPassword.mobile)) {
				Message.error('请输入正确的手机号！')
				return
			}
			if (!this.findPassword.vcode.trim()) {
				Message.error('验证码不能为空！')
				return
			}
			if (this.findPassword.vcode.length != 6) {
				Message.error('请输入正确长度的验证码！')
				return
			}
			if (!this.findPassword.password.trim()) {
				Message.error('密码不能为空！')
				return
			}
			if (this.findPassword.password.length > 32) {
				Message.error('密码过长！')
				return
			}
			if (this.findPassword.password != this.findPassword.confirmPassword) {
				Message.error('重复输入密码不一致！')
				return
			}
			let data = {
				mobile: this.findPassword.mobile,
				vcode: this.findPassword.vcode,
				password: this.findPassword.password,
				confirmPassword: this.findPassword.confirmPassword
			}
			request({
				url: '/mem/passwor/forget',
				method: 'POST',
				data
			}).then(res => {
				console.log(res.data)
				if (res.data.code == 200) {
					Message.success('成功！')
					this.loginOrRegister = 'login'
					this.login = {
						username: '',
						password: ''
					}
				}
			})
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
				.login
					.txt-btn
						color #409EFF
						text-align center
						height 30px
						line-height 30px
						margin-top 10px
						cursor pointer
				.findpassword
					.txt-btn
						display flex
						color #409EFF
						height 30px
						line-height 30px
						margin-top 10px
						cursor pointer
					.lg-btn
						flex 1
						text-align left
					.gg-btn
						flex 1
						text-align right
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
