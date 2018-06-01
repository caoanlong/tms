import Base from './Base'
import request from '../common/request'

class SettleConfig extends Base {
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
    add(data) {
        return this.request({
            url: this.baseUrl + '/add',
            method: 'post',
            data
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

export default new SettleConfig('/transportPrice', request)