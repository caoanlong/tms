import Base from './Base'
import request from '../common/request'

class SysRole extends Base {
    constructor(url, req) {
        super(url, req).initURI({
            findById: '/findById',
            del: '/deleteBatch'
        })
    }
    _init(url) {
        this._find = `${url}/list`
        this._findById = `${url}/detail`
        this._add = `${url}/add`
        this._update = `${url}/update`
        this._del = `${url}/delete`
    }
    /**
     * 菜单
     */
    menu() {
        this._init('/menu')
        return this
    }
    findMemberList(params) {
        return new Promise((resolve, reject) => {
            this.request({
                url: this.baseUrl + '/findMemberList',
                params
            }).then(res => {
                resolve(res.data.data || res.data || res)
            })
        })
    }
    addAuthority(data) {
        if (!this.isClick) return Promise.reject('重复提交！')
        this.isClick = false
        setTimeout(() => { this.isClick = true }, this.delay)
        return this.request({
            url: this.baseUrl + '/addAuthority',
            method: 'post',
            data
        })
    }
    addMember(data) {
        if (!this.isClick) return Promise.reject('重复提交！')
        this.isClick = false
        setTimeout(() => { this.isClick = true }, this.delay)
        return this.request({
            url: this.baseUrl + '/addMember',
            method: 'post',
            data
        })
    }
}

export default new SysRole('/sys/role', request)