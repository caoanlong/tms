export function isPoneAvailable(str) {  
	let myreg=/^[1][3,4,5,6,7,8,9][0-9]{9}$/
	if (!myreg.test(str)) {  
		return false
	} else {  
		return true
	}  
}

export function isVerCodeAvailable(str) {  
	let myreg=/^-?\\d+$/
	if (!myreg.test(str)) {
		return false
	} else {  
		return true
	}  
}
// 验证正浮点数(两位)
export const isFloat = (value) => {
	if (Number(value[0]) == 0 && Number(value[1]) == 0) {
		return false
	}
	let r = /^[0-9]+(.[0-9]{1,2})?$/
	return r.test(value)
}
// 验证正浮点数(非零两位)
export const isFloaNot0 = (value) => {
	if (Number(value) == 0) {
		return false
	}
	let r = /^[0-9]+(.[0-9]{1,2})?$/
	return r.test(value)
}
// 验证正整数(非零)
export const isIntNot0 = (value) => {
	let r = /^\+?[1-9][0-9]*$/
	return r.test(value)
}
// 验证正整数
export const isInt = (value) => {
	let r = /^\+?[1-9][0-9]*$/
	let r2 = /^[0]$/
	return r.test(value) || r2.test(value)
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

// 验证正整数 + 0  非必填
export const checkInt2 = (rule, value, callback) => {
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
	let r = /^[0-9]+(.[0-9]{1,2})?$/
	if (r.test(value) || value == 0) {
		callback()
	} else {
		callback(new Error('请输入正确的数字'))
	}
}

// 验证非负浮点数（正浮点数 + 0） 非必填
export const checkFloat2 = (rule, value, callback) => {
	let r = /^[0-9]+(.[0-9]{1,2})?$/
	if (r.test(value) || value == 0) {
		callback()
	} else {
		callback(new Error('请输入正确的数字'))
	}
}

// 限制长度3
export const limitLength3 = (rule, value, callback) => {
	if (value.length > 3) {
		callback(new Error('长度不能超过3'))
	} else {
		callback()
	}
}

// 限制长度10
export const limitLength10 = (rule, value, callback) => {
	if (value.length > 10) {
		callback(new Error('长度不能超过10'))
	} else {
		callback()
	}
}

// 限制长度20
export const limitLength20 = (rule, value, callback) => {
	if (value.length > 20) {
		callback(new Error('长度不能超过20'))
	} else {
		callback()
	}
}

// 限制长度50
export const limitLength50 = (rule, value, callback) => {
	if (value.length > 50) {
		callback(new Error('长度不能超过50'))
	} else {
		callback()
	}
}

// 限制长度100
export const limitLength100 = (rule, value, callback) => {
	if (value.length > 100) {
		callback(new Error('长度不能超过100'))
	} else {
		callback()
	}
}