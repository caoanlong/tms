import Base from './Base'
import request from '../common/request'
/**
 * this._find = "/list"
 * this._findById = "/detail"
 * this._add = "/add"
 * this._update = "/modify"
 * this._del = "/delete"
 */
class SysRole extends Base {
    constructor(url, req) {
        super(url, req).initURI({
            find: '/findList',
            findById: '/findById',
            update: '/update'
        })
    }
    findMenuList(params) {
        return new Promise((resolve, reject) => {
            this.request({
                url: this.baseUrl + '/findMenuList',
                params
            }).then(res => {
                resolve(res.data.data)
            })
        })
    }
    findMemberList(params) {
        return new Promise((resolve, reject) => {
            this.request({
                url: this.baseUrl + '/findMemberList',
                params
            }).then(res => {
                resolve(res.data.data)
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