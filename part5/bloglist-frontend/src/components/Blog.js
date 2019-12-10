import React, { useState } from 'react'
import { connect } from 'react-redux'
import { updateNotification } from '../reducers/notificationReducer'
import { updateBlog, deleteBlog } from '../reducers/blogsReducer'

const Blog = ({ user, blog, updateBlog, deleteBlog, updateNotification }) => {
  const [visible, setVisible] = useState(false)

  const showWhenVisible = { display: visible ? '' : 'none' }
  // User has to exist for the check, if no user, cannot delete anything
  const userCanRemove = { display: (user && user.username === blog.user.username) ? '' : 'none' }
  // const userCanRemove = { display: '' }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const clickLike = async () => {
    try {
      await updateBlog({ ...blog, likes: blog.likes + 1 })
    } catch(exception) {
      updateNotification ('Error while updating blog', true, 5)
    }
  }

  const clickRemove = async () => {
    try {
      if (window.confirm(`Remove blog ${blog.title} by ${blog.author} ?`))
        await deleteBlog(blog)
    } catch(exception) {
      updateNotification ('Error while deleting blog', true, 5)
    }
  }

  return (
    <div style={blogStyle} className ='blog'>
      <div onClick={() => setVisible(!visible)}>
        {blog.title} {blog.author}
      </div>
      <div style={showWhenVisible} className="togglableContent">
        <a href={blog.url}>{blog.url}</a>
        <div>
          {blog.likes} likes
          <button type ='button' name='Like' onClick={clickLike}>{'Like'}</button>
        </div>
        <p> Added by {blog.user.username} </p>
        <button style={userCanRemove} type="button" onClick={clickRemove}>Remove</button>
      </div>
    </div>
  )}

const mapDispatchToProps = {
  updateBlog,
  deleteBlog,
  updateNotification
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Blog)