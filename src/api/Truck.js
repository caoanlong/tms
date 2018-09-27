import Base from './Base'
import request from '../common/request'

class Truck extends Base {
    constructor(url, req) {
        super(url, req).initURI({
            find: '/findList',
            findById: '/info'
        })
    }
    findByPlateNoSuggest(params) {
		return new Promise((resolve, reject) => {
			this.request({
				url: this.baseUrl + '/plateNo/suggest',
				params
			}).then(res => {
				resolve(res.data.data || res.data || res)
			})
		})
	}
	findByTrailerPlateNoSuggest(params) {
		return new Promise((resolve, reject) => {
			this.request({
				url: this.baseUrl + '/trailerPlateNo/suggest',
				params
			}).then(res => {
				resolve(res.data.data || res.data || res)
			})
		})
	}
    /**
     * 查询车辆违章记录
     * @param {*} params 
     */
    findEndorsements(params) {
        return new Promise((resolve, reject) => {
            this.request({
                url: this.baseUrl + '/endorsement/findList',
                params
            }).then(res => {
                resolve(res.data.data || res.data || res)
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
    findDriverList(params) {
        return new Promise((resolve, reject) => {
            this.request({
                url: this.baseUrl + '/findDriverList',
                params
            }).then(res => {
                resolve(res.data.data || res.data || res)
            })
        })
    }
    changeDriver(data) {
        return this.request({
            url: this.baseUrl + '/changeDriver',
            method: 'post',
            data
        })
    }
    primary(data) {
        return this.request({
            url: this.baseUrl + '/primary',
            method: 'post',
            data
        })
    }
    deleteDriver(data) {
        return this.request({
            url: this.baseUrl + '/deleteDriver',
            method: 'post',
            data
        })
    }
}

export default new Truck('/truck', request)