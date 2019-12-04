import React, { useState } from 'react'
import ValueInput from './ValueInput'
import Button from './Button'
import ErrorMessage from './ErrorMessage'
import PropTypes from 'prop-types'

import loginService from '../services/login'

function Login({ updateUser }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const notificationTime = 5000

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      updateUser(user)
    } catch (exception) {
      setErrorMessage('Wrong username or password')
      setTimeout(() => { setErrorMessage(null)}, notificationTime)
    }
  }

  return (
    <div className="Login">
      <h1>Log in to application</h1>
      <form onSubmit={handleLogin}>
        <ValueInput type ='text' name='Username' value={username} setValue={setUsername}/>
        <ValueInput type ='password' name='Password' value={password} setValue={setPassword}/>
        <Button type ='sumbit' name='Login'/>
      </form>
      <ErrorMessage message={errorMessage}/>
    </div>
  )
}

Login.propTypes = {
  updateUser: PropTypes.func.isRequired
}

export default Login
