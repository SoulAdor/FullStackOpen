const notificationAtStart = ''

export const setNotification = (notification, timeInSeconds) => {
  return async dispatch => {
    dispatch({  
      type: 'UPDATE_NOTIFICATION',
      notification
    })
    await setTimeout(() => dispatch({ type: 'REMOVE_NOTIFICATION' }), 1000*timeInSeconds);
  }
}

const reducer = (state = notificationAtStart, action) => {
  switch (action.type) {
    case 'UPDATE_NOTIFICATION':
      return action.notification
    case 'REMOVE_NOTIFICATION':
      return notificationAtStart
    default:
      return state
  }
}

export default reducer