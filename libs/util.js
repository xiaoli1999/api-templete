module.exports = {
    /**
     * @function calcMaxPage 计算最大页码
     * @param { number } total - 最大行数
     * @param { number } pageSize - 每页行数
     * @returns { number | *} - 最大页码
     */
    calcMaxPage: function (total, pageSize) {
        const c = total % pageSize
        const s = total / pageSize
        return parseInt(c > 0 ? s + 1 : '' + s)
    },

    /**
     * @function Allow_CORS_ALL 允许跨域
     * @param {Object} res - express的res对象
     */
    Allow_CORS_ALL: function (res) {
        res.header('Access-Control-Allow-Origin', '*')
        res.header('Access-Control-Allow-Headers', 'Accept,Authorization,Cache-Control,Content-Type,DNT,If-Modified-Since,' +
            'Keep-Alive,Origin,User-Agent,X-Requested-With,token')
        res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS')
    }
}
