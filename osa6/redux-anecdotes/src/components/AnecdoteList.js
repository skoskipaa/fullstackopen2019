import React from 'react'
import { connect } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { setNotification, clearNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
    
    const vote = (id) => {
        props.addVote(id)
        const anecdote = props.filteredAnecdotes.find(an => an.id === id)
        props.setNotification(
            `You voted '${anecdote.content}'`)
        setTimeout(() => props.clearNotification(), 5000)
      }

    return (
        <div>
        {props.filteredAnecdotes.map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
          </div>
        )}
      </div>
    )
}

const filteredList = ({ anecdotes, filter }) => {
   
    return anecdotes.filter(an => an.content.toLowerCase().includes(filter.toLowerCase()))
}

const mapStateToProps = (state) => {
    console.log(state)
    return {
        //anecdotes: state.anecdotes,
        //filter: state.filter
        filteredAnecdotes: filteredList(state)
    }
}

const mapDispatchToProps = {
        addVote: addVote,
        setNotification: setNotification,
        clearNotification: clearNotification
}

const ConnectedList = connect(
    mapStateToProps,
    mapDispatchToProps)(AnecdoteList)

export default ConnectedList