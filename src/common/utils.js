import ChineseDistricts from '../assets/data/distpicker.data'
import cities from '../assets/data/cities.json'
import { Message } from 'element-ui'
import { vueInstance } from '../main'

export function searchAreaByKey(areaKey) {
    let area = String(areaKey)
    // 如果是省
    if (area.indexOf('0000') > -1) {
        let areaVal = ChineseDistricts[100000][area]
        return areaVal
        // 如果是区
    } else if (area.indexOf('00') == -1) {
        let areaVal = ChineseDistricts[100000][area.substr(0, 2) + '0000'] + ChineseDistricts[area.substr(0, 2) + '0000'][area.substr(0, 4) + '00'] + ChineseDistricts[area.substr(0, 4) + '00'][area]
        return areaVal
        // 如果是市
    } else {
        let areaVal = ChineseDistricts[100000][area.substr(0, 2) + '0000'] + ChineseDistricts[area.substr(0, 2) + '0000'][area.substr(0, 4) + '00']
        return areaVal
    }
}

export function searchAreaByAreaID(areaID) {
    let area = String(areaID)
    // 如果是省
    if (area.indexOf('0000') > -1) {
        let areaVal = ChineseDistricts[100000][area]
        return areaVal
    // 如果是区
    } else if (area.indexOf('00') == -1) {
        let areaVal = ChineseDistricts[area.substr(0, 4) + '00'][area]
        return areaVal
    // 如果是市
    } else {
        let areaVal = ChineseDistricts[area.substr(0, 2) + '0000'][area.substr(0, 4) + '00']
        return areaVal
    }
}

export function searchAreaObjByKey(keys) {
    let list = []
    for (let i = 0; i < keys.length; i++) {
        if (i == 0) {
            list[0] = {
                'key': keys[i],
                'value': ChineseDistricts[100000][keys[i]]
            }
        } else if (i == 1) {
            list[1] = {
                'key': keys[i],
                'value': ChineseDistricts[list[0].key][keys[i]]
            }
        } else if (i == 2) {
            list[2] = {
                'key': keys[i],
                'value': ChineseDistricts[list[1].key][keys[i]]
            }
        }
    }
    return list
}

export function areaIdToArrayId(areaId) {
    areaId = String(areaId)
    return [(areaId.substr(0, 2) + '0000'), (areaId.substr(0, 4) + '00'), areaId]
}

/**author:Caoanlong *day:2017-08-24
 * form表单数据请求
 * @param json 请求参数 {key:value,key:value,...}
 */
export function formDataReq(json) {
    var formData = new FormData()
    for (let attr in json) {
        formData.append(attr, json[attr])
    };
    return formData
}

export function getdatefromtimestamp(input, bool) {
    let now = new Date(Number(input))
    let year = now.getFullYear()
    let month = now.getMonth() + 1 < 10 ? '0' + (now.getMonth() + 1) : now.getMonth() + 1
    let date = now.getDate() < 10 ? '0' + now.getDate() : now.getDate()
    let hour = now.getHours() < 10 ? '0' + now.getHours() : now.getHours()
    let minute = now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes()
    let second = now.getSeconds() < 10 ? '0' + now.getSeconds() : now.getSeconds()
    if (bool) {
        if (bool == 'min') {
            return year + "-" + month + "-" + date + " " + hour + ":" + minute
        } else {
            return year + "-" + month + "-" + date
        }
    } else {
        return year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second
    }
}
export function validUploadFile(result, map, propertys) {
    return new Promise((resolve, reject) => {
        if (result.length == 0) {
            return reject('无数据！')
        }
        let uploadExcelConstants = []
        for (let i = 0; i < result.length; i++) {
            let excelConstant = {}
            let j = 1
            let item = result[i]
            for (let key in item) {
                if (!propertys.includes(key)) {
                    return reject(`文件中应不包含“${key}”字段`)
                }
                for (let x = 0; x < propertys.length; x++) {
                    if (!item[propertys[x]]) {
                        return reject(`第${i + 1}行，第${j}列不能为空`)
                    }
                }
                excelConstant[map[key]] = item[key]
                j++
            }
            uploadExcelConstants.push(excelConstant)
        }
        resolve(uploadExcelConstants)
    })
}

