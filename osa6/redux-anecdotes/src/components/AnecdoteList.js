import React from 'react'
import { connect } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
    
    const vote = (id) => {
        const anecdote = props.filteredAnecdotes.find(an => an.id === id)
        props.addVote(id, anecdote)
        props.setNotification(
            `You voted '${anecdote.content}'`, 1500)
      }

    return (
        <div>
        {props.filteredAnecdotes.map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes} votes
              <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
          </div>
        )}
      </div>
    )
}

const filteredList = ({ anecdotes, filter }) => {
   // console.log('Filter this: ', anecdotes) // Array
   
    return anecdotes.filter(an => an.content.toLowerCase().includes(filter.toLowerCase()))
        .sort((a, b) => b.votes - a.votes)
}

const mapStateToProps = (state) => {
   // console.log(state) // Object
    return {
        //anecdotes: state.anecdotes,
        //filter: state.filter
        filteredAnecdotes: filteredList(state)
    }
}

const mapDispatchToProps = {
        addVote: addVote,
        setNotification: setNotification,
       
}

const ConnectedList = connect(
    mapStateToProps,
    mapDispatchToProps)(AnecdoteList)

export default ConnectedList