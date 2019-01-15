import Base from './Base'
import request from '../common/requestByJson'

class SysRole extends Base {
    constructor(url, req) {
        super(url, req).initURI({
            del: '/deleteBatch'
        })
    }
    saveOrUpdate(data) {
        if (!this.isClick) return Promise.reject('重复提交！')
        this.isClick = false
        setTimeout(() => { this.isClick = true }, this.delay)
        return this.request({
            url: this.baseUrl + '/saveOrUpdate',
            method: 'post',
            data
        })
    }
}

export default new SysRole('/sys/role', request)