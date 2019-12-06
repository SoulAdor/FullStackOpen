const filterAtStart = ''

export const changeFilter = (filter) => {
  return {
    type: 'UPDATE_FILTER',
    data: {
      filter
    }
  }
}

const reducer = (state = filterAtStart, action) => {
  switch (action.type) {
    case 'UPDATE_FILTER':
      return action.data.filter
    case 'REMOVE_FILTER':
      return filterAtStart
    default:
      return state
  }
}

export default reducer