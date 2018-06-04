import Base from './Base'
import request from '../common/request'

class Dispatchbill extends Base {
    constructor(url, req) {
        super(url, req)
    }
    /**
     * 重新调度
     * @param {dispatchOrderID} params 调度单ID
     * @param {dispatchTaskCargoInfo} params 调度货物信息  
     * @param {dispatchTaskInfo} params 承运单费用信息
     * @param {sumAmount} params 总运费
     * @param {loadWeightSum} params 总装载吨数
     * @param {loadVolumeSum} params 总装载方数
     * @param {loadNumSum} params 总装载数量
     * @param {transportRecordID} params 运输档案ID
     * @param {truckID} params 车辆ID
     * @param {trailerID} params 挂车ID
     * @param {driverID} params 司机ID
     * @param {superCargoID} params 押运员ID
     */
    reLoad(data) {
        this.request({
            url: this.baseUrl + '/anew',
            method: 'post',
            data
        })
    }
    /**
     * 取消调度单
     * @param {dispatchOrderID} params 调度单ID
     */
    cancel(data) {
        this.request({
            url: this.baseUrl + '/cancel',
            method: 'post',
            data
        })
    }
    /**
     * 关闭调度单
     * @param {dispatchOrderID} params 调度单ID
     */
    cancel(data) {
        this.request({
            url: this.baseUrl + '/close',
            method: 'post',
            data
        })
    }
    /**
     * 根据承运单获取待配载列表
     * @param {carrierOrderIDs} params 承运单ID（多个承运单ID）
     */
    findPreLoad(params) {
        return new Promise((resolve, reject) => {
            this.request({
                url: this.baseUrl + '/preLoad',
                params
            }).then(res => {
                resolve({data: res.data.data, cargos: res.data.cargos})
            })
        })
    }
}

export default new Dispatchbill('/biz/dispatchOrder', request)