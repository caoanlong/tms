import Base from './Base'
import request from '../common/request'

class DispatchOrder extends Base {
    /**
     * 调度单-车辆列表
     */
    listOfCanDispatchTruck(params) {
        return new Promise((resolve, reject) => {
			this.request({
				url: this.baseUrl + '/listOfCanDispatchTruck',
				params
			}).then(res => {
				resolve(res.data.data || res.data || res)
			})
		})
    }
    /**
     * 调度单-司机列表
     */
    listOfCanDispatchDriver(params) {
        return new Promise((resolve, reject) => {
			this.request({
				url: this.baseUrl + '/listOfCanDispatchDriver',
				params
			}).then(res => {
				resolve(res.data.data || res.data || res)
			})
		})
    }
    /**
     * 调度单-押运员列表
     */
    listOfCanDispatchSupercargo(params) {
        return new Promise((resolve, reject) => {
			this.request({
				url: this.baseUrl + '/listOfCanDispatchSupercargo',
				params
			}).then(res => {
				resolve(res.data.data || res.data || res)
			})
		})
    }
    /**
     * 添加(派单)
     */
    addForDispatch(data) {
        if (!this.isClick) return Promise.reject('重复提交！')
        this.isClick = false
        setTimeout(() => { this.isClick = true }, this.delay)
        return this.request({
            url: this.baseUrl + '/addForDispatch',
            method: 'post',
            data,
            contentType: 'application/json;charset=utf-8'
        })
    }
    /**
     * 添加(抢单/报价)
     */
    addForOffer(data) {
        if (!this.isClick) return Promise.reject('重复提交！')
        this.isClick = false
        setTimeout(() => { this.isClick = true }, this.delay)
        return this.request({
            url: this.baseUrl + '/addForOffer',
            method: 'post',
            data,
            contentType: 'application/json;charset=utf-8'
        })
    }
    /**
     * 取消
     */
    cancel(data) {
        if (!this.isClick) return Promise.reject('重复提交！')
        this.isClick = false
        setTimeout(() => { this.isClick = true }, this.delay)
        return this.request({
            url: this.baseUrl + '/cancel',
            method: 'post',
            data
        })
    }
    /**
     * 关闭
     */
    close(data) {
        if (!this.isClick) return Promise.reject('重复提交！')
        this.isClick = false
        setTimeout(() => { this.isClick = true }, this.delay)
        return this.request({
            url: this.baseUrl + '/close',
            method: 'post',
            data
        })
    }
    /**
     * 列表(已调度)
     */
    listOfOnway(params) {
        return new Promise((resolve, reject) => {
			this.request({
				url: this.baseUrl + '/listOfOnway',
				params
			}).then(res => {
				resolve(res.data.data || res.data || res)
			})
		})
    }
    /**
     * 列表(历史)
     */
    listOfHistory(params) {
        return new Promise((resolve, reject) => {
			this.request({
				url: this.baseUrl + '/listOfHistory',
				params
			}).then(res => {
				resolve(res.data.data || res.data || res)
			})
		})
    }
    /**
     * 重新调度
     */
    redispatch(data) {
        if (!this.isClick) return Promise.reject('重复提交！')
        this.isClick = false
        setTimeout(() => { this.isClick = true }, this.delay)
        return this.request({
            url: this.baseUrl + '/redispatch',
            method: 'post',
            data
        })
    }
    /**
     * 抢单/报价列表
     */
    offerList(params) {
        return new Promise((resolve, reject) => {
			this.request({
				url: this.baseUrl + '/offerList',
				params
			}).then(res => {
				resolve(res.data.data || res.data || res)
			})
		})
    }
    /**
     * 接受抢单/报价
     */
    acceptOffer(data) {
        if (!this.isClick) return Promise.reject('重复提交！')
        this.isClick = false
        setTimeout(() => { this.isClick = true }, this.delay)
        return this.request({
            url: this.baseUrl + '/acceptOffer',
            method: 'post',
            data
        })
    }
    /**
     * 日志列表
     */
    logList(params) {
        return new Promise((resolve, reject) => {
			this.request({
				url: this.baseUrl + '/logList',
				params
			}).then(res => {
				resolve(res.data.data || res.data || res)
			})
		})
    }
    /**
     * 轨迹
     */
    trackList(params) {
        return new Promise((resolve, reject) => {
			this.request({
				url: this.baseUrl + '/trackList',
				params
			}).then(res => {
				resolve(res.data.data || res.data || res)
			})
		})
    }
}

export default new DispatchOrder('/dispatchOrder', request)