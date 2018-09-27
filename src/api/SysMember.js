import Base from './Base'
import request from '../common/request'

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