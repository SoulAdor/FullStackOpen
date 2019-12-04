import React, { useState } from 'react'
import Button from './Button'
import ErrorMessage from './ErrorMessage'
import PropTypes from 'prop-types'
import { useField } from '../hooks/index'

import loginService from '../services/login'

function Login({ updateUser }) {
  const username = useField('text')
  const password = useField('password')
  const [errorMessage, setErrorMessage] = useState(null)
  const notificationTime = 5000

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username: username.value, password:password.value })
      updateUser(user)
    } catch (exception) {
      setErrorMessage('Wrong username or password')
      setTimeout(() => { setErrorMessage(null)}, notificationTime)
    }
  }
  const usernameArgs = { ...username }
  delete usernameArgs.reset
  const passwordArgs = { ...password }
  delete passwordArgs.reset

  return (
    <div className="Login">
      <h1>Log in to application</h1>
      <form onSubmit={handleLogin}>
        <div>
          Username:
          <input { ...usernameArgs } />
        </div>
        <div>
          Password:
          <input  { ...passwordArgs }/>
        </div>
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
