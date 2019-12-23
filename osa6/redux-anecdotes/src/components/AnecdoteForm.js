import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, clearNotification } from '../reducers/notificationReducer'



const AnecdoteForm = (props) => {
    const addAnecdote = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        props.createAnecdote(content)
        props.setNotification(
            `A new anecdote '${content}' was added`
        )

        event.target.anecdote.value = ''
        setTimeout(() => props.clearNotification(), 5000)
      }

      return (
          <form onSubmit={addAnecdote}>
              <input name="anecdote" />
              <button type="submit">Add</button>
          </form>
      )
}

/*
const mapStateToProps = (state) => {
    return {
        anecdotes: state.anecdotes,
        filter: stat.filter
    }
}
*/

const mapDispatchToProps = {

    createAnecdote: createAnecdote,
    setNotification: setNotification,
    clearNotification: clearNotification
}

export default connect(null, mapDispatchToProps)(AnecdoteForm)