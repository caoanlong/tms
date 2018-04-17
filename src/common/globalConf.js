export default function install(Vue) {
	// 图片地址
	Vue.prototype.imgUrl = process.env.IMG_API

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