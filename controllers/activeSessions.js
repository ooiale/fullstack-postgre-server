
const router = require('express').Router()
const { Op } = require('sequelize')
const { Blog, User, ReadingList, ActiveSession } = require('../models')
const { tokenExtractor } = require('../utils/helper')

//readingList = (id, isRead, user_id, blog_id)

router.get('/', async(req, res) => {

  const sessions = await ActiveSession.findAll()

  if (sessions.length === 0) {
    return res.status(404).json({ message: 'No sessions found' });
  }  

  res.json(sessions)
})

module.exports = router