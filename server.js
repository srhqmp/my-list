const express = require('express')
const mongoose = require('mongoose')
const path = require('path')

const items = require('./routes/api/items')
const users = require('./routes/api/users')
const auth = require('./routes/api/auth')

const app = express()
const db = require('./config/keys').MONGODB_URI
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')

// database
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
  })
  .then(() => logger.info('connected to database'))
  .catch((error) => logger.error(error))

app.use(express.json())
require('express-async-errors')

app.use(middleware.requestLogger)

// api routes
app.use('/api/items', items)
app.use('/api/users', users)
app.use('/api/auth', auth)

// serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // set static folder
  app.use(express.static('client/build'))
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

const port = require('./config/keys').PORT || 5000
app.listen(port, () => logger.info(`server started on port ${port}`))
