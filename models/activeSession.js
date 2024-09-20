const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../utils/db')

class ActiveSession extends Model {}

ActiveSession.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  token: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {model: 'users', key: 'id'}
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'ActiveSession',
  tableName: 'active_sessions'
})

module.exports = ActiveSession