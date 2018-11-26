import Vue from 'vue'
import Router from 'vue-router'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style

import Layout from '@/components/Layout'
import Login from '@/components/Login'
import { TabPane } from 'element-ui';

Vue.use(Router)

const routerMap = [
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
		path: '/trackquery',
		name: 'trackquery',
		meta: { title: '轨迹查询' },
		component: () => import('../components/TrackQuery')
	},
    {
        path: '',
        component: Layout,
        children: [
            {
                path: '/icons',
                name: 'icons',
                meta: { title: '图标', keepAlive: false, isUseCache: false },
                component: () => import ('../components/IconsPreview')
            },{
                path: '/',
                name: 'home',
                meta: { title: '首页', keepAlive: false, isUseCache: false },
                component: () => import ('../components/Home'),
                redirect: '/transportreg',
                children: [
                    {
                        path: '/transportreg',
                        name: 'transportreg',
                        meta: { title: '运输调控' },
                        component: () => import('../components/Home/components/TransportReg'),
                    },
                    {
                        path: '/pricereg',
                        name: 'pricereg',
                        meta: { title: '价格调控' },
                        component: () => import('../components/Home/components/PriceReg'),
                    }
                ]
            },
            /**
             * 业务  buisiness
             */
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
            },
            {
                path: '/copycarrierbill',
                name: 'copycarrierbill',
                meta: { title: '复制承运单' },
                component: () => import ('../components/Buisiness/Carrierbill/Copy')
            },
            /**
             * 调度  dispatch
             */
            {
                path: '/dispatching',
                name: 'dispatching',
                meta: { title: '待调度' },
                component: () => import ('../components/Dispatch/Dispatching'),
            },
            {
                path: '/dispatched',
                name: 'dispatched',
                meta: { title: '已调度' },
                component: () => import ('../components/Dispatch/Dispatched'),
            },
            {
                path: '/redispatching',
                name: 'redispatching',
                meta: { title: '重新调度' },
                component: () => import ('../components/Dispatch/Dispatching'),
            },
            {
                path: '/viewdispatchbill',
                name: 'viewdispatchbill',
                meta: { title: '调度单详情' },
                component: () => import ('../components/Dispatch/Dispatched/View')
            },
            /**
             * 无车承运人   notruckcarrier
             */
            {
                path: '/notruckcargosource',
                name: 'notruckcargosource',
                meta: { title: '货源上传' },
                component: () => import ('../components/NoTruckCarrier/NotruckCargoSource')
            },
            {
                path: '/addnotruckcargosource',
                name: 'addnotruckcargosource',
                meta: { title: '添加货源' },
                component: () => import ('../components/NoTruckCarrier/NotruckCargoSource/Add')
            },
            {
                path: '/viewnotruckcargosource',
                name: 'viewnotruckcargosource',
                meta: { title: '查看货源' },
                component: () => import ('../components/NoTruckCarrier/NotruckCargoSource/View')
            },
            {
                path: '/notrucktruck',
                name: 'notrucktruck',
                meta: { title: '车源上传' },
                component: () => import ('../components/NoTruckCarrier/NoTruckTruck')
            },
            {
                path: '/addnotrucktruck',
                name: 'addnotrucktruck',
                meta: { title: '添加车源' },
                component: () => import ('../components/NoTruckCarrier/NoTruckTruck/Add')
            },
            {
                path: '/viewnotrucktruck',
                name: 'viewnotrucktruck',
                meta: { title: '查看车源' },
                component: () => import ('../components/NoTruckCarrier/NoTruckTruck/View')
            },
            {
                path: '/notruckcarryorder',
                name: 'notruckcarryorder',
                meta: { title: '运单上传' },
                component: () => import ('../components/NoTruckCarrier/NotruckCarryOrder')
            },
            {
                path: '/addnotruckcarryorder',
                name: 'addnotruckcarryorder',
                meta: { title: '添加运单' },
                component: () => import ('../components/NoTruckCarrier/NotruckCarryOrder/Add')
            },
            {
                path: '/viewnotruckcarryorder',
                name: 'viewnotruckcarryorder',
                meta: { title: '查看运单' },
                component: () => import ('../components/NoTruckCarrier/NotruckCarryOrder/View')
            },
            {
                path: '/notruckbroker',
                name: 'notruckbroker',
                meta: { title: '资料补充' },
                component: () => import ('../components/NoTruckCarrier/NotruckBroker')
            },
            /**
             * 财务   finance
             */
            {
                path: '/settleconfig',
                name: 'settleconfig',
                meta: { title: '结算设置' },
                component: () => import ('../components/Finance/SettleConfig/index'),
            },
            {
                path: '/addsettleconfig',
                name: 'addsettleconfig',
                meta: { title: '添加运费模板' },
                component: () => import ('../components/Finance/SettleConfig/Add'),
            },
            {
                path: '/editsettleconfig',
                name: 'editsettleconfig',
                meta: { title: '编辑运费模板' },
                component: () => import ('../components/Finance/SettleConfig/Edit'),
            },
            {
                path: '/viewsettleconfig',
                name: 'viewsettleconfig',
                meta: { title: '查看运费模板' },
                component: () => import ('../components/Finance/SettleConfig/View'),
            },
            /**
             * 运输档案  transteam
             */
            {
                path: '/truck',
                name: 'truck',
                meta: { title: '车辆' },
                component: () => import ('../components/TransTeam/Truck/index'),
            },
            {
                path: '/addtruck',
                name: 'addtruck',
                meta: { title: '添加车辆' },
                component: () => import ('../components/TransTeam/Truck/Add'),
            },
            {
                path: '/edittruck',
                name: 'edittruck',
                meta: { title: '编辑车辆' },
                component: () => import ('../components/TransTeam/Truck/Edit'),
            },
            {
                path: '/viewtruck',
                name: 'viewtruck',
                meta: { title: '查看车辆' },
                component: () => import ('../components/TransTeam/Truck/View'),
            },
            {
                path: '/supercargo',
                name: 'supercargo',
                meta: { title: '运输人员' },
                component: () => import ('../components/TransTeam/SuperCargo/index'),
            },
            {
                path: '/addsupercargo',
                name: 'addsupercargo',
                meta: { title: '添加运输人员' },
                component: () => import ('../components/TransTeam/SuperCargo/Add'),
            },
            {
                path: '/editsupercargo',
                name: 'editsupercargo',
                meta: { title: '编辑运输人员' },
                component: () => import ('../components/TransTeam/SuperCargo/Edit'),
            },
            {
                path: '/viewsupercargo',
                name: 'viewsupercargo',
                meta: { title: '查看运输人员' },
                component: () => import ('../components/TransTeam/SuperCargo/View'),
            },
            {
                path: '/refdriverapp',
                name: 'refdriverapp',
                meta: { title: '关联司机APP' },
                component: () => import ('../components/TransTeam/RefDriverApp/index'),
            },
            {
                path: '/expirewarn',
                name: 'expirewarn',
                meta: { title: '到期预警' },
                component: () => import ('../components/TransTeam/ExpireWarn/index'),
            },
            /**
             * 基础资料  basedata
             */
            {
                path: '/recdeliverycomp',
                name: 'recdeliverycomp',
                meta: { title: '客户' },
                component: () => import ('../components/Basedata/Customer'),
            },
            {
                path: '/addrecdeliverycomp',
                name: 'addrecdeliverycomp',
                meta: { title: '添加客户' },
                component: () => import ('../components/Basedata/Customer/Add'),
            },
            {
                path: '/editrecdeliverycomp',
                name: 'editrecdeliverycomp',
                meta: { title: '编辑客户' },
                component: () => import ('../components/Basedata/Customer/Edit'),
            },
            {
                path: '/viewrecdeliverycomp',
                name: 'viewrecdeliverycomp',
                meta: { title: '客户详情' },
                component: () => import ('../components/Basedata/Customer/View'),
            },
            {
                path: '/companyaddress',
                name: 'companyaddress',
                meta: { title: '客户地址' },
                component: () => import ('../components/Basedata/CompanyAddress'),
            },
            {
                path: '/addcompanyaddress',
                name: 'addcompanyaddress',
                meta: { title: '添加客户地址' },
                component: () => import ('../components/Basedata/CompanyAddress/Add'),
            },
            {
                path: '/editcompanyaddress',
                name: 'editcompanyaddress',
                meta: { title: '编辑客户地址' },
                component: () => import ('../components/Basedata/CompanyAddress/Edit'),
            },
            {
                path: '/viewcompanyaddress',
                name: 'viewcompanyaddress',
                meta: { title: '查看客户地址' },
                component: () => import ('../components/Basedata/CompanyAddress/View'),
            },
            {
                path: '/customerprice',
                name: 'customerprice',
                meta: { title: '客户定价' },
                component: () => import ('../components/Basedata/CustomerPrice'),
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
                meta: { title: '货物' },
                component: () => import ('../components/Basedata/Cargo/index'),
            },
            {
                path: '/addcargo',
                name: 'addcargo',
                meta: { title: '添加货物' },
                component: () => import ('../components/Basedata/Cargo/Add'),
            },
            {
                path: '/editcargo',
                name: 'editcargo',
                meta: { title: '编辑货物' },
                component: () => import ('../components/Basedata/Cargo/Edit'),
            },
            {
                path: '/viewcargo',
                name: 'viewcargo',
                meta: { title: '货物详情' },
                component: () => import ('../components/Basedata/Cargo/View'),
            },
            /**
             * 个人资料  user
             */
            {
                path: '/userprofile',
                name: 'userprofile',
                meta: { title: '用户信息' },
                component: () => import ('../components/User/UserProfile')
            },
            {
                path: '/companyInfo',
                name: 'companyInfo',
                meta: { title: '修改企业资料' },
                component: () => import ('../components/CompanyInfo'),
            },
            /**
             * 系统设置   system
             */
            {
                path: '/usermanage',
                name: 'usermanage',
                meta: { title: '用户管理' },
                component: () => import ('../components/System/Usermanage/index')
            },
            {
                path: '/adduser',
                name: 'adduser',
                meta: { title: '添加用户' },
                component: () => import ('../components/System/Usermanage/Add')
            },
            {
                path: '/viewuser',
                name: 'viewuser',
                meta: { title: '查看用户' },
                component: () => import ('../components/System/Usermanage/View')
            },
            {
                path: '/rolemanage',
                name: 'rolemanage',
                meta: { title: '角色管理' },
                component: () => import ('../components/System/Rolemanage')
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

NProgress.configure({ showSpinner: false }) // NProgress Configuration

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
        if (to.path === '/login' || to.path === '/trackquery') {
            next()
        } else {
            next('/login')
        }
        NProgress.done()
    }
})

export default router