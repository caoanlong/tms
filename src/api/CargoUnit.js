import Base from './Base'
import request from '../common/request'

class CargoUnit extends Base {
    constructor(url, req) {
        super(url, req).initURI({
            find: '/findList'
        })
    }
}

export default new CargoUnit('/cargoUnit', request)