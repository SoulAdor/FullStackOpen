import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = ({name}) => (
    <h1>
        {name}
    </h1>
)

const Statistic = ({name, value}) => (
    <div>
        {name} {value}
    </div>
)

const Statistics = (props) => (
    <div>
       
    </div>
)

const App = () => {
    // save clicks of each button to own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const setToValue = (setter, value) => () => {
        setter(value + 1)
    }

    return (
    <div>

        <Header name={'give feedback'} />

        <button onClick={setToValue(setGood, good)}>good</button>
        <button onClick={setToValue(setNeutral, neutral)}>neutral</button>
        <button onClick={setToValue(setBad, bad)}>bad</button>

        <Header name={'statistics'} />

        <Statistic name={'good'} value={good} />
        <Statistic name={'neutral'} value={neutral} />
        <Statistic name={'bad'} value={bad} />

    </div>
    )
}

ReactDOM.render(<App />, 
    document.getElementById('root')
)