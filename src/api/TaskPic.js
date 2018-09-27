import Base from './Base'
import request from '../common/request'

class TaskPic extends Base {
    constructor(url, req) {
        super(url, req).initURI({
            find: '/findList',
            findById: '/findById'
        })
    }
    findListByType(params) {
        return new Promise((resolve, reject) => {
			this.request({
				url: this.baseUrl + '/findListByType',
                params,
                contentType: 'application/json;charset=utf-8'
			}).then(res => {
				resolve(res.data.data || res.data || res)
			})
		})
    }
}

export default new TaskPic('/dispatchTaskPic', request)