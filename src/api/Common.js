import Base from './Base'
import request from '../common/request'

class Common extends Base {
    getVCode(params) {
        return this.request({
            url: this.baseUrl + '/vcode',
            params
        })
    }
}

export default new Common('/common', request)