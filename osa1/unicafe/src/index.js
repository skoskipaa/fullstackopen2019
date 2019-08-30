import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Header = (props) => {
    return (
        <div>
            <h1>{props.text}</h1>
        </div>
    )
}

const Statistic = ({ text, value }) => {
    return (
        <tbody>
            <tr>
                <td>{text}</td>
                <td>{value}</td>
            </tr>
        </tbody>
    )
}

const Statistics = ({ good, neutral, bad }) => {
    const total = () => good + neutral + bad

    if (total() === 0) {
        return (
            <div>
                <p>No feedback given yet</p>
            </div>
        )
    }

    const average = () => (good - bad) / total()
    const positive = () => good / total() * 100

    return (
        <div>
            <table>
            <Statistic text='Good' value={good} />
            <Statistic text='Neutral' value={neutral} />
            <Statistic text='Bad' value={bad} />
            <Statistic text='All' value={total()} />
            <Statistic text='Average' value={average()} />
            <Statistic text='Positive' value={positive() + ' %'} />
            </table>
        </div>
    )
}

const Button = ({ onClick, text }) => (
    <button onClick={onClick}>
        {text}
    </button>
)

const App = (props) => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const addGood = (value) => setGood(value)
    const addNeutral = (value) => setNeutral(value)
    const addBad = (value) => setBad(value)

    return (
        <div>
            <Header text='Give feedback' />
            <Button onClick={() => addGood(good + 1)} text='Good' />
            <Button onClick={() => addNeutral(neutral + 1)} text='Neutral' />
            <Button onClick={() => addBad(bad + 1)} text='Bad' />
            <Header text='Statistics:' />
            <Statistics good={good} neutral={neutral} bad={bad} />
        </div>
    )
} 

ReactDOM.render(<App />, document.getElementById('root'))
