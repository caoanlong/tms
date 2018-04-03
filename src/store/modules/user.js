import request from '../../common/request'

const user = {
	state: {
		userInfo: localStorage.getItem('userInfo'),
		token: localStorage.getItem('token')
	},
	mutations: {
		SET_USERINFO: (state, userInfo) => {
			state.userInfo = userInfo
			localStorage.setItem('userInfo', JSON.stringify(userInfo))
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
					url: '/mem/info'
				}).then(res => {
					commit('SET_USERINFO', res.data.data)
				})
			})
		}
	}
}

export default user