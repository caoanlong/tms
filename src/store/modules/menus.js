import Menu from '../../api/Menu'

const menu = {
	state: {
		menus: sessionStorage.getItem('menus') && sessionStorage.getItem('menus') != 'undefined' ? JSON.parse(sessionStorage.getItem('menus')) : '',
		permissions: sessionStorage.getItem('permissions') && sessionStorage.getItem('permissions') != 'undefined' ? sessionStorage.getItem('permissions').split(',') : ''
	},
	mutations: {
		GET_MENU: (state) => {
			Menu.find().then(res => {
				state.menus = res.menus
				state.permissions = res.permissions.join(',')
				sessionStorage.setItem('menus', JSON.stringify(res.menus))
				sessionStorage.setItem('permissions', res.menus.join(','))
			})
		},
		// ADD_MENU: (state, menu, callback) => {
		// 	Menu.add(menu).then(() => {
		// 		this.a.mutations.GET_MENU()
		// 	})
		// },
		// EDIT_MENU: (state, menu, callback) => {
		// 	Menu.update(menu).then(() => {
		// 		this.a.mutations.GET_MENU()
		// 	})
		// },
		// DELETE_MENU: (state, menu, callback) => {
		// 	Menu.del({Menu_ID: menu.Menu_ID}).then(() => {
		// 		this.a.mutations.GET_MENU()
		// 	})
		// }
	},
	actions: {
		getMenu ({commit}) {
			commit('GET_MENU')
		},
		// addMenu ({commit, state}, menu) {
		// 	commit('ADD_MENU', menu)
		// },
		// editMenu ({commit}, menu) {
		// 	commit('EDIT_MENU', menu)
		// },
		// deleteMenu ({commit}, menu) {
		// 	commit('DELETE_MENU', menu)
		// }
	}
}

export default menu