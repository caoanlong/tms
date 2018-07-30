'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
	NODE_ENV: '"development"',
	ENV_CONFIG: '"dev"',
	// BASE_API: '"http://192.168.1.43:9999"',           // 飞龙电脑
	// BASE_API: '"http://192.168.1.99:9999"',           // 军良电脑
	BASE_API: '"http://192.168.1.68:8080"',           // 阳霞电脑
	// BASE_API: '"http://192.168.1.49:8080"',           // 新考电脑
	// BASE_API: '"http://develop.we-service.cn/tms-api"',  // 测试
	// BASE_NODE_API: '"http://localhost:3002/api"',   // 本机node
	BASE_NODE_API: '"http://develop.we-service.cn/tms/nodejs/api"',   // 测试node
	BASE_SYS_API: '"http://192.168.1.110:9919"', // 系统服务
	IMG_API: '"http://develop.we-service.cn/hdd/image/"',
})
