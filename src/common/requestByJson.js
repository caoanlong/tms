import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import { href, msgBox } from './request'

export const baseURL = process.env.BASE_API

// create an axios instance
const service = axios.create({
	baseURL: baseURL, // api的base_url
	timeout: 50000 // request timeout
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

export default service
