import React, { useState, useEffect } from 'react';
import Login from './Login'; 
import Blog from './Blog'
import BlogAdder from './BlogAdder'

import blogsService from '../services/blogs'

function App() { 
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    blogsService.getAll().then(allBlogs => setBlogs(allBlogs))
  }, []);

  // If we had user stored in local storage at the start, take him
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogsService.setToken(user.token)
    }
  }, [])

  // Set user to null and remove local storage
  const logOut = () =>
  {
    setUser(null)
    window.localStorage.removeItem('loggedBlogappUser')
  }

  if (user === null) {
    return (
      <div>
        <h1>Log in to application</h1>
        <Login setUser={setUser}/>
      </div>
    )
  }
  return (
    <div>
      <h1>Blogs</h1>
      <p>{`${user.name} logged in`}</p>
      <button type="button" onClick={logOut}>Log out</button>
      <BlogAdder blogs={blogs} setBlogs={setBlogs}/>
      {blogs.map (blog => <Blog key={blog.id} blog={blog}/>)}
    </div>
    )
}

export default App;
