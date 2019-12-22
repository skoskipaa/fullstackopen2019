import React from 'react'
import { addVote } from '../reducers/anecdoteReducer'
import { setNotification, clearNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
    const store = props.store
    const anecdotes = store.getState().anecdotes
    let filter = store.getState().filter.data

    if (filter === undefined) {
        filter = ''
    }
    
    const filteredList = anecdotes.filter(an => {
        //console.log(an.content)
        return an.content.toLowerCase().includes(filter.toLowerCase())
    })


    const vote = (id) => {
        store.dispatch(addVote(id))
        const anecdote = anecdotes.find(an => an.id === id)
        store.dispatch(setNotification(
            `You voted '${anecdote.content}'`))
        setTimeout(() => store.dispatch(clearNotification()), 5000)
      }

    return (
        <div>
        {filteredList.map(anecdote =>
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

export default AnecdoteList