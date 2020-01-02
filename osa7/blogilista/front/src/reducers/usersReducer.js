import userService from '../services/users'

const usersReducer = (state = [], action) => {
  switch(action.type) {
  case 'INIT_USERS':
    return action.data
  case 'DELETE_FROM_USER':
    return state
  default:
    return state
  }
}

export const initializeUsers = () => {
  return async dispatch => {
    const users = await userService.getAll()
    dispatch({
      type: 'INIT_USERS',
      data: users
    })
  }
}


export default usersReducer