/**
 * 删除确认
 * @param {单个id} id 
 * @param {多个id} idList 
 */
export function deleteConfirm(id, callback, idList) {
    let ids = ''
    if (id && (typeof id == 'string' || typeof id == 'number')) {
        ids = id
    } else {
        ids = idList.join(',')
    }
    if (!ids) {
        Message({ type: 'warning', message: '请选择' })
        return
    }
    vueInstance.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
    }).then(() => {
        callback && callback(ids)
    }).catch(err => {
        Message.info('已取消删除')
    })
}

export function dispatchConfirm(id, callback, idList) {
    let ids = ''
    if (id && (typeof id == 'string' || typeof id == 'number')) {
        ids = id
    } else {
        ids = idList.join(',')
    }
    if (!ids) {
        Message({ type: 'warning', message: '请选择' })
        return
    }
    vueInstance.$confirm('此操作将进行调度, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
    }).then(() => {
        callback && callback(ids)
    }).catch(err => {
        Message.info('已取消')
    })
}

/**
 * 删除确认(json数组传参数)
 * @param {单个id} id 
 * @param {多个id} idList 
 */
export function deleteConfirmArr(id, callback, idList) {
    let ids = []
    if (id && (typeof id == 'string' || typeof id == 'number')) {
        ids = [id]
    } else {
        ids = idList
    }
    if (ids.length == 0) {
        Message({ type: 'warning', message: '请选择' })
        return
    }
    vueInstance.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
    }).then(() => {
        callback && callback(ids)
    }).catch((err) => {
        Message.info('已取消删除')
    })
}

export function closeConfirm(id, callback) {
    vueInstance.$confirm('此操作将关闭, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
    }).then(() => {
        callback && callback(id)
    }).catch(err => {
        Message.info('已取消关闭')
    })
}

export function cancelConfirm(id, callback) {
    vueInstance.$confirm('此操作将做取消操作, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
    }).then(() => {
        callback && callback(id)
    }).catch(() => {
        Message.info('已取消操作')
    })
}
// 取消调度单
export function dispatchCancel(id, callback) {
    vueInstance.$confirm('此操作将做取消操作, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
    }).then(() => {
        callback && callback(id)
    }).catch(() => {

    })
}

// 确认选择承运人
export function confirmSelect(id, type, callback) {
    vueInstance.$confirm('是否确认选择该' + type + '?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
    }).then(() => {
        callback && callback(id)
    }).catch(() => {

    })
}

export function resizeImg(url, size) {
    let arr = url.split('.')
    return process.env.IMG_API + arr[0] + size + arr[1]
}

export function transNum(number, count = 2) {
    function ss(n) {
        let str = ''
        for (let i = 0; i < n; i++) {
            str += '0'
        }
    }
    if (number < 10) {
        return ss(count) + number
    } else if (number < 100 && number >= 10) {
        return ss(count - 1) + number
    } else if (number >= 100) {
        return ss(count - 2) + number
    }
}

export function searchLocationByCity(city) {
    return cities[city]
}

export function setCooikie(key, value, expiredays) {
    const exdate = new Date()
    exdate.setDate(exdate.getDate() + expiredays)
    document.cookie = key + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString())
}

