import React, { useState } from 'react';
import ValueInput from './ValueInput'
import Button from './Button'
import blogService from '../services/blogs'

function BlogAdder({blogs, setBlogs}) {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleCreate = async (event) => {
    event.preventDefault()
    try {
      const result = await blogService.create({title, author, url})
      setBlogs (blogs.concat(result))
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
        <Button type ='sumbit' name='Create'/>
      </form>
    </>
  );
}

export default BlogAdder;
