'use strict'
const fs = require('fs')
const path = require('path')
const config = global.config
const Sequelize = require('sequelize')
const sequelize = new Sequelize(
    config.mysql[config.appid].sqlBase,
    config.mysql[config.appid].sqlUser,
    config.mysql[config.appid].sqlPass,
    {
        dialect: 'mysql',
        host: config.mysql[config.appid].sqlHost,
        port: config.mysql[config.appid].sqlPort ? config.mysql[config.appid].sqlPort : 3306,
        define: {
            underscored: true
        },
        timezone: '+08:00',
        pool: {
            max: 20,
            min: 0
        },
        logging: process.env.NODE_ENV === 'production' ? false : console.log,
        benchmark: process.env.NODE_ENV !== 'production'
    })
const db = {}
fs.readdirSync(__dirname).filter(function (file) {
    return (file !== 'index.js')
}).forEach(function (file) {
    const url = path.join(__dirname, file)
    if (fs.statSync(url).isDirectory()) {
        fs.readdirSync(url).forEach(function (subfile) {
            const model = require(path.join(__dirname, file, subfile))(sequelize, Sequelize.DataTypes)
            db[model.name] = model
        })
    } else {
        const model = require(url)(sequelize, Sequelize.DataTypes)
        db[model.name] = model
    }
})
Object.keys(db).forEach(function (modelName) {
    if ('associate' in db[modelName]) {
        db[modelName].associate(db)
    }
})
db.sequelize = sequelize
db.Sequelize = Sequelize
db.Op = Sequelize.Op
db.literal = Sequelize.literal
db.fn = Sequelize.fn
db.col = Sequelize.col
module.exports = db
