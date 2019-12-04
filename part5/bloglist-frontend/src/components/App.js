import React, { useState, useEffect } from 'react'
import Login from './Login'
import Blog from './Blog'
import BlogAdder from './BlogAdder'
import Togglable from './Togglable'

import blogsService from '../services/blogs'

function App() {
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])

  const updateUser = user => {
    if (user)
    {
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogsService.setToken(user.token)
    }
    else window.localStorage.removeItem('loggedBlogappUser')
    setUser(user)
  }

  // If we had user stored in local storage at the start, take user
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      updateUser(user)
    }
    blogsService.getAll().then(allBlogs => setBlogs(allBlogs))
  }, [])

  // Keep sorted copy of blogs
  var sortedBlogs = [].concat(blogs).sort((a, b) => (a.likes > b.likes) ? -1 : 1)

  // Set user to null and remove local storage
  const logOut = () => updateUser(null)

  if (user === null) {
    return (
      <Login updateUser={updateUser}/>
    )
  }

  return (
    <div className="Blogs">
      <h1>Blogs</h1>
      <p>{`${user.name} logged in`}</p>
      <button type="button" onClick={logOut}>Log out</button>
      <Togglable buttonLabel="New blog">
        <BlogAdder blogs={blogs} setBlogs={setBlogs}/>
      </Togglable>
      {sortedBlogs.map (blog => <Blog key={blog.id} user={user} blog={blog} blogs={blogs} setBlogs={setBlogs}/>)}
    </div>
  )
}

export default App
