import qs from 'qs'
import { Message } from 'element-ui'

export const baseURL = process.env.BASE_API


export const href = () => {
	if (process.env.ENV_CONFIG == 'test') {
		return '/huaxin/tms/#/login' // 测试
	} else if (process.env.ENV_CONFIG == 'practice') {
		return '/huaxin/tms-h5/#/login' // 演练
	} else {
		return '/#/login'  // 生产
	}
}

export const msgBox = () => {
	const msgEl = document.createElement('div')
	msgEl.id = 'msgEl'
	msgEl.style.width = '100%'
	msgEl.style.height = '100%'
	msgEl.style.position = 'fixed'
	msgEl.style.left = '0px'
	msgEl.style.top = '0px'
	msgEl.style.zIndex = '2000'
	msgEl.innerHTML = `
	<div style="position:absolute;z-index:2;width:50%;left:50%;top:50%;padding:20px;transform: translate(-50%,-50%);background-color:#fff;box-shadow:0 5px 5px rgba(0,0,0,.2)">
		<div>温馨提示！</div>
		<div style="text-align: center;">
			<p style="margin-top: 40px">
				您已提交申请，请等待审核！
			</p>
			<p style="margin-top: 40px;color: #aaa">
				一般客户处理时间为24小时内；客服电话：0871 - 67366889
			</p>
			<button style="margin-top: 20px" onclick="document.body.removeChild(document.getElementById('msgEl'));localStorage.clear();location.href='${href()}';">退出当前账户</button>
		</div>
	</div>
	<div style="width:100%;height:100%;position:absolute;left:0;top:0;background-color:rgba(0,0,0,.3)"></div>`
	return msgEl
}


// jquery ajax
jQuery.support.cors = true
const ajax = function (json) {
	let data = null
	if (json.data) {
		data = json.data
	} else {
		data = json.params
	}
	return new Promise((resolve, reject) => {
		$.ajax({
			url: baseURL + json.url,
			type: json.method || 'get',
			dataType: 'json',
			processData: false,
			data: !json.contentType ? qs.stringify(data) : JSON.stringify(data),
			headers: {
				'Content-Type': json.contentType || 'application/x-www-form-urlencoded;charset=utf-8',
				'Authorization': localStorage.getItem('token')
			},
			beforeSend: (res) => { },
			complete: (xhr, data) => {
				const res = xhr.responseJSON
				const Authorization = xhr.getResponseHeader('Authorization')
				Authorization && (res.Authorization = Authorization)
				if (res.code) {
					if (res.code != 200) {
						if (   res.code == 100 // 用户未登录
							|| res.code == 101 // 用户不存在
							|| res.code == 403 // 拒绝访问
							// || res.code == 5001 // 手机号已注册过
							// || res.code == 5002 // 手机验证码错误
							|| res.code == 5101 // 两次输入密码不相同
							|| res.code == 5201 // Token验证失败, 请求重新登录!
							|| res.code == 5202) { // 帐号已在其它地方登录!
							localStorage.clear()
							Message.error(res.msg +':'+ res.code)
							window.location.href = href()
							return reject(res)
						}
						if (res.code == 104) {
							if (!document.getElementById('msgEl')) {
								document.body.appendChild(msgBox())
							}
							return
						}
						if (res.code == 2001) {
							return resolve(res)
						}
						Message.error(res.msg +':'+ res.code)
						return reject(res)
					} else {
						return resolve(res)
					}
				}
			},
			success: (res) => {
			},
			error: (error) => {
				Message.error(error.statusText)
				return reject(error)
			}
		})
	})
}

export default ajax
// export default service