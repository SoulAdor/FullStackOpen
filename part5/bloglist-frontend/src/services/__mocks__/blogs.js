const blogs = [
  {
    id: '5a451df7571c224a31b5c8ce',
    title: 'HTML is easy',
    url: '2019-06-11T16:38:15.541Z',
    author: 'Matti Luukkainen',
    important: false,
    user: {
      _id: '5a437a9e514ab7f168ddf138',
      username: 'mluukkai',
      name: 'Matti Luukkainen'
    }
  },
  {
    id: '5a451e21e0b8b04a45638211',
    title: 'Browser can execute only javascript',
    url: '2019-06-11T16:38:57.694Z',
    author: 'Matti Luukkainen',
    important: true,
    user: {
      _id: '5a437a9e514ab7f168ddf138',
      username: 'mluukkai',
      name: 'Matti Luukkainen'
    }
  },
  {
    id: '5a451e30b5ffd44a58fa79ab',
    title: 'The most important methods of HTTP are GET and POST',
    url: '2019-06-11T16:39:12.713Z',
    author: 'Matti Luukkainen',
    important: true,
    user: {
      _id: '5a437a9e514ab7f168ddf138',
      username: 'mluukkai',
      name: 'Matti Luukkainen'
    }
  }
]

const setToken = newToken => {
  return newToken
}

const getAll = () => {
  return Promise.resolve(blogs)
}

export default { getAll, setToken }