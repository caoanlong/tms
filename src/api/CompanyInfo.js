import Base from './Base'
import request from '../common/request'

class CompanyInfo extends Base {
    constructor(url, req) {
        super(url, req)
    }
    modify(data) {
        return this.request({
            url: this.baseUrl + '/modify',
            method: 'post',
            data
        })
    }
}

export default new CompanyInfo('/companyInfo', request)