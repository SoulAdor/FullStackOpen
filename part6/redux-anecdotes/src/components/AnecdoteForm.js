import React from 'react';
import { connect } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = ( props ) => {
  const createClick = async (event) => {
    event.preventDefault()
    const anecdoteContent = event.target.anecdote.value
    event.target.anecdote.value = ''
    props.addAnecdote(anecdoteContent)
    props.setNotification(`Created '${anecdoteContent}'`, 5)
  }

  return (
    <>
      <h2>Create new</h2>
      <form onSubmit={createClick}>
        <div><input name="anecdote"/></div>
        <button type="submit">create</button>
      </form>
    </>
  )
}

export default connect(
  null,
  { addAnecdote, setNotification }
)(AnecdoteForm)