export function getCooikie(key) {
    if (document.cookie.length > 0) {
        let start = document.cookie.indexOf(key + "=")
        if (start != -1) {
            start = start + key.length + 1
            let end = document.cookie.indexOf(";", start)
            if (end == -1) end = document.cookie.length
            return unescape(document.cookie.substring(start, end))
        }
    }
    return ""
}
export function formatDuring(data, type) {
    let days = parseInt(data / (1000 * 60 * 60 * 24))
    let hours = parseInt((data % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    let minutes = parseInt((data % (1000 * 60 * 60)) / (1000 * 60))
    let seconds = (data % (1000 * 60)) / 1000
    if (type == 'days') {
        return (days ? (days + " 天 ") : '')
    } else if (type == 'hours') {
        return (days ? (days + " 天 ") : '') + (hours ? (hours + " 小时 ") : '')
    } else if (type == 'min') {
        return (days ? (days + " 天 ") : '') + (hours ? (hours + " 小时 ") : '') + (minutes ? (minutes + " 分钟 ") : '')
    } else {
        return (days ? (days + " 天 ") : '') + (hours ? (hours + " 小时 ") : '') + (minutes ? (minutes + " 分钟 ") : '') + (seconds ? (seconds + " 秒 ") : '')
    }

}

// 数组去重
export function arrayUnique(arr, attr) {
    const hash = {}
    return arr.reduce((item, next) => {
        hash[next[attr]] ? '' : hash[next[attr]] = true && item.push(next)
        return item
    }, [])
}

// 函数节流
export function throttle(fun, delay) {
    let last, deferTimer
    return args => {
        let _args = arguments
        let now = +new Date()
        if (last && now < last + delay) {
            clearTimeout(deferTimer)
            deferTimer = setTimeout(() => {
                last = now
                fun.apply(this, _args)
            }, delay)
        } else {
            last = now
            fun.apply(this, _args)
        }
    }
}

//time To timestamp
export function timeToTimestamp(str) {
    if(typeof str !='string') {
        throw new Error('the value must be string!!!')
    }
    if (str.indexOf(':')==-1) {
        throw new Error('the value rules is error!!!')
    }
    const timeArr = str.split(':')
    const hours = +timeArr[0] * 3600000
    const minutes = +timeArr[1] * 60000
    return hours + minutes
}

//是否全天
export function isFullDay(input) {
    let now = new Date(input)
    let year = now.getFullYear()
    let month = now.getMonth() + 1 < 10 ? '0' + (now.getMonth() + 1) : now.getMonth() + 1
    let date = now.getDate() < 10 ? '0' + now.getDate() : now.getDate()
    let hour = now.getHours() < 10 ? '0' + now.getHours() : now.getHours()
    let minute = now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes()
    let second = now.getSeconds() < 10 ? '0' + now.getSeconds() : now.getSeconds()
    if (hour == 23 && minute == 59 && second == 59) {
        return year + "-" + month + "-" + date
    } else {
        return year + "-" + month + "-" + date + " " + hour + ":" + minute
    }
    // if (minute == '00' || minute == '30') {
    //     return year + "-" + month + "-" + date + " " + hour + ":" + minute
    // } else {
    //     return year + "-" + month + "-" + date 
    // }
}

export function timestampToTime(input) {
    let now = new Date(Number(input))
    let hour = now.getHours() < 10 ? '0' + now.getHours() : now.getHours()
    let minute = now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes()
    if (minute == '00' || minute == '30') {
        return hour + ":" + minute
    } else {
        return ''
    }
}

export function getDateTotimestamp(input) {
    let now = new Date(Number(input))
    let year = now.getFullYear()
    let month = now.getMonth() + 1 < 10 ? '0' + (now.getMonth() + 1) : now.getMonth() + 1
    let date = now.getDate() < 10 ? '0' + now.getDate() : now.getDate()
    let _date = new Date(year + "/" + month + "/" + date).valueOf()
    return _date
}


export function formattimestamp(input) {
    let now = new Date(input)
    let year = now.getFullYear()
    let month = now.getMonth() + 1 < 10 ? '0' + (now.getMonth() + 1) : now.getMonth() + 1
    let date = now.getDate() < 10 ? '0' + now.getDate() : now.getDate()
    let _date = year + "-" + month + "-" + date
    return new Date(_date).getTime()-28800000
    
}
