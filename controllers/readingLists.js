
const router = require('express').Router()
const { Op } = require('sequelize')
const { Blog, User, ReadingList } = require('../models')
const { tokenExtractor } = require('../utils/helper')

//readingList = (id, isRead, user_id, blog_id)

router.get('/', async(req, res) => {


  const list = await ReadingList.findAll({
    attributes: ['user_id', 'blog_id']
  })

  if (list.length === 0) {
    return res.status(404).json({ message: 'No reading list found' });
  }

  res.json(list)
})

router.post('/', async(req, res) => {
    let {isRead, user_id, blog_id} = req.body
    isRead = isRead || false
    const readingList = await ReadingList.create({isRead , user_id, blog_id})
    res.json(readingList)
})

router.put('/:id', tokenExtractor, async (req, res) => {

  const readingList = await ReadingList.findByPk(req.params.id)

  let { read } = req.body
  read = read || false

  const loggedUserId = req.decodedToken.id

  if (readingList) {

    if (readingList.user_id.toString() !== loggedUserId.toString()) {
      return res.status(403).json({ error: 'You do not have permission to modify this reading list' });
    }

    readingList.is_read = read
    await readingList.save()
    res.status(200).json(readingList)
  } else {
    res.status(404).json({error: "reading list not found"})
  }

})

module.exports = router