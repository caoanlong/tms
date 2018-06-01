import request from '../common/request'

// 获取承运单列表
export function getCarrierbills (params) {
    return new Promise((resolve, reject) => {
        request({
            url: '/biz/carrierOrder/list',
            method: 'get',
            params
        }).then(res => {
            resolve(res.data.data)
        })
    })
}

// 获取承运单详情
export function getCarrierbill (carrierOrderID) {
    return new Promise((resolve, reject) => {
        request({
            url: '/biz/carrierOrder/detail',
            method: 'get',
            params: { carrierOrderID }
        }).then(res => {
            resolve(res.data.data)
        })
    })
}

// 获取当前承运单下的调度单
export function getCarrierbillDispacthBills (params) {
    return new Promise((resolve, reject) => {
        request({
            url: '/biz/carrierOrder/findDispatchCargos',
            method: 'get',
            params
        }).then(res => {
            resolve(res.data.data)
        })
    })
}

// 添加承运单
export function addCarrierbill (data) {
	return request({
		url: '/biz/carrierOrder/add',
		method: 'post',
		data
	})
}

// 修改承运单
export function updateCarrierbill (data) {
	return request({
		url: '/biz/carrierOrder/modify',
		method: 'post',
		data
	})
}

// 删除承运单
export function delCarrierbill (carrierOrderIDs) {
	return request({
		url: '/biz/carrierOrder/delete',
		method: 'post',
		data: { carrierOrderIDs }
	})
}

// 关闭承运单
export function closeCarrierbill (carrierOrderIDs) {
	return request({
		url: '/biz/carrierOrder/close',
		method: 'post',
		data: { carrierOrderIDs }
	})
}