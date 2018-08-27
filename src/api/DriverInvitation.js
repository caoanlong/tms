import Base from './Base'
import request from '../common/request'

class DriverInvitation extends Base {
    constructor(url, req) {
        super(url, req).initURI({
            find: '/findList'
        })
    }
    /**
     * 司机APP，司机列表
     */
    findNotLinkedList(params) {
        return new Promise((resolve, reject) => {
            this.request({
                url: this.baseUrl + '/findNotLinkedList',
                params
            }).then(res => {
                resolve(res.data.data)
            })
        })
    }
    /**
     * 解除
     */
    relieve(data) {
        return this.request({
            url: this.baseUrl + '/relieve',
            method: 'post',
            data
        })
    }
}

export default new DriverInvitation('/driver/invitation', request())