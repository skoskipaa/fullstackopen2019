import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Button = ({ onClick, text }) => (
    <button onClick={onClick}>{text}</button>
)

const App = (props) => {
    const [selected, setSelected] = useState(0)
    const raffle = (value) => setSelected(value)

    const [values, setPoints] = useState(props.points)

    const updatePoints = (selected) => {

        const copy = [...values]
        copy[selected] += 1
        setPoints(copy)

    }

    return (
        <div>
            <p>{props.anecdotes[selected]}</p>
            <p>{values[selected]} votes!</p>
            <Button onClick={() => updatePoints(selected)} text='Vote!' />
            <Button onClick={() => raffle(Math.floor(Math.random() * anecdotes.length))} text='Random anecdote!' />
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

const points = new Array(anecdotes.length).fill(0)

ReactDOM.render(<App anecdotes={anecdotes} points={points} />, document.getElementById('root'));