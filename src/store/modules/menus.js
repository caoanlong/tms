import {getMenus, addMenu, updateMenu, delMenu} from '../../api/menu'

const menu = {
	state: {
		menus: sessionStorage.getItem('menus') != 'undefined' ? JSON.parse(sessionStorage.getItem('menus')) : ''
	},
	mutations: {
		GET_MENU: (state) => {
			getMenus().then(res => {
				state.menus = res.data.data
				sessionStorage.setItem('menus', JSON.stringify(res.data.data))
			})
		},
		ADD_MENU: (state, menu, callback) => {
			addMenu(menu).then(res => {
				console.log(res.data)
				getMenus().then(res => {
					state.menus = res.data.data
					sessionStorage.setItem('menus', JSON.stringify(res.data.data))
				})
			})
		},
		EDIT_MENU: (state, menu, callback) => {
			updateMenu(menu).then(res => {
				console.log(res.data)
				getMenus().then(res => {
					state.menus = res.data.data
					sessionStorage.setItem('menus', JSON.stringify(res.data.data))
				})
			})
		},
		DELETE_MENU: (state, menu, callback) => {
			delMenu({Menu_ID: menu.Menu_ID}).then(res => {
				console.log(res.data)
				getMenus().then(res => {
					state.menus = res.data.data
					sessionStorage.setItem('menus', JSON.stringify(res.data.data))
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