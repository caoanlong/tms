import Base from './Base'
import request from '../common/request'

class TransportRecord extends Base {
    constructor(url, req) {
        super(url, req)
    }
}
export default new TransportRecord('/transportRecord', request)