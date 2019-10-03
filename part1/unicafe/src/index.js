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

const Statistic = ({name, value}) => (
    <tr>
        <td>{name}</td>
        <td>{value}</td>
    </tr>
)

const StatisticsInfo = ({statistic}) => {
    if (statistic.total !== 0) return (
        <table> 
            <tbody>
                <Statistic name={'good'}        value={statistic.good} />
                <Statistic name={'neutral'}     value={statistic.neutral} />
                <Statistic name={'bad'}         value={statistic.bad} />
                <Statistic name={'total'}       value={statistic.total} />
                <Statistic name={'average'}     value={statistic.average} />
                <Statistic name={'positive'}    value={[statistic.positive, ' %']} />
            </tbody>
        </table>
    )
    else return (
        <div>
            No feedback given
        </div>
    )
}

const Statistics = ({statistic}) => {
    return (
        <div>
            <Header name={'statistics'} />
            <StatisticsInfo statistic={statistic} />
        </div>
    )
}

const App = () => {
    const [statistic, setStatistic] = useState({
        good: 0, neutral: 0, bad: 0, total: 0, average: 0, positive: 0
    })

    const updateStatistic = (good, neutral, bad) => {
        const total = good + neutral + bad
        const newStatistic = { 
            good: good, 
            neutral: neutral,
            bad: bad,
            total: total,
            average: (good - bad) / total,
            positive: 100 * good / total
        }
        setStatistic (newStatistic)
    }

    const onClickGood = () => {
        updateStatistic (statistic.good + 1, statistic.neutral, statistic.bad)
    } 

    const onClickNeutral = () => {
        updateStatistic (statistic.good, statistic.neutral + 1, statistic.bad)
    }

    const onClickBad = () => {
        updateStatistic (statistic.good, statistic.neutral, statistic.bad + 1)
    }

    return (
    <div>
        <Header name={'give feedback'} />
        <Button onClick={onClickGood}       name={'good'} />
        <Button onClick={onClickNeutral}    name={'neutral'} />
        <Button onClick={onClickBad}        name={'bad'} />
        <Statistics statistic={statistic} />
    </div>
    )
}

ReactDOM.render(<App />, 
    document.getElementById('root')
)