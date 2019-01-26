import Base from './Base'
import request from '../common/requestByJson'

class OrganizationMember extends Base {
    remove(data) {
        if (!this.isClick) return Promise.reject('重复提交！')
        this.isClick = false
        setTimeout(() => { this.isClick = true }, this.delay)
        return this.request({
            url: this.baseUrl + '/remove',
            method: 'post',
            data
        })
    }

    setRoles(data) {
        if (!this.isClick) return Promise.reject('重复提交！')
        this.isClick = false
        setTimeout(() => { this.isClick = true }, this.delay)
        return this.request({
            url: this.baseUrl + '/setRoles',
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
}

export default new OrganizationMember('/organization/mem', request)