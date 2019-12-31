import React, { useState } from 'react'

const Login = ({show, login, setToken}) => { 
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const submit = async (e) => {
    e.preventDefault()

    const result = await login({
      variables: { username, password }
    })

    if (result) {
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem('books-user-token', token)
    }
    
    setUsername('')
    setPassword('')
  }

  if (!show) return null
  return (
    <div>
       <form onSubmit={submit}>
        <div>
          name: 
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