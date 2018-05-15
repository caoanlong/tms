const getters = {
	token: state => state.user.token,
	userInfo: state => state.user.userInfo,
	name: state => state.user.name,
	companyName: state => state.user.companyName,
	sidebar: state => state.app.sidebar,
	menus: state => state.app.menus,
	consts: state => state.consts.consts
}
export default getters