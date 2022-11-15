const fs = require('fs')
const path = require('path')

const NEWLINE = '\n'
const RE_NEWLINES = /\\n/g
const NEWLINES_MATCH = /\n|\r|\r\n/
const RE_INI_KEY_VAL = /^\s*([\w.-]+)\s*=\s*(.*)?\s*$/
module.exports = {
    load: function () {
        try {
            const envPath = path.resolve(process.cwd(), '.env')
            let parsed = parse(fs.readFileSync(envPath))
            Object.keys(parsed).forEach(function (key) {
                if (!Object.prototype.hasOwnProperty.call(process.env, key)) {
                    process.env[key] = parsed[key]
                }
            })
            const envPath1 = path.resolve(process.cwd(), `.env.${process.env.NODE_ENV === 'production' ? 'production' : 'development'}`)
            parsed = parse(fs.readFileSync(envPath1))
            Object.keys(parsed).forEach(function (key) {
                process.env[key] = parsed[key]
            })
            const envPath2 = path.resolve(process.cwd(), `.env.${process.env.NODE_ENV === 'production' ? 'production.local' : 'development.local'}`)
            parsed = parse(fs.readFileSync(envPath2))
            Object.keys(parsed).forEach(function (key) {
                process.env[key] = parsed[key]
            })
        } catch (err) {
        }
    }
}

function parse (src) {
    const obj = {}
    src.toString().split(NEWLINES_MATCH).forEach((line) => {
        const keyValueArr = line.match(RE_INI_KEY_VAL)
        if (keyValueArr != null) {
            const key = keyValueArr[1]
            let val = (keyValueArr[2] || '')
            const end = val.length - 1
            const isDoubleQuoted = val[0] === '"' && val[end] === '"'
            const isSingleQuoted = val[0] === '\'' && val[end] === '\''
            if (isSingleQuoted || isDoubleQuoted) {
                val = val.substring(1, end)
                if (isDoubleQuoted) {
                    val = val.replace(RE_NEWLINES, NEWLINE)
                }
            } else {
                val = val.trim()
            }
            obj[key] = val
        }
    })
    return obj
}
