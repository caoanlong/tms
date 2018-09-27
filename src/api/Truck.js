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
        if (!this.isClick) return Promise.reject('重复提交！')
        this.isClick = false
        setTimeout(() => { this.isClick = true }, this.delay)
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
        if (!this.isClick) return Promise.reject('重复提交！')
        this.isClick = false
        setTimeout(() => { this.isClick = true }, this.delay)
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
        if (!this.isClick) return Promise.reject('重复提交！')
        this.isClick = false
        setTimeout(() => { this.isClick = true }, this.delay)
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
        if (!this.isClick) return Promise.reject('重复提交！')
        this.isClick = false
        setTimeout(() => { this.isClick = true }, this.delay)
        return this.request({
            url: this.baseUrl + '/changeDriver',
            method: 'post',
            data
        })
    }
    primary(data) {
        if (!this.isClick) return Promise.reject('重复提交！')
        this.isClick = false
        setTimeout(() => { this.isClick = true }, this.delay)
        return this.request({
            url: this.baseUrl + '/primary',
            method: 'post',
            data
        })
    }
    deleteDriver(data) {
        if (!this.isClick) return Promise.reject('重复提交！')
        this.isClick = false
        setTimeout(() => { this.isClick = true }, this.delay)
        return this.request({
            url: this.baseUrl + '/deleteDriver',
            method: 'post',
            data
        })
    }
}

export default new Truck('/truck', request)