import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { updateNotification } from '../reducers/notificationReducer'
import { createBlog } from '../reducers/blogsReducer'
import { Form, Button } from 'react-bootstrap'

const BlogAdder = ({ createBlog, updateNotification }) => {
  const handleCreate = async (event) => {
    event.preventDefault()
    event.persist()
    try {
      await createBlog({
        title: event.target.title.value,
        author: event.target.author.value,
        url: event.target.url.value
      })
      updateNotification(`A new blog ${event.target.title.value} by ${event.target.author.value} added`, false, 5)
      event.target.title.value = ''
      event.target.author.value = ''
      event.target.url.value = ''
    } catch (exception) {
      updateNotification('Error while posting new blog', true, 5)
    }
  }

  return (
    <>
      <h2 className='text-info'>Create new</h2>
      <Form onSubmit={handleCreate}>
        <Form.Group>
          <Form.Label> Title: </Form.Label>
          <Form.Control type='text' name='title' placeholder="Enter title"/>
        </Form.Group>
        <Form.Group>
          <Form.Label> Author: </Form.Label>
          <Form.Control type='text' name='author' placeholder="Enter author"/>
        </Form.Group>
        <Form.Group>
          <Form.Label> Url: </Form.Label>
          <Form.Control type='text' name='url' placeholder="Enter url"/>
        </Form.Group>
        <Form.Group>
          <Button variant='primary' type ='sumbit'> Create </Button>
        </Form.Group>
      </Form>
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
