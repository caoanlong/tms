const dispatch = {
	state: {
		selectedCarrierBill: [],
		selectedCargos: [],
		selectedDriver: null,
		selectedStaff: null,
		selectedTruck: null
	},
	mutations: {
        ADD_CARRIERBILL: (state, list) => {
			const selectedCarrierBill = state.selectedCarrierBill
			list.forEach(item => {
				if (selectedCarrierBill.map(i => i.carrierOrderID).indexOf(item.carrierOrderID) == -1) {
					selectedCarrierBill.push(item)
				}
			})
		},
		SET_CARRIERBILL: (state, list) => {
			state.selectedCarrierBill = list
		},
		DEL_CARRIERBILL: (state, list) => {
			const selectedCarrierBill = state.selectedCarrierBill
			list.forEach(item => {
				selectedCarrierBill.splice(selectedCarrierBill.map(i => i.carrierOrderID).indexOf(item.carrierOrderID), 1)
			})
		},
		CLEAR_CARRIERBILL: (state) => {
			state.selectedCarrierBill = []
		},
		SET_CARGO: (state, list) => {
			state.selectedCargos = list
		},
		CLEAR_CARGO: (state) => {
			state.selectedCargos = []
		},
		SET_DRIVER: (state, data) => {
			state.selectedDriver = data
		},
		SET_STAFF: (state, data) => {
			state.selectedStaff = data
		},
		SET_TRUCK: (state, data) => {
			state.selectedTruck = data
		},
	},
	actions: {
		addCarrierBill({ commit }, list) {
			commit('ADD_CARRIERBILL', list)
		},
		setCarrierBill({ commit }, list) {
			commit('SET_CARRIERBILL', list)
		},
		delCarrierBill({ commit }, list) {
			commit('DEL_CARRIERBILL', list)
		},
		clearCarrierBill({ commit }) {
			commit('CLEAR_CARRIERBILL')
		},
		setCargo({ commit }, list) {
			commit('SET_CARGO', list)
		},
		clearCargo({ commit }) {
			commit('CLEAR_CARGO')
		},
		setDriver({ commit }, data) {
			commit('SET_DRIVER', data)
		},
		setStaff({ commit }, data) {
			commit('SET_STAFF', data)
		},
		setTruck({ commit }, data) {
			commit('SET_TRUCK', data)
		}
	}
}

export default dispatch