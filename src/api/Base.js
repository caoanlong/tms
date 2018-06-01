class Base {
    constructor(baseUrl, request) {
        this.baseUrl = baseUrl
        this.request = request
    }
    find(params) {
        return new Promise((resolve, reject) => {
            this.request({
                url: this.baseUrl + '/list',
                params
            }).then(res => {
                resolve(res.data.data)
            })
        })
    }
    findById(params) {
        return new Promise((resolve, reject) => {
            this.request({
                url: this.baseUrl + '/detail',
                params
            }).then(res => {
                resolve(res.data.data)
            })
        })
    }
    add(data) {
        return this.request({
            url: this.baseUrl + '/add',
            method: 'post',
            data
        })
    }
    update(data) {
        return this.request({
            url: this.baseUrl + '/modify',
            method: 'post',
            data
        })
    }
    del(data) {
        return this.request({
            url: this.baseUrl + '/delete',
            method: 'post',
            data
        })
    }
}

export default Base