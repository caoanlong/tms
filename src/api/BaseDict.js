import Base from './Base'
import request from '../common/request'

class BaseDict extends Base {
    /**
     * 获取手机验证码
     */
    getDict(params) {
        return this.request({
            url: this.baseUrl + '/list',
            params
        })
    }
}

export default new BaseDict('/base/dict', request)