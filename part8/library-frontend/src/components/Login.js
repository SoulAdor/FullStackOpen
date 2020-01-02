import React, { useState } from 'react'

const Login = ({show, login}) => { 
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const submit = async (e) => {
    e.preventDefault()

    const result = await login({
      variables: { username, password }
    })

    if (result) {
      const token = result.data.login.value
      localStorage.setItem('books-user-token', token)
      window.location.reload(false)
    }
  }

  if (!show) return null
  return (
    <div>
      <form onSubmit={submit}>
        <div>
          Name: 
          <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          Password: 
          <input
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type='submit'>Login</button>
      </form>
    </div>
  )
}

export default Login