import axios from 'axios'

class AMap {
    getLocation(params) {
        const baseUrl = 'https://restapi.amap.com/v3'
        return axios({
            url: baseUrl + '/geocode/regeo',
            params
        })
    }
}

export default new AMap()