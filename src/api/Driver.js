import Base from './Base'
import request from '../common/request'

class Driver extends Base {
    constructor(url, req) {
        super(url, req)
    }
    /**
     * 
     * @param {keyword} params 关键字
     * @param {cooperateRelation} params 车辆归属 Self自有车辆; PersonalAttach个人挂靠; CompanyAttach单位挂靠; Null对象 全部）
     * @param {current} params 第几页
     * @param {size} params 每页记录数
     */
    find(params) {
        return new Promise((resolve, reject) => {
            this.request({
                url: this.baseUrl + '/findList',
                params
            }).then(res => {
                resolve(res.data.data)
            })
        })
    }
    /**
     * 
     * @param {comDriverID} params 公司司机ID
     */
    findById(params) {
        return new Promise((resolve, reject) => {
            this.request({
                url: this.baseUrl + '/findById',
                params
            }).then(res => {
                resolve(res.data.data)
            })
        })
    }
    update(data) {
        return this.request({
            url: this.baseUrl + '/update',
            method: 'post',
            data
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

export default new Driver('/driver', request)