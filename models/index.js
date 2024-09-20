const Blog = require('./blog')
const User = require('./user')
const ReadingList = require('./readingList')
const ActiveSession = require('./activeSession')
User.hasMany(Blog)
Blog.belongsTo(User)

User.belongsToMany(Blog, { through: ReadingList, as: 'readingList' })
Blog.belongsToMany(User, { through: ReadingList, as: 'readers' })


module.exports = {
  Blog,
  User,
  ReadingList,
  ActiveSession
}