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

export default new Staff('/staff', request)