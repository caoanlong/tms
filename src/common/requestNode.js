import axios from 'axios'
import { Message } from 'element-ui'

// create an axios instance
const service = axios.create({
	baseURL: process.env.BASE_NODE_API, // api的base_url
	timeout: 45000, // request timeout
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

let href = ''

if (process.env.ENV_CONFIG == 'test') {
	href = '/tms/#/login' // 测试
} else if (process.env.ENV_CONFIG == 'practice') {
	href = '/tms-h5/login' // 演练
} else {
	href = '/login'  // 生产
}

// respone interceptor
service.interceptors.response.use(
	response => {
		if (   response.data.code == 1001 
			|| response.data.code == 1002 
			|| response.data.code == 1003 
			|| response.data.code == 1004) {
			localStorage.clear()
			window.location.href = href
			return Promise.reject('error')
		}
		return response
	},
	error => {
		console.log('err' + error)// for debug
		Message({
			message: error.message,
			type: 'error',
			duration: 5 * 1000
		})
		return Promise.reject(error)
	})

export default service
