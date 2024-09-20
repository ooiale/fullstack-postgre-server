require('express-async-errors')

const express = require('express')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const authorsRouter = require('./controllers/authors')
const readingListRouter = require('./controllers/readingLists')
const activeSessionRouter = require('./controllers/activeSessions')
const logoutRouter = require('./controllers/logout')
const { connectToDatabase } = require('./utils/db')
const { PORT } = require('./utils/config')
const { ActiveSession } = require('./models')


const app = express()
app.use(express.json())
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use('/api/logout', logoutRouter)
app.use('/api/authors', authorsRouter)
app.use('/api/readinglists', readingListRouter)
app.use('/api/sessions', activeSessionRouter)


// Centralized error-handling middleware (this must be defined at the bottom)
app.use((error, req, res, next) => {
  console.error(error.message)

  // Custom error handling
  if (error.name === 'SequelizeValidationError') {
    return res.status(400).json({ error: error.message })
  }

  res.status(500).json({ error: 'Something went wrong' })
})

const clearActiveSessionsOnStartup = async () => {
  try {
    await ActiveSession.destroy({ where: {} })
    console.log('All session data cleared on startup.')
  } catch (error) {
    console.error('Error clearing session data on startup:', error)
  }
}

const start = async () => {
  await connectToDatabase()
  clearActiveSessionsOnStartup()
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} at http://localhost:3001/api/blogs`)
  })
}

start()