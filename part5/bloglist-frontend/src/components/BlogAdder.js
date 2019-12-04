import React, { useState } from 'react'
import Notification from './Notification'
import { useField } from '../hooks/index'

import blogService from '../services/blogs'

function BlogAdder({ blogs, setBlogs }) {
  const title = useField('text')
  const author = useField('text')
  const url = useField('text')

  const notificationTime = 5000
  const [notification, setNotification] = useState(null)

  const handleCreate = async (event) => {
    event.preventDefault()
    try {
      const result = await blogService.create({ title: title.value, author:author.value, url:url.value })
      setBlogs (blogs.concat(result))
      title.reset()
      author.reset()
      url.reset()

      setNotification(`A new blog ${title.value} by ${author.value} added`)
      setTimeout(() => { setNotification(null)}, notificationTime)
    } catch (exception) {
      console.log('Error while posting new blog')
    }
  }

  const titleArgs = { ...title }
  delete titleArgs.reset
  const authorArgs = { ...author }
  delete authorArgs.reset
  const urlArgs = { ...url }
  delete urlArgs.reset

  return (
    <>
      <h2>Create new</h2>
      <form onSubmit={handleCreate}>
        <div>
          Title:
          <input  {...titleArgs} />
        </div>
        <div>
          Author:
          <input  {...authorArgs} />
        </div>
        <div>
          Url:
          <input  {...urlArgs} />
        </div>
        <button type={'sumbit'}>{'Create'}</button>
        <Notification message={notification}/>
      </form>
    </>
  )
}

export default BlogAdder
