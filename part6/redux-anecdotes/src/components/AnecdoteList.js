import React from 'react';
import { connect } from 'react-redux'
import { voteForAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = ( props ) => {
  const vote = (anecdote) => {
    props.voteForAnecdote(anecdote)
    props.setNotification(`You voted '${anecdote.content}'`, 5)
  }

  return (
    <>
      {props.anecdotesToShow.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </>
  )
}

const isShown = (anecdote, filter) => {
  return anecdote.content.toLowerCase().includes(filter)
}

const anecdotesToShow = ({ anecdotes, filter }) => {
  const filteredAnecdotes = anecdotes.filter (anecdote => isShown(anecdote, filter))
  return filteredAnecdotes.sort( (a,b)=> a.votes > b.votes ? -1 : a.votes === b.votes ? 0 : 1 )
}

const mapStateToProps = (state) => {
  return {
    anecdotesToShow: anecdotesToShow(state),
  }
}

export default connect(
  mapStateToProps,
  { voteForAnecdote, setNotification }
)(AnecdoteList)