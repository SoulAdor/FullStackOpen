const notificationAtStart = {
  message : null,
  error: false
}

export const updateNotification = (message, error, timeInSeconds) => {
  return async dispatch => {
    dispatch({
      type: 'UPDATE_NOTIFICATION',
      data: {
        message,
        error
      }
    })
    setTimeout(() => dispatch(removeNotification()), 1000*timeInSeconds)
  }
}

export const removeNotification = () => {
  return {
    type: 'DELETE_NOTIFICATION'
  }
}

const reducer = (state = notificationAtStart, action) => {
  switch (action.type) {
  case 'UPDATE_NOTIFICATION':
    return action.data
  case 'DELETE_NOTIFICATION':
    return notificationAtStart
  default:
    return state
  }
}

export default reducer