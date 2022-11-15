module.exports = {
    /**
     * 接口：正常返回
     * @param {Object} res - express的res对象
     * @param {string} msg - 给用户返回的消息
     */
    OK: function (res, msg) {
        if (res) {
            res.send({ error: false, msg })
            res.end()
        }
    },
    /**
     * 接口：错误返回
     * @param {Object} res - express的res对象
     * @param {string} msg - 给用户返回的消息
     */
    Error: function (res, msg) {
        if (res) {
            res.send({ error: true, msg })
            res.end()
        }
    },
    /**
     * 接口：用户未登录
     * @param {Object} res - express的res对象
     */
    NoLogin: function (res) {
        if (res) {
            res.send({ noLogin: true, error: true, msg: '请先登录' })
            res.end()
        }
    },
    /**
     * 接口：用户已经退出
     * @param {Object} res - express的res对象
     */
    LogOut: function (res) {
        if (res) {
            res.send({ logout: true, error: true, msg: '当前账号已被他人登录,请重新登录' })
            res.end()
        }
    },
    /**
     * 接口：无权限
     * @param {Object} res - express的res对象
     */
    NoPermission: function (res) {
        if (res) {
            res.send({ error: true, msg: '没有权限' })
            res.end()
        }
    }
}
