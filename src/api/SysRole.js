import Base from './Base'
import request from '../common/requestByJson'

class SysRole extends Base {
    constructor(url, req) {
        super(url, req).initURI({
            del: '/deleteBatch'
        })
    }
}

export default new SysRole('/sys/role', request)