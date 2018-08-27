import Base from './Base'
import request from '../common/request'

class NotruckCargosource extends Base {
    constructor(url, req) {
        super(url, req).initURI({
            findById: '/info',
            add: '/save',
            update: '/save',
        })
    }
    findAPK(params) {
        return new Promise((resolve, reject) => {
            this.request({
                url: this.baseUrl + '/form',
                params
            }).then(res => {
                resolve(res.data.data)
            })
        })
    }
}

export default new NotruckCargosource('/notruckCargosource', request())