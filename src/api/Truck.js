import Base from './Base'
import request from '../common/request'

class Truck extends Base {
    constructor(url, req) {
        super(url, req)
    }
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
    findById(params) {
        return new Promise((resolve, reject) => {
            this.request({
                url: this.baseUrl + '/info',
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
     * 查询车辆违章记录
     * @param {*} params 
     */
    findEndorsements(params) {
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
     * 添加车辆违章记录
     * @param {*} data 
     */
    addEndorsement(data) {
        return this.request({
            url: this.baseUrl + '/endorsement/add',
            method: 'post',
            data
        })
    }
    /**
     * 修改车辆违章记录
     * @param {*} data 
     */
    updateEndorsement(data) {
        return this.request({
            url: this.baseUrl + '/endorsement/update',
            method: 'post',
            data
        })
    }
    /**
     * 删除车辆违章记录
     * @param {*} data 
     */
    deleteEndorsement(data) {
        return this.request({
            url: this.baseUrl + '/endorsement/deleteBatch',
            method: 'post',
            data
        })
    }
}

export default new Truck('/truck', request)