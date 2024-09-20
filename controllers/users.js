const bcrypt = require('bcrypt');
const router = require('express').Router()
const { Op } = require('sequelize')
const { isAdmin, tokenExtractor } = require('../utils/helper')
const { Blog, User, ReadingList, ActiveSession } = require('../models')

router.get('/', async(req, res) => {
  const users = await User.findAll({
    include: {
      attributes: { exclude: ['userId'] },
      model: Blog
    }
  })
  res.json(users)
})

router.get('/:id', async(req, res) => {

  const where = {}

  if (req.query.read !== undefined) {
    where.is_read = req.query.read === "true"  // Convert query string to boolean
  }

  const user = await User.findByPk(req.params.id, {
    attributes: ['username', 'name'],
    include: [
      {
        model: Blog,
        as: 'readingList', // The alias defined in User.belongsToMany
        attributes: { exclude: ['userId'] },
        through: {
          attributes: ['is_read', 'id'], // Include any additional fields from ReadingList if needed
          where
        }
      }
    ]
  })

  res.json(user)
})

router.post('/', async(req, res) => {
  const {username, name, password} = req.body

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = await User.create({
    username,
    name,
    passwordHash
  })
  res.json(user)
})


router.put('/:username', async(req, res) => {
  const { username } = req.body
  const user = await User.findOne({ where: { username: req.params.username } });

  if (user) {
    user.username = username
    await user.save()
    res.status(200).json(user)
  } else {
    req.status(404).json({error: "user not found"})
  }
})

router.put('/status/:username', tokenExtractor, isAdmin, async(req, res) => {
  let { status } = req.body
  status = status === "disable"

  const user = await User.findOne({ where: { username: req.params.username } });

  // If disabling the user, remove their active sessions
  if (status) {
    await ActiveSession.destroy({ where: { user_id: user.id } });
  }

  if (user) {
    user.disabled = status
    await user.save()
    res.status(200).json(user)
  } else {
    req.status(404).json({error: "user not found"})
  }
})


module.exports = router