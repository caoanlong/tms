<template>
	<div class="login-container" :class="{'minH': loginOrRegister == 'login'}">
		<div class="login-box">
			<h1 class="login-title">华新智运</h1>
			<div class="form">
				<div class="tabs">
					<div 
						v-show="loginOrRegister != 'findpassword'"
						class="tab-item" 
						:class="{'active minH': loginOrRegister == 'login'}" 
						@click="handleTabClick('login')">登录</div>
					<div v-show="loginOrRegister == 'findpassword'" class="tab-item findpwd active">找回密码</div>
				</div>
				<!-- 登录 -->
				<el-form auto-complete="off" :model="login" :rules="loginRules" ref="loginForm" style="margin-top:20px" v-if="loginOrRegister == 'login'">
					<el-form-item prop="username">
						<!-- 为了取消chrome自动填充密码 -->
					<input type="password" id="disabledAutoComplete" name="disabledAutoComplete" style="display:none">
					<!-- 为了取消chrome自动填充密码 -->
						<el-input  auto-complete="off" v-model="login.username" placeholder="请输入用户名">
							<template slot="prefix"><svg-icon class="ico" icon-class="customer"></svg-icon></template>
						</el-input>
					</el-form-item>
					<el-form-item prop="password">
						<el-input  auto-complete="off" :type="passwordType" v-model="login.password" placeholder="请输入密码" @keyup.enter.native="handLogin">
							<template slot="prefix">
								<svg-icon class="ico" icon-class="password"></svg-icon>
							</template>
							<template slot="suffix">
								<span class="show-pwd" @click="showPwd">
									<svg-icon icon-class="eye-open" v-show="passwordType == 'text'"/>
									<svg-icon icon-class="eye" v-show="passwordType == 'password'"/>
								</span>
							</template>
						</el-input>
					</el-form-item>
					<div class="other">
						<!-- <el-checkbox v-model="checked">下次自动登录</el-checkbox> -->
						<span @click="handleTabClick('findpassword')"  class="forget">忘记密码?</span>
					</div>
					<el-button class="login-btn" type="primary" @click="handLogin">登录</el-button>
				</el-form>
				<!-- 注册 -->
				<el-form :model="register" :rules="registerRules" ref="registerForm" style="margin-top:20px" v-if="loginOrRegister == 'register'">
					<el-form-item prop="mobile">
						<!-- 为了取消chrome自动填充密码 -->
						<input type="password" id="disabledAutoComplete2" name="disabledAutoComplete2" style="display:none">
						<!-- 为了取消chrome自动填充密码 -->
						<el-input  auto-complete="off" v-model="register.mobile" placeholder="请输入手机号">
							<template slot="prefix"><svg-icon class="ico" icon-class="customer"></svg-icon></template>
						</el-input>
					</el-form-item>
					<el-form-item prop="vcode">
						<el-input  auto-complete="off" v-model="register.vcode" placeholder="请输入验证码">
							<template slot="prefix"><svg-icon class="ico" icon-class="email"></svg-icon></template>
							<template slot="suffix">
								<el-button type="default" size="mini" :disabled="isGetVCode" @click="getVCode">{{getVcodeText}}</el-button>
							</template>
						</el-input>
					</el-form-item>
					<el-form-item prop="password">
						<el-input  auto-complete="off" :type="passwordType" v-model="register.password" placeholder="请输入密码">
							<template slot="prefix">
								<svg-icon class="ico" icon-class="password"></svg-icon>
							</template>
							<template slot="suffix">
								<span class="show-pwd" @click="showPwd">
									<svg-icon icon-class="eye-open" v-show="passwordType == 'text'"/>
									<svg-icon icon-class="eye" v-show="passwordType == 'password'"/>
								</span>
							</template>
						</el-input>
					</el-form-item>
					<el-form-item prop="contact">
						<el-input  auto-complete="off" v-model="register.contact" placeholder="请输入联系人">
							<template slot="prefix"><svg-icon class="ico" icon-class="peoples"></svg-icon></template>
						</el-input>
					</el-form-item>
					<el-form-item prop="company">
						<el-input  auto-complete="off" v-model="register.company" placeholder="请输入公司名称">
							<template slot="prefix"><svg-icon class="ico" icon-class="excel"></svg-icon></template>
						</el-input>
					</el-form-item>
					<el-row>
						<el-col :span="11">
							<el-form-item prop="province">
								<el-select style="width:100%" placeholder="请选择公司所在省份" v-model="register.province" @change="handProvince">
									<el-option v-for="province in provinces" :key="province.value" :label="province.label" :value="province.value"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col class="line" :span="2"> &nbsp; </el-col>
						<el-col :span="11">
							<el-form-item prop="city">
								<el-select style="width:100%" placeholder="请选择公司所在城市" v-model="register.city" @change="handCity">
									<el-option v-for="city in citys" :key="city.value" :label="city.label" :value="city.value"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
					</el-row>
					<el-form-item prop="address">
						<el-input  auto-complete="off" v-model="register.address" placeholder="请输入公司所在地址">
							<template slot="prefix"><svg-icon class="ico" icon-class="home-icon"></svg-icon></template>
						</el-input>
					</el-form-item>
					<div class="other">
						<el-checkbox v-model="checked">同意</el-checkbox><span @click="agreement" class="agreement">《微服TMS用户协议》</span>
					</div>
					<el-button class="login-btn" type="primary" :disabled="!checked" @click="handRegister">注册</el-button>
				</el-form>
				<!-- 忘记密码 -->
				<el-form auto-complete="new-password" :model="findPassword" :rules="findPasswordRules" ref="findPasswordForm" style="margin-top:20px" v-if="loginOrRegister == 'findpassword'">
					<!-- 为了取消chrome自动填充密码 -->
					<input type="password" id="disabledAutoComplete3" name="disabledAutoComplete3" style="display:none">
					<!-- 为了取消chrome自动填充密码 -->
					<el-form-item prop="mobile">
						<el-input  auto-complete="off" v-model="findPassword.mobile" placeholder="请输入手机号">
							<template slot="prefix"><svg-icon class="ico" icon-class="customer"></svg-icon></template>
						</el-input>
					</el-form-item>
					<el-form-item prop="vcode">
						<el-input  auto-complete="off" v-model="findPassword.vcode" placeholder="请输入验证码">
							<template slot="prefix"><svg-icon class="ico" icon-class="email"></svg-icon></template>
							<template slot="suffix">
								<el-button type="default" size="mini" :disabled="isGetVCode" @click="getVCode">{{getVcodeText}}</el-button>
							</template>
						</el-input>
					</el-form-item>
					<el-form-item prop="password">
						<el-input  auto-complete="off" :type="passwordType" v-model="findPassword.password" placeholder="请输入密码">
							<template slot="prefix">
								<svg-icon class="ico" icon-class="password"></svg-icon>
							</template>
							<template slot="suffix">
								<span class="show-pwd" @click="showPwd">
									<svg-icon icon-class="eye-open" v-show="passwordType == 'text'"/>
									<svg-icon icon-class="eye" v-show="passwordType == 'password'"/>
								</span>
							</template>
						</el-input>
					</el-form-item>
					<el-form-item prop="confirmPassword">
						<el-input  auto-complete="off" :type="passwordType" v-model="findPassword.confirmPassword" placeholder="请重复输入密码"  @keyup.enter.native="handFindPassword">
							<template slot="prefix">
								<svg-icon class="ico" icon-class="password"></svg-icon>
							</template>
							<template slot="suffix">
								<span class="show-pwd" @click="showPwd">
									<svg-icon icon-class="eye-open" v-show="passwordType == 'text'"/>
									<svg-icon icon-class="eye" v-show="passwordType == 'password'"/>
								</span>
							</template>
						</el-input>
					</el-form-item>
					<el-row class="other">
						<el-col :span="12" class="agreement">&nbsp;</el-col>
						<el-col :span="12" @click.native="handleTabClick('login')" class="agreement" style="text-align:right">登录</el-col>
						<!-- <el-col :span="12" @click.native="handleTabClick('register')" class="agreement" style="text-align:right">注册</el-col> -->
					</el-row>
					<el-button class="login-btn" type="primary" @click="handFindPassword">提交</el-button>
				</el-form>
			</div>
		</div>
		<Footer/>
	</div>
