import Base from './Base'
import request from '../common/request'

class Dispatchbill extends Base {
	/**
	 * 重新调度
	 */
	reLoad(data) {
		if (!this.isClick) return Promise.reject('重复提交！')
        this.isClick = false
        setTimeout(() => { this.isClick = true }, this.delay)
		return this.request({
			url: this.baseUrl + '/anew',
			method: 'post',
			data
		})
	}
	/**
	 * 取消调度单
	 * @param {String} dispatchOrderID 调度单ID
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
	 * 关闭调度单
	 * @param {String} dispatchOrderID 调度单ID
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
	 * 根据承运单获取待配载列表
	 * @param {String} carrierOrderIDs 承运单ID（多个承运单ID）
	 */
	findPreLoad(params) {
		return new Promise((resolve, reject) => {
			this.request({
				url: this.baseUrl + '/preLoad',
				params
			}).then(res => {
				resolve(res.data.data || res.data || res)
			})
		})
	}
	/**
	 * 可调度司机列表
	 * @param {String} keyword 关键字（档案编号、司机姓名、车牌号、车长、车型）
	 * @param {Number} shipperDate 装车日期
	 * @param {String} workStatus 车辆行驶状态 Working/运输中 Empty/空车
	 */
	findTrucksAndDrivers(params) {
		return new Promise((resolve, reject) => {
			this.request({
				url: this.baseUrl + '/trucksAndDrivers',
				params
			}).then(res => {
				resolve(res.data.data || res.data || res)
			})
		})
	}
	/**
	 * 调度-车辆-列表
	 * @param {Object} params 
	 */
	findTrucks(params) {
		return new Promise((resolve, reject) => {
			this.request({
				url: this.baseUrl + '/trucks',
				params
			}).then(res => {
				resolve(res.data.data || res.data || res)
			})
		})
	}
	/**
	 * 可调度押运员列表
	 * @param {String} keyword 关键字（押运员姓名、角色）
	 * @param {Number} shipperDate 装车日期
	 * @param {String} workStatus 车辆行驶状态 Working/已有任务 Free/空闲
	 */
	findStaffs(params) {
		return new Promise((resolve, reject) => {
			this.request({
				url: this.baseUrl + '/staffs',
				params
			}).then(res => {
				resolve(res.data.data || res.data || res)
			})
		})
	}
	findDrivers(params) {
		return new Promise((resolve, reject) => {
			this.request({
				url: this.baseUrl + '/drivers',
				params
			}).then(res => {
				resolve(res.data.data || res.data || res)
			})
		})
	}
	findDispatchedList(params){
		return new Promise((resolve, reject) => {
			this.request({
				url: this.baseUrl + '/dispatchedList',
				params
			}).then(res => {
				resolve(res.data.data || res.data || res)
			})
		})
	}
	findDispatchHistoryList(params){
		return new Promise((resolve, reject) => {
			this.request({
				url: this.baseUrl + '/dispatchHistoryList',
				params
			}).then(res => {
				resolve(res.data.data || res.data || res)
			})
		})
	}
	// 获取调度单费用清单
	findFees(params){
		 return new Promise((resolve, reject) => {
			this.request({
				url: this.baseUrl + '/fees',
				params
			}).then(res => {
				resolve(res.data.data || res.data || res)
			})
		})
	}
	// 获取调度单任务清单
	findDispatchTaskList(params){
        return new Promise((resolve, reject) => {
            this.request({
                url: this.baseUrl + '/tasks',
                params
            }).then(res => {
                resolve(res.data.data || res.data || res)
            })
        })
    }
    // 获取调度单日志
	findDispatchLogs(params){
        return new Promise((resolve, reject) => {
            this.request({
                url: this.baseUrl + '/logs',
                params
            }).then(res => {
                resolve(res.data.data || res.data || res)
            })
        })
    }
    findgGrabOfferOrderList(params){
        return new Promise((resolve, reject) => {
            this.request({
                url: this.baseUrl + '/grabOfferOrderList',
                params
            }).then(res => {
                resolve(res.data.data || res.data || res)
            })
        })
    }
    // 调度单-抢单/报价-确认
    confirmScramble(data){
		if (!this.isClick) return Promise.reject('重复提交！')
        this.isClick = false
        setTimeout(() => { this.isClick = true }, this.delay)
		return this.request({
			url: this.baseUrl + '/offer/determine',
			method: 'post',
			data
		})
    }
    //修改运费
	feeModify(data){
		if (!this.isClick) return Promise.reject('重复提交！')
        this.isClick = false
        setTimeout(() => { this.isClick = true }, this.delay)
		return this.request({
			url: this.baseUrl + '/fee/modify',
			method: 'post',
			data,
			contentType: 'application/json;charset=utf-8'
		})
    }
	/**
	 * 发布派车单
	 * @param {*} data 
	 */
	add(data) {
        if (!this.isClick) return Promise.reject('重复提交！')
        this.isClick = false
        setTimeout(() => { this.isClick = true }, this.delay)
		return this.request({
			url: this.baseUrl + '/add',
			method: 'post',
			data,
			contentType: 'application/json;charset=utf-8'
		})
	}
	// 车辆轨迹
	track(params) {
		return new Promise((resolve, reject) => {
            this.request({
                url: this.baseUrl + '/track',
                params
            }).then(res => {
                resolve(res.data.data || res.data || res)
            })
        })
	}
}

export default new Dispatchbill('/biz/dispatchOrder', request)