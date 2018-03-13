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
						path: '/addcontrol',
						name: 'addcontrol',
						meta: {
							title: '新的调度'
						},
						component: () => import ('../components/Carrierbill/AddControl')
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
						path: '/receivableinfosimple',
						name: 'receivableinfosimple',
						meta: {
							title: '应收明细'
						},
						component: () => import ('../components/Settlemanage/ReceivableinfoSimple'),
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
						path: '/payableinfosimple',
						name: 'payableinfosimple',
						meta: {
							title: '应付明细'
						},
						component: () => import ('../components/Settlemanage/PayableinfoSimple'),
					},
					{
						path: '/payableinfo',
						name: 'payableinfo',
						meta: {
							title: '应付明细'
						},
						component: () => import ('../components/Settlemanage/Payableinfo'),
					},
					{
						path: '/settleconfig',
						name: 'settleconfig',
						meta: {
							title: '结算设置'
						},
						component: () => import ('../components/Settlemanage/SettleConfig'),
					},
					{
						path: '/addsettleconfig',
						name: 'addsettleconfig',
						meta: {
							title: '添加运费模板'
						},
						component: () => import ('../components/Settlemanage/AddSettleConfig'),
					},
					{
						path: '/editsettleconfig',
						name: 'editsettleconfig',
						meta: {
							title: '编辑运费模板'
						},
						component: () => import ('../components/Settlemanage/EditSettleConfig'),
					},
				]
			},
			{
				path: '/cooperpartner',
				name: 'cooperpartner',
				meta: {
					title: '合作伙伴'
				},
				component: () => import ('../components/CooperPartner'),
				redirect: '/shipper',
				children: [
					{
						path: '/shipper',
						name: 'shipper',
						meta: {
							title: '托运人'
						},
						component: () => import ('../components/CooperPartner/Shipper'),
					},
					{
						path: '/addshipper',
						name: 'addshipper',
						meta: {
							title: '添加托运人'
						},
						component: () => import ('../components/CooperPartner/AddShipper'),
					},
					{
						path: '/editshipper',
						name: 'editshipper',
						meta: {
							title: '编辑托运人'
						},
						component: () => import ('../components/CooperPartner/EditShipper'),
					},
					{
						path: '/recdeliverycomp',
						name: 'recdeliverycomp',
						meta: {
							title: '收发货单位'
						},
						component: () => import ('../components/CooperPartner/RecDeliveryComp'),
					},
					{
						path: '/addrecdeliverycomp',
						name: 'addrecdeliverycomp',
						meta: {
							title: '添加收发货单位'
						},
						component: () => import ('../components/CooperPartner/AddRecDeliveryComp'),
					},
					{
						path: '/editrecdeliverycomp',
						name: 'editrecdeliverycomp',
						meta: {
							title: '编辑收发货单位'
						},
						component: () => import ('../components/CooperPartner/EditRecDeliveryComp'),
					},
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
