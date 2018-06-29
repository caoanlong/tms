import Base from './Base'
import request from '../common/requestNode'
/**
 * this._find = "/list"
 * this._findById = "/detail"
 * this._add = "/add"
 * this._update = "/modify"
 * this._del = "/delete"
 */
class SysRole extends Base {
    constructor(url, req) {
        super(url, req).initURI({
            findById: '/info',
            update: '/update',
        })
    }
    findByDriverSuggest(params) {
		return new Promise((resolve, reject) => {
			this.request({
				url: this.baseUrl + '/driver/suggest',
				params
			}).then(res => {
				resolve(res.data.data)
			})
		})
	}
}

export default new SysRole('/sys_role', request)