import axios from 'axios'
const baseUrl = '/api/users'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async user => {
  const response = await axios.post(baseUrl, user)
  return response.data
}

const update = async user => {
  const response = await axios.put(`${baseUrl}/${user.id}`, user)
  return response.data
}

const remove = async user => {
  const response = await axios.delete(`${baseUrl}/${user.id}`, user)
  return response.data
}

export default { getAll, create, update, remove }