import Base from './Base'
import request from '../common/request'

class Company extends Base {
    /**
     * 修改扩展信息
     */
    updateExtend (data)  {
        if (!this.isClick) return Promise.reject('重复提交！')
        this.isClick = false
        setTimeout(() => {
            this.isClick = true
        }, this.delay)
        return this.request({
            url: this.baseUrl + '/updateExtend',
            method: 'post',
            data
        })
    }
    /**
     * 扩展信息详情 
     */
    detailOfExtend (data) {
        return this.request({
            url: this.baseUrl + '/detailOfExtend',
            method: 'get',
            data
        })
    }

	/**
	 * 车辆&司机证件到期列表
	 * @param {*} params 
	 */
	expireList(params) {
        return new Promise((resolve, reject) => {
            this.request({
                url: this.baseUrl + '/expireList',
                params
            }).then(res => {
                resolve(res.data.data || res.data || res)
            })
        })
    }
    
    /**
     * 公司入驻申请
     */
    applyAdd(data) {
        if (!this.isClick) return Promise.reject('重复提交！')
        this.isClick = false
        setTimeout(() => { this.isClick = true }, this.delay)
        return this.request({
            url: this.baseUrl + '/apply/add',
            method: 'post',
            data
        })
    }

    /**
     * 客户
     */
    customerAdd(data) {
        if (!this.isClick) return Promise.reject('重复提交！')
        this.isClick = false
        setTimeout(() => { this.isClick = true }, this.delay)
        return this.request({
            url: this.baseUrl + '/customer/add',
            method: 'post',
            data
        })
    }
    customerFind(params) {
        return new Promise((resolve, reject) => {
            this.request({
                url: this.baseUrl + '/customer/list',
                params
            }).then(res => {
                resolve(res.data.data || res.data || res)
            })
        })
    }
    customerFindById(params) {
        return new Promise((resolve, reject) => {
            this.request({
                url: this.baseUrl + '/customer/detail',
                params
            }).then(res => {
                resolve(res.data.data || res.data || res)
            })
        })
    }
    customerUpdate(data) {
        if (!this.isClick) return Promise.reject('重复提交！')
        this.isClick = false
        setTimeout(() => { this.isClick = true }, this.delay)
        return this.request({
            url: this.baseUrl + '/customer/update',
            method: 'post',
            data
        })
    }
    customerDeleteBatch(data) {
        if (!this.isClick) return Promise.reject('重复提交！')
        this.isClick = false
        setTimeout(() => { this.isClick = true }, this.delay)
        return this.request({
            url: this.baseUrl + '/customer/deleteBatch',
            method: 'post',
            data
        })
    }
    customerSuggest(params) {
        return new Promise((resolve, reject) => {
            this.request({
                url: this.baseUrl + '/customer/suggest',
                params
            }).then(res => {
                resolve(res.data.data || res.data || res)
            })
        })
    }
    customerRoutePriceAdd(data) {
        if (!this.isClick) return Promise.reject('重复提交！')
        this.isClick = false
        setTimeout(() => { this.isClick = true }, this.delay)
        return this.request({
            url: this.baseUrl + '/customer/routePrice/add',
            method: 'post',
            data
        })
    }
    customerRoutePriceFind(params) {
        return new Promise((resolve, reject) => {
            this.request({
                url: this.baseUrl + '/customer/routePrice/list',
                params
            }).then(res => {
                resolve(res.data.data || res.data || res)
            })
        })
    }
    customerRoutePriceListForCalc(data) {
        return new Promise((resolve, reject) => {
            this.request({
                url: this.baseUrl + '/customer/routePrice/listForCalc',
                method: 'post',
                data,
                contentType: 'application/json;charset=utf-8'
            }).then(res => {
                resolve(res.data.data || res.data || res)
            })
        })
    }
    /**
     * 无车承运 - 货源
     */
    notruckCargoSourceAdd(data) {
        if (!this.isClick) return Promise.reject('重复提交！')
        this.isClick = false
        setTimeout(() => { this.isClick = true }, this.delay)
        return this.request({
            url: this.baseUrl + '/notruck/cargoSource/add',
            method: 'post',
            data
        })
    }
    notruckCargoSourceFind(params) {
        return new Promise((resolve, reject) => {
            this.request({
                url: this.baseUrl + '/notruck/cargoSource/list',
                params
            }).then(res => {
                resolve(res.data.data || res.data || res)
            })
        })
    }
    notruckCargoSourceFindById(params) {
        return new Promise((resolve, reject) => {
            this.request({
                url: this.baseUrl + '/notruck/cargoSource/detail',
                params
            }).then(res => {
                resolve(res.data.data || res.data || res)
            })
        })
    }
    /**
     * 无车承运 - 车辆
     */
    notruckTruckAdd(data) {
        if (!this.isClick) return Promise.reject('重复提交！')
        this.isClick = false
        setTimeout(() => { this.isClick = true }, this.delay)
        return this.request({
            url: this.baseUrl + '/notruck/truck/add',
            method: 'post',
            data
        })
    }
    notruckTruckFind(params) {
        return new Promise((resolve, reject) => {
            this.request({
                url: this.baseUrl + '/notruck/truck/list',
                params
            }).then(res => {
                resolve(res.data.data || res.data || res)
            })
        })
    }
    notruckTruckFindById(params) {
        return new Promise((resolve, reject) => {
            this.request({
                url: this.baseUrl + '/notruck/truck/detail',
                params
            }).then(res => {
                resolve(res.data.data || res.data || res)
            })
        })
    }
    /**
    * 无车承运 - 承运单
    */
    notruckCarryOrderAdd(data) {
        if (!this.isClick) return Promise.reject('重复提交！')
        this.isClick = false
        setTimeout(() => { this.isClick = true }, this.delay)
        return this.request({
            url: this.baseUrl + '/notruck/carryOrder/add',
            method: 'post',
            data
        })
    }
    notruckCarryOrderFind(params) {
        return new Promise((resolve, reject) => {
            this.request({
                url: this.baseUrl + '/notruck/carryOrder/list',
                params
            }).then(res => {
                resolve(res.data.data || res.data || res)
            })
        })
    }
    notruckCarryOrderFindById(params) {
        return new Promise((resolve, reject) => {
            this.request({
                url: this.baseUrl + '/notruck/carryOrder/detail',
                params
            }).then(res => {
                resolve(res.data.data || res.data || res)
            })
        })
    }

