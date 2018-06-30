import Base from './Base'
import request from '../common/requestNode'
import { resolve } from 'url';
/**
 * this._find = "/list"
 * this._findById = "/detail"
 * this._add = "/add"
 * this._update = "/modify"
 * this._del = "/delete"
 */
class SysRole extends Base {
    constructor(url, req) {
        super(url, req).initURI({
            findById: '/info',
            update: '/update',
        })
    }
    updateMenu(data) {
        return this.request({
            url: this.baseUrl + '/update/menu',
            method: 'post',
            data
        })
    }
    updateUser(data) {
        return this.request({
            url: this.baseUrl + '/update/user',
            method: 'post',
            data
        })
    }
}

export default new SysRole('/sys_role', request)