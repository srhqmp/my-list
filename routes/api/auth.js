const express = require('express')
const authRouter = express.Router()
const bcrypt = require('bcryptjs')
require('dotenv')
const jwt = require('jsonwebtoken')
const auth = require('../../utils/middleware').auth

const User = require('../../models/User')

// @route   POST api/auth
// @desc    Authenticate user
// @access  Public
authRouter.post('/', async (request, response) => {
  const { email, password } = request.body

  if (!email || !password) {
    return response.status(400).json({ message: 'Please enter all fields' })
  }
  const user = await User.findOne({ email })

  if (!user) {
    return response.status(400).json({
      message: 'User does not exists',
    })
  }

  // validate password
  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) {
    return response.status(400).json({ message: 'Invalid credentials' })
  }

  const token = await jwt.sign({ id: user.id }, process.env.SECRET, {
    expiresIn: 3600,
  })

  return response.json({
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
    },
    token,
  })
})

// @route   GET api/auth/user
// @desc    Get user data
// @access  Private
authRouter.get('/user', auth, async (request, response) => {
  const user = await User.findById(request.user.id).select('-password')
  return response.json(user)
})

module.exports = authRouter
