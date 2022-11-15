const express = require('express')
const userAgent = require('express-useragent')
const UTIL = require('./libs/util')
const app = express()
// 输出环境信息
console.log('运行环境:', process.env.NODE_ENV)
console.log('程序版本:', process.env.APP_VERSION)

// 去掉header的服务器版本
app.set('x-powered-by', false)

// userAgent
app.use(userAgent.express())

// 解析jsonBody,解析form表单
app.use(express.json({ limit: '2mb' }))
app.use(express.urlencoded({
    limit: '2mb',
    extended: false
}))

// 解析IP
app.use(async function (req, res, next) {
    // UTIL.Allow_CORS_ALL(res)
    if (req.method === 'OPTIONS') {
        res.status(202)
        res.end()
        return
    }
    next()
})

// 业务路由
app.use('/api', require('./routes'))

app.use(function (req, res) {
    res.status(404).send({
        error: true,
        msg: 'Invalid API Route'
    })
})
app.use(function (err, req, res) {
    res.status(err.status || 500).send({
        error: true,
        msg: 'Application Error'
    })
})

module.exports = app
