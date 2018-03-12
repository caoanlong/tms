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
						component: () => import ('../components/Carrierbill/Carrierbills'),
					},
					{
						path: '/addcarrierbill',
						name: 'addcarrierbill',
						meta: {
							title: '添加承运单'
						},
						component: () => import ('../components/Carrierbill/Addcarrierbill'),
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
						component: () => import ('../components/Carrierbill/Controls')
					},
					{
						path: '/viewcontrols',
						name: 'viewcontrols',
						meta: {
							title: '调度详情'
						},
						component: () => import ('../components/Carrierbill/ViewControls')
					}
				]
			},
			{
				path: '/settlemanage',
				name: 'settlemanage',
				meta: {
					title: '结算管理'
				},
				component: () => import ('../components/Settlemanage'),
				redirect: '/receivablesum',
				children: [
					{
						path: '/receivablesum',
						name: 'receivablesum',
						meta: {
							title: '应收汇总'
						},
						component: () => import ('../components/Settlemanage/Receivablesum'),
					},
					{
						path: '/receivableinfo',
						name: 'receivableinfo',
						meta: {
							title: '应收明细'
						},
						component: () => import ('../components/Settlemanage/Receivableinfo'),
					},
					{
						path: '/payablesum',
						name: 'payablesum',
						meta: {
							title: '应付汇总'
						},
						component: () => import ('../components/Settlemanage/Payablesum'),
					},
					{
						path: '/payableinfo',
						name: 'payableinfo',
						meta: {
							title: '应付明细'
						},
					}
				]
			}
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
