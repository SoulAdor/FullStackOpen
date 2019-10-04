import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = ({name}) => (
    <h1>
        {name}
    </h1>
)

const Button = ({name, onClick}) => (
    <button onClick={onClick}>{name}</button>
)

const Anecdote = ({anecdotes, id}) => (
    <div>
        {anecdotes[id]}
    </div>
)

const VoteText = ({votes}) => (
    <div>
        {'has ' + votes + ' vote' + (votes > 1 ? 's' : '')}
    </div>
)

const App = (props) => {
    const [selected, setSelected] = useState(0)
    const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))
    const [maximumIndex, setMaximumIndex] = useState(0)

    const getRandomNumber = (size) => (Math.floor(Math.random() * size) + 1)
    
    const randomAnecdote = () => {
        const nextAnecdoteId = (getRandomNumber(anecdotes.length)) - 1
        setSelected (nextAnecdoteId) 
    } 
    
    const vote = () => {
        const copy_votes = {...votes}
        copy_votes[selected]++;
        if (copy_votes[selected] > copy_votes[maximumIndex]) setMaximumIndex(selected)
        setVotes(copy_votes)
    }

    return (
        <div>
            <Header name={'Anecdote of the day'} />
            <Anecdote anecdotes={anecdotes} id={selected} />
            <VoteText votes={votes[selected]} id={selected} />
            <Button onClick={vote}  name={'vote'} />
            <Button onClick={randomAnecdote}  name={'next anecdote'} />
            <Header name={'Anecdote with most votes'} />
            <Anecdote anecdotes={anecdotes} id={maximumIndex} />
        </div>
    )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
    <App anecdotes={anecdotes}/>,
    document.getElementById('root')
)