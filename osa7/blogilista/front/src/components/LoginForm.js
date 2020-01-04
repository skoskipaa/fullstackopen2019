import React from 'react'
import Notification from './Notification'
import { setNotification } from '../reducers/notificationReducer'
import { userLogin } from '../reducers/userReducer'
import { useField } from '../hooks'
import { connect } from 'react-redux'
import { Form } from 'semantic-ui-react'

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

  }

  return (
    <div>
      <h1>Log in to use BlogFinder 2020</h1>
      <Notification />
      <Form onSubmit={handleLogin} className="loginForm">
        <Form.Field>
          <label>Username</label>
          <input id='username' {...username.noReset}/>
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <input id='password' {...password.noReset}/>
        </Form.Field>
        <Form.Button primary type="submit">login</Form.Button>
      </Form>
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
  userLogin, setNotification
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)