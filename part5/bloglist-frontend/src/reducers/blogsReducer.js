import blogsService from '../services/blogs'
import usersReducer from './usersReducer'

const blogsAtStart = []

export const initBlogs = () => {
  return async dispatch => {
    const blogs = await blogsService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

export const createBlog = blog => {
  return async dispatch => {
    const newBlog = await blogsService.create(blog)
    dispatch({
      type: 'NEW_BLOG',
      data: newBlog,
    })
  }
}

export const updateBlog = blog => {
  return async dispatch => {
    const updatedBlog = await blogsService.update(blog)
    dispatch({
      type: 'UPDATE_BLOG',
      data: updatedBlog,
    })
  }
}

export const deleteBlog = blog => {
  return async dispatch => {
    await blogsService.remove(blog)
    dispatch({
      type: 'DELETE_BLOG',
      data: blog,
    })
  }
}

const reducer = (state = blogsAtStart, action) => {
  switch (action.type) {
  case 'INIT_BLOGS':
    return action.data
  case 'NEW_BLOG': {
    const newBlog = action.data
    return [...state, newBlog]
  }
  case 'UPDATE_BLOG': {
    const updatedBlog = action.data
    return state.map (blog => blog.id === updatedBlog.id ? updatedBlog : blog)
  }
  case 'DELETE_BLOG': {
    const deletedBlog = action.data
    return state.filter (blog => blog.id !== deletedBlog.id)
  }
  default:
    return state
  }
}

export default reducer