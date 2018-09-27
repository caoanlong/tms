import Base from './Base'
import request from '../common/request'

/**
 * 无车承运人
 */
class Notruck extends Base {
    _init(url) {
        this._find = `${url}/list`
        this._findById = `${url}/detail`
        this._add = `${url}/add`
        this._update = `${url}/update`
        this._del = `${url}/delete`
    }
    /**
     * 资料补充
     */
    broker() {
        this._init('/broker')
        this.findAppKey = params => {
            return new Promise((resolve, reject) => {
                this.request({
                    url: this.baseUrl + '/broker/getAppkey',
                    params
                }).then(res => {
                    resolve(res.data.data || res.data || res)
                })
            })
        }
        this.findCompany = params => {
            return new Promise((resolve, reject) => {
                this.request({
                    url: this.baseUrl + '/broker/getCertifyEnterprice',
                    params
                }).then(res => {
                    resolve(res.data.data || res.data || res)
                })
            })
        }
        return this
    }
    /**
     * 运单
     */
    carryOrder() {
        this._init('/carryOrder')
        this.findAPK = params => {
            return new Promise((resolve, reject) => {
                this.request({
                    url: this.baseUrl + '/carryOrder/form',
                    params
                }).then(res => {
                    resolve(res.data.data || res.data || res)
                })
            })
        }
        return this
    }
    /**
     * 车源
     */
    truck() {
        this._init('/truck')
        this.findAPK = params => {
            return new Promise((resolve, reject) => {
                this.request({
                    url: this.baseUrl + '/truck/form',
                    params
                }).then(res => {
                    resolve(res.data.data || res.data || res)
                })
            })
        }
        return this
    }
    /**
     * 货源
     */
    cargoSource() {
        this._init('/cargoSource')
        return this
    }
}

export default new Notruck('/notruck', request)