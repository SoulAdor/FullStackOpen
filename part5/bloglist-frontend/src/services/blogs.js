import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async blog => {
  const config = { headers: { Authorization: token } }
  const response = await axios.post(baseUrl, blog, config)
  return response.data
}

const update = async blog => {
  const config = { headers: { Authorization: token } }
  const response = await axios.put(`${baseUrl}/${blog.id}`, blog, config)
  return response.data
}

const remove = async blog => {
  const config = { headers: { Authorization: token } }
  const response = await axios.delete(`${baseUrl}/${blog.id}`, blog, config)
  return response.data
}

export default { setToken, getAll, create, update, remove }