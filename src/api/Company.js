import Base from './Base'
import request from '../common/request'

class Company extends Base {
    _init(url) {
        this._find = `${url}/list`
        this._findById = `${url}/detail`
        this._add = `${url}/add`
        this._update = `${url}/update`
        this._del = `${url}/delete`
    }

    /**
     * 公司信息
     */
    info() {
        this._init('Info')
        return this
    }

    /**
     * 公司入驻申请
     */
    apply() {
        this._init('/apply')
        this.audit = data => {
            return this.request({
                url: this.baseUrl + '/apply/audit',
                method: 'post',
                data
            })
        }
        return this
    }
    /**
     * 客户
     */
    customer() {
        this._init('/customer')
        this.delBatch = data => {
            return this.request({
                url: this.baseUrl + '/customer/deleteBatch',
                method: 'post',
                data
            })
        }
        this.suggest = params => {
            return new Promise((resolve, reject) => {
                this.request({
                    url: this.baseUrl + '/customer/suggest',
                    params
                }).then(res => {
                    resolve(res.data.data || res.data || res)
                })
            })
        }
        return this
    }
    /**
     * 线路价格
     */
    customerRoutePrice() {
        this._init('/customer/routePrice')
        /**
         * 承运单、调度单计算应收应付专用
         */
        this.listForCalc = params => {
            return new Promise((resolve, reject) => {
                this.request({
                    url: this.baseUrl + '/customer/routePrice/listForCalc',
                    params
                }).then(res => {
                    resolve(res.data.data || res.data || res)
                })
            })
        }
        return this
    }
}

export default new Company('/company', request)