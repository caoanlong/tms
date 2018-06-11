const getters = {
	token: state => state.user.token,
	userInfo: state => state.user.userInfo,
	name: state => state.user.name,
	mobile: state => state.user.mobile,
	companyName: state => state.user.companyName,
	sidebar: state => state.app.sidebar,
	menus: state => state.menus.menus,
	selectedCarrierBill: state => state.dispatch.selectedCarrierBill,
	selectedCargos: state => state.dispatch.selectedCargos,
	selectedDriver: state => state.dispatch.selectedDriver,
	selectedStaff: state => state.dispatch.selectedStaff,
}
export default getters