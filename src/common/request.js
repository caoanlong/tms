import axios from 'axios'
import { Message } from 'element-ui'

// create an axios instance
const service = axios.create({
	baseURL: process.env.BASE_API, // api的base_url
	timeout: 5000, // request timeout
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
			if (response.data.code == 10016) {
				localStorage.clear()
				window.location.href = '/#/login'
				return Promise.reject('error')
			}
			Message.error(response.data.msg)
			return Promise.reject('error')
		} else {
			return response
		}
	},
	error => {
		console.log('err' + error)// for debug
		Message({
			message: error.msg,
			type: 'error',
			duration: 5 * 1000
		})
		return Promise.reject(error)
	})

export default service
