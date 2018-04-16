'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
	NODE_ENV: '"development"',
	// 张颜电脑
	// BASE_API: '"http://192.168.1.29:9999"',
	// 飞龙电脑
	// BASE_API: '"http://192.168.1.43:9999"',
	// 军良电脑
	BASE_API: '"http://192.168.1.99:9999"',
	// 文臣电脑
	// BASE_API: '"http://192.168.1.60:9999"',
	// 农新考电脑
	// BASE_API: '"http://192.168.1.49:9999"',
	// 测试
	// BASE_API: '"http://develop.we-service.cn/tms-api/"',
	IMG_API: '"http://develop.we-service.cn/hdd/image/"',
})
