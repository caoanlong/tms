import Base from './Base'
import request from '../common/request'

class NoTruckUser extends Base {
    constructor(url, req) {
        super(url, req).initURI({
            findById: '/info',
            add: '/save',
            update: '/save',
        })
    }
    findAppKey(params) {
        return new Promise((resolve, reject) => {
            this.request({
                url: this.baseUrl + '/getAppkey',
                params
            }).then(res => {
                resolve(res.data.data)
            })
        })
    }
    findCompany(params) {
        return new Promise((resolve, reject) => {
            this.request({
                url: this.baseUrl + '/getCertifyEnterprice',
                params
            }).then(res => {
                resolve(res.data.data)
            })
        })
    }
}

export default new NoTruckUser('/noTruckUser', request())