import React, { useState } from 'react';
import ValueInput from './ValueInput'
import Button from './Button'
import loginService from '../services/login' 

function Login({setUser}) {
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      setUser(user)
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
