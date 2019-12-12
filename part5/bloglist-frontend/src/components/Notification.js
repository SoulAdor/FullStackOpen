import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Alert } from 'react-bootstrap'

const Notification = ({ message, error }) => {
  return !message ? null : (
    <Alert variant={error ? 'danger' : 'success' }>
      {message}
    </Alert>
  )
}

Notification.propTypes = {
  message: PropTypes.string,
  error: PropTypes.bool
}

const mapStateToProps = (state) => {
  return {
    message: state.notification.message,
    error: state.notification.error
  }
}

export default connect(
  mapStateToProps
) (Notification)