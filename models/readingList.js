const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../utils/db')

class ReadingList extends Model {}

ReadingList.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  is_read: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {model: 'users', key: 'id'}
  },
  blog_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {model: 'blogs', key: 'id'}
  },
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'ReadingList'
})

module.exports = ReadingList