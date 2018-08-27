import Base from './Base'
import request from '../common/request'

class Driver extends Base {
    constructor(url, req) {
        super(url, req).initURI({
            find: '/findList',
            findById: '/findById',
            update: '/update'
        })
    }
    /**
     * 会员-司机-发送邀请或解除合作(公司司机添加)
     * @param {comDriverID} data 公司司机ID
     * @param {cooperateStatus} data 发送邀请或解除合作 Invited已邀请；Relieved已解除；
     */
    changeCooperateStatus(data) {
        return this.request({
            url: this.baseUrl + '/changeCooperateStatus',
            method: 'post',
            data
        })
    }
}

export default new Driver('/driver', request())