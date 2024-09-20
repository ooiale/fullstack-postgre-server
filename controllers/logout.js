const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const router = require('express').Router()
const { tokenExtractor } = require('../utils/helper')
const { SECRET } = require('../utils/config')
const { User, ActiveSession } = require('../models')

router.delete('/', tokenExtractor, async (req, res) => {

const token = req.get('authorization').substring(7)
    
const session = await ActiveSession.findOne({ where: { token } });

if (!session) {
  return res.status(401).json({ error: 'Session not found or already logged out' });
}

await session.destroy();

return res.status(200).json({ message: 'Successfully logged out' });

})

module.exports = router