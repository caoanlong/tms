export default function install(Vue) {
	Vue.prototype.imgUrl = process.env.IMG_API
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
}