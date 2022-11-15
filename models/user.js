'use strict'

module.exports = function (sequelize, DataTypes) {
    const User = sequelize.define(
        'User',
        {
            id: {
                type: DataTypes.INTEGER(),
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                type: DataTypes.STRING(255),
                allowNull: true
            },
            age: {
                type: DataTypes.INTEGER(),
                allowNull: true
            }
        }, {
            timestamps: true,
            createdAt: 'created_at',
            updatedAt: 'updated_at',
            freezeTableName: true,
            tableName: 'user'
        })
    User.associate = function (models) {
        // Image.belongsTo(models.User, {
        //     foreignKey: 'userId',
        //     targetKey: 'id',
        //     onDelete: 'SET NULL'
        // })
        // Image.hasMany(models.GoodsMainImage, {
        //     foreignKey: 'imageId',
        //     targetKey: 'id'
        // })
    }
    return User
}
