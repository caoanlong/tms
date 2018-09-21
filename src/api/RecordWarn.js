import Base from './Base'
import request from '../common/request'

class RecordWarn extends Base {

    findList(params) {
        return new Promise((resolve, reject) => {
            this.request({
                url: this.baseUrl + '/findList',
                params
            }).then(res => {
                resolve(res.data.data || res.data || res)
            })
        })
    }
}

export default new RecordWarn('/recordWarn', request())