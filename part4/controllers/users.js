const bcryptjs = require('bcryptjs')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', { url: 1, author:1, title: 1, id: 1 })
  response.json(users.map(user => user.toJSON()))
})

usersRouter.post('/', async (request, response, next) => {
  try { 
    const body = request.body

    if (!body.password)  return response.status(400).json({ error: "No password" })
    if (body.password.length < 3)  return response.status(400).json({ error: "Password length is less than 3" })

    const saltRounds = 10
    const passwordHash = await bcryptjs.hash(body.password, saltRounds)

    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash,
    })

    const result = await user.save()
    response.status(201).json(result)
  } catch(exception) {
    next (exception)
  }
})

usersRouter.delete('/:id', async (request, response, next) => {
  try {
    await User.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } catch (exception) {
    next(exception)
  }
})

// Changes person of database
usersRouter.put('/:id', async (request, response, next) => {
  try { 
    const body = request.body

    if (!body.password)  return response.status(400).json({ error: "No password" })
    if (body.password.length < 3)  return response.status(400).json({ error: "Password length is less than 3" })

    const saltRounds = 10
    const passwordHash = await bcryptjs.hash(body.password, saltRounds)

    const user = {
      username: body.username,
      name: body.name,
      passwordHash: passwordHash
    }
    const updatedUser = await User.findByIdAndUpdate(request.params.id, user, { new: true })
    response.json(updatedUser.toJSON())
  } catch(exception) {
    next (exception)
  }
})

module.exports = usersRouter