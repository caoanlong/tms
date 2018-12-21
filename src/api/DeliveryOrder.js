import Base from './Base'
import request from '../common/requestByJson'

class DeliveryOrder extends Base {
    orderList(params) {
        return new Promise((resolve, reject) => {
            this.request({
                url: this.baseUrl + '/list',
                params
            }).then(res => {
                resolve(res.data.data || res.data || res)
            })
        })
    }
    orderDetail(params) {
        return new Promise((resolve, reject) => {
            this.request({
                url: this.baseUrl + '/detail',
                params
            }).then(res => {
                resolve(res.data.data || res.data || res)
            })
        })
    }
    orderAdd(data) {
        if (!this.isClick) return Promise.reject('重复提交！')
        this.isClick = false
        setTimeout(() => { this.isClick = true }, this.delay)
        return this.request({
            url: this.baseUrl + '/save',
            method: 'post',
            data
        })
    }
    orderUpdate(data) {
        if (!this.isClick) return Promise.reject('重复提交！')
        this.isClick = false
        setTimeout(() => { this.isClick = true }, this.delay)
        return this.request({
            url: this.baseUrl + '/update',
            method: 'post',
            data
        })
    }
    delBatch(data) {
        if (!this.isClick) return Promise.reject('重复提交！')
        this.isClick = false
        setTimeout(() => { this.isClick = true }, this.delay)
        return this.request({
            url: this.baseUrl + '/delete',
            method: 'post',
            data
        })
    }
    dispatch(data) {
        if (!this.isClick) return Promise.reject('重复提交！')
        this.isClick = false
        setTimeout(() => { this.isClick = true }, this.delay)
        return this.request({
            url: this.baseUrl + '/dispatch',
            method: 'post',
            data
        })
    }
    
}

export default new DeliveryOrder('/deliveryOrder', request)