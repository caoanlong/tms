import Base from './Base'
import request from '../common/requestByJson'

class Organization extends Base {
    selectOrganization(data) {
        if (!this.isClick) return Promise.reject('重复提交！')
        this.isClick = false
        setTimeout(() => { this.isClick = true }, this.delay)
        return this.request({
            url: this.baseUrl + '/selectOrganization',
            method: 'post',
            data
        })
    }
    addOrUpdate(data) {
        if (!this.isClick) return Promise.reject('重复提交！')
        this.isClick = false
        setTimeout(() => { this.isClick = true }, this.delay)
        return this.request({
            url: this.baseUrl + '/addOrUpdate',
            method: 'post',
            data
        })
    }
    getCompanyOrg(params) {
        return new Promise((resolve, reject) => {
            this.request({
                url: this.baseUrl + '/getCompanyOrg',
                params
            }).then(res => {
                resolve(res.data.data || res.data || res)
            })
        })
    }
    addibleOrganizationMember(params) {
        return new Promise((resolve, reject) => {
            this.request({
                url: this.baseUrl + '/addibleOrganizationMember',
                params
            }).then(res => {
                resolve(res.data.data || res.data || res)
            })
        })
    }
    getOrganizationMember(params) {
        return new Promise((resolve, reject) => {
            this.request({
                url: this.baseUrl + '/getOrganizationMember',
                params
            }).then(res => {
                resolve(res.data.data || res.data || res)
            })
        })
    }
    addMembers(data) {
        if (!this.isClick) return Promise.reject('重复提交！')
        this.isClick = false
        setTimeout(() => { this.isClick = true }, this.delay)
        return this.request({
            url: this.baseUrl + '/addMembers',
            method: 'post',
            data
        })
    }
    removeMembers(data) {
        if (!this.isClick) return Promise.reject('重复提交！')
        this.isClick = false
        setTimeout(() => { this.isClick = true }, this.delay)
        return this.request({
            url: this.baseUrl + '/removeMembers',
            method: 'post',
            data
        })
    }
    addibleRoleList(params) {
        return new Promise((resolve, reject) => {
            this.request({
                url: this.baseUrl + '/addibleRoleList',
                params
            }).then(res => {
                resolve(res.data.data || res.data || res)
            })
        })
    }
    setMemberRole(data) {
        if (!this.isClick) return Promise.reject('重复提交！')
        this.isClick = false
        setTimeout(() => { this.isClick = true }, this.delay)
        return this.request({
            url: this.baseUrl + '/setMemberRole',
            method: 'post',
            data
        })
    }
}

export default new Organization('/organization', request)