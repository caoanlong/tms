import Base from './Base'
import request from '../common/request'
/**
 * this._find = "/list"
 * this._findById = "/detail"
 * this._add = "/add"
 * this._update = "/modify"
 * this._del = "/delete"
 */
class Menu extends Base {
    constructor(url, req) {
        super(url, req).initURI({
            find: '/findList'
        })
    }
}

export default new Menu('/sys/menu', request)