</template>
<script>
import { Message } from 'element-ui'
import Footer from './CommonComponents/Footer'
import { baseURL } from "../common/request"
import Member from '../api/Member'
import SysMember from '../api/SysMember'
import BaseCommon from '../api/BaseCommon'
import Company from '../api/Company'
import dist from '../assets/data/dist.json'
import { setCooikie, getCooikie } from '../common/utils'
import { checkMobile } from '../common/validator'
export default {
	name: 'App',
	data() {
		return {
			checked: false,
			//TMS用户协议
			ShowAgreement:false,
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
			wait: 60,
			isGetVCode: false,
			getVcodeText: '获取验证码',
			citys: [],
			loginRules: {
				username: [
					{required: true, message: '请输入用户名', trigger: 'blur'}, 
					{min: 1, max: 50, message: '长度在 1 到 50 个字符'}
				],
				password: [
					{required: true, message: '请输入密码', trigger: 'blur'}, 
					{min: 8, max: 16, message: '密码必须是8-16位字母、下划线、数字'}
				]
			},
			registerRules: {
				mobile: [{required: true, message: '请输入手机号'}, {validator: checkMobile}],
				vcode: [{required: true, message: '请输入验证码'}],
				password: [{required: true, message: '请输入密码'}, {min: 8, max: 16, message: '密码必须是8-16位字母、下划线、数字'}],
				contact: [{required: true, message: '请输入联系人'}, {min: 1, max: 50, message: '长度在 1 到 50 个字符'}],
				company: [{required: true, message: '请输入公司名称'}, {min: 1, max: 100, message: '长度在 1 到 100 个字符'}],
				province: [{required: true, message: '请选择公司所在省份'}],
				city: [{required: true, message: '请选择公司所在城市'}],
				address: [{required: true, message: '请输入公司所在地址'}, {min: 1, max: 100, message: '长度在 1 到 100 个字符'}]
			},
			findPasswordRules: {
				mobile: [{required: true, message: '请输入手机号'}, {validator: checkMobile}],
				vcode: [{required: true, message: '请输入验证码'}],
				password: [{required: true, message: '请输入密码'}, {min: 8, max: 16, message: '密码必须是8-16位字母、下划线、数字'}],
				confirmPassword: [
					{required: true, message: '请重复输入密码'}, 
					{min: 8, max: 16, message: '密码必须是8-16位字母、下划线、数字'},
					{validator: (rule, value, callback) => {
						value == this.findPassword.password ? callback() : callback(new Error('两次输入密码不一致!'))
					}}
				],
			}
		}
	},
	computed: {
		provinces: () => dist.map(item => {
			return {
				label: item.label,
				value: item.value
			}
		})
	},
	components: { Footer },
	mounted() {
		this.login.username = getCooikie('loginUserName')
	},
	methods: {
		/**
		 * 	tab标签切换
		 */
		handleTabClick(tab) {
			this.loginOrRegister = tab
		},
		/**
		 * 	省份选择
		 */
		handProvince(data) {
			this.register.province = data
			this.register.city = ''
			for (let i = 0; i < dist.length; i++) {
				if (data === dist[i].value) {
					this.citys = dist[i].children
				}
			}
		},
		/**
		 * 	城市选择
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
			if (this.loginOrRegister == 'register') {
				this.$refs['registerForm'].validateField('mobile', errMsg => {
					if (errMsg) {
						Message.error(errMsg)
						return
					}
					const params = { mobile: this.register.mobile }
					this.timeGo()
					BaseCommon.getSMSCode(params).then(res => {
						if (baseURL.includes('develop')) Message.info(res.data)
					})
				})
			} else if (this.loginOrRegister == 'findpassword') {
				this.$refs['findPasswordForm'].validateField('mobile', errMsg => {
					if (errMsg) {
						Message.error(errMsg)
						return
					}
					const params = { mobile: this.findPassword.mobile, type: 'forget' }
					this.timeGo()
					BaseCommon.getSMSCode(params).then(res => {
						if (baseURL.includes('develop')) Message.info(res.data)
					})
				})
			}
		},
		/**
		 * 	登录
		 */
		handLogin() {
			this.$refs['loginForm'].validate(valid => {
				if (!valid) return
				SysMember.login({
					username: this.login.username.trim(),
					password: this.login.password.trim()
				}).then(res => {
					console.log(res)
					Message.success('成功！')
					setCooikie('loginUserName', this.login.username)
					new Promise((resolve, reject) => {
						this.$store.dispatch('login', res['Authorization'])
						resolve()
					}).then(() => {
						this.$router.push({name: 'home'})
						this.$store.dispatch('getUserInfo')
						this.$store.dispatch('getMenu')
					})
				})
			})
		},
		
		agreement() {
			this.$alert('<div class="agreement"><p>一、总则</p><p>1.1 微服TMS的所有权和运营权归云南微服物流大数据运营有限公司所有。</p><p>1.2 用户在注册之前，应当仔细阅读本协议，并同意遵守本协议后方可成为注册用户。一旦注册成功，则用户与微服TMS之间自动形成协议关系，用户应当受本协议的约束。用户在使用特殊的服务或产品时，应当同意接受相关协议后方能使用。</p><p>1.3 本协议则可由微服TMS随时更新，用户应当及时关注并同意，本站不承担通知义务。本站的通知、公告、声明或其它类似内容是本协议的一部分。</p><p>二、服务内容</p><p>2.1 微服TMS的具体内容由本站根据实际情况提供。</p><p>2.2 本站仅提供相关的网络服务，除此之外与相关网络服务有关的设备(如个人电脑、手机、及其他与接入互联网或移动网有关的装置)及所需的费用( 如为接入互联网而支付的电话费及上网费、为使用移动网而支付的手机费)均应由用户自行负担。</p><p>三、用户帐号</p><p>3.1 经本站注册系统完成注册程序并通过身份认证的用户即成为正式用户，可以获得本站规定用户所应享有的一切权限；未经认证仅享有本站规定的部分会员权限。微服TMS有权对会员的权限设计进行变更。</p><p>3.2 用户只能按照注册要求使用真实姓名，及身份证号注册。用户有义务保证密码和帐号的安全，用户利用该密码和帐号所进行的一切活动引起的任何损失或损害，由用户自行承担全部责任，本站不承担任何责任。如用户发现帐号遭到未授权的使用或发生其他任何安全问题，应立即修改帐号密码并妥善保管，如有必要，请通知本站。因黑客行为或用户的保管疏忽导致帐号非法使用，本站不承担任何责任。</p><p>四、使用规则</p><p>4.1 遵守中华人民共和国相关法律法规，包括但不限于《中华人民共和国计算机信息系统安全保护条例》、《计算机软件保护条例》、《最高人民法院关于审理涉及计算机网络著作权纠纷案件适用法律若干问题的解释(法释[2004]1号)》、《全国人大常委会关于维护互联网安全的决定》、《互联网电子公告服务管理规定》、《互联网新闻信息服务管理规定》、《互联网著作权行政保护办法》和《信息网络传播权保护条例》等有关计算机互联网规定和知识产权的法律和法规、实施办法。 </p><p>4.2 用户对其自行发表、上传或传送的内容负全部责任，所有用户不得在本站任何页面发布、转载、传送含有下列内容之一的信息，否则本站有权自行处理并不通知用户：</p><p>(1)违反宪法确定的基本原则的；</p><p>(2)危害国家安全，泄漏国家机密，颠覆国家政权，破坏国家统一的；</p><p>(3)损害国家荣誉和利益的；</p><p>(4)煽动民族仇恨、民族歧视，破坏民族团结的；</p><p>(5)破坏国家宗教政策，宣扬邪教和封建迷信的；</p><p>(6)散布谣言，扰乱社会秩序，破坏社会稳定的；</p><p>(7)散布淫秽、色情、赌博、暴力、恐怖或者教唆犯罪的；</p><p>(8)侮辱或者诽谤他人，侵害他人合法权益的；</p><p>(9)煽动非法集会、结社、游行、示威、聚众扰乱社会秩序的；</p><p>(10)以非法民间组织名义活动的；</p><p>(11)含有法律、行政法规禁止的其他内容的。</p><p>4.3 用户承诺对其发表或者上传于本站的所有信息(即属于《中华人民共和国著作权法》规定的作品，包括但不限于文字、图片、音乐、电影、表演和录音录像制品和电脑程序等)均享有完整的知识产权，或者已经得到相关权利人的合法授权；如用户违反本条规定造成本站被第三人索赔的，用户应全额补偿本站一切费用(包括但不限于各种赔偿费、诉讼代理费及为此支出的其它合理费用)； </p><p>4.4 当第三方认为用户发表或者上传于本站的信息侵犯其权利，并根据《信息网络传播权保护条例》或者相关法律规定向本站发送权利通知书时，用户同意本站可以自行判断决定删除涉嫌侵权信息，除非用户提交书面证据材料排除侵权的可能性，本站将不会自动恢复上述删除的信息；</p><p>(1)不得为任何非法目的而使用网络服务系统；</p><p>(2)遵守所有与网络服务有关的网络协议、规定和程序；</p><p>(3)不得利用本站进行任何可能对互联网的正常运转造成不利影响的行为；</p><p>(4)不得利用本站进行任何不利于本站的行为。</p><p>4.5 如用户在使用网络服务时违反上述任何规定，本站有权要求用户改正或直接采取一切必要的措施(包括但不限于删除用户张贴的内容、暂停或终止用户使用网络服务的权利)以减轻用户不当行为而造成的影响。</p><p>五、隐私保护</p><p>5.1 本站不对外公开或向第三方提供单个用户的注册资料及用户在使用网络服务时存储在本站的非公开内容，但下列情况除外：</p><p>(1)事先获得用户的明确授权；</p><p>(2)根据有关的法律法规要求；</p><p>(3)按照相关政府主管部门的要求；</p><p>(4)为维护社会公众的利益。</p><p>5.2 本站可能会与第三方合作向用户提供相关的网络服务，在此情况下，如该第三方同意承担与本站同等的保护用户隐私的责任，则本站有权将用户的注册资料等提供给该第三方。</p><p>5.3 在不透露单个用户隐私资料的前提下，本站有权对整个用户数据库进行分析并对用户数据库进行商业上的利用。</p><p>六、版权声明</p><p>6.1 本站的文字、图片、音频、视频等版权均归云南微服物流大数据运营有限公司享有或与作者共同享有，未经本站许可，不得任意转载。 </p><p>6.2 本站特有的标识、版面设计、编排方式等版权均属云南微服物流大数据运营有限公司享有，未经本站许可，不得任意复制或转载。 </p><p>6.3 使用本站的任何内容均应注明“来源于微服TMS”及署上作者姓名，按法律规定需要支付稿酬的，应当通知本站及作者及支付稿酬，并独立承担一切法律责任。</p><p>6.4 本站享有所有作品用于其它用途的优先权，包括但不限于网站、电子杂志、平面出版等，但在使用前会通知作者，并按同行业的标准支付稿酬。</p><p>6.5 本站所有内容仅代表作者自己的立场和观点，与本站无关，由作者本人承担一切法律责任。 </p><p>6.6 恶意转载本站内容的，本站保留将其诉诸法律的权利。</p><p>七、责任声明</p><p>7.1 用户明确同意其使用本站网络服务所存在的风险及一切后果将完全由用户本人承担，微服TMS对此不承担任何责任。 </p><p>7.2 本站无法保证网络服务一定能满足用户的要求，也不保证网络服务的及时性、安全性、准确性。 </p><p>7.3 本站不保证为方便用户而设置的外部链接的准确性和完整性，同时，对于该等外部链接指向的不由本站实际控制的任何网页上的内容，本站不承担任何责任。</p><p>7.4 对于因不可抗力或本站不能控制的原因造成的网络服务中断或其它缺陷，本站不承担任何责任，但将尽力减少因此而给用户造成的损失和影响。</p><p>7.5 对于站向用户提供的下列产品或者服务的质量缺陷本身及其引发的任何损失，本站无需承担任何责任：</p><p>(1)本站向用户免费提供的各项网络服务；</p><p>(2)本站向用户赠送的任何产品或者服务。</p><p>7.6 本站有权于任何时间暂时或永久修改或终止本服务(或其任何部分)，而无论其通知与否，本站对用户和任何第三人均无需承担任何责任。</p><p>八、附则</p><p>8.1 本协议的订立、执行和解释及争议的解决均应适用中华人民共和国法律。</p><p>8.2 如本协议中的任何条款无论因何种原因完全或部分无效或不具有执行力，本协议的其余条款仍应有效并且有约束力。</p><p>8.3 本协议解释权及修订权归云南微服物流大数据运营有限公司所有。</p></div>', '微服TMS用户协议', {
				dangerouslyUseHTMLString: true,
				customClass:'agreementDialog',
				showClose:false
			})
		},
		/**
		 * 	注册
		 */
		handRegister() {
			this.$refs['registerForm'].validate(valid => {
				if (!valid) return
				Company.applyAdd({
					mobile: this.register.mobile.trim(),
					vcode: this.register.vcode.trim(),
					password: this.register.password.trim(),
					contact: this.register.contact.trim(),
					company: this.register.company.trim(),
					province: this.register.province,
					city: this.register.city,
					address: this.register.address.trim()
				}).then(res => {
					Message.success('成功！')
					setCooikie('loginUserName', this.login.username)
					this.loginOrRegister = 'login'
					// new Promise((resolve, reject) => {
					// 	this.$store.dispatch('register', res.headers['authorization'])
					// 	resolve()
					// }).then(() => {
					// 	this.$router.push({name: 'home'})
					// 	this.$store.dispatch('getUserInfo')
					// 	this.$store.dispatch('getMenu')
					// })
				})
			})
		},
		/**
		 * 	找回密码
		 */
		handFindPassword() {
			this.$refs['findPasswordForm'].validate(valid => {
				if (!valid) return
				SysMember.resetPassword({
					mobile: this.findPassword.mobile.trim(),
					vcode: this.findPassword.vcode.trim(),
					password: this.findPassword.password.trim(),
					confirmPassword: this.findPassword.confirmPassword.trim()
				}).then(res => {
					Message.success('成功！')
					this.loginOrRegister = 'login'
					this.login = { username: '', password: '' }
				})
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
				this.getVcodeText = this.wait + 's'
				this.wait--
				setTimeout(() => { this.timeGo() }, 1000)
			}
		}
	}
}
</script>
<style lang="stylus" scoped>
	.login-container
		position relative
		height 100%
		min-height 768px
		background #5974c8
		&.minH
			min-height 500px
		.login-box
			position absolute
			top 0
			left 50%
			width 480px
			margin-left -240px
			.login-title
				text-align center
				color #fff
			.form
				padding 0 15px 30px 15px
				background #fff
				border-radius 8px
				box-shadow 0 10px 30px rgba(0, 0, 0, .2)
				.tabs
					position relative
					height 50px
					line-height 50px
					color #303133
					.spit-line
						position absolute
						left 225px
						top 0
						width 1px
						height 50px
						background #e4e7ed
					.tab-item
						text-align center
						cursor pointer
						border-bottom 1px solid #e4e7ed
						&:hover
							color #409EFF
						&.active
							color #409EFF
							border none
					.findpwd
						width 100%
				.findpassword
					.txt-btn
						color #409EFF
						height 30px
						line-height 30px
						margin-top 10px
						cursor pointer
				.ipt
					position relative
					width 100%
					height 40px
					margin-top 10px
					border-radius 5px
					border 1px solid #e4e7ed
					padding 0 5px
					.ico
						position absolute
						left 0
						top 12px
						z-index 10
						width 30px
						color #ccc
					.show-pwd
						position absolute
						right 0
						top 12px
						width 30px
						color #ccc
						font-size 16px
						cursor pointer
						user-select none
					.vercode-btn
						position absolute
						right 10px
						top 5px
						width 100px
					input
						display block
						position relative
						top 1px
						width 100%
						height 36px
						line-height 36px
						padding-left 30px
						border none
						outline none
						background none
						-webkit-appearance none
					.sel
						width 215px
					.btn
						float left
						width 50%
				.login-btn
					width 100%
					margin-top 10px
			.other
				line-height 1.5
				.forget
					float right
					color #409EFF
					font-size 14px
					cursor pointer
				.agreement
					color #409EFF
					font-size 14px
					cursor pointer
</style>
