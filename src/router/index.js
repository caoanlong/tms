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
                component: () => import ('../components/Home')
            },
            /**
             * 异常报警
             */
            {
                path: '/exceptanomaly',
                name: 'exceptanomaly',
                meta: { title: '异常报警'},
                component: () => import('../components/Anomaly/ExceptAnomaly')
            },
            {
                path: '/companycaveat',
                name: 'companycaveat',
                meta: { title: '工厂报警'},
                component: () => import('../components/Anomaly/CompanyCaveat')
            },
            {
                path: '/customercaveat',
                name: 'customercaveat',
                meta: { title: '客户报警'},
                component: () => import('../components/Anomaly/CustomerCaveat')
            },
            /**
             * 交货单
             */
            {
                path: '/delivery',
                name: 'delivery',
                meta: { title: '交货单'},
                component: () => import('../components/Buisiness/Delivery')
            },
            {
                path: '/adddelivery',
                name: 'adddelivery',
                meta: { title: '添加交货单'},
                component: () => import('../components/Buisiness/Delivery/Add')
            },
            {
                path: '/editdelivery',
                name: 'editdelivery',
                meta: { title: '编辑交货单'},
                component: () => import('../components/Buisiness/Delivery/Edit')
            },
            {
                path: '/viewdelivery',
                name: 'viewdelivery',
                meta: { title: '交货单详情'},
                component: () => import('../components/Buisiness/Delivery/View')
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
             * 运输档案  transteam
             */
            {
                path: '/truck',
                name: 'truck',
                meta: { title: '车辆' },
                component: () => import ('../components/TransTeam/Truck/index'),
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
                path: '/gpsdevice',
                name: 'gpsdevice',
                meta: { title: 'GPS设备' },
                component: () => import ('../components/TransTeam/GPSDevice'),
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
                path: '/edituser',
                name: 'edituser',
                meta: { title: '编辑用户' },
                component: () => import ('../components/System/Usermanage/Edit')
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
            },
            {
                path: '/addrole',
                name: 'addrole',
                meta: { title: '添加角色' },
                component: () => import ('../components/System/Rolemanage/Add')
            },
            {
                path: '/editrole',
                name: 'editrole',
                meta: { title: '编辑角色' },
                component: () => import ('../components/System/Rolemanage/Edit')
            },
            {
                path: '/logs',
                name: 'logs',
                meta: { title: '操作日志' },
                component: () => import('../components/System/Logs')
            },
            {
                path: '/viewlogs',
                name: 'viewlogs',
                meta: { title: '日志详情' },
                component: () => import('../components/System/Logs/View')
            },
            {
                path: '/orgpersons',
                name: 'orgpersons',
                meta: { title: '组织人员' },
                component: () => import('../components/System/OrgPersons')
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
    if (to.name == 'monitoring') {
        const href = 'http://139.159.253.116:8080/clbs/v/monitoring/realTimeMonitoring'
        window.open(href, '_blank')
        return
    }
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