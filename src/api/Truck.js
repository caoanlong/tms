import Base from './Base'
import request from '../common/request'

class Truck extends Base {
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
                url: this.baseUrl + '/info',
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
}

export default new Truck('/truck', request)