const mongoose = require('mongoose')
const helper = require('./test_helper')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')

beforeEach(async () => {
  await User.deleteMany({})

  const userObjects = helper.initialUsers.map(user => new User(user))
  const promiseArray = userObjects.map(user => user.save())
  await Promise.all(promiseArray)
})

describe('Api check', () => {
  test('users are returned as json', async () => {
    await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('there are two users', async () => {
    const response = await api.get('/api/users')
    expect(response.body.length).toBe(helper.initialUsers.length)
  })

  test('contains id and it is unique', async () => {
    const response = await api.get('/api/users')
    const receivedUsers = response.body
    receivedUsers.forEach(user => {
      expect(user.id).toBeDefined()
    });
    expect(new Set(receivedUsers.map(user => user.id)).size === receivedUsers.length);
  })

  test('create new user', async () => {
    const newUser = {
      "username": "NewUser",
      "name": "NewName",
      "password": "NewPassword"
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/users')
    const usernames = response.body.map(r => r.username)
    expect(response.body.length).toBe(helper.initialUsers.length + 1)
    expect(usernames).toContain('NewUser')
  })
})

describe('Constraints check', () => {
  test('user without username is not added', async () => {
    const newUser = {
      "name": "NewName",
      "password": "NewPassword"
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    const response = await api.get('/api/users')
    expect(response.body.length).toBe(helper.initialUsers.length)
  })

  test('user with small username (size < 3) is not added', async () => {
    const newUser = {
      "username": "AA",
      "name": "NewName",
      "password": "NewPassword"
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    const response = await api.get('/api/users')
    expect(response.body.length).toBe(helper.initialUsers.length)
  })

  test('user with same username is not added', async () => {
    const newUser = {
      "username": helper.initialUsers[0].username,
      "name": "NewName",
      "password": "NewPassword"
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    const response = await api.get('/api/users')
    expect(response.body.length).toBe(helper.initialUsers.length)
  })

  test('user without password is not added', async () => {
    const newUser = {
      "username": "NewUser",
      "name": "NewName",
      "password": ""
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    const response = await api.get('/api/users')
    expect(response.body.length).toBe(helper.initialUsers.length)
  })

  test('user with small (len < 3) password is not added', async () => {
    const newUser = {
      "username": "NewUser",
      "name": "NewName",
      "password": "12"
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    const response = await api.get('/api/users')
    expect(response.body.length).toBe(helper.initialUsers.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
})