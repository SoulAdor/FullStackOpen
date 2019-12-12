import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { updateNotification } from '../reducers/notificationReducer'
import { updateBlog, deleteBlog } from '../reducers/blogsReducer'
import { Button, Form } from 'react-bootstrap'

const Blog = ({ user, blog, updateBlog, deleteBlog, updateNotification }) => {
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
    event.persist()
    try {
      const updatedBlog = blog
      updatedBlog.comments = [...updatedBlog.comments, event.target.comment.value]
      await updateBlog(updatedBlog)
      updateNotification(`A new comment ${event.target.comment.value} added`, false, 5)
      event.target.comment.value = ''
    } catch (exception) {
      updateNotification('Error while posting new comment', true, 5)
    }
  }

  return (
    <>
      <h2 className='d-flex justify-content-center'> {blog.title} {blog.author} </h2>
      <a href={blog.url}>{blog.url}</a>
      <div>
        <span> { blog.likes } likes </span>
        <Button type ='button' name='Like' onClick={clickLike}>{'Like'}</Button>
      </div>
      <p> Added by {blog.user.username} </p>
      <Button style={userCanRemove} type='button' onClick={clickRemove}>Remove</Button>
      <h2> Comments </h2>
      <h3> Create new </h3>
      <Form onSubmit={handleCreate}>
        <Form.Group>
          <Form.Label> Comment: </Form.Label>
          <Form.Control type="text" name="comment" placeholder="Enter comment"/>
        </Form.Group>
        <Form.Group>
          <Button variant="primary" type ='sumbit'> Add comment </Button>
        </Form.Group>
      </Form>
      <ul className='list-group'>
        { blog.comments.map ( (comment, index) => <li key={index} className='list-group-item'> { comment } </li> )}
      </ul>
    </>
  )
}

Blog.propTypes = {
  user: PropTypes.object,
  blog: PropTypes.object,
  updateBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
  updateNotification: PropTypes.func.isRequired
}

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