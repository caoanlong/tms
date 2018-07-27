import Base from './Base'
import request from '../common/request'

class MemInfo extends Base {
    constructor(url, req) {
        super(url, req)
    }
    detail(data) {
        return this.request({
            url: this.baseUrl + '/info/detail',
            method: 'get',
            data
        })
    }
    modify(data) {
        return this.request({
            url: this.baseUrl + '/info/modify',
            method: 'post',
            data
        })
    }
    changePwd(data) {
        return this.request({
            url: this.baseUrl + '/password/update',
            method: 'post',
            data
        })
    }
}

export default new MemInfo('/mem', request)