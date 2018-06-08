const dispatch = {
	state: {
        selectedCarrierBill: []
	},
	mutations: {
        ADD_CARRIERBILL: (state, list) => {
            state.selectedCarrierBill.push(...list)
        },
	},
	actions: {
		addCarrierBill({ commit }, list) {
			commit('ADD_CARRIERBILL', list)
		}
	}
}

export default dispatch