'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
	NODE_ENV: '"development"',
	BASE_API: '"http://192.168.1.49:8080"',
	IMG_API: '"http://develop.we-service.cn/hdd/image/"',
})
