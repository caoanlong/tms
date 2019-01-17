import Menu from '../../api/Menu'


function generatePermission(data) {
	const permission = {}
	const queue = [...data]
	while (queue.length > 0) {
		const item = queue.shift()
		if (item.type == 'Menu') {
			permission[item.target] = {}
			if (item.children && item.children.length > 0) {
				for (let i = 0; i < item.children.length; i++) {
					const child = item.children[i]
					permission[item.target][child.target] = true
				}
			}
			continue
		}
		if (item.children && item.children.length > 0) {
			for (let i = 0; i < item.children.length; i++) {
				queue.push(item.children[i])
			}
		}
	}
	return permission
}
const menu = {
	state: {
		menus: sessionStorage.getItem('menus') 
			&& sessionStorage.getItem('menus') 
			!= 'undefined' ? JSON.parse(sessionStorage.getItem('menus')) : '',
		permissions: sessionStorage.getItem('permissions') 
			&& sessionStorage.getItem('permissions') 
			!= 'undefined' ? JSON.parse(sessionStorage.getItem('permissions')) : ''
	},
	mutations: {
		GET_MENU: (state) => {
			Menu.find().then(res => {
				const menus = state.menus =  res
				const permissions = state.permissions = generatePermission(res)
				sessionStorage.setItem('menus', JSON.stringify(menus))
				sessionStorage.setItem('permissions', JSON.stringify(permissions))
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