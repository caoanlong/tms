import request from '../../common/request'

const user = {
	state: {
		userInfo: localStorage.getItem('userInfo'),
		token: localStorage.getItem('token')
	},
	mutations: {
		SET_USERINFO: (state, userInfo) => {
			state.userInfo = userInfo
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
				request({
					url: '/user/info'
				}).then(res => {

				})
				getUserInfo().then(response => {
					const data = response.data
					commit('SET_LOGIN_NAME', data.data.LoginName)
					commit('SET_NAME', data.data.Name)
					commit('SET_PHOTO', data.data.Photo)
					localStorage.setItem('LoginName', data.data.LoginName)
					localStorage.setItem('Name', data.data.Name)
					localStorage.setItem('Photo', data.data.Photo)
					resolve(data)
				}).catch(error => {
					reject(error)
				})
			})
		}
	}
}

export default user