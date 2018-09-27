import Base from './Base'
import request from '../common/request'

class Menu extends Base {
    constructor(url, req) {
        super(url, req).initURI({
            find: '/findList'
        })
    }
}

export default new Menu('/sys/menu', request)