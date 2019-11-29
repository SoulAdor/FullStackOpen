import React, { useState } from 'react';
import ValueInput from './ValueInput'
import Button from './Button'
import loginService from '../services/login' 
import blogsService from '../services/blogs'

function Login({setUser}) {
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      // Remember user in local storage
      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      )
      setUser(user)
      blogsService.setToken(user.token)
    } catch (exception) {
      console.log('Wrong credentials')
    }
  }
  
  return (
    <form onSubmit={handleLogin}>
      <ValueInput type ='text' name='Username' value={username} setValue={setUsername}/>
      <ValueInput type ='password' name='Password' value={password} setValue={setPassword}/>
      <Button type ='sumbit' name='Login'/>
    </form>
  );
}

export default Login;
