import Base from './Base'
import request from '../common/requestNode'
/**
 * this._find = "/list"
 * this._findById = "/detail"
 * this._add = "/add"
 * this._update = "/modify"
 * this._del = "/delete"
 */
class ComStaff extends Base {
    constructor(url, req) {
        super(url, req).initURI({
            findById: '/info',
            update: '/update',
        })
    }
}

export default new ComStaff('/com_staff', request)