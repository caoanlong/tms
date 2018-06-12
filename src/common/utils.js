import ChineseDistricts from '../assets/data/distpicker.data'
import { Message } from 'element-ui'
import { vueInstance } from '../main'

export function searchAreaByKey (areaKey) {
	let area = String(areaKey)
	// 如果是省
	if (area.indexOf('0000') > -1) {
		let areaVal = ChineseDistricts[100000][area]
		return areaVal
	// 如果是区
	} else if (area.indexOf('00') == -1) {
		let areaVal = ChineseDistricts[100000][area.substr(0,2) + '0000'] + ChineseDistricts[area.substr(0,2) + '0000'][area.substr(0,4) + '00'] + ChineseDistricts[area.substr(0,4) + '00'][area]
		return areaVal
	// 如果是市
	} else {
		let areaVal = ChineseDistricts[100000][area.substr(0,2) + '0000'] + ChineseDistricts[area.substr(0,2) + '0000'][area.substr(0,4) + '00']
		return areaVal
	}
}

export function areaIdToArrayId (areaId) {
	return [(areaId.substr(0, 2) + '0000'), (areaId.substr(0, 4) + '00'), areaId]
}

/**author:Caoanlong *day:2017-08-24
 * form表单数据请求
 * @param json 请求参数 {key:value,key:value,...}
 */
export function formDataReq (json) {
	var formData = new FormData()
	for (let attr in json) {
		formData.append(attr,json[attr])
	};
	return formData
}

export function getdatefromtimestamp (input, bool) {
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
export function validUploadFile(result, map, propertys) {
	return new Promise((resolve, reject) => {
		if (result.length == 0) {
			return reject('无数据！')
		}
		let uploadExcelConstants = []
		for (let i = 0; i < result.length; i++) {
			let excelConstant = {}
			let j = 1
			let item = result[i]
			for (let key in item) {
				if (!propertys.includes(key)) {
					return reject(`文件中应不包含“${key}”字段`)
				}
				for (let x = 0; x < propertys.length; x++) {
					if (!item[propertys[x]]) {
						return reject(`第${i + 1}行，第${j}列不能为空`)
					}
				}
				excelConstant[map[key]] = item[key]
				j++
			}
			uploadExcelConstants.push(excelConstant)
		}
		resolve(uploadExcelConstants)
	})
}

/**
 * 删除确认
 * @param {单个id} id 
 * @param {多个id} idList 
 */
export function deleteConfirm (id, callback, idList) {
	let ids = ''
	if (id && (typeof id == 'string' || typeof id == 'number')) {
		ids = id
	} else {
		ids = idList.join(',')
	}
	if(!ids) {
		Message({ type: 'warning', message: '请选择' })
		return
	}
	vueInstance.$confirm('此操作将永久删除, 是否继续?', '提示', {
		confirmButtonText: '确定',
		cancelButtonText: '取消',
		type: 'warning'
	}).then(() => {
		callback && callback(ids)
	}).catch(() => {
		Message({
			type: 'info',
			message: '已取消删除'
		})
	})
}

export function closeConfirm (id, callback) {
	vueInstance.$confirm('此操作将关闭, 是否继续?', '提示', {
		confirmButtonText: '确定',
		cancelButtonText: '取消',
		type: 'warning'
	}).then(() => {
		callback && callback(id)
	}).catch(() => {
		Message({ type: 'info', message: '已取消关闭'})
	})
}

export function cancelConfirm (id, callback) {
	vueInstance.$confirm('此操作将做取消操作, 是否继续?', '提示', {
		confirmButtonText: '确定',
		cancelButtonText: '取消',
		type: 'warning'
	}).then(() => {
		callback && callback(id)
	}).catch(() => {
		Message({ type: 'info', message: '已取消操作'})
	})
}

export function resizeImg (url, size) {
	let arr = url.split('.')
	return process.env.IMG_API + arr[0] + size + arr[1]
}

export function transNum (number, count=2) {
	function ss (n) {
		let str = ''
		for (let i = 0; i < n; i++) {
			str += '0'
		}
	}
	if (number < 10) {
		return ss(count) + number
	} else if (number < 100 && number >= 10) {
		return ss(count-1) + number
	} else if (number >= 100) {
		return ss(count-2) + number
	}
}
