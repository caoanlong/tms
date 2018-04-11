const getters = {
	token: state => state.user.token,
	userInfo: state => state.user.userInfo,
	name: state => state.user.name,
	sidebar: state => state.app.sidebar,
	// menus: state => state.menu.menus
}
export default getters