const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')

const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 })
  response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.post('/', async (request, response, next) => {
  try {
    // Check token
    const token = request.token
    if (!token) return  response.status(401).json({ error: 'token missing' })
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!decodedToken.id) return  response.status(401).json({ error: 'invalid token' })

    // Find user with given id
    const user = await User.findById(decodedToken.id) //User.findOne({ 'username': "SoulAdor" }).exec()

    // Save blog
    const blog = new Blog(request.body)
    blog.user = user._id
    const savedBlog = await blog.save()

    // Update user
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.status(201).json(savedBlog)
  } catch(exception) {
    next (exception)
  }
})

blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    // Check token
    const token = request.token
    if (!token) return  response.status(401).json({ error: 'token missing' })
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!decodedToken.id) return  response.status(401).json({ error: 'invalid token' })
    const userid = decodedToken.id

    const blog = await Blog.findById(request.params.id)
    if (!blog) return  response.status(401).json({ error: 'Blog not found' })

    if ( blog.user.toString() !== userid.toString() ) 
      return response.status(401).json({ error: 'wrong user' })

    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } catch (exception) {
    next(exception)
  }
})

// Changes person of database
blogsRouter.put('/:id', async (request, response, next) => {
  try { 
    const body = request.body
    const blog = {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes
    }
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    response.json(updatedBlog.toJSON())
  } catch(exception) {
    next (exception)
  }
})

module.exports = blogsRouter