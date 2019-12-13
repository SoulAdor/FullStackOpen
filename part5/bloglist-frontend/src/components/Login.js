import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { updateNotification } from '../reducers/notificationReducer'
import { logInUser } from '../reducers/userReducer'
import { Form, Button } from 'react-bootstrap'

const Login = ({ logInUser, updateNotification }) => {
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      await logInUser ({ username: event.target.username.value, password: event.target.password.value })
    } catch (exception) {
      updateNotification('Wrong username or password', true, 5)
    }
  }

  return (
    <div className="Login">
      <h1>Log in to application</h1>
      <Form onSubmit={handleLogin}>
        <Form.Group>
          <Form.Label> Username: </Form.Label>
          <Form.Control id='username' type="text" name="username" placeholder="Enter username"/>
        </Form.Group>
        <Form.Group>
          <Form.Label> Password: </Form.Label>
          <Form.Control id='password' type="password" name="password" placeholder="Enter password"/>
        </Form.Group>
        <Form.Group>
          <Button variant="primary" type ='sumbit'> Login </Button>
        </Form.Group>
      </Form>
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
