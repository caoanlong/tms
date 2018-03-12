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
			},
			{
				path: '/carrierbill',
				name: 'carrierbill',
				meta: {
					title: '承运单'
				},
				component: () => import ('../components/Carrierbill'),
				redirect: '/carrierbills',
				children: [
					{
						path: '/carrierbills',
						name: 'carrierbills',
						meta: {
							title: '承运单列表'
						},
						component: () => import ('../components/Carrierbill'),
					},
					{
						path: '/addcarrierbill',
						name: 'addcarrierbill',
						meta: {
							title: '添加承运单'
						},
					},
					{
						path: '/viewcarrierbill',
						name: 'viewcarrierbill',
						meta: {
							title: '承运单详情'
						},
						component: () => import ('../components/Carrierbill/Viewcarrierbill')
					},
					{
						path: '/controls',
						name: 'controls',
						meta: {
							title: '调度列表'
						},
					}
				]
			},
		]
	}
]
const router = new Router({
  scrollBehavior: () => ({
    y: 0
  }),
  routes: routerMap
})

export default router
