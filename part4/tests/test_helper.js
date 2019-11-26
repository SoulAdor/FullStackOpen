const Blog = require('../models/blog')

const initialBlogs = [
  {
    "title": "Segment Trees",
    "author": "AndrewTest",
    "url": "segtreesTest.org",
    "likes": 12
  },
  {
    "title": "SecondTitle",
    "author": "Author2",
    "url": "SecondURL",
    "likes": 17
  }
]

const initialUsers = [
  {
    "username": "SoulAdor",
    "name": "Andrew Niedens",
    "password": "secret"
  },
  {
    "username": "SilvaTest",
    "name": "The greatest",
    "password": "Pinka"
  }
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, initialUsers, blogsInDb
}