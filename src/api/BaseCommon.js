import Base from './Base'
import request from '../common/request'

class BaseCommon extends Base {
    /**
     * 获取手机验证码
     */
    getSMSCode(params) {
        return this.request({
            url: this.baseUrl + '/getSMSCode',
            params
        })
    }
    /**
     * 获取饿了么附近
     */
    getEleNearby(params) {
        return this.request({
            url: this.baseUrl + '/getEleNearby',
            params
        })
    }
    /**
     * 获取图形验证码
     */
    getCapthca(params) {
        return this.request({
            url: this.baseUrl + '/getCapthca',
            params
        })
    }
    /**
     * 验证图形验证码
     */
    verifyCapthca(params) {
        return this.request({
            url: this.baseUrl + '/verifyCapthca',
            params
        })
    }
}

export default new BaseCommon('/base/common', request)