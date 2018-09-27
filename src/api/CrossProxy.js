import request from '../common/request'

class CrossProxy {
    constructor(baseUrl, request) {
        this.baseUrl = baseUrl
        this.request = request
    }
    getEleLocation(params) {
        return new Promise((resolve, reject) => {
            this.request({
                url: this.baseUrl + '/ele/nearby',
                params
            }).then(res => {
                resolve(res.data.data || res.data || res)
            })
        })
    }
}

export default new CrossProxy('/cross/proxy', request)