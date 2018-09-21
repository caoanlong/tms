import Base from './Base'
import request from '../common/request'

class SettleConfig extends Base {
    constructor(url, req) {
        super(url, req).initURI({
            find: '/findList',
            findById: '/findById',
            del: '/deleteBatch'
        })
    }
    findOneByAddress(params) {
        return this.request({
            url: this.baseUrl + '/findOneByAddress',
            params
        })
    }
}

export default new SettleConfig('/transportPrice', request())