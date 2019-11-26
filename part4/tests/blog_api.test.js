const mongoose = require('mongoose')
const helper = require('./test_helper')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')

beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)

  const userObjects = helper.initialUsers.map(user => new User(user))
  await Promise.all(userObjects.map(user => user.save()))
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are two blogs', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body.length).toBe(helper.initialBlogs.length)
})

test('the first blog is about Segment Trees', async () => {
  const response = await api.get('/api/blogs')

  const contents = response.body.map(r => r.title)

  expect(contents).toContain('Segment Trees')
})

test('contains id and it is unique', async () => {
  const response = await api.get('/api/blogs')
  const receivedBlogs = response.body
  receivedBlogs.forEach(blog => {
    expect(blog.id).toBeDefined()
  });
  expect(new Set(receivedBlogs.map(blog => blog.id)).size === receivedBlogs.length);
})

test('create new blog', async () => {
  const newBlog = {
    "title": "TestTitle",
    "author": "TestAuthor",
    "url": "TestUrl",
    "likes": 100
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  const titles = response.body.map(r => r.title)
  expect(response.body.length).toBe(helper.initialBlogs.length + 1)
  expect(titles).toContain('TestTitle')
})

test('blog without title and url is not added', async () => {
  const newBlog = {
    "author": "TestOnlyAuthor",
    "likes": 102
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  const response = await api.get('/api/blogs')
  expect(response.body.length).toBe(helper.initialBlogs.length)
})

test('default like is 0', async () => {
  const newBlog = {
    "title": "ZeroLike",
    "author": "ZeroLike",
    "url": "ZeroLike"
  }

  const response = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  expect(response.body.likes === 0)
})

test('delete works', async () => {
  const newBlog = {
    "title": "A",
    "author": "B",
    "url": "C",
    "likes" : 34
  }

  let response = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const createdId = response.body.id

  response = await api
  .get('/api/blogs')
  .expect(200)
  .expect('Content-Type', /application\/json/)

  expect(response.body.length).toBe(helper.initialBlogs.length + 1)

  response = await api
    .delete(`/api/blogs/${createdId}`)
    .expect(204)

  response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  expect(response.body.length).toBe(helper.initialBlogs.length)
})

test('update works', async () => {
  const newBlog = {
    "title": "update",
    "author": "update",
    "url": "update",
    "likes" : 25
  }

  let response = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const createdId = response.body.id
  newBlog.likes = 50

  response = await api
  .put(`/api/blogs/${createdId}`)
  .send(newBlog)
  .expect(200)
  .expect('Content-Type', /application\/json/)

  response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
  expect(response.body.length).toBe(helper.initialBlogs.length + 1)

  const updated = response.body.find(blog => blog.id === createdId);
  expect(updated.likes).toBe(50)
})

afterAll(() => {
  mongoose.connection.close()
})