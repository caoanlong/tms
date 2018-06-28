import axios from 'axios'
import { Message } from 'element-ui'
import { href } from './request'

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

// respone interceptor
service.interceptors.response.use(
	response => {
		if (   response.data.code == 1001 
			|| response.data.code == 1002 
			|| response.data.code == 1003 
			|| response.data.code == 1004) {
			localStorage.clear()
			window.location.href = href()
			return Promise.reject('error')
		}
		return response
	},
	error => {
		Message.error(error.toString())
		return
	})

export default service
