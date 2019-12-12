import React from 'react'
import { connect } from 'react-redux'
import { updateNotification } from '../reducers/notificationReducer'
import { updateBlog, deleteBlog } from '../reducers/blogsReducer'
import { useField } from '../hooks/index'

const Blog = ({ user, blog, updateBlog, deleteBlog, updateNotification }) => {
  const comment = useField('text')

  if (!blog) return null
  // User has to exist for the check, if no user, cannot delete anything
  const userCanRemove = { display: (user && user.username === blog.user.username) ? '' : 'none' }

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

  const handleCreate = async (event) => {
    event.preventDefault()
    try {
      const updatedBlog = blog
      updatedBlog.comments = [...updatedBlog.comments, comment.value]
      await updateBlog(updatedBlog)
      updateNotification(`A new comment ${comment.value} added`, false, 5)
    } catch (exception) {
      updateNotification('Error while posting new comment', true, 5)
    }
  }

  return (
    <>
      <h2> {blog.title} {blog.author} </h2>
      <a href={blog.url}>{blog.url}</a>
      <div>
        {blog.likes} likes
        <button type ='button' name='Like' onClick={clickLike}>{'Like'}</button>
      </div>
      <p> Added by {blog.user.username} </p>
      <button style={userCanRemove} type="button" onClick={clickRemove}>Remove</button>
      <h3> comments </h3>
      <h2> Create new </h2>
      <form onSubmit={handleCreate}>
        <input  {...comment} reset={undefined}/>
        <button type={'sumbit'}>{'Add comment'}</button>
      </form>
      <ul>
        { blog.comments.map ( (comment, index) => <li key={index}> { comment } </li> )}
      </ul>
    </>
  )}

const mapDispatchToProps = {
  updateBlog,
  deleteBlog,
  updateNotification
}

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user,
    blog: state.blogs.find(blog => blog.id === ownProps.id)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Blog)