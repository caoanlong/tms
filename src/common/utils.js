/**author:Caoanlong *day:2017-08-24
 * form表单数据请求
 * @param json 请求参数 {key:value,key:value,...}
 */
function formDataReq(json) {
	var formData = new FormData()
	for (let attr in json) {
		formData.append(attr,json[attr])
	};
	return formData
}

export default {
    formDataReq
}