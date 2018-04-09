'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
	NODE_ENV: '"development"',
	// 张颜电脑
	// BASE_API: '"http://192.168.1.29:8080"',
	// 飞龙电脑
	BASE_API: '"http://192.168.1.43:8080"',
	// 军良电脑
	// BASE_API: '"http://192.168.1.99:8080"',
	// 农新考电脑
	// BASE_API: '"http://192.168.1.49:8080"',
	IMG_API: '"http://develop.we-service.cn/hdd/image/"',
})
