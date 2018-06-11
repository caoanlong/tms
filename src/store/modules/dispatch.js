const dispatch = {
	state: {
		selectedCarrierBill: [],
		selectedCargos: [],
		selectedDriver: null,
		selectedStaff: null,
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
		},
		SET_DRIVER: (state, data) => {
			state.selectedDriver = data
		},
		SET_STAFF: (state, data) => {
			state.selectedStaff = data
		},
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
		setDriver({ commit }, data) {
			commit('SET_DRIVER', data)
		},
		setStaff({ commit }, data) {
			commit('SET_STAFF', data)
		},
	}
}

export default dispatch