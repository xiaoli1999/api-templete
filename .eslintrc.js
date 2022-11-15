module.exports = {
    env: {
        browser: true,
        commonjs: true,
        es2021: true,
        node: true
    },
    extends: [
        'standard'
    ],
    parserOptions: {
        ecmaVersion: 2021
    },
    rules: {
        indent: 'off',
        'object-property-newline': 'off' /* 关闭对象导入强制换行 */
    }
}
