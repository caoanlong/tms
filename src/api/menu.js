import request from '../common/request'

// 获取菜单
export function getMenus () {
	return request({
		url: '/sys_menu/list',
		method: 'get'
	})
}

// 添加菜单
export function addMenu (data) {
	return request({
		url: '/sys_menu/add',
		method: 'post',
		data
	})
}

// 修改菜单
export function updateMenu (data) {
	return request({
		url: '/sys_menu/update',
		method: 'post',
		data
	})
}

// 删除菜单
export function delMenu (data) {
	return request({
		url: '/sys_menu/delete',
		method: 'post',
		data
	})
}