import Base from './Base'
import request from '../common/request'

class Customer extends Base {
    constructor(url, req) {
        super(url, req)
    }
    find(params) {
        return new Promise((resolve, reject) => {
            this.request({
                url: this.baseUrl + '/findList',
                params
            }).then(res => {
                resolve(res.data.data)
            })
        })
    }
    findById(params) {
        return new Promise((resolve, reject) => {
            this.request({
                url: this.baseUrl + '/findById',
                params
            }).then(res => {
                resolve(res.data.data)
            })
        })
    }
    update(data) {
        return this.request({
            url: this.baseUrl + '/update',
            method: 'post',
            data
        })
    }
    del(data) {
        return this.request({
            url: this.baseUrl + '/deleteBatch',
            method: 'post',
            data
        })
    }
}

export default new Customer('/customer', request)