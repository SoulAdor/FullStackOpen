import React from 'react'
import PropTypes from 'prop-types'
import { useField } from '../hooks/index'
import { connect } from 'react-redux'
import { updateNotification } from '../reducers/notificationReducer'
import { logInUser } from '../reducers/userReducer'

const Login = ({ logInUser, updateNotification }) => {
  const username = useField('text')
  const password = useField('password')

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      await logInUser({ username: username.value, password: password.value })
    } catch (exception) {
      console.log(exception)
      updateNotification('Wrong username or password', true, 5)
    }
  }

  return (
    <div className="Login">
      <h1>Log in to application</h1>
      <form onSubmit={handleLogin}>
        <div>
          Username:
          <input { ...username} reset={undefined} />
        </div>
        <div>
          Password:
          <input  { ...password} reset={undefined} />
        </div>
        <button type ='sumbit'> Login </button>
      </form>
    </div>
  )
}

Login.propTypes = {
  logInUser: PropTypes.func.isRequired,
  updateNotification: PropTypes.func.isRequired
}

const mapDispatchToProps = {
  updateNotification,
  logInUser
}

export default connect(
  null,
  mapDispatchToProps
)(Login)
