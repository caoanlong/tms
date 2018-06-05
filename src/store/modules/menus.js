import Menu from '../../api/Menu'

const menu = {
	state: {
		menus: sessionStorage.getItem('menus') != 'undefined' ? JSON.parse(sessionStorage.getItem('menus')) : ''
	},
	mutations: {
		GET_MENU: (state) => {
			Menu.find().then(res => {
				state.menus = res
				sessionStorage.setItem('menus', JSON.stringify(res))
			})
		},
		ADD_MENU: (state, menu, callback) => {
			Menu.add(menu).then(() => {
				Menu.find().then(res => {
					state.menus = res
					sessionStorage.setItem('menus', JSON.stringify(res))
				})
			})
		},
		EDIT_MENU: (state, menu, callback) => {
			Menu.update(menu).then(() => {
				Menu.find().then(res => {
					state.menus = res
					sessionStorage.setItem('menus', JSON.stringify(res))
				})
			})
		},
		DELETE_MENU: (state, menu, callback) => {
			Menu.del({Menu_ID: menu.Menu_ID}).then(() => {
				Menu.find().then(res => {
					state.menus = res
					sessionStorage.setItem('menus', JSON.stringify(res))
				})
			})
		}
	},
	actions: {
		getMenu ({commit}) {
			commit('GET_MENU')
		},
		addMenu ({commit, state}, menu) {
			commit('ADD_MENU', menu)
		},
		editMenu ({commit}, menu) {
			commit('EDIT_MENU', menu)
		},
		deleteMenu ({commit}, menu) {
			commit('DELETE_MENU', menu)
		}
	}
}

export default menu