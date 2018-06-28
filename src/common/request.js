import axios from 'axios'
import qs from 'qs'
import { Message, MessageBox } from 'element-ui'

export const baseURL = process.env.BASE_API


export const href = () => {
	if (process.env.ENV_CONFIG == 'test') {
		return '/tms/#/login' // 测试
	} else if (process.env.ENV_CONFIG == 'practice') {
		return '/tms-h5/#/login' // 演练
	} else {
		return '/#/login'  // 生产
	}
}
export const msgBox = {
	title: '温馨提示！',
	customClass: 'msg-info',
	message: `
	<div style="text-align: center;">
		<p style="margin-top: 40px">
			您已提交申请，请等待审核！
		</p>
		<p style="margin-top: 40px;color: #aaa">
			一般客户处理时间为24小时内；客服电话：0871 - 67366889
		</p>
		<button style="margin-top: 20px" onclick="localStorage.clear();location.href='${href()}'">退出当前账户</button>
	</div>
	`,
	dangerouslyUseHTMLString: true,
	closeOnPressEscape: false,
	showClose: false,
	closeOnClickModal: false,
	showConfirmButton: false
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
	// Do something with request error
	console.log(error) // for debug
	Promise.reject(error)
})

// respone interceptor
service.interceptors.response.use(
response => {
	if (response.data.code != 200) {
		if (   response.data.code == 100 // 用户未登录
			|| response.data.code == 101 // 用户不存在
			|| response.data.code == 403 // 拒绝访问
			|| response.data.code == 5201 // Token验证失败, 请求重新登录!
			|| response.data.code == 5202) { // 帐号已在其它地方登录!
			localStorage.clear()
			Message.error(response.data.msg)
			window.location.href = href()
			return Promise.reject('error')
		}
		if (response.data.code == 104) {
			MessageBox(msgBox)
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

// jquery ajax
// jQuery.support.cors = true
const ajax = function (json) {
	let data = null
	if (json.data) {
		data = json.data
	} else {
		data = json.params
	}
	return new Promise((resolve, reject) => {
		$.ajax({
			url: baseURL + json.url,
			type: json.method || 'get',
			dataType: 'json',
			processData: false,
			data: !json.contentType ? qs.stringify(data) : data,
			headers: {
				'contentType': json.contentType || 'application/x-www-form-urlencoded;charset=utf-8',
				'Authorization': localStorage.getItem('token')
			},
			beforeSend: (res) => {
			},
			complete: (res) => {
				let response = res.responseJSON
				if (response.code != 200) {
					if (response.code == 100 // 用户未登录
						|| response.code == 101 // 用户不存在
						|| response.code == 403 // 拒绝访问
						|| response.code == 5201 // Token验证失败, 请求重新登录!
						|| response.code == 5202) { // 帐号已在其它地方登录!
						localStorage.clear()
						Message.error(response.msg)
						window.location.href = href()
						reject(res)
						return
					}
					if (response.code == 104) {
						MessageBox(msgBox)
						reject(res)
						return
					}
					if (response.code == 2001) {
						reject({
							data: { code: 2001}
						})
						return
					}
					Message.error(response.msg)
					reject(res)
					return
				} else {
					let resData = {}
					let authorization = res.getResponseHeader('authorization')
					if (authorization) resData.headers = {'authorization': authorization}
					resData.data = response
					resolve(resData)
				}
			},
			success: (res) => {
			},
			error: (res) => {
				reject(res)
				return
			}
		})
	})
}

// export default ajax
export default service
