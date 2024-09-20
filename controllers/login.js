const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const router = require('express').Router()

const { SECRET } = require('../utils/config')
const { User, ActiveSession } = require('../models')

router.post('/', async (req, res) => {
  const {username, password} = req.body

  const user = await User.findOne({
    where: {
      username: username
    }
  })

  if (user.disabled) {
    return res.status(403).json({ error: 'Your account is disabled lol.' });
  }

  const passwordCorrect = user === null 
    ? false 
    : await bcrypt.compare(password, user.passwordHash);


  if (!(user && passwordCorrect)) {
    return res.status(401).json({
      error: 'invalid username or password'
    })
  }

  const userForToken = {
    username: user.username,
    id: user.id,
  }

  const token = jwt.sign(userForToken, SECRET)

  const session = await ActiveSession.create({
    user_id: user.id,
    token: token,
    createdAt: new Date()
  })

  res
    .status(200)
    .send(session)
})

module.exports = router