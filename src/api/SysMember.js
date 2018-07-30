import Base from './Base'
import request from '../common/request'
/**
 * this._find = "/list"
 * this._findById = "/detail"
 * this._add = "/add"
 * this._update = "/modify"
 * this._del = "/delete"
 */
class SysMember extends Base {
    constructor(url, req) {
        super(url, req).initURI({
            find: '/memberList',
            add: '/addMember',
            del: '/deleteMember'
        })
    }
    modifyRole(data) {
        return this.request({
            url: this.baseUrl + '/modifyRole',
            method: 'post',
            data
        })
    }
    roleList(params) {
        return this.request({
            url: this.baseUrl + '/roleList',
            params
        })
    }
}

export default new SysMember('/sys/role/member', request)