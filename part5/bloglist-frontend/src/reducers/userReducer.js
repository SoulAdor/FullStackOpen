import blogsService from '../services/blogs'
import loginService from '../services/login'

const userAtStart = null

// Initialize user from local storage
export const initUser = () => {
  const user = JSON.parse(window.localStorage.getItem('loggedBlogappUser'))
  const token = user ? user.token : null
  blogsService.setToken(token)
  return async dispatch => {
    dispatch({
      type: 'LOG_IN_USER',
      data: user
    })
  }
}

export const logInUser = ({ username, password }) => {
  return async dispatch => {
    const user = await loginService.login({ username, password })
    window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
    const token = user ? user.token : null
    blogsService.setToken(token)
    dispatch({
      type: 'LOG_IN_USER',
      data: user
    })
  }
}

export const logOutUser = () => {
  window.localStorage.setItem('loggedBlogappUser', JSON.stringify(null))
  blogsService.setToken(null)
  return async dispatch => {
    dispatch({
      type: 'LOG_OUT_USER'
    })
  }
}

const reducer = (state = userAtStart, action) => {
  switch (action.type) {
  case 'LOG_IN_USER':
    return action.data
  case 'LOG_OUT_USER':
    return userAtStart
  default:
    return state
  }
}

export default reducer