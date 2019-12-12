import React from 'react'
import PropTypes from 'prop-types'
import { useField } from '../hooks/index'
import { connect } from 'react-redux'
import { updateNotification } from '../reducers/notificationReducer'
import { createBlog } from '../reducers/blogsReducer'

const BlogAdder = ({ createBlog, updateNotification }) => {
  const title = useField('text')
  const author = useField('text')
  const url = useField('text')
  const reset = () => {
    title.reset()
    author.reset()
    url.reset()
  }

  const handleCreate = async (event) => {
    event.preventDefault()
    reset()
    try {
      await createBlog({ title: title.value, author:author.value, url:url.value })
      updateNotification(`A new blog ${title.value} by ${author.value} added`, false, 5)
    } catch (exception) {
      updateNotification('Error while posting new blog', true, 5)
    }
  }

  return (
    <>
      <h2>Create new</h2>
      <form onSubmit={handleCreate}>
        <div>
          Title:
          <input  {...title} reset={undefined}/>
        </div>
        <div>
          Author:
          <input  {...author} reset={undefined}/>
        </div>
        <div>
          Url:
          <input  {...url} reset={undefined}/>
        </div>
        <button type={'sumbit'}>{'Create'}</button>
      </form>
    </>
  )
}

BlogAdder.propTypes = {
  createBlog: PropTypes.func.isRequired,
  updateNotification: PropTypes.func.isRequired
}

const mapDispatchToProps = {
  updateNotification,
  createBlog
}

export default connect(
  null,
  mapDispatchToProps
)(BlogAdder)