    /**
     * 货物
     */
    cargoAdd(data) {
        if (!this.isClick) return Promise.reject('重复提交！')
        this.isClick = false
        setTimeout(() => { this.isClick = true }, this.delay)
        return this.request({
            url: this.baseUrl + '/cargo/add',
            method: 'post',
            data
        })
    }
    cargoFind(params) {
        return new Promise((resolve, reject) => {
            this.request({
                url: this.baseUrl + '/cargo/list',
                params
            }).then(res => {
                resolve(res.data.data || res.data || res)
            })
        })
    }
    cargoFindById(params) {
        return new Promise((resolve, reject) => {
            this.request({
                url: this.baseUrl + '/cargo/detail',
                params
            }).then(res => {
                resolve(res.data.data || res.data || res)
            })
        })
    }
    cargoUpdate(data) {
        if (!this.isClick) return Promise.reject('重复提交！')
        this.isClick = false
        setTimeout(() => { this.isClick = true }, this.delay)
        return this.request({
            url: this.baseUrl + '/cargo/update',
            method: 'post',
            data
        })
    }
    cargoDeleteBatch(data) {
        if (!this.isClick) return Promise.reject('重复提交！')
        this.isClick = false
        setTimeout(() => { this.isClick = true }, this.delay)
        return this.request({
            url: this.baseUrl + '/cargo/deleteBatch',
            method: 'post',
            data
        })
    }

    /**
     * 货物单位
     */
    cargoUnitAdd(data) {
        if (!this.isClick) return Promise.reject('重复提交！')
        this.isClick = false
        setTimeout(() => { this.isClick = true }, this.delay)
        return this.request({
            url: this.baseUrl + '/cargoUnit/add',
            method: 'post',
            data
        })
    }
    cargoUnitFind(params) {
        return new Promise((resolve, reject) => {
            this.request({
                url: this.baseUrl + '/cargoUnit/list',
                params
            }).then(res => {
                resolve(res.data.data || res.data || res)
            })
        })
    }
    cargoUnitDeleteBatch(data) {
        if (!this.isClick) return Promise.reject('重复提交！')
        this.isClick = false
        setTimeout(() => { this.isClick = true }, this.delay)
        return this.request({
            url: this.baseUrl + '/cargoUnit/deleteBatch',
            method: 'post',
            data
        })
    }
    /**
     *  客户地址
     */
    customerAddressAdd(data) {
        if (!this.isClick) return Promise.reject('重复提交！')
        this.isClick = false
        setTimeout(() => { this.isClick = true }, this.delay)
        return this.request({
            url: this.baseUrl + '/customer/address/add',
            method: 'post',
            data
        })
    }
    customerAddressFind(params) {
        return new Promise((resolve, reject) => {
            this.request({
                url: this.baseUrl + '/customer/address/list',
                params
            }).then(res => {
                resolve(res.data.data || res.data || res)
            })
        })
    }
    customerAddressFindById(params) {
        return new Promise((resolve, reject) => {
            this.request({
                url: this.baseUrl + '/customer/address/detail',
                params
            }).then(res => {
                resolve(res.data.data || res.data || res)
            })
        })
    }
    customerAddressUpdate(data) {
        if (!this.isClick) return Promise.reject('重复提交！')
        this.isClick = false
        setTimeout(() => { this.isClick = true }, this.delay)
        return this.request({
            url: this.baseUrl + '/customer/address/update',
            method: 'post',
            data
        })
    }
    customerAddressDeleteBatch(data) {
        if (!this.isClick) return Promise.reject('重复提交！')
        this.isClick = false
        setTimeout(() => { this.isClick = true }, this.delay)
        return this.request({
            url: this.baseUrl + '/customer/address/deleteBatch',
            method: 'post',
            data
        })
    }
    customerAddressListOfCarrierOrder(params) {
        return new Promise((resolve, reject) => {
            this.request({
                url: this.baseUrl + '/customer/address/listOfCarrierOrder',
                params
            }).then(res => {
                resolve(res.data.data || res.data || res)
            })
        })
    }

