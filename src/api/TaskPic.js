import Base from './Base'
import request from '../common/requestByJson'

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
				params
			}).then(res => {
				resolve(res.data.data)
			})
		})
    }
}

export default new TaskPic('/dispatchTaskPic', request())