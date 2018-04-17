import axios from 'axios'
import { Message, MessageBox } from 'element-ui'

export const baseURL = process.env.BASE_API

// create an axios instance
const service = axios.create({
	baseURL: baseURL, // api的base_url
	timeout: 50000, // request timeout
	transformRequest: [function (data) {
		// Do whatever you want to transform the data
		let ret = ''
		for (let it in data) {
			ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
		}
		return ret
	}],
	headers: {
		'Content-Type': 'application/x-www-form-urlencoded'
	}
})

// request interceptor
service.interceptors.request.use(config => {
	config.headers['Authorization'] = localStorage.getItem('token')
	return config
}, error => {
	// Do something with request error
	console.log(error) // for debug
	Promise.reject(error)
})

// respone interceptor
service.interceptors.response.use(
response => {
	if (response.data.code != 200) {
		if (response.data.code == 100 // 用户未登录
			|| response.data.code == 101 // 用户不存在
			|| response.data.code == 403 // 拒绝访问
			|| response.data.code == 5201 // Token验证失败, 请求重新登录!
			|| response.data.code == 5202) { // 帐号已在其它地方登录!
			localStorage.clear()
			Message.error(response.data.msg)
			if (process.env == 'production') {
				window.location.href = '/#/login'
			} else {
				window.location.href = '/tms/#/login'
			}

			return Promise.reject('error')
		}
		if (response.data.code == 104) {
			MessageBox({
				title: '温馨提示！',
				customClass: 'msg-info',
				message: `
				<div style="text-align: center;">
					<p style="margin-top: 40px">
						您已提交申请，请等待审核！
					</p>
					<p style="margin-top: 40px;color: #aaa">
						一般客户处理时间为24小时内；客服联系电话，13529005327
					</p>
					<button style="margin-top: 20px" onclick="localStorage.clear();location.href = '/tms/#/login'">退出当前账户</button>
				</div>
				`,
				dangerouslyUseHTMLString: true,
				closeOnPressEscape: false,
				showClose: false,
				closeOnClickModal: false,
				showConfirmButton: false
			})
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
	console.log(error)// for debug
	Message({
		message: error,
		type: 'error',
		duration: 5 * 1000
	})
	return Promise.reject(error)
})

export default service
