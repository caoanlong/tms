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