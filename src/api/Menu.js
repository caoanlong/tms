import Base from './Base'
import request from '../common/requestNode'

class Menu extends Base {
    constructor(url, req) {
        super(url, req).initURI({
            update: '/update'
        })
    }
}

export default new Menu('/sys_menu', request)