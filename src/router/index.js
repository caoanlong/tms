import Vue from 'vue'
import Router from 'vue-router'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'// progress bar style

import Layout from '@/components/Layout'
import Login from '@/components/Login'

Vue.use(Router)

let routerMap = [
	{
		path: '/login',
		name: 'login',
		component: Login
	},
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
						path: '/editcarrierbill',
						name: 'editcarrierbill',
						meta: {
							title: '编辑承运单'
						},
						component: () => import ('../components/Carrierbill/Editcarrierbill')
					}
				]
			},
			{
				path: '/dispatchbill',
				name: 'dispatchbill',
				meta: {
					title: '调度单'
				},
				component: () => import ('../components/DispatchBill'),
				redirect: '/dispatchbills',
				children: [
					{
						path: '/dispatchbills',
						name: 'dispatchbills',
						meta: {
							title: '调度单列表'
						},
						component: () => import ('../components/DispatchBill/DispatchBills'),
					},
					{
						path: '/adddispatchbill',
						name: 'adddispatchbill',
						meta: {
							title: '添加调度单'
						},
						component: () => import ('../components/DispatchBill/AddDispatchBill'),
					},
					{
						path: '/viewdispatchbill',
						name: 'viewdispatchbill',
						meta: {
							title: '调度单详情'
						},
						component: () => import ('../components/DispatchBill/ViewDispatchBill')
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
					{
						path: '/viewsettleconfig',
						name: 'viewsettleconfig',
						meta: {
							title: '查看运费模板'
						},
						component: () => import ('../components/Settlemanage/ViewSettleConfig'),
					},
				]
			},
			{
				path: '/transteam',
				name: 'transteam',
				meta: {
					title: '运输队'
				},
				component: () => import ('../components/TransTeam'),
				redirect: '/truck',
				children: [
					{
						path: '/truck',
						name: 'truck',
						meta: {
							title: '车辆'
						},
						component: () => import ('../components/TransTeam/Truck'),
					},
					{
						path: '/addtruck',
						name: 'addtruck',
						meta: {
							title: '添加车辆'
						},
						component: () => import ('../components/TransTeam/AddTruck'),
					},
					{
						path: '/edittruck',
						name: 'edittruck',
						meta: {
							title: '编辑车辆'
						},
						component: () => import ('../components/TransTeam/EditTruck'),
					},
					{
						path: '/viewtruck',
						name: 'viewtruck',
						meta: {
							title: '查看车辆'
						},
						component: () => import ('../components/TransTeam/ViewTruck'),
					},
					{
						path: '/person',
						name: 'person',
						meta: {
							title: '人员'
						},
						component: () => import ('../components/TransTeam/Person'),
					},
					{
						path: '/addperson',
						name: 'addperson',
						meta: {
							title: '添加人员'
						},
						component: () => import ('../components/TransTeam/AddPerson'),
					},
					{
						path: '/editperson',
						name: 'editperson',
						meta: {
							title: '编辑人员'
						},
						component: () => import ('../components/TransTeam/EditPerson'),
					},
					{
						path: '/viewperson',
						name: 'viewperson',
						meta: {
							title: '查看人员'
						},
						component: () => import ('../components/TransTeam/ViewPerson'),
					},
					{
						path: '/transinfo',
						name: 'transinfo',
						meta: {
							title: '运输档案'
						},
						component: () => import ('../components/TransTeam/TransInfo'),
					},
					{
						path: '/addtransinfo',
						name: 'addtransinfo',
						meta: {
							title: '添加运输档案'
						},
						component: () => import ('../components/TransTeam/AddTransInfo'),
					},
					{
						path: '/edittransinfo',
						name: 'edittransinfo',
						meta: {
							title: '编辑运输档案'
						},
						component: () => import ('../components/TransTeam/EditTransInfo'),
					},
					{
						path: '/viewtransinfo',
						name: 'viewtransinfo',
						meta: {
							title: '查看运输档案'
						},
						component: () => import ('../components/TransTeam/ViewTransInfo'),
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
						path: '/viewshipper',
						name: 'viewshipper',
						meta: {
							title: '托运人详情'
						},
						component: () => import ('../components/CooperPartner/ViewShipper'),
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
					{
						path: '/viewrecdeliverycomp',
						name: 'viewrecdeliverycomp',
						meta: {
							title: '收发货单位详情'
						},
						component: () => import ('../components/CooperPartner/ViewRecDeliveryComp'),
					}
				]
			},
			{
				path: '/user',
				name: 'user',
				meta: {
					title: '个人资料'
				},
				component: () => import('../components/User'),
				redirect: '/userprofile',
				children: [
					{
						path: '/userprofile',
						name: 'userprofile',
						meta: {
							title: '用户信息'
						},
						component: () => import('../components/User/UserProfile')
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

NProgress.configure({ showSpinner: false })// NProgress Configuration

router.beforeEach((to, from, next) => {
	NProgress.start()
	if (localStorage.getItem('token') && localStorage.getItem('token') != 'undefined') {
		if (to.path === '/login') {
			next({ path: '/' })
		} else {
			next()
		}
		NProgress.done()
	} else {
		/* has no token*/
		if (to.path === '/login') {
			next()
		} else {
			next('/login')
		}
		NProgress.done()
	}
})

export default router
