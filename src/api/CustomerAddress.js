import Base from './Base'
import request from '../common/request'

class Customer extends Base {
    constructor(url, req) {
        super(url, req).initURI({
            find: '/findList',
            findById: '/findById'
        })
    }
}

export default new Customer('/customer/address', request())