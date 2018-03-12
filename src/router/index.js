import Vue from 'vue'
import Router from 'vue-router'

import Layout from '@/components/Layout'
// import Login from '@/components/Login'

Vue.use(Router)

let routerMap = [
	{
		path: '',
		component: Layout,
		children: [
			{
				path: '/',
				name: 'home',
				meta: {
					title: '首页'
				},
				component: () => import ('../components/Home')
			}			
		]
	}
]
const router = new Router({
	scrollBehavior: () => ({ y: 0 }),
	routes: routerMap
})

export default router
