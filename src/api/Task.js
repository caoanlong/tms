import Base from './Base'
import request from '../common/request'

class Task extends Base {
    constructor(url, req) {
        super(url, req)
    }
    /**
     * 修改任务单运费
     * @param {dispatchTaskID} data 调度任务ID
     * @param {driverCashAmount} data 司机现付金额
     * @param {driverCodAmount} data 司机到付金额
     * @param {driverPorAmount} data 司机回单金额
     * @param {driverMonthlyAmont} data 司机月结金额
     * @param {driverCosigneeAmount} data 司机收货方到付金额
     * @param {superCargoCashAmount} data 押运人现付金额
     * @param {superCargoCodAmount} data 押运人到付金额
     * @param {superCargoCorAmount} data 押运人回单金额
     * @param {superCargoMonthlyAmount} data 押运人月结金额
     */
    modifyFreight(data) {
        this.request({
            url: this.baseUrl + '/modifyFreight',
            method: 'post',
            data
        })
    }
}
export default new Task('/bizDispatchTask', request)