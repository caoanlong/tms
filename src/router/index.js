import Vue from 'vue'
import Router from 'vue-router'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style

import Layout from '@/components/Layout'
import Login from '@/components/Login'

Vue.use(Router)

let routerMap = [{
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '',
        component: Layout,
        children: [{
                path: '/',
                name: 'home',
                meta: { title: '首页' },
                component: () =>
                    import ('../components/Home')
            },
            {
                path: '/buisiness',
                name: 'buisiness',
                meta: { title: '业务' },
                component: () =>
                    import ('../components/Buisiness'),
                redirect: '/carrierbill',
                children: [{
                        path: '/carrierbill',
                        name: 'carrierbill',
                        meta: { title: '承运单' },
                        component: () =>
                            import ('../components/Buisiness/Carrierbill'),
                    },
                    {
                        path: '/addcarrierbill',
                        name: 'addcarrierbill',
                        meta: { title: '添加承运单' },
                        component: () =>
                            import ('../components/Buisiness/Carrierbill/Add'),
                    },
                    {
                        path: '/viewcarrierbill',
                        name: 'viewcarrierbill',
                        meta: { title: '承运单详情' },
                        component: () =>
                            import ('../components/Buisiness/Carrierbill/View')
                    },
                    {
                        path: '/editcarrierbill',
                        name: 'editcarrierbill',
                        meta: { title: '编辑承运单' },
                        component: () =>
                            import ('../components/Buisiness/Carrierbill/Edit')
                    }
                ]
            },
            {
                path: '/dispatch',
                name: 'dispatch',
                meta: { title: '调度' },
                component: () =>
                    import ('../components/Dispatch'),
                redirect: '/dispatchbill',
                children: [{
                        path: '/dispatching',
                        name: 'dispatching',
                        meta: { title: '待调度' },
                        component: () =>
                            import ('../components/Dispatch/Dispatching'),
                    },
                    {
                        path: '/dispatched',
                        name: 'dispatched',
                        meta: { title: '已调度' },
                        component: () =>
                            import ('../components/Dispatch/Dispatched'),
                    },
                    {
                        path: '/redispatching',
                        name: 'redispatching',
                        meta: { title: '重新调度' },
                        component: () =>
                            import ('../components/Dispatch/Dispatching'),
                    },
                    {
                        path: '/viewdispatchbill',
                        name: 'viewdispatchbill',
                        meta: { title: '调度单详情' },
                        component: () =>
                            import ('../components/Dispatch/Dispatched/View')
                    }
                ]
            },
            {
                path: '/notruckcarrier',
                name: 'notruckcarrier',
                meta: { title: '无车承运人' },
                component: () =>
                    import ('../components/NoTruckCarrier'),
                redirect: '/notruckcargosource',
                children: [{
                        path: '/notruckcargosource',
                        name: 'notruckcargosource',
                        meta: { title: '货源上传' },
                        component: () =>
                            import ('../components/NoTruckCarrier/NotruckCargosource')
                    },
                    {
                        path: '/addnotruckcargosource',
                        name: 'addnotruckcargosource',
                        meta: { title: '添加货源' },
                        component: () =>
                            import ('../components/NoTruckCarrier/NotruckCargosource/Add')
                    },
                    {
                        path: '/viewnotruckcargosource',
                        name: 'viewnotruckcargosource',
                        meta: { title: '查看货源' },
                        component: () =>
                            import ('../components/NoTruckCarrier/NotruckCargosource/View')
                    },
                    {
                        path: '/editnotruckcargosource',
                        name: 'editnotruckcargosource',
                        meta: { title: '编辑货源' },
                        component: () =>
                            import ('../components/NoTruckCarrier/NotruckCargosource/Edit')
                    },
                    {
                        path: '/notrucksource',
                        name: 'notrucksource',
                        meta: { title: '车源上传' },
                        component: () =>
                            import ('../components/NoTruckCarrier/NoTruckSource')
                    },
                    {
                        path: '/addnotrucksource',
                        name: 'addnotrucksource',
                        meta: { title: '添加车源' },
                        component: () =>
                            import ('../components/NoTruckCarrier/NoTruckSource/Add')
                    },
                    {
                        path: '/viewnotrucksource',
                        name: 'viewnotrucksource',
                        meta: { title: '查看车源' },
                        component: () =>
                            import ('../components/NoTruckCarrier/NoTruckSource/View')
                    },
                    {
                        path: '/editnotrucksource',
                        name: 'editnotrucksource',
                        meta: { title: '编辑车源' },
                        component: () =>
                            import ('../components/NoTruckCarrier/NoTruckSource/Edit')
                    },
                    {
                        path: '/notruckwaybill',
                        name: 'notruckwaybill',
                        meta: { title: '运单上传' },
                        component: () =>
                            import ('../components/NoTruckCarrier/NotruckWaybill')
                    },
                    {
                        path: '/addnotruckwaybill',
                        name: 'addnotruckwaybill',
                        meta: { title: '添加运单' },
                        component: () =>
                            import ('../components/NoTruckCarrier/NotruckWaybill/Add')
                    },
                    {
                        path: '/viewnotruckwaybill',
                        name: 'viewnotruckwaybill',
                        meta: { title: '查看运单' },
                        component: () =>
                            import ('../components/NoTruckCarrier/NotruckWaybill/View')
                    },
                    {
                        path: '/editnotruckwaybill',
                        name: 'editnotruckwaybill',
                        meta: { title: '编辑运单' },
                        component: () =>
                            import ('../components/NoTruckCarrier/NotruckWaybill/Edit')
                    },
                    {
                        path: '/notruckuser',
                        name: 'notruckuser',
                        meta: { title: '接口配置' },
                        component: () =>
                            import ('../components/NoTruckCarrier/NoTruckUser')
                    },
                    {
                        path: '/addnotruckuser',
                        name: 'addnotruckuser',
                        meta: { title: '添加接口配置' },
                        component: () =>
                            import ('../components/NoTruckCarrier/NoTruckUser/Add')
                    },
                    {
                        path: '/editnotruckuser',
                        name: 'editnotruckuser',
                        meta: { title: '编辑接口配置' },
                        component: () =>
                            import ('../components/NoTruckCarrier/NoTruckUser/Edit')
                    },
                    {
                        path: '/viewnotruckuser',
                        name: 'viewnotruckuser',
                        meta: { title: '查看接口配置' },
                        component: () =>
                            import ('../components/NoTruckCarrier/NoTruckUser/View')
                    },
                ]
            },
            {
                path: '/finance',
                name: 'finance',
                meta: { title: '财务' },
                component: () =>
                    import ('../components/Finance'),
                redirect: '/settleconfig',
                children: [{
                        path: '/settleconfig',
                        name: 'settleconfig',
                        meta: { title: '结算设置' },
                        component: () =>
                            import ('../components/Finance/SettleConfig/index'),
                    },
                    {
                        path: '/addsettleconfig',
                        name: 'addsettleconfig',
                        meta: { title: '添加运费模板' },
                        component: () =>
                            import ('../components/Finance/SettleConfig/Add'),
                    },
                    {
                        path: '/editsettleconfig',
                        name: 'editsettleconfig',
                        meta: { title: '编辑运费模板' },
                        component: () =>
                            import ('../components/Finance/SettleConfig/Edit'),
                    },
                    {
                        path: '/viewsettleconfig',
                        name: 'viewsettleconfig',
                        meta: { title: '查看运费模板' },
                        component: () =>
                            import ('../components/Finance/SettleConfig/View'),
                    }
                ]
            },
            {
                path: '/transteam',
                name: 'transteam',
                meta: { title: '运输档案' },
                component: () =>
                    import ('../components/TransTeam'),
                redirect: '/truck',
                children: [{
                        path: '/truck',
                        name: 'truck',
                        meta: { title: '车辆' },
                        component: () =>
                            import ('../components/TransTeam/Truck/index'),
                    },
                    {
                        path: '/addtruck',
                        name: 'addtruck',
                        meta: { title: '添加车辆' },
                        component: () =>
                            import ('../components/TransTeam/Truck/Add'),
                    },
                    {
                        path: '/edittruck',
                        name: 'edittruck',
                        meta: { title: '编辑车辆' },
                        component: () =>
                            import ('../components/TransTeam/Truck/Edit'),
                    },
                    {
                        path: '/viewtruck',
                        name: 'viewtruck',
                        meta: { title: '查看车辆' },
                        component: () =>
                            import ('../components/TransTeam/Truck/View'),
                    },
                    {
                        path: '/supercargo',
                        name: 'supercargo',
                        meta: { title: '运输人员' },
                        component: () =>
                            import ('../components/TransTeam/SuperCargo/index'),
                    },
                    {
                        path: '/addsupercargo',
                        name: 'addsupercargo',
                        meta: { title: '添加运输人员' },
                        component: () =>
                            import ('../components/TransTeam/SuperCargo/Add'),
                    },
                    {
                        path: '/editsupercargo',
                        name: 'editsupercargo',
                        meta: { title: '编辑运输人员' },
                        component: () =>
                            import ('../components/TransTeam/SuperCargo/Edit'),
                    },
                    {
                        path: '/viewsupercargo',
                        name: 'viewsupercargo',
                        meta: { title: '查看运输人员' },
                        component: () =>
                            import ('../components/TransTeam/SuperCargo/View'),
                    },
                    {
                        path: '/refdriverapp',
                        name: 'refdriverapp',
                        meta: { title: '关联司机APP' },
                        component: () =>
                            import ('../components/TransTeam/RefDriverApp/index'),
                    },
                    {
                        path: '/expirewarn',
                        name: 'expirewarn',
                        meta: { title: '到期预警' },
                        component: () =>
                            import ('../components/TransTeam/ExpireWarn/index'),
                    },
                ]
            },
            {
                path: '/basedata',
                name: 'basedata',
                meta: { title: '基础资料' },
                component: () =>
                    import ('../components/Basedata'),
                redirect: '/recdeliverycomp',
                children: [{
                        path: '/recdeliverycomp',
                        name: 'recdeliverycomp',
                        meta: { title: '收发货单位' },
                        component: () =>
                            import ('../components/Basedata/Customer'),
                    },
                    {
                        path: '/addrecdeliverycomp',
                        name: 'addrecdeliverycomp',
                        meta: { title: '添加收发货单位' },
                        component: () =>
                            import ('../components/Basedata/Customer/Add'),
                    },
                    {
                        path: '/editrecdeliverycomp',
                        name: 'editrecdeliverycomp',
                        meta: { title: '编辑收发货单位' },
                        component: () =>
                            import ('../components/Basedata/Customer/Edit'),
                    },
                    {
                        path: '/viewrecdeliverycomp',
                        name: 'viewrecdeliverycomp',
                        meta: { title: '收发货单位详情' },
                        component: () =>
                            import ('../components/Basedata/Customer/View'),
                    },
                    {
                        path: '/companyaddress',
                        name: 'companyaddress',
                        meta: { title: '收发货单位地址' },
                        component: () =>
                            import ('../components/Basedata/CompanyAddress'),
                    },
                    {
                        path: '/addcompanyaddress',
                        name: 'addcompanyaddress',
                        meta: { title: '添加收发货单位地址' },
                        component: () =>
                            import ('../components/Basedata/CompanyAddress/Add'),
                    },
                    {
                        path: '/editcompanyaddress',
                        name: 'editcompanyaddress',
                        meta: { title: '编辑收发货单位地址' },
                        component: () =>
                            import ('../components/Basedata/CompanyAddress/Edit'),
                    },
                    {
                        path: '/viewcompanyaddress',
                        name: 'viewcompanyaddress',
                        meta: { title: '查看收发货单位地址' },
                        component: () =>
                            import ('../components/Basedata/CompanyAddress/View'),
                    },
                    {
                        path: '/cargounit',
                        name: 'cargounit',
                        meta: { title: '货物单位' },
                        component: () =>
                            import ('../components/Basedata/CargoUnit/index'),
                    },
                    {
                        path: '/cargo',
                        name: 'cargo',
                        meta: { title: '货物' },
                        component: () =>
                            import ('../components/Basedata/Cargo/index'),
                    },
                    {
                        path: '/addcargo',
                        name: 'addcargo',
                        meta: { title: '添加货物' },
                        component: () =>
                            import ('../components/Basedata/Cargo/Add'),
                    },
                    {
                        path: '/editcargo',
                        name: 'editcargo',
                        meta: {
                            title: '编辑货物'
                        },
                        component: () =>
                            import ('../components/Basedata/Cargo/Edit'),
                    },
                    {
                        path: '/viewcargo',
                        name: 'viewcargo',
                        meta: {
                            title: '货物详情'
                        },
                        component: () =>
                            import ('../components/Basedata/Cargo/View'),
                    }
                ]
            },
            {
                path: '/user',
                name: 'user',
                meta: { title: '个人资料' },
                component: () =>
                    import ('../components/User'),
                redirect: '/userprofile',
                children: [{
                    path: '/userprofile',
                    name: 'userprofile',
                    meta: { title: '用户信息' },
                    component: () =>
                        import ('../components/User/UserProfile')
                }]
            },
            {
                path: '/companyInfo',
                name: 'companyInfo',
                meta: { title: '修改企业资料' },
                component: () =>
                    import ('../components/CompanyInfo'),
            },
            {
                path: '/system',
                name: '/system',
                meta: { title: '系统设置' },
                component: () =>
                    import ('../components/System'),
                redirect: '/usermanage',
                children: [{
                        path: '/usermanage',
                        name: 'usermanage',
                        meta: { title: '用户管理' },
                        component: () =>
                            import ('../components/System/Usermanage/index')
                    },
                    {
                        path: '/adduser',
                        name: 'adduser',
                        meta: { title: '添加用户' },
                        component: () =>
                            import ('../components/System/Usermanage/Add')
                    },
                    {
                        path: '/viewuser',
                        name: 'viewuser',
                        meta: { title: '查看用户' },
                        component: () =>
                            import ('../components/System/Usermanage/View')
                    },
                    {
                        path: '/rolemanage',
                        name: 'rolemanage',
                        meta: { title: '角色管理' },
                        component: () =>
                            import ('../components/System/Rolemanage')
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
        if (to.path === '/login') {
            next()
        } else {
            next('/login')
        }
        NProgress.done()
    }
})

export default router