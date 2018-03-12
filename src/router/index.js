import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/components/Layout'
Vue.use(Router)

export default new Router({
	routes: [{
		path: '',
		component: Layout,
		children: [{
				path: '/',
				name: 'home',
				meta: {
					title: '首页'
				},
				component: () =>
					import ('../components/Home')
			}			
		]
	}]
})
