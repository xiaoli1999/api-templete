const express = require('express')
const router = express.Router()

router.use(function (req, res, next) {
    /* TODO 在这里加入 访问黑白名单 限制 */
    next()
})

router.use('/', require('./test'))
module.exports = router
