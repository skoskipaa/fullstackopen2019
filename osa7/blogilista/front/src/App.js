import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { Container, Menu, Button  } from 'semantic-ui-react'
import blogService from './services/blogService'
import Blogs from './components/Blogs'
import Users from './components/Users'
import LoginForm from './components/LoginForm'
import User from './components/User'
import BlogView from './components/BlogView'
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

  const findUserById = (id) => props.users.find(u => u.id === id)
  const findBlogById = (id) => props.blogs.find(b => b.id === id)

  return (
    <Container>
      <h1>Blogs</h1>

      {props.user === null ?
        <div>
          <LoginForm />
        </div> :
        <div>
          <Router>
            <div>
              <Menu>
                <Menu.Item link>
                  <Link to="/blogs">Blogs</Link>
                </Menu.Item>
                <Menu.Item link>
                  <Link to="/users">Users</Link>
                </Menu.Item>
                <Menu.Item>
                  <p><strong>{props.user.name} </strong> is logged in</p>
                </Menu.Item>
                <Menu.Item>
                  <Button onClick={handleLogout}>logout</Button>
                </Menu.Item>
              </Menu>
              <Route exact path="/" render={() => <Blogs user={props.user} />} />
              <Route exact path="/blogs" render={() => <Blogs user={props.user} />} />
              <Route exact path="/blogs/:id" render={({ match }) =>
                <BlogView blog={findBlogById(match.params.id)} />} />
              <Route exact path="/users" render={() => <Users />} />
              <Route exact path="/users/:id" render={({ match }) =>
                <User user={findUserById(match.params.id)} />} />
            </div>
          </Router>
        </div>
      }
    </Container>
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