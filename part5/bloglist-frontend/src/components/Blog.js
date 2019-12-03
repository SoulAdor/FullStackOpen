import React, { useState } from 'react'

import blogService from '../services/blogs'

const Blog = ({ user, blog, blogs, setBlogs }) => {
  const [visible, setVisible] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

  const showWhenVisible = { display: visible ? '' : 'none' }
  const userCanRemove = { display: user.username === blog.user.username ? '' : 'none' }
  //const userCanRemove = { display: "" }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const clickLike = async () => {
    try{
      let updatedBlog = blog
      updatedBlog.likes = likes + 1
      const result = await blogService.update(updatedBlog)
      setLikes(result.likes)
    } catch(exception) {
      console.log (exception)
    }
  }

  const clickRemove = async () => {
    try{
      if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
        await blogService.remove(blog)
        setBlogs (blogs.filter(someBlog => someBlog.id !== blog.id))
      }
    } catch(exception) {
      console.log (exception)
    }
  }

  return (
    <div style={blogStyle}>
      <div onClick={() => setVisible(!visible)}>
        {blog.title} {blog.author}
      </div>
      <div style={showWhenVisible}>
        <a href={blog.url}>{blog.url}</a>
        <div>
          {likes} likes
          <button type ='button' name='Like' onClick={clickLike}>{'Like'}</button>
        </div>
        <p> Added by {blog.user ? blog.user.username : 'Unknown'} </p>
        <button style={userCanRemove} type="button" onClick={clickRemove}>Remove</button>
      </div>
    </div>
  )}

export default Blog