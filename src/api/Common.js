import Base from './Base'
import request from '../common/request'

class Member extends Base {
    constructor(url, req) {
        super(url, req)
    }
    getVCode(data) {
        return this.request({
            url: this.baseUrl + '/vcode',
            data
        })
    }
}

export default new Member('/common', request)