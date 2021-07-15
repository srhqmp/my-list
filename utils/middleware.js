const logger = require('./logger')
const jwt = require('jsonwebtoken')
require('dotenv')

const requestLogger = (req, res, next) => {
  logger.info('Method:', req.method)
  logger.info('Path: ', req.path)
  logger.info('Body: ', req.body)
  logger.info('---')
  next()
}

const auth = async (req, res, next) => {
  const token = req.header('x-auth-token')

  if (!token) return res.status(401).json({ message: 'Unauthorized User' })

  try {
    // verify token
    const decoded = await jwt.verify(token, process.env.SECRET)
    // add user from payload
    req.user = decoded
    next()
  } catch (e) {
    return res.status(400).json({ message: 'Token is not valid' })
  }
}

module.exports = { requestLogger, auth }
