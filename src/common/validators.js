export function isPoneAvailable(str) {  
	let myreg=/^[1][3,4,5,6,7,8,9][0-9]{9}$/
	if (!myreg.test(str)) {  
		return false
	} else {  
		return true
	}  
}

export const checkMobile = (rule, value, callback) => {
	if (!value) {
		callback(new Error('手机号不能为空'))
	}
	let regMobile = /^[1][3,4,5,6,7,8,9][0-9]{9}$/
	if (!regMobile.test(value)) {  
		callback(new Error('请输入正确的手机号'))
	} else {  
		callback()
	} 
}

export const checkTel = (rule, value, callback) => {
	if (!value) {
		callback(new Error('电话不能为空'))
	}
	let regTel = /^([0-9]{3,4}-)?[0-9]{7,8}$/
	let regMobile = /^[1][3,4,5,6,7,8,9][0-9]{9}$/
	if (!regMobile.test(value) && !regTel.test(value)) {  
		callback(new Error('请输入正确的电话'))
	} else {  
		callback()
	} 
}

export const checkIDCard = (rule, value, callback) => {
	if (!value) {
		callback(new Error('身份证号不能为空'))
	}
	let regIdNo = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
	if(!regIdNo.test(value)){  
		callback(new Error('请输入正确的身份证号'))
	} else {
		callback()
	}
}

// 验证正整数 + 0
export const checkInt = (rule, value, callback) => {
	if (!value) {
		callback(new Error('值不能为空'))
	}
	let r = /^\+?[1-9][0-9]*$/
	if (r.test(value) || value == 0) {
		callback()
	} else {
		callback(new Error('请输入正确的数字'))
	}
}

// 验证非负浮点数（正浮点数 + 0）
export const checkFloat = (rule, value, callback) => {
	if (!value) {
		callback(new Error('值不能为空'))
	}
	let r = /^\d+(\.\d+)?$/
	if (r.test(value) || value == 0) {
		callback()
	} else {
		callback(new Error('请输入正确的数字'))
	}
}

// 验证非负浮点数（正浮点数 + 0） 非必填
export const checkFloat2 = (rule, value, callback) => {
	let r = /^\d+(\.\d+)?$/
	if (r.test(value) || value == 0) {
		callback()
	} else {
		callback(new Error('请输入正确的数字'))
	}
}