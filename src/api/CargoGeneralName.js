import Base from './Base'
import request from '../common/request'

class CargoGeneralName extends Base {
    constructor(url, req) {
        super(url, req).initURI({
            find: '/findList',
            findById: '/findById'
        })
    }
}

export default new CargoGeneralName('/cargoGeneralName', request)