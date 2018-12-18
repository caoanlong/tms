import { Message } from 'element-ui'
import moment from 'moment'

export default function install(Vue) {

	Vue.prototype.moment = moment

	// 图片地址
	Vue.prototype.imgUrl = process.env.IMG_API

	// 上传excel请求头
	Vue.prototype.uploadHeaders = {'Authorization': localStorage.getItem('token')}
	
	// 上传excel错误
	Vue.prototype.uploadError = function(error) {
		Message.error(error.message)
	}

	// 上传excel校验
	Vue.prototype.beforeFileUpload = function (file) {
		const extension = file.name.split('.')[1] === 'xls'
		const extension2 = file.name.split('.')[1] === 'xlsx'
		const isLt2M = file.size / 1024 / 1024 < 10
		if (!extension && !extension2) {
			Message.error('上传模板只能是 xls、xlsx格式!')
		}
		if (!isLt2M) {
			Message.error('上传模板大小不能超过 10MB!')
		}
		return extension || extension2 && isLt2M
	}

	// 求和
	Vue.prototype.getSummaries = function (param) {
		const { columns, data } = param
		const sums = []
		columns.forEach((column, index) => {
			if (index === 0) {
				sums[index] = '总计'
				return
			}
			const values = data.map(item => item[column.property])
			if (values.every(value => typeof value == 'number')) {
				sums[index] = values.reduce((prev, curr) => {
					return prev + curr
				}, 0).toFixed(2)
			} else {
				sums[index] = ''
			}
		})
		return sums
	}
	Vue.prototype.getSummaries2 = function (param) {
		// console.log(param)
		const { columns, data } = param
		const sums = []
		columns.forEach((column, index) => {
			if (index === 0) {
				sums[index] = '总计'
				return
			}
			const values = data.map(item => item[column.property])
			if (values.every(value => typeof value == 'number')) {
				let sum = values.reduce((prev, curr) => {
					return prev + curr
				}, 0)
				if(index==7){
					sums[index] = parseInt(sum)
				}else{
					sums[index] = sum.toFixed(2)
				}
				
			} else {
				sums[index] = ''
			}
		})
		return sums
	}
}