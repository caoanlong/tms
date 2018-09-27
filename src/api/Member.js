import Base from './Base'
import request from '../common/request'

class Member extends Base {
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
    detail(data) {
        return this.request({
            url: this.baseUrl + '/info/detail',
            method: 'get',
            data
        })
    }
    info(data) {
        return this.request({
            url: this.baseUrl + '/info',
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

export default new Member('/mem', request)