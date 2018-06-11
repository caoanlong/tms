import Base from './Base'
import request from '../common/request'

class TransportRecord extends Base {
    constructor(url, req) {
        super(url, req).initURI({
            find: '/findList',
            findById: '/findById',
            update: '/update',
        })
    }
    findRecordDetailById(params) {
        return new Promise((resolve, reject) => {
            this.request({
                url: this.baseUrl + '/recordDetail',
                params
            }).then(res => {
                resolve(res.data.data)
            })
        })
    }
    findSelectDriver(params) {
        return new Promise((resolve, reject) => {
            this.request({
                url: this.baseUrl + '/selectDriver',
                params
            }).then(res => {
                resolve(res.data.data)
            })
        })
    }
}
export default new TransportRecord('/transportRecord', request)