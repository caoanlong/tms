import Base from './Base'
import request from '../common/request'

class SuperCargo extends Base {
    constructor(url, req) {
        super(url, req).initURI({
            find: '/findList',
            findById: '/findById',
            update: '/update'
        })
    }
}

export default new SuperCargo('/supercargo', request)