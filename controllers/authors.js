const router = require('express').Router()
const { Blog } = require('../models')
const { sequelize } = require('../utils/db')
router.get('/', async(req, res) => {

  const authors = await Blog.findAll({
    attributes: [
      'author', // Include the author's name
      [sequelize.fn('SUM', sequelize.col('likes')), 'totalLikes'], // Sum of likes
      [sequelize.fn('COUNT', sequelize.col('id')), 'blogCount'] // Number of blogs
    ],
    group: ['author'], // Group by author
    order: [['totalLikes', 'DESC']]
  })

  res.json(authors)
})


module.exports = router