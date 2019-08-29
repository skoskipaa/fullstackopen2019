import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Header = (props) => {
    return (
        <div>
            <h1>{props.text}</h1>
        </div>
    )
}

const Display = ({ good, neutral, bad }) => {
    const total = () => good + neutral + bad
    const average = () => (good - bad) / total()
    const positive = () => good / total() * 100
    return (
        <div>
            <p>Good: {good}</p>
            <p>Neutral: {neutral}</p>
            <p>Bad: {bad}</p>
            <p>All: {total()}</p>
            <p>Average: {average()}</p>
            <p>Positive: {positive()} %</p>
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
            <Display good={good} neutral={neutral} bad={bad} />
        </div>
    )
} 

ReactDOM.render(<App />, document.getElementById('root'))
