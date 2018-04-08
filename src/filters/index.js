import { regionData } from 'element-china-area-data'

export const searchAreaByKey = function (areaKey) {
	if (areaKey && typeof areaKey === 'string') {
		let area = ''
		let level = 0
		let keys = []
		keys[0] = areaKey.substr(0, 2) + '0000'
		keys[1] = areaKey.substr(0, 4) + '00'
		keys[2] = areaKey
		walk(regionData)
		return area
		function walk(list) {
			for (let i in list) {
				if (list[i].value === keys[level]) {
					area += list[i].label
					level++
					if (list[i].children && list[i].children.length > 0) {
						walk(list[i].children)
					} 
				}
			}
		}
	} else {
		throw new Error('The type of areaKey must be string!')
	}
}

export const getdatefromtimestamp = function (input, bool) {
	let now = new Date(Number(input))
	let year = now.getFullYear()
	let month = now.getMonth() + 1 < 10 ? '0' + (now.getMonth() + 1) : now.getMonth() + 1
	let date = now.getDate() < 10 ? '0' + now.getDate() : now.getDate()
	let hour = now.getHours() < 10 ? '0' + now.getHours() : now.getHours()
	let minute = now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes()
	let second = now.getSeconds() < 10 ? '0' + now.getSeconds() : now.getSeconds()
	if (bool) {
		return year + "-" + month + "-" + date
	}else {
		return year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second
	}
}