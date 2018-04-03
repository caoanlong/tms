const getters = {
	token: state => state.user.token,
	userInfo: state => state.user.userInfo,
	sidebar: state => state.app.sidebar,
	// menus: state => state.menu.menus
}
export default getters