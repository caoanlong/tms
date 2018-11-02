import Base from './Base'
import request from '../common/request'

class SysRoleMember extends Base {
    constructor(url, req) {
        super(url, req).initURI({
            find: '/memberList',
            add: '/addMember',
            del: '/deleteMember'
        })
    }
    modifyRole(data) {
        if (!this.isClick) return Promise.reject('重复提交！')
        this.isClick = false
        setTimeout(() => { this.isClick = true }, this.delay)
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

export default new SysRoleMember('/sys/role/member', request)
