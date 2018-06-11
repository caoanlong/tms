const dispatch = {
	state: {
		selectedCarrierBill: [],
		selectedCargos: []
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
		SET_CARGO: (state, list) => {
			state.selectedCargos = list
		}
	},
	actions: {
		addCarrierBill({ commit }, list) {
			commit('ADD_CARRIERBILL', list)
		},
		delCarrierBill({ commit }, list) {
			commit('DEL_CARRIERBILL', list)
		},
		setCargo({ commit }, list) {
			commit('SET_CARGO', list)
		},
	}
}

export default dispatch