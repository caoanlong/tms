import Base from './Base'
import request from '../common/request'

class SysRole extends Base {
    constructor(url, req) {
        super(url, req).initURI({
            find: '/findList',
            findById: '/findById'
        })
    }
    findMenuList(params) {
        return new Promise((resolve, reject) => {
            this.request({
                url: this.baseUrl + '/findMenuList',
                params
            }).then(res => {
                resolve(res.data.data || res.data || res)
            })
        })
    }
    findMemberList(params) {
        return new Promise((resolve, reject) => {
            this.request({
                url: this.baseUrl + '/findMemberList',
                params
            }).then(res => {
                resolve(res.data.data || res.data || res)
            })
        })
    }
    addAuthority(data) {
        return this.request({
            url: this.baseUrl + '/addAuthority',
            method: 'post',
            data
        })
    }
    addMember(data) {
        return this.request({
            url: this.baseUrl + '/addMember',
            method: 'post',
            data
        })
    }
}

export default new SysRole('/sys/role', request)