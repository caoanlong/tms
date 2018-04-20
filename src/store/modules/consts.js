import request from '../../common/request'

const consts = {
	state: {
		consts: []
	},
	mutations: {
		GET_CONSTS: (state, consts) => {
			state.consts = consts
		}
	},
	actions: {
		getConsts({ commit }) {
			let params = {
				size: 10000
			}
			request({
				url: '/base/const/findList',
				params
			}).then(res => {
				commit('GET_CONSTS', res.data.data.records)
			})
		},
		getConstWithType(type) {
			new Promise((resolve, reject) => {
				for (var i = 0; i < state.consts.length; i++) {
					state.consts[i]
				}
			})
		}
	}
}

export default consts