import axios from 'axios'
import qs from 'qs'
import { Message, MessageBox } from 'element-ui'

export const baseURL = process.env.BASE_API

const msg = null

export const href = () => {
	if (process.env.ENV_CONFIG == 'test') {
		return '/tms/#/login' // 测试
	} else if (process.env.ENV_CONFIG == 'practice') {
		return '/tms-h5/#/login' // 演练
	} else {
		return '/#/login'  // 生产
	}
}

export const msgBox = () => {
	const msgEl = document.createElement('div')
	msgEl.id = 'msgEl'
	msgEl.style.width = '100%'
	msgEl.style.height = '100%'
	msgEl.style.position = 'fixed'
	msgEl.style.left = '0px'
	msgEl.style.top = '0px'
	msgEl.style.zIndex = '2000'
	msgEl.innerHTML = `
	<div style="position:absolute;z-index:2;width:50%;left:50%;top:50%;padding:20px;transform: translate(-50%,-50%);background-color:#fff;box-shadow:0 5px 5px rgba(0,0,0,.2)">
		<div>温馨提示！</div>
		<div style="text-align: center;">
			<p style="margin-top: 40px">
				您已提交申请，请等待审核！
			</p>
			<p style="margin-top: 40px;color: #aaa">
				一般客户处理时间为24小时内；客服电话：0871 - 67366889
			</p>
			<button style="margin-top: 20px" onclick="document.body.removeChild(document.getElementById('msgEl'));localStorage.clear();location.href='${href()}';">退出当前账户</button>
		</div>
	</div>
	<div style="width:100%;height:100%;position:absolute;left:0;top:0;background-color:rgba(0,0,0,.3)"></div>`
	return msgEl
}

// create an axios instance
const service = axios.create({
	baseURL: baseURL, // api的base_url
	timeout: 50000 // request timeout
})

// request interceptor
service.interceptors.request.use(config => {
	config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
	config.headers['Authorization'] = localStorage.getItem('token')
	if (config.data && config.headers['Content-Type'].includes('application/x-www-form-urlencoded')) {
    	config.data = qs.stringify(config.data)
	}
	return config
}, error => {
	Promise.reject(error)
})

// respone interceptor
service.interceptors.response.use(
response => {
	if (response.data.code != 200) {
		if (   response.data.code == 100 // 用户未登录
			|| response.data.code == 101 // 用户不存在
			|| response.data.code == 403 // 拒绝访问
			|| response.data.code == 5001 // 手机号已注册过
			|| response.data.code == 5002 // 手机验证码错误
			|| response.data.code == 5101 // 两次输入密码不相同
			|| response.data.code == 5201 // Token验证失败, 请求重新登录!
			|| response.data.code == 5202) { // 帐号已在其它地方登录!
			localStorage.clear()
			Message.error(response.data.msg)
			window.location.href = href()
			return Promise.reject('error')
		}
		if (response.data.code == 104) {
			if (!document.getElementById('msgEl')) {
				document.body.appendChild(msgBox())
			}
			return
		}
		if (response.data.code == 2001) {
			return response
		}
		Message.error(response.data.msg)
		return Promise.reject('error')
	} else {
		return response
	}
},
error => {
	Message.error(error.toString())
	return
})

export default service
