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
				meta: { title: '首页' },
				component: () => import ('../components/Home')
			},
			{
				path: '/buisiness',
				name: 'buisiness',
				meta: { title: '业务' },
				component: () => import ('../components/Buisiness'),
				redirect: '/carrierbill',
				children: [
					{
						path: '/carrierbill',
						name: 'carrierbill',
						meta: { title: '承运单' },
						component: () => import ('../components/Buisiness/Carrierbill'),
					},
					{
						path: '/addcarrierbill',
						name: 'addcarrierbill',
						meta: { title: '添加承运单' },
						component: () => import ('../components/Buisiness/Carrierbill/Add'),
					},
					{
						path: '/viewcarrierbill',
						name: 'viewcarrierbill',
						meta: { title: '承运单详情' },
						component: () => import ('../components/Buisiness/Carrierbill/View')
					},
					{
						path: '/editcarrierbill',
						name: 'editcarrierbill',
						meta: { title: '编辑承运单' },
						component: () => import ('../components/Buisiness/Carrierbill/Edit')
					}
				]
			},
			{
				path: '/dispatch',
				name: 'dispatch',
				meta: { title: '调度' },
				component: () => import ('../components/Dispatch'),
				redirect: '/dispatchbill',
				children: [
					{
						path: '/dispatchbills',
						name: 'dispatchbills',
						meta: {
							title: '调度单'
						},
						component: () => import ('../components/Dispatch/DispatchBill/index'),
					},
					{
						path: '/adddispatchbill',
						name: 'adddispatchbill',
						meta: {
							title: '添加调度单'
						},
						component: () => import ('../components/Dispatch/DispatchBill/Add'),
					},
					{
						path: '/editdispatchbill',
						name: 'editdispatchbill',
						meta: {
							title: '编辑调度单'
						},
						component: () => import ('../components/Dispatch/DispatchBill/Edit'),
					},
					{
						path: '/viewdispatchbill',
						name: 'viewdispatchbill',
						meta: {
							title: '调度单详情'
						},
						component: () => import ('../components/Dispatch/DispatchBill/View')
					},
					{
						path: '/viewtaskdetail',
						name: 'viewtaskdetail',
						meta: {
							title: '任务单详情'
						},
						component: () => import ('../components/Dispatch/DispatchBill/ViewTask')
					}
				]
			},
			{
				path: '/notruckcarrier',
				name: 'notruckcarrier',
				meta: {
					title: '无车承运人'
				},
				component: () => import('../components/NoTruckCarrier'),
				redirect: '/notruckcargosource',
				children: [
					{
						path: '/notruckcargosource',
						name: 'notruckcargosource',
						meta: {
							title: '货源上传'
						},
						component: () => import('../components/NoTruckCarrier/NotruckCargosource')
					},
					{
						path: '/addnotruckcargosource',
						name: 'addnotruckcargosource',
						meta: {
							title: '添加货源'
						},
						component: () => import('../components/NoTruckCarrier/NotruckCargosource/AddNotruckCargosource')
					},
					{
						path: '/viewnotruckcargosource',
						name: 'viewnotruckcargosource',
						meta: {
							title: '查看货源'
						},
						component: () => import('../components/NoTruckCarrier/NotruckCargosource/ViewNotruckCargosource')
					},
					{
						path: '/editnotruckcargosource',
						name: 'editnotruckcargosource',
						meta: {
							title: '编辑货源'
						},
						component: () => import('../components/NoTruckCarrier/NotruckCargosource/EditNotruckCargosource')
					},
					{
						path: '/notrucksource',
						name: 'notrucksource',
						meta: {
							title: '车源上传'
						},
						component: () => import('../components/NoTruckCarrier/NoTruckSource')
					},
					{
						path: '/addnotrucksource',
						name: 'addnotrucksource',
						meta: {
							title: '添加车源'
						},
						component: () => import('../components/NoTruckCarrier/NoTruckSource/AddNoTruckSource')
					},
					{
						path: '/viewnotrucksource',
						name: 'viewnotrucksource',
						meta: {
							title: '查看车源'
						},
						component: () => import('../components/NoTruckCarrier/NoTruckSource/ViewNoTruckSource')
					},
					{
						path: '/editnotrucksource',
						name: 'editnotrucksource',
						meta: {
							title: '编辑车源'
						},
						component: () => import('../components/NoTruckCarrier/NoTruckSource/EditNoTruckSource')
					},
					{
						path: '/notruckwaybill',
						name: 'notruckwaybill',
						meta: {
							title: '运单上传'
						},
						component: () => import('../components/NoTruckCarrier/NotruckWaybill')
					},
					{
						path: '/addnotruckwaybill',
						name: 'addnotruckwaybill',
						meta: {
							title: '添加运单'
						},
						component: () => import('../components/NoTruckCarrier/NotruckWaybill/AddNotruckWaybill')
					},
					{
						path: '/viewnotruckwaybill',
						name: 'viewnotruckwaybill',
						meta: {
							title: '查看运单'
						},
						component: () => import('../components/NoTruckCarrier/NotruckWaybill/ViewNotruckWaybill')
					},
					{
						path: '/editnotruckwaybill',
						name: 'editnotruckwaybill',
						meta: {
							title: '编辑运单'
						},
						component: () => import('../components/NoTruckCarrier/NotruckWaybill/EditNotruckWaybill')
					},
					{
						path: '/notruckuser',
						name: 'notruckuser',
						meta: {
							title: '接口配置'
						},
						component: () => import('../components/NoTruckCarrier/NoTruckUser')
					},
					{
						path: '/addnotruckuser',
						name: 'addnotruckuser',
						meta: {
							title: '添加接口配置'
						},
						component: () => import('../components/NoTruckCarrier/NoTruckUser/AddNoTruckUser')
					},
					{
						path: '/editnotruckuser',
						name: 'editnotruckuser',
						meta: {
							title: '编辑接口配置'
						},
						component: () => import('../components/NoTruckCarrier/NoTruckUser/EditNoTruckUser')
					},
					{
						path: '/viewnotruckuser',
						name: 'viewnotruckuser',
						meta: {
							title: '查看接口配置'
						},
						component: () => import('../components/NoTruckCarrier/NoTruckUser/ViewNoTruckUser')
					},
				]
			},
			{
				path: '/finance',
				name: 'finance',
				meta: {
					title: '财务'
				},
				component: () => import ('../components/Finance'),
				redirect: '/settleconfig',
				children: [
					{
						path: '/settleconfig',
						name: 'settleconfig',
						meta: {
							title: '结算设置'
						},
						component: () => import ('../components/Finance/SettleConfig/index'),
					},
					{
						path: '/addsettleconfig',
						name: 'addsettleconfig',
						meta: {
							title: '添加运费模板'
						},
						component: () => import ('../components/Finance/SettleConfig/Add'),
					},
					{
						path: '/editsettleconfig',
						name: 'editsettleconfig',
						meta: {
							title: '编辑运费模板'
						},
						component: () => import ('../components/Finance/SettleConfig/Edit'),
					},
					{
						path: '/viewsettleconfig',
						name: 'viewsettleconfig',
						meta: {
							title: '查看运费模板'
						},
						component: () => import ('../components/Finance/SettleConfig/View'),
					},
					{
						path: '/receivablesum',
						name: 'receivablesum',
						meta: {
							title: '应收汇总'
						},
						component: () => import ('../components/Finance/Receivablesum/index'),
					},
					{
						path: '/receivableinfo',
						name: 'receivableinfo',
						meta: {
							title: '应收明细'
						},
						component: () => import ('../components/Finance/Receivableinfo/index'),
					},
					{
						path: '/payablesum',
						name: 'payablesum',
						meta: {
							title: '应付汇总'
						},
						component: () => import ('../components/Finance/Payablesum/index'),
					},
					{
						path: '/payableinfo',
						name: 'payableinfo',
						meta: {
							title: '应付明细'
						},
						component: () => import ('../components/Finance/Payableinfo/index'),
					}
				]
			},
			{
				path: '/transteam',
				name: 'transteam',
				meta: {
					title: '运输档案'
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
						component: () => import ('../components/TransTeam/Truck/index'),
					},
					{
						path: '/addtruck',
						name: 'addtruck',
						meta: {
							title: '添加车辆'
						},
						component: () => import ('../components/TransTeam/Truck/Add'),
					},
					{
						path: '/edittruck',
						name: 'edittruck',
						meta: {
							title: '编辑车辆'
						},
						component: () => import ('../components/TransTeam/Truck/Edit'),
					},
					{
						path: '/viewtruck',
						name: 'viewtruck',
						meta: {
							title: '查看车辆'
						},
						component: () => import ('../components/TransTeam/Truck/View'),
					},
					{
						path: '/supercargo',
						name: 'supercargo',
						meta: {
							title: '运输人员'
						},
						component: () => import ('../components/TransTeam/SuperCargo/index'),
					},
					{
						path: '/addsupercargo',
						name: 'addsupercargo',
						meta: {
							title: '添加运输人员'
						},
						component: () => import ('../components/TransTeam/SuperCargo/Add'),
					},
					{
						path: '/editsupercargo',
						name: 'editsupercargo',
						meta: {
							title: '编辑运输人员'
						},
						component: () => import ('../components/TransTeam/SuperCargo/Edit'),
					},
					{
						path: '/viewsupercargo',
						name: 'viewsupercargo',
						meta: {
							title: '查看运输人员'
						},
						component: () => import ('../components/TransTeam/SuperCargo/View'),
					},
					{
						path: '/driver',
						name: 'driver',
						meta: {
							title: '司机'
						},
						component: () => import ('../components/TransTeam/Driver/index'),
					},
					{
						path: '/adddriver',
						name: 'adddriver',
						meta: {
							title: '添加司机'
						},
						component: () => import ('../components/TransTeam/Driver/Add'),
					},
					{
						path: '/editdriver',
						name: 'editdriver',
						meta: {
							title: '编辑司机'
						},
						component: () => import ('../components/TransTeam/Driver/Edit'),
					},
					{
						path: '/viewdriver',
						name: 'viewdriver',
						meta: {
							title: '查看司机'
						},
						component: () => import ('../components/TransTeam/Driver/View'),
					},
					{
						path: '/refdriverapp',
						name: 'refdriverapp',
						meta: {
							title: '关联司机APP'
						},
						component: () => import ('../components/TransTeam/RefDriverApp/index'),
					},
					{
						path: '/transinfo',
						name: 'transinfo',
						meta: {
							title: '运输档案'
						},
						component: () => import ('../components/TransTeam/TransInfo/index'),
					},
					{
						path: '/addtransinfo',
						name: 'addtransinfo',
						meta: {
							title: '添加运输档案'
						},
						component: () => import ('../components/TransTeam/TransInfo/Add'),
					},
					{
						path: '/edittransinfo',
						name: 'edittransinfo',
						meta: {
							title: '编辑运输档案'
						},
						component: () => import ('../components/TransTeam/TransInfo/Edit'),
					},
					{
						path: '/viewtransinfo',
						name: 'viewtransinfo',
						meta: {
							title: '查看运输档案'
						},
						component: () => import ('../components/TransTeam/TransInfo/View'),
					},
					{
						path: '/expirewarn',
						name: 'expirewarn',
						meta: {
							title: '到期预警'
						},
						component: () => import ('../components/TransTeam/ExpireWarn/index'),
					},
				]
			},
			{
				path: '/basedata',
				name: 'basedata',
				meta: { title: '基础资料' },
				component: () => import ('../components/Basedata'),
				redirect: '/recdeliverycomp',
				children: [
					{
						path: '/recdeliverycomp',
						name: 'recdeliverycomp',
						meta: { title: '收发货单位' },
						component: () => import ('../components/Basedata/Customer'),
					},
					{
						path: '/addrecdeliverycomp',
						name: 'addrecdeliverycomp',
						meta: { title: '添加收发货单位' },
						component: () => import ('../components/Basedata/Customer/Add'),
					},
					{
						path: '/editrecdeliverycomp',
						name: 'editrecdeliverycomp',
						meta: { title: '编辑收发货单位' },
						component: () => import ('../components/Basedata/Customer/Edit'),
					},
					{
						path: '/viewrecdeliverycomp',
						name: 'viewrecdeliverycomp',
						meta: { title: '收发货单位详情' },
						component: () => import ('../components/Basedata/Customer/View'),
					},
					{
						path: '/companyaddress',
						name: 'companyaddress',
						meta: { title: '收发货单位地址' },
						component: () => import ('../components/Basedata/CompanyAddress'),
					},
					{
						path: '/addcompanyaddress',
						name: 'addcompanyaddress',
						meta: { title: '添加收发货单位地址' },
						component: () => import ('../components/Basedata/CompanyAddress/Add'),
					},
					{
						path: '/editcompanyaddress',
						name: 'editcompanyaddress',
						meta: { title: '编辑收发货单位地址' },
						component: () => import ('../components/Basedata/CompanyAddress/Edit'),
					},
					{
						path: '/viewcompanyaddress',
						name: 'viewcompanyaddress',
						meta: { title: '查看收发货单位地址' },
						component: () => import ('../components/Basedata/CompanyAddress/View'),
					},
					{
						path: '/cargounit',
						name: 'cargounit',
						meta: { title: '货物单位' },
						component: () => import ('../components/Basedata/CargoUnit/index'),
					},
					{
						path: '/cargo',
						name: 'cargo',
						meta: { title: '常用货物' },
						component: () => import ('../components/Basedata/Cargo/index'),
					},
					{
						path: '/addcargo',
						name: 'addcargo',
						meta: { title: '添加常用货物' },
						component: () => import ('../components/Basedata/Cargo/Add'),
					},
					{
						path: '/editcargo',
						name: 'editcargo',
						meta: { title: '编辑常用货物' },
						component: () => import ('../components/Basedata/Cargo/Edit'),
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
			},
			{
				path: '/companyInfo',
				name: 'companyInfo',
				meta: {
					title: '修改企业资料'
				},
				component: () => import('../components/CompanyInfo'),
			},
			{
				path: '/system',
				name: '/system',
				meta: {
					title: '系统设置'
				},
				component: () => import('../components/System'),
				redirect: '/usermanage',
				children: [
					
					{
						path: '/usermanage',
						name: 'usermanage',
						meta: {
							title: '账号权限'
						},
						component: () => import('../components/System/Usermanage/index')
					},
					{
						path: '/adduser',
						name: 'adduser',
						meta: {
							title: '添加账号'
						},
						component: () => import('../components/System/Usermanage/Add')
					},
					{
						path: '/edituser',
						name: 'edituser',
						meta: {
							title: '编辑账号'
						},
						component: () => import('../components/System/Usermanage/Edit')
					},
					{
						path: '/viewuser',
						name: 'viewuser',
						meta: {
							title: '查看账号'
						},
						component: () => import('../components/System/Usermanage/View')
					},
					{
						path: '/menumanage',
						name: 'menumanage',
						meta: {
							title: '菜单管理'
						},
						component: () => import('../components/System/Menumanage')
					},
					{
						path: '/rolemanage',
						name: 'rolemanage',
						meta: {
							title: '角色管理'
						},
						component: () => import('../components/System/Rolemanage')
					},
					{
						path: '/orgmange',
						name: 'orgmange',
						meta: {
							title: '机构管理'
						},
						component: () => import('../components/System/Orgmange')
					}
				]
			}
		]
	}
]
const router = new Router({
	// mode: process.env.ENV_CONFIG == 'test' ? 'hash' : 'history',
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
