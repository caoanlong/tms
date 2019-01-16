import SysMember from '../../api/SysMember'
import Member from '../../api/Member'

const user = {
	state: {
		userInfo: localStorage.getItem('userInfo') && localStorage.getItem('userInfo') != 'undefined' ? JSON.parse(localStorage.getItem('userInfo')) : null,
		name: localStorage.getItem('name'),
		mobile: localStorage.getItem('mobile'),
		companyName: localStorage.getItem('companyName'),
		loginOrganizationID: localStorage.getItem('loginOrganizationID'),
		loginOrganizationName: localStorage.getItem('loginOrganizationName'),
		companyID: localStorage.getItem('companyID'),
		token: localStorage.getItem('token')
	},
	mutations: {
		SET_USERINFO: (state, userInfo) => {
			state.userInfo = userInfo
			localStorage.setItem('userInfo', JSON.stringify(userInfo))
		},
		SET_NAME: (state, name) => {
			state.name = name
			localStorage.setItem('name', name)
		},
		SET_MOBILE: (state, mobile) => {
			state.mobile = mobile
			localStorage.setItem('mobile', mobile)
		},
		SET_COMPANYNAME: (state, companyName) => {
			state.companyName = companyName
			localStorage.setItem('companyName', companyName)
		},
		SET_ORGID: (state, loginOrganizationID) => {
			state.loginOrganizationID = loginOrganizationID
			localStorage.setItem('loginOrganizationID', loginOrganizationID)
		},
		SET_ORGNAME: (state, loginOrganizationName) => {
			state.loginOrganizationName = loginOrganizationName
			localStorage.setItem('loginOrganizationName', loginOrganizationName)
		},
		SET_COMPANYID: (state, companyID) => {
			state.companyID = companyID
			localStorage.setItem('companyID', companyID)
		},
		SET_TOKEN: (state, token) => {
			state.token = token
			localStorage.setItem('token', token)
		}
	},
	actions: {
		login ({ commit }, token) {
			commit('SET_TOKEN', token)
		},
		register ({ commit }, token) {
			commit('SET_TOKEN', token)
		},
		loginOut({ commit, state }) {
			return new Promise((resolve, reject) => {
				commit('SET_USERINFO', '')
				commit('SET_TOKEN', '')
				localStorage.clear()
				sessionStorage.clear()
				resolve()
			})
		},
		getUserInfo({ commit }) {
			return new Promise((resolve, reject) => {
				SysMember.detail().then(res => {
					commit('SET_USERINFO', res)
					commit('SET_NAME', res.userName)
					commit('SET_MOBILE', res.mobile)
					commit('SET_COMPANYNAME', res.companyName)
					commit('SET_ORGID', res.loginOrganizationID)
					commit('SET_ORGNAME', res.loginOrganizationName)
					commit('SET_COMPANYID', res.companyID)
					resolve()
				}).catch(err => {
					reject(err)
				})
			})
		}
	}
}

export default user