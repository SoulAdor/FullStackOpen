import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

const usualStyle = {
  color: 'green',
  background: 'lightgrey',
  fontSize: 20,
  borderStyle: 'solid',
  borderRadius: 5,
  padding: 10,
  marginBottom: 10
}

const errorStyle = { ...usualStyle, color: 'red' }

const Notification = ({ message, error }) => {
  if (!message) return null
  const notificationStyle = (error ? errorStyle : usualStyle)
  return (
    <div style={notificationStyle}>
      {message}
    </div>
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