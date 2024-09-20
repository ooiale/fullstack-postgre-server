const { SECRET } = require('../utils/config');
const jwt = require('jsonwebtoken');
const router = require('express').Router()
const { Op } = require('sequelize')
const { Blog, User } = require('../models')
const { tokenExtractor, blogFinder } = require('../utils/helper')


router.get('/', async(req, res) => {

  const where = {} //build where clause if case req.query exists

  if (req.query.search) {
    where[Op.or] = [
      { title: { [Op.iLike]: `%${ req.query.search }%` } },
      { author: { [Op.iLike]: `%${ req.query.search }%` } },
    ]
  }

  const blogs = await Blog.findAll({
    attributes: { exclude: ['userId'] },  // Exclude userId from Blog response
    include: {
      model: User
    },

    where,
    order: [['likes', 'DESC']]

  })

  if (blogs.length === 0) {
    return res.status(404).json({ message: 'No blogs found matching the criteria' });
  }  

  res.json(blogs)
})

router.post('/', tokenExtractor, async(req, res) => {
    const user = await User.findByPk(req.decodedToken.id)
    const blog = await Blog.create({...req.body, userId: user.id})
    res.json(blog)
})

router.get('/:id', blogFinder, async(req, res) => {
  const blog = req.blog
  if (blog) {
    res.json(blog)
  }
  else {
    res.status(404).json({error: "blog not found"})
  }
})


router.delete('/:id', tokenExtractor, blogFinder, async(req, res) => {
  const blogId = req.params.id
  const blog = req.blog //comes from blogFinder middleware

  const loggedUserId = req.decodedToken.id

  if (blog) {

    if (blog.userId.toString() !== loggedUserId.toString()) {
      return res.status(403).json({ error: 'You do not have permission to delete this blog' });
    }

    await blog.destroy()
    res.status(200).json({message: `blog ${blogId} was deleted`})
  } else {
    res.status(404).json({error: "Blog not found"})
  }

})

router.put('/:id', blogFinder, async(req, res) => {
  const { likes } = req.body
  const blog = req.blog

  if (blog) {
    blog.likes = likes
    await blog.save()
    res.status(200).json(blog)
  } else {
    res.status(404).json({error: "Blog not found"})
  }
})

module.exports = router