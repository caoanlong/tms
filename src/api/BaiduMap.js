import request from '../common/requestNode'

class BaiduMap {
    constructor(baseUrl, request) {
        this.baseUrl = baseUrl
        this.request = request
    }
    getLocation(params) {
        return new Promise((resolve, reject) => {
            this.request({
                url: this.baseUrl + '/getLocation',
                params
            }).then(res => {
                if (res.data.result instanceof Object && res.data.result.name instanceof Array) {
                    resolve(res.data.result)
                } else {
                    reject([])
                }
            })
        })
    }
}

export default new BaiduMap('/baiduMap', request)