import Base from './Base'
import request from '../common/request'

class Member extends Base {
    login(data) {
        if (!this.isClick) return
        this.isClick = false
        setTimeout(() => { this.isClick = true }, this.delay)
        return this.request({
            url: this.baseUrl + '/login',
            method: 'post',
            data
        })
    }
    register(data) {
        if (!this.isClick) return
        this.isClick = false
        setTimeout(() => { this.isClick = true }, this.delay)
        return this.request({
            url: this.baseUrl + '/register',
            method: 'post',
            data
        })
    }
    pwdForget(data) {
        if (!this.isClick) return
        this.isClick = false
        setTimeout(() => { this.isClick = true }, this.delay)
        return this.request({
            url: this.baseUrl + '/passwor/forget',
            method: 'post',
            data
        })
    }
    detail(params) {
        return this.request({
            url: this.baseUrl + '/info/detail',
            params
        })
    }
    info(params) {
        return this.request({
            url: this.baseUrl + '/info',
            params
        })
    }
    modify(data) {
        if (!this.isClick) return
        this.isClick = false
        setTimeout(() => { this.isClick = true }, this.delay)
        return this.request({
            url: this.baseUrl + '/info/modify',
            method: 'post',
            data
        })
    }
    changePwd(data) {
        if (!this.isClick) return
        this.isClick = false
        setTimeout(() => { this.isClick = true }, this.delay)
        return this.request({
            url: this.baseUrl + '/password/update',
            method: 'post',
            data
        })
    }
}

export default new Member('/mem', request)