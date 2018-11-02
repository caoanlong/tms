import Base from './Base'
import request from '../common/request'

class SysRole extends Base {
    constructor(url, req) {
        super(url, req).initURI({
            findById: '/findById',
            del: '/deleteBatch'
        })
    }
}

export default new SysRole('/sys/role', request)