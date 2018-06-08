const dispatch = {
	state: {
        selectedCarrierBill: []
	},
	mutations: {
        ADD_CARRIERBILL: (state, list) => {
			let selectedCarrierBill = state.selectedCarrierBill
			list.forEach(item => {
				if (selectedCarrierBill.indexOf(item) == -1) {
					selectedCarrierBill.push(item)
				}
			})
		},
		DEL_CARRIERBILL: (state, list) => {
			let selectedCarrierBill = state.selectedCarrierBill
			list.forEach(item => {
				selectedCarrierBill.splice(selectedCarrierBill.indexOf(item), 1)
			})
		},
	},
	actions: {
		addCarrierBill({ commit }, list) {
			commit('ADD_CARRIERBILL', list)
		},
		delCarrierBill({ commit }, list) {
			commit('DEL_CARRIERBILL', list)
		},
	}
}

export default dispatch