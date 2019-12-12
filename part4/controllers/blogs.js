const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')

const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 })
  response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.post('/:id/comments', async (request, response, next) => {
  try {
    const comment = request.body.comment
    const blog = await Blog.findById(request.params.id)
    blog.comments = [...blog.comments, comment]
    const savedBlog = await blog.save()
    const updatedBlog = await Blog.findOne(savedBlog).populate('user', { username: 1, name: 1, id: 1 })
    response.status(201).json(updatedBlog)
  } catch(exception) {
    next (exception)
  }
})

blogsRouter.post('/', async (request, response, next) => {
  try {
    // Check token
    const token = request.token
    if (!token) return response.status(401).json({ error: 'token missing' })
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!decodedToken.id) return  response.status(401).json({ error: 'invalid token' })

    // Find user with given id
    const user = await User.findById(decodedToken.id)

    // Save blog
    const blog = new Blog(request.body)
    blog.user = user._id
    const savedBlog = await blog.save()
    
    // Update user
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    const populatedBlog = await Blog.findOne(savedBlog).populate('user', { username: 1, name: 1, id: 1 })
    response.status(201).json(populatedBlog)
  } catch(exception) {
    next (exception)
  }
})

blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    const blog = await Blog.findById(request.params.id)
    if (!blog) return  response.status(404).json({ error: 'Blog not found' })

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
    if ( !body.user ) return response.status(400).json({ error: 'no user in body' }) 
    const blog = {
      user: body.user.id,
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      comments: body.comments
    }
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true }).populate('user', { username: 1, name: 1, id: 1 })
    response.json(updatedBlog.toJSON())
  } catch(exception) {
    next (exception)
  }
})

module.exports = blogsRouter