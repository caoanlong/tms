const getters = {
	token: state => state.user.token,
	userInfo: state => state.user.userInfo,
	name: state => state.user.name,
	companyName: state => state.user.companyName,
	sidebar: state => state.app.sidebar,
	consts: state => state.consts.consts
}
export default getters