import React, { useState, useEffect } from 'react';
import Login from './Login'; 
import Blog from './Blog'

import blogsService from '../services/blogs'

function App() { 
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    blogsService.getAll().then(allBlogs => setBlogs(allBlogs))
  }, []);

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
      {blogs.map (blog => <Blog key={blog.id} blog={blog}/>)}
    </div>
    )
}

export default App;
