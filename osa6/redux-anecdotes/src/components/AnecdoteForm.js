import React from 'react'
import { createAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = (props) => {
    const addAnecdote = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        props.store.dispatch(createAnecdote(content))
        event.target.anecdote.value = ''
      }

      return (
          <form onSubmit={addAnecdote}>
              <input name="anecdote" />
              <button type="submit">Add</button>
          </form>
      )
}

export default AnecdoteForm