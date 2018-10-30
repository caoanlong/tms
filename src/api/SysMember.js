import Base from './Base'
import request from '../common/request'

class SysMember extends Base {
    /**
     * 登录
     * @param {*} data 
     */
    login(data) {
        if (!this.isClick) return Promise.reject('重复提交！')
        this.isClick = false
        setTimeout(() => { this.isClick = true }, this.delay)
        return this.request({
            url: this.baseUrl + '/login',
            method: 'post',
            data
        })
    }
    /**
     * 登出
     */
    logout() {
        if (!this.isClick) return Promise.reject('重复提交！')
        this.isClick = false
        setTimeout(() => { this.isClick = true }, this.delay)
        return this.request({
            url: this.baseUrl + '/logout',
            method: 'post'
        })
    }
}

export default new SysMember('/sys/mem', request)