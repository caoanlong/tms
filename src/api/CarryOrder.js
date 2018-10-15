import Base from './Base'
import request from '../common/request'

class CarryOrder extends Base {
	_init(url) {
		this._find = `${url}/list`
		this._findById = `${url}/detail`
		this._add = `${url}/add`
		this._update = `${url}/update`
		this._del = `${url}/delete`
	}
  /**
   * 根据承运单查询运输列表(查询任务进度)
   * @param {carrierOrderID} params 承运单ID
   */
	taskList(params) {
		return new Promise((resolve, reject) => {
			this.request({
				url: this.baseUrl + '/taskList',
				params
			}).then(res => {
				resolve(res.data.data || res.data || res)
			})
		})
	}

	/**
	 * 根据承运单查询待调度列表
	 * @param {keyword} params 关键字（承运单号、货物名称、起始地、目的地）
	 * @param {beginDate} params 发货时间起
	 * @param {endDate} params 发货时间止
	 * @param {customerID} params 客户ID（收发货单位）
	 */
	listOfCanDispatch(params) {
		return new Promise((resolve, reject) => {
			this.request({
				url: this.baseUrl + '/listOfCanDispatch',
				params
			}).then(res => {
				resolve(res.data.data || res.data || res)
			})
		})
	}

	listOfDispatched(params) {
		return new Promise((resolve, reject) => {
			this.request({
				url: this.baseUrl + '/listOfDispatched',
				params
			}).then(res => {
				resolve(res.data.data || res.data || res)
			})
		})
	}
}

export default new CarryOrder('/carryOrder', request)
