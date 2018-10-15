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

    /**
     * 货物
     */
    cargo(){
        this._init('/cargo')
        this.delBatch = (data) => {
          if (!this.isClick) return Promise.reject('重复提交！')
          this.isClick = false
          setTimeout(() => {
            this.isClick = true
          }, this.delay)
          return this.request({
            url: this.baseUrl + '/cargo/deleteBatch',
            method: 'post',
            data
          })
        }
        return this
    }

    /**
     * 货物单位
     */

    cargoUnit(){
        this._init('/cargoUnit')
        this.delBatch = (data) => {
            if (!this.isClick) return Promise.reject('重复提交！')
            this.isClick = false
            setTimeout(() => {
                this.isClick = true
            }, this.delay)
            return this.request({
                url: this.baseUrl + '/cargoUnit/deleteBatch',
                method: 'post',
                data
            })
        }
        return this
    }
    /**
     *  客户地址
     */
    customerAddress(){
        this._init('/customer/address')
        this.delBatch = (data) => {
          if (!this.isClick) return Promise.reject('重复提交！')
          this.isClick = false
          setTimeout(() => {
            this.isClick = true
          }, this.delay)
          return this.request({
            url: this.baseUrl + '/customer/address/deleteBatch',
            method: 'post',
            data
          })
        }
        this.listOfCarrierOrder = params => {
          return new Promise((resolve, reject) => {
            this.request({
                url: this.baseUrl + '/customer/address/listOfCarrierOrder',
                params
            }).then(res => {
                resolve(res.data.data || res.data || res)
            })
          })
        }
        return this
    }

    /**
     * 车辆
     */
    truck(){
        this._init('/truck')
        this.delBatch = (data) => {
          if (!this.isClick) return Promise.reject('重复提交！')
            this.isClick = false
          setTimeout(() => {
                this.isClick = true
          }, this.delay)
          return this.request({
                url: this.baseUrl + '/truck/deleteBatch',
                method: 'post',
                data
            })
        }

        /**
         * 根据车牌查询suggest
         */
        this.listByPlateNo = (params) => {
          return new Promise((resolve, reject) => {
            this.request({
              url: this.baseUrl + '/truck/listByPlateNo',
              params
            }).then(res => {
              resolve(res.data.data || res.data || res)
            })
          })
        }

        /**
         * 根据挂车牌查询suggest
         */
        this.listByTrail = (params) => {
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
         * 删除司机
         */
        this.clearDriver = (data) => {
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
        /**
         * 修改主驾或副驾
         */
        this.changeDriver = (data) => {
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

        /**
         * 可用司机列表
         */
        this.driverListCanUse = (params) => {
            return new Promise((resolve, reject) => {
                this.request({
                    url: this.baseUrl + '/truck/driverListCanUse',
                    params
                }).then(res => {
                    resolve(res.data.data || res.data || res)
                })
            })
        }

        /**
         * 设置司机为主驾
         */
        this.setDriverAsPrimary = (data) => {
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
        return this
    }
    
    /**
     * 运输人员
     */
    transporter(){
        this._init('/transporter')
        this.delBatch = (data) => {
            if (!this.isClick) return Promise.reject('重复提交！')
                this.isClick = false
            setTimeout(() => {
                this.isClick = true
            }, this.delay)
            return this.request({
                url: this.baseUrl + '/transporter/deleteBatch',
                method: 'post',
                data
            })
        }
        return this
    }
    

}

export default new Company('/company', request)