import loginService from '../services/login'
import blogService from '../services/blogService'

const userReducer = (state = null, action) => {
  switch(action.type) {
  case 'SETUSER':
    return action.data
  default:
    return state
  }
}

export const userLogin = (credentials) => {
  return async dispatch => {
    try {
      const user = await loginService.login(credentials)
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch({
        type: 'SETUSER',
        data: user
      })

    } catch (exception) {
      console.log('ERROR', exception)
      return null
    }
  }
}

export const userLogout = () => {
  window.localStorage.removeItem('loggedUser')
  return dispatch => {
    dispatch({
      type: 'SETUSER',
      data: null
    })
  }
}

export const setUser = (user) => {
  return {
    type: 'SETUSER',
    data: user
  }

}

export default userReducer