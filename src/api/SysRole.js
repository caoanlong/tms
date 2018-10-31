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
    /**
     * 会员
     */
    member() {
        this._init('/mem')
        return this
    }
}

export default new SysRole('/sys/role', request)