const { Blog, ActiveSession, User } = require('../models/index')
const { SECRET } = require('../utils/config');
const jwt = require('jsonwebtoken');

const tokenExtractor = async (req, res, next) => {
  const authorization = req.get('authorization')

  if (! (authorization && authorization.toLowerCase().startsWith('bearer '))) {
    return res.status(401).json({ error: 'token missing' })
  }

  const token = authorization.substring(7); // Extract the actual token from the header

  try {
    decodedToken = jwt.verify(authorization.substring(7), SECRET)

    req.decodedToken = decodedToken

    const activeSession = await ActiveSession.findOne({ where: { token }})
    if (!activeSession) {
      return res.status(401).json({ error: 'session expired or token invalid' });
    }

  } catch{
    return res.status(401).json({ error: 'token invalid' })
  }
  
  next()
}

const blogFinder = async (req, res, next) => {
  const blog = await Blog.findByPk(req.params.id)
  req.blog = blog
  next()
}

const isAdmin = async (req, res , next) => {

  if (!req.decodedToken || !req.decodedToken.username) {
    return res.status(401).json({ error: 'token missing or invalid' });
  }
  
  const username = req.decodedToken.username
  const user = await User.findOne({ where: { username }})

  if (!user) {
    return res.status(404).json({ error: 'user not found' });
  }

  if (user.admin) {
    next()
  } else {
    return res.status(401).json({ error: 'user does not have permission' });
  }
}

module.exports = {
  tokenExtractor,
  blogFinder,
  isAdmin
}