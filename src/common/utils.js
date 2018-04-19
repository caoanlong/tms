import ChineseDistricts from '../assets/data/distpicker.data'

export const searchAreaByKey = function (areaKey) {
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

/**author:Caoanlong *day:2017-08-24
 * form表单数据请求
 * @param json 请求参数 {key:value,key:value,...}
 */
export const formDataReq = function (json) {
	var formData = new FormData()
	for (let attr in json) {
		formData.append(attr,json[attr])
	};
	return formData
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
