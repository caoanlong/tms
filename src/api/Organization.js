import Base from './Base'
import request from '../common/requestByJson'

class Organization extends Base {
    addibleMemList(params) {
        return new Promise((resolve, reject) => {
            this.request({
                url: this.baseUrl + '/addibleMemList',
                params
            }).then(res => {
                resolve(res.data.data || res.data || res)
            })
        })
    }
    getAdminOrgTree(params) {
        return new Promise((resolve, reject) => {
            this.request({
                url: this.baseUrl + '/getAdminOrgTree',
                params
            }).then(res => {
                resolve(res.data.data || res.data || res)
            }).catch(err => {
                reject(err)
            })
        })
    }
}

export default new Organization('/organization', request)