    /**
     * 车辆
     */
    truckAdd(data) {
        if (!this.isClick) return Promise.reject('重复提交！')
        this.isClick = false
        setTimeout(() => { this.isClick = true }, this.delay)
        return this.request({
            url: this.baseUrl + '/truck/add',
            method: 'post',
            data
        })
    }
    truckFind(params) {
        return new Promise((resolve, reject) => {
            this.request({
                url: this.baseUrl + '/truck/list',
                params
            }).then(res => {
                resolve(res.data.data || res.data || res)
            })
        })
    }
    truckFindById(params) {
        return new Promise((resolve, reject) => {
            this.request({
                url: this.baseUrl + '/truck/detail',
                params
            }).then(res => {
                resolve(res.data.data || res.data || res)
            })
        })
    }
    truckUpdate(data) {
        if (!this.isClick) return Promise.reject('重复提交！')
        this.isClick = false
        setTimeout(() => { this.isClick = true }, this.delay)
        return this.request({
            url: this.baseUrl + '/truck/update',
            method: 'post',
            data
        })
    }
    truckDeleteBatch(data) {
        if (!this.isClick) return Promise.reject('重复提交！')
        this.isClick = false
        setTimeout(() => { this.isClick = true }, this.delay)
        return this.request({
            url: this.baseUrl + '/truck/deleteBatch',
            method: 'post',
            data
        })
    }
    truckCheckGPS(params) {
        return new Promise((resolve, reject) => {
            this.request({
                url: this.baseUrl + '/truck/checkGPS',
                params
            }).then(res => {
                resolve(res)
            })
        })
    }
    truckChangeDriver(data) {
        if (!this.isClick) return Promise.reject('重复提交！')
        this.isClick = false
        setTimeout(() => {
            this.isClick = true
        }, this.delay)
        return this.request({
            url: this.baseUrl + '/truck/changeDriver',
            method: 'post',
            data
        })
    }
    truckDriverListCanUse(params) {
        return new Promise((resolve, reject) => {
            this.request({
                url: this.baseUrl + '/truck/driverListCanUse',
                params
            }).then(res => {
                resolve(res.data.data || res.data || res)
            })
        })
    }
    truckSetDriverAsPrimary(data) {
        if (!this.isClick) return Promise.reject('重复提交！')
        this.isClick = false
        setTimeout(() => {
            this.isClick = true
        }, this.delay)
        return this.request({
            url: this.baseUrl + '/truck/setDriverAsPrimary',
            method: 'post',
            data
        })
    }
    truckClearDriver(data) {
        if (!this.isClick) return Promise.reject('重复提交！')
        this.isClick = false
        setTimeout(() => {
            this.isClick = true
        }, this.delay)
        return this.request({
            url: this.baseUrl + '/truck/clearDriver',
            method: 'post',
            data
        })
    }
    truckListByTrail(params) {
        return new Promise((resolve, reject) => {
            this.request({
                url: this.baseUrl + '/truck/listByTrail',
                params
            }).then(res => {
                resolve(res.data.data || res.data || res)
            })
        })
    }
    
    /**
     * 运输人员
     */
    transporterAdd(data) {
        if (!this.isClick) return Promise.reject('重复提交！')
        this.isClick = false
        setTimeout(() => { this.isClick = true }, this.delay)
        return this.request({
            url: this.baseUrl + '/transporter/add',
            method: 'post',
            data
        })
    }
    transporterFind(params) {
        return new Promise((resolve, reject) => {
            this.request({
                url: this.baseUrl + '/transporter/list',
                params
            }).then(res => {
                resolve(res.data.data || res.data || res)
            })
        })
    }
    transporterFindById(params) {
        return new Promise((resolve, reject) => {
            this.request({
                url: this.baseUrl + '/transporter/detail',
                params
            }).then(res => {
                resolve(res.data.data || res.data || res)
            })
        })
    }
    transporterUpdate(data) {
        if (!this.isClick) return Promise.reject('重复提交！')
        this.isClick = false
        setTimeout(() => { this.isClick = true }, this.delay)
        return this.request({
            url: this.baseUrl + '/transporter/update',
            method: 'post',
            data
        })
    }
}

export default new Company('/company', request)