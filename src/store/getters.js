const getters = {
	token: state => state.user.token,
	userInfo: state => state.user.userInfo,
	name: state => state.user.name,
	mobile: state => state.user.mobile,
	companyName: state => state.user.companyName,
	companyID: state => state.user.companyID,
	sidebar: state => state.app.sidebar,
	menus: state => state.menus.menus,
	visitedViews: state => state.tagsView.visitedViews,
	cachedViews: state => state.tagsView.cachedViews,
	selectedCarrierBill: state => state.dispatch.selectedCarrierBill,
	selectedCargos: state => state.dispatch.selectedCargos,
	selectedDriver: state => state.dispatch.selectedDriver,
	selectedStaff: state => state.dispatch.selectedStaff,
	selectedTruck: state => state.dispatch.selectedTruck,
}
export default getters