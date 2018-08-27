import Base from './Base'
import request from '../common/request'

class Finance extends Base {
    constructor(url, req) {
        super(url, req)
    }
    findPayablesum(params) {
        return new Promise((resolve, reject) => {
            this.request({
                url: this.baseUrl + '/payable',
                params
            }).then(res => {
                resolve(res.data.data)
            })
        })
    }
    findPayableinfo(params) {
        return new Promise((resolve, reject) => {
            this.request({
                url: this.baseUrl + '/payableDetail',
                params
            }).then(res => {
                resolve(res.data.data)
            })
        })
    }
    findReceivablesum(params) {
        return new Promise((resolve, reject) => {
            this.request({
                url: this.baseUrl + '/receivable',
                params
            }).then(res => {
                resolve(res.data.data)
            })
        })
    }
    findReceivableinfo(params) {
        return new Promise((resolve, reject) => {
            this.request({
                url: this.baseUrl + '/receivableDetail',
                params
            }).then(res => {
                resolve(res.data.data)
            })
        })
    }
}

export default new Finance('/finance', request())