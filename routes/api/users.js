const express = require('express')
const usersRouter = express.Router()
const bcrypt = require('bcryptjs')
require('dotenv')
const jwt = require('jsonwebtoken')

const User = require('../../models/User')

// @route   POST api/users
// @desc    Register user
// @access  Public
usersRouter.post('/', async (request, response) => {
  const { username, email, password } = request.body

  if (!username || !email || !password) {
    return response.status(400).json({ message: 'Please enter all fields' })
  }

  const emailExists = await User.findOne({ email })

  if (emailExists) {
    return response.status(400).json({
      message: 'You already have an account using this email. Please sign in',
    })
  }

  // create salt & hash
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const newUser = await new User({
    username,
    email,
    password: passwordHash,
  })

  const savedUser = await newUser.save()
  const token = await jwt.sign({ id: savedUser.id }, process.env.SECRET, {
    expiresIn: 3600,
  })

  return savedUser
    ? response.json({
        user: {
          id: savedUser.id,
          username: savedUser.username,
          email: savedUser.email,
        },
        token,
      })
    : response.status(400).json({ message: 'User was not saved' })
})

module.exports = usersRouter
