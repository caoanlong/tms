import Base from './Base'
import request from '../common/request'

class Member extends Base {
    constructor(url, req) {
        super(url, req)
    }
    login(data) {
        return this.request({
            url: this.baseUrl + '/login',
            method: 'post',
            data
        })
    }
    register(data) {
        return this.request({
            url: this.baseUrl + '/register',
            method: 'post',
            data
        })
    }
    pwdForget(data) {
        return this.request({
            url: this.baseUrl + '/passwor/forget',
            method: 'post',
            data
        })
    }
}

export default new Member('/mem', request)