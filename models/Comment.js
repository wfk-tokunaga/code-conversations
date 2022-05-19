const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');
const User = require('./User');

class Post extends Model {}

User.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    text: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    // foreign key that references User
    post_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Post,

        }
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            isEmail: true
        },
        unique: true
    },
}, {
    hooks: {
        // Hash password with bcrypt
        async beforeCreate(newUserData) {
            newUserData.password = await bcrypt.hash(newUserData.password, 10);
            return newUserData;
        },
        async beforeUpdate(updateUserData) {
            updateUserData.password = await bcrypt.hash(updateUserData.password, 10);
            return updateUserData;
        }
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user'
})

module.exports = User;