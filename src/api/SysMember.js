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
    /**
     * 详情
     */
    detail() {
        return new Promise((resolve, reject) => {
            this.request({
                url: this.baseUrl + '/detail',
            }).then(res => {
                resolve(res.data.data || res.data || res)
            })
        })
    }
    /**
     * 修改密码
     */
    updatePassword(data) {
        if (!this.isClick) return Promise.reject('重复提交！')
        this.isClick = false
        setTimeout(() => { this.isClick = true }, this.delay)
        return this.request({
            url: this.baseUrl + '/updatePassword',
            method: 'post',
            data
        })
    }
    /**
     * 重置密码
     */
    resetPassword(data) {
        if (!this.isClick) return Promise.reject('重复提交！')
        this.isClick = false
        setTimeout(() => { this.isClick = true }, this.delay)
        return this.request({
            url: this.baseUrl + '/resetPassword',
            method: 'post',
            data
        })
    }

    getOrgList(params) {
        return new Promise((resolve, reject) => {
            this.request({
                url: this.baseUrl + '/getOrgList',
                params
            }).then(res => {
                resolve(res.data.data || res.data || res)
            })
        })
    }

    getCompanyOrgList(params) {
        return new Promise((resolve, reject) => {
            this.request({
                url: this.baseUrl + '/getCompanyOrgList',
                params
            }).then(res => {
                resolve(res.data.data || res.data || res)
            })
        })
    }

    changeOrg(data) {
        if (!this.isClick) return Promise.reject('重复提交！')
        this.isClick = false
        setTimeout(() => { this.isClick = true }, this.delay)
        return this.request({
            url: this.baseUrl + '/changeOrg',
            method: 'post',
            data
        })
    }

    getOrgMenuTree(params) {
        return new Promise((resolve, reject) => {
            this.request({
                url: this.baseUrl + '/getOrgMenuTree',
                params
            }).then(res => {
                resolve(res.data.data || res.data || res)
            })
        })
    }
}

export default new SysMember('/sys/mem', request)