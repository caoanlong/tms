import Base from './Base'
import request from '../common/request'

class Carrierbill extends Base {
    constructor(url, req) {
        super(url, req)
        this.baseUrl = url
        this.request = req
    }
    findDispacthBills(params) {
        return new Promise((resolve, reject) => {
            this.request({
                url: this.baseUrl + '/findDispatchCargos',
                params
            }).then(res => {
                resolve(res.data.data)
            })
        })
    }
    close(data) {
        return this.request({
            url: this.baseUrl + '/close',
            method: 'post',
            data
        })
    }
}

export default new Carrierbill('/biz/carrierOrder', request)