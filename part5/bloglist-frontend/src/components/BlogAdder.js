import React, { useState } from 'react'
import ValueInput from './ValueInput'
import Notification from './Notification'

import blogService from '../services/blogs'

function BlogAdder({ blogs, setBlogs }) {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const notificationTime = 5000
  const [notification, setNotification] = useState(null)

  const handleCreate = async (event) => {
    event.preventDefault()
    try {
      const result = await blogService.create({ title, author, url })
      setBlogs (blogs.concat(result))
      setNotification(`A new blog ${title} by ${author} added`)
      setTimeout(() => { setNotification(null)}, notificationTime)
    } catch (exception) {
      console.log('Error while posting new blog')
    }
  }

  return (
    <>
      <h2>Create new</h2>
      <form onSubmit={handleCreate}>
        <ValueInput type ='text' name='Title' value={title} setValue={setTitle}/>
        <ValueInput type ='text' name='Author' value={author} setValue={setAuthor}/>
        <ValueInput type ='text' name='URL' value={url} setValue={setUrl}/>
        <button type={'sumbit'}>{'Create'}</button>
        <Notification message={notification}/>
      </form>
    </>
  )
}

export default BlogAdder
