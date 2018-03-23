// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

import 'normalize.css/normalize.css'

import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/styles/index.css'
import './assets/styles/sidebar.css'
import './assets/styles/newUI.css'
import App from './App'
import router from './router'
import store from './store'
// icon
import './assets/icons'

Vue.use(Element)
Vue.config.productionTip = false

Vue.prototype.getSummaries = function (param) {
	const { columns, data } = param
	const sums = []
	columns.forEach((column, index) => {
		if (index === 0) {
			sums[index] = '总计'
			return
		}
		const values = data.map(item => item[column.property])
		if (values.every(value => typeof value == 'number')) {
			sums[index] = values.reduce((prev, curr) => {
				return prev + curr
			}, 0).toFixed(2)
		} else {
			sums[index] = ''
		}
	})
	return sums
}

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	store,
	components: { App },
	template: '<App/>'
})
