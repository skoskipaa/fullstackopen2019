import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import blogService from './services/blogService'
import Blogs from './components/Blogs'
import Users from './components/Users'
import LoginForm from './components/LoginForm'
import User from './components/User'
import { initializeBlogs } from './reducers/blogReducer'
import { userLogout, setUser } from './reducers/userReducer'
import { initializeUsers } from './reducers/usersReducer'

const App = (props) => {

  useEffect(() => {
    props.initializeUsers()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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

  console.log(props.users)

  const findUserById = (id) => props.users.find(u => u.id === id)



  return (
    <div>
      <h1>Blogs</h1>

      {props.user === null ?
        <div>
          <LoginForm />
        </div> :
        <div>
          <Router>
            <div>
              <Link to="/blogs">Blogs</Link>
              <Link to="/users">Users</Link>
            </div>
            <p>
              <strong>{props.user.name}</strong> is logged in
              <button onClick={handleLogout}>logout</button>
            </p>
            <Route exact path="/" render={() => <Blogs user={props.user} />} />
            <Route path="/blogs" render={() => <Blogs user={props.user} />} />
            <Route exact path="/users" render={() => <Users />} />
            <Route exact path="/users/:id" render={({ match }) =>
              <User user={findUserById(match.params.id)} />} />
          </Router>
        </div>
      }
    </div>
  )
}

const mapStateToProps = (state) => {

  return {
    user: state.user,
    users: state.users,
    blogs: state.blogs
  }
}

export default connect(mapStateToProps, {
  initializeBlogs,
  initializeUsers,
  userLogout,
  setUser
})(App)

/*
 <Route exact path="/users/:id" render={({ match }) =>
              <User user={findUserById(match.params.id)} />} />
*/