import Base from './Base'
import request from '../common/request'

class Staff extends Base {
    constructor(url, req) {
        super(url, req).initURI({
            find: '/findList',
            findById: '/findById',
            update: '/update',
            del: '/deleteBatch'
        })
    }
}

export default new Staff('/staff', request)