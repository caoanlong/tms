import Base from './Base'
import request from '../common/request'

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
}

export default new Organization('/organization', request)