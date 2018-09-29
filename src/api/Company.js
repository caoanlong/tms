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
        /**
         * 修改扩展信息
         */
        this.updateExtend = (data) => {
          if (!this.isClick) return Promise.reject('重复提交！')
          this.isClick = false
          setTimeout(() => {
            this.isClick = true
          }, this.delay)
          return this.request({
            url: this.baseUrl + 'Info/updateExtend',
            method: 'post',
            data
          })
        }

        /**
         * 扩展信息详情 
         */
        this.detailOfExtend = (data) => {
          if (!this.isClick) return Promise.reject('重复提交！')
          this.isClick = false
          setTimeout(() => {
            this.isClick = true
          }, this.delay)
          return this.request({
            url: this.baseUrl + 'Info/detailOfExtend',
            method: 'get',
            data
          })
        }
        return this
    }

    /**
     * 公司入驻申请
     */
    apply() {
        this._init('/apply')
        this.audit = (data) => {
            if (!this.isClick) return Promise.reject('重复提交！')
            this.isClick = false
            setTimeout(() => { this.isClick = true }, this.delay)
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
        this.delBatch = (data) => {
            if (!this.isClick) return Promise.reject('重复提交！')
            this.isClick = false
            setTimeout(() => { this.isClick = true }, this.delay)
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
        this.listForCalc = data => {
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
        return this
    }
    /**
     * 无车承运 - 货源
     */
    notruckCargoSource() {
      this._init('/notruck/cargoSource')
      return this
    }
    /**
     * 无车承运 - 车辆
     */
    notruckTruck() {
      this._init('/notruck/truck')
      return this
    }
    /**
    * 无车承运 - 承运单
    */
    notruckCarryOrder() {
      this._init('/notruck/carryOrder')
      return this
    }

    

}

export default new Company('/company', request)