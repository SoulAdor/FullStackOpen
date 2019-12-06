import anecdoteService from '../services/anecdotes'

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
}

export const addAnecdote = (anecdoteContent) => {
  return async dispatch => {
    const anecdote = await anecdoteService.createNew(anecdoteContent)
    dispatch({  
      type: 'NEW_ANECDOTE',
      anecdote
    })
  }
}

export const voteForAnecdote = (anecdote) => {
  return async dispatch => {
    const changedAnecdote = {
      ...anecdote,
      votes: anecdote.votes + 1
    }
    const result = await anecdoteService.update(changedAnecdote)
    dispatch({
      type: 'UPDATE_ANECDOTES',
      data: result
    })
  }
}

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_ANECDOTES':
      return action.data
    case 'UPDATE_ANECDOTES':
      const updatedAnecdote = action.data
      return state.map(anecdote => 
        anecdote.id !== updatedAnecdote.id ? anecdote : updatedAnecdote
      )
    case 'NEW_ANECDOTE':
      return [...state, action.anecdote]
    default:
      return state
  }
}

export default reducer