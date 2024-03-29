import request from '../common/requestByJson'

class Home {
    constructor(baseUrl, request) {
        this.baseUrl = baseUrl
        this.request = request
    }
    getPriceReg(params) {
        return new Promise((resolve, reject) => {
            this.request({
                url: this.baseUrl + '/carrierOrder/statistics',
                params
            }).then(res => {
                resolve(res.data.data || res.data || res)
            })
        })
    }
    getTransportReg(params) {
        return new Promise((resolve, reject) => {
            this.request({
                url: this.baseUrl + '/dispatchs',
                params
            }).then(res => {
                resolve(res.data.data || res.data || res)
            })
        })
    }
    getTruckAddress(params) {
        return new Promise((resolve, reject) => {
            this.request({
                url: this.baseUrl + '/getTruckAddress',
                params
            }).then(res => {
                resolve(res.data.data || res.data || res)
            }).catch(err => {
                reject(err)
            })
        })
    }
}

export default new Home('/home', request)