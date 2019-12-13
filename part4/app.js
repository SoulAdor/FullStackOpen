const config = require('./utils/config') // Add config 
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testing')
  app.use('/api/testing', testingRouter)
}
const middleware = require('./utils/middleware')
const mongoose = require('mongoose')
const logger = require('./utils/logger')
const mongoUrl = config.MONGODB_URI
mongoose.set('useUnifiedTopology', true);
mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true);
mongoose.connect(mongoUrl, { useNewUrlParser: true })
.then(result => {
  logger.info('connected to MongoDB')
})
.catch((error) => {
  logger.info('error connecting to MongoDB:', error.message)
})

app.use(cors())
app.use(express.static('build'))
app.use(bodyParser.json())
app.use(middleware.tokenExtractor)
app.use(middleware.requestLogger)
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)


module.exports = app