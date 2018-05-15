import Vue from 'vue'
import Vuex from 'vuex'

import app from './modules/app'
import user from './modules/user'
import tagsView from './modules/tagsView'
import menus from './modules/menus'
import consts from './modules/consts'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
	modules: {
		app,
		user,
		tagsView,
		menus,
		consts
	},
	getters
})

export default store