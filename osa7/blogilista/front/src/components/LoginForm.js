import React from 'react'
import Notification from './Notification'
import { setNotification } from '../reducers/notificationReducer'
import { userLogin, userLogout, setUser } from '../reducers/userReducer'
import { useField } from '../hooks'
import { connect } from 'react-redux'

const LoginForm = (props) => {
  const username = useField('text')
  const password = useField('password')

  const handleLogin = async (event) => {
    event.preventDefault()

    const creds = {
      username: username.value,
      password: password.value
    }

    const tryLogin = await props.userLogin(creds)
    if (tryLogin === null) {
      username.reset()
      password.reset()
      props.setNotification('Wrong username or password', 5000)
    }
    console.log(props)

  }

  return (
    <div>
      <Notification />
      <form onSubmit={handleLogin} className="loginForm">
        <div>
          username
          <input {...username.noReset}/>
        </div>
        <div>
          password
          <input {...password.noReset}/>
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification,
    user: state.user
  }
}

const mapDispatchToProps = {
  userLogin, userLogout, setNotification, setUser
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)