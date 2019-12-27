import anecdoteService from '../services/anecdotes'

const reducer = (state = [], action) => {
  //console.log('state now: ', state)
  //console.log('action', action)
  switch(action.type) {
    case 'VOTE':
      const anecdoteToVote = state.find(an => an.id === action.data.id)
      //console.log(anecdoteToVote)
      return state
      .map(anecd => anecd.id !== anecdoteToVote.id
        ? anecd
        : {...anecdoteToVote, votes: action.data.votes})
       // .sort((a, b) => b.votes - a.votes)
    
    case 'NEW_NOTE':
      return [...state, action.data]

    case 'INIT_ANECDOTES':
      return action.data
      
    default:
      return state
  }
  
}
/*
export const initializeAnecdotes = (anecdotes) => {
  return {
    type: 'INIT_ANECDOTES',
    data: anecdotes
  }
}
*/

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}
/*
export const addVote = (id) => {
  return {
    type: 'VOTE',
    data: {
      id: id
    }
  }
}
*/

export const addVote = (id, anecdote) => {
  return async dispatch => {
    const changedContent = {
      content: anecdote.content,
      id: anecdote.id,
      votes: anecdote.votes + 1
    }
   // console.log('NEW VOTE:', changedContent)
    await anecdoteService.update(id, changedContent)
    dispatch({
      type: 'VOTE',
      data: changedContent
    })
  }
}

/*
export const createAnecdote = (data) => {
  return {
    type: 'NEW_NOTE',
    data,
  }
}
*/

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_NOTE',
      data: newAnecdote
    })
  }
}

export default reducer