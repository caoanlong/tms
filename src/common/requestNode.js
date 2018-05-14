import axios from 'axios'
import { Message } from 'element-ui'
import store from '../store'

// create an axios instance
const service = axios.create({
	baseURL: process.env.BASE_NODE_API, // api的base_url
	timeout: 45000, // request timeout,
	// headers: { 'Authorization': localStorage.getItem('token') }
})

// request interceptor
service.interceptors.request.use(config => {
	// Do something before request is sent
	// if (store.getters.token) {
		// 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
		config.headers['Authorization'] = localStorage.getItem('token')
	// }
	return config
}, error => {
	// Do something with request error
	console.log(error) // for debug
	Promise.reject(error)
})

// respone interceptor
service.interceptors.response.use(
	response => {
		if (response.data.code == 1001 
			|| response.data.code == 1002 
			|| response.data.code == 1003 
			|| response.data.code == 1004) {
			localStorage.clear()
			window.location.href = '/#/login'
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
