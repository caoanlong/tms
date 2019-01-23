import Base from './Base'
import request from '../common/requestByJson'

class Sys extends Base {
    info(params) {
        return new Promise((resolve, reject) => {
            this.request({
                url: this.baseUrl + '/shipperInfo',
                params
            }).then(res => {
                resolve(res.data.data || res.data || res)
            })
        })
    }
}

export default new Sys('/sys/mem', request)