import Base from './Base'
import request from '../common/request'

class Carrierbill extends Base {
    /**
     * 根据承运单查询调度单列表
     * @param {carrierOrderID} params 承运单ID
     */
    findDispacthBills(params) {
        return new Promise((resolve, reject) => {
            this.request({
                url: this.baseUrl + '/findDispatchCargos',
                params
            }).then(res => {
                resolve(res.data.data || res.data || res)
            })
        })
    }
    /**
     * 根据承运单查询运输列表(查询任务进度)
     * @param {carrierOrderID} params 承运单ID
     */
    findTransports(params) {
        return new Promise((resolve, reject) => {
            this.request({
                url: this.baseUrl + '/tasks',
                params
            }).then(res => {
                resolve(res.data.data || res.data || res)
            })
        })
    }
    /**
     * 根据承运单查询待调度列表
     * @param {keyword} params 关键字（承运单号、货物名称、起始地、目的地）
     * @param {beginDate} params 发货时间起
     * @param {endDate} params 发货时间止
     * @param {customerID} params 客户ID（收发货单位）
     */
    findPreDispatch(params) {
        return new Promise((resolve, reject) => {
            this.request({
                url: this.baseUrl + '/preDispatch',
                params
            }).then(res => {
                resolve(res.data.data || res.data || res)
            })
        })
    }
    findPreReDispatch(params) {
        return new Promise((resolve, reject) => {
            this.request({
                url: this.baseUrl + '/preReDispatch',
                params
            }).then(res => {
                resolve(res.data.data || res.data || res)
            })
        })
    }
    findDispatchedList(params) {
        return new Promise((resolve, reject) => {
            this.request({
                url: this.baseUrl + '/dispatchedList',
                params
            }).then(res => {
                resolve(res.data.data || res.data || res)
            })
        })
    }
    close(data) {
        if (!this.isClick) return Promise.reject('重复提交！')
        this.isClick = false
        setTimeout(() => { this.isClick = true }, this.delay)
        return this.request({
            url: this.baseUrl + '/close',
            method: 'post',
            data
        })
    }
}

export default new Carrierbill('/biz/carrierOrder', request)