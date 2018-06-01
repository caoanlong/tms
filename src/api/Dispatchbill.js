import Base from './Base'
import request from '../common/request'

class Dispatchbill extends Base {
    constructor(url, req) {
        super(url, req)
        this.baseUrl = url
        this.request = req
    }
}

export default new Dispatchbill('/biz/dispatchOrder', request)