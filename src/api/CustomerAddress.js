import Base from './Base'
import request from '../common/request'

class CustomerAddress extends Base {
    constructor(url, req) {
        super(url, req).initURI({
            find: '/findList',
            findById: '/findById'
        })
    }
}

export default new CustomerAddress('/customer/address', request())