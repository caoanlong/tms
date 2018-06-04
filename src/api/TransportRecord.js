import Base from './Base'
import request from '../common/request'

class TransportRecord extends Base {
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
}
export default new TransportRecord('/transportRecord', request)