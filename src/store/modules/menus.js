import Menu from '../../api/Menu'

const menu = {
	state: {
		menus: sessionStorage.getItem('menus') 
			&& sessionStorage.getItem('menus') 
			!= 'undefined' ? JSON.parse(sessionStorage.getItem('menus')) : ''
	},
	mutations: {
		GET_MENU: (state) => {
			Menu.find().then(res => {
				state.menus = res
				sessionStorage.setItem('menus', JSON.stringify(res))
			})
		}
	},
	actions: {
		getMenu ({commit}) {
			commit('GET_MENU')
		}
	}
}

export default menu