import Base from './Base'
import request from '../common/request'

class Customer extends Base {
    constructor(url, req) {
        super(url, req).initURI({
            find: '/findList',
            findById: '/findById',
            update: '/update',
            del: '/deleteBatch'
        })
    }
    suggest(params) {
        return new Promise((resolve, reject) => {
            this.request({
                url: this.baseUrl + '/suggest',
                params
            }).then(res => {
                resolve(res.data.data)
            })
        })
    }
    addressSuggest(params) {
        return new Promise((resolve, reject) => {
            this.request({
                url: this.baseUrl + '/address/suggest',
                params
            }).then(res => {
                resolve(res.data.data)
            })
        })
    }
}

export default new Customer('/customer', request())