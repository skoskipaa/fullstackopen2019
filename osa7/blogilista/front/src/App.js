import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import blogService from './services/blogService'
import Blogs from './components/Blogs'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import NewBlogForm from './components/NewBlogForm'
import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs, createBlog } from './reducers/blogReducer'
import { userLogout, setUser } from './reducers/userReducer'

const App = (props) => {

  useEffect(() => {
    props.initializeBlogs()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON != null) {
      const user = JSON.parse(loggedUserJSON)
      props.setUser(user)
      blogService.setToken(user.token)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleLogout = async () => {
    props.userLogout()
  }

  return (
    <div>
      <h1>Blogs</h1>
      <Notification />

      {props.user === null ?
        <LoginForm /> :
        <div>
          <p>
            <strong>{props.user.name}</strong> is logged in
            <button onClick={handleLogout}>logout</button>
          </p>
          <NewBlogForm />
          <Blogs user={props.user} />
        </div>
      }
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps, {
  initializeBlogs,
  setNotification,
  createBlog,
  userLogout,
  setUser
})(App)
