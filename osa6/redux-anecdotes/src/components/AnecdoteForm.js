import React from 'react'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, clearNotification } from '../reducers/notificationReducer'


const AnecdoteForm = (props) => {
    const addAnecdote = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        props.store.dispatch(createAnecdote(content))
        props.store.dispatch(setNotification(
            `A new anecdotde '${content}' was added`
        ))

        event.target.anecdote.value = ''
        setTimeout(() => props.store.dispatch(clearNotification()), 5000)
      }

      return (
          <form onSubmit={addAnecdote}>
              <input name="anecdote" />
              <button type="submit">Add</button>
          </form>
      )
}

export default AnecdoteForm