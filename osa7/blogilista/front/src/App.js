import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import blogService from './services/blogService'
//import loginService from './services/login'
import Blogs from './components/Blogs'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import { useField } from './hooks'
import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs, createBlog } from './reducers/blogReducer'
import { userLogin, userLogout, setUser } from './reducers/userReducer'

const App = (props) => {
  const username = useField('text')
  const password = useField('password')
  //const [user, setUser] = useState(null)

  const [blogFormVisible, setBlogFormVisible] = useState(false)
  const newTitle = useField('text')
  const newAuthor = useField('text')
  const newUrl = useField('text')

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

  const handleLogin = async (event) => {
    event.preventDefault()

    const creds = {
      username: username.value,
      password: password.value
    }

    const tryLogin = await props.userLogin(creds)

    if (tryLogin === null) {
      props.setNotification('Wrong username or password', 5000)
      password.reset()
    } else {
      username.reset()
      password.reset()
    }
  }

  const loginForm = () => (

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
  )

  const blogForm = () => {
    const showOnlyAddButton = { display: blogFormVisible ? 'none' : '' }
    const showBlogForm = { display: blogFormVisible ? '' : 'none' }


    return (
      <div>
        <div style={showOnlyAddButton}>
          <button onClick={() => setBlogFormVisible(true)}>add a blog</button>
        </div>
        <div style={showBlogForm}>
          <BlogForm
            newTitle={newTitle.value}
            newAuthor={newAuthor.value}
            newUrl={newUrl.value}
            handleTitleChange={newTitle.onChange}
            handleAuthorChange={newAuthor.onChange}
            handleUrlChange={newUrl.onChange}
            addBlog={addBlog}
          />
          <button onClick={() => setBlogFormVisible(false)}>hide</button>
        </div>
      </div>

    )
  }

  const addBlog = async (event) => {
    event.preventDefault()

    const blogObject = {
      title: newTitle.value,
      author: newAuthor.value,
      url: newUrl.value
    }

    if (blogObject.title === '' || blogObject.author === ''
        || blogObject.url === '') {
      props.setNotification('Blog creation failed, all fields are required!', 5000)

    } else {
      const response = await props.createBlog(blogObject)
      console.log(response)
      newTitle.reset()
      newAuthor.reset()
      newUrl.reset()
      props.setNotification(`A new blog "${blogObject.title}" was added succesfully!`, 5000)
    }
  }

  return (
    <div>
      <h1>Blogs</h1>

      <Notification />

      {props.user === null ?
        loginForm() :
        <div>
          <p><strong>{props.user.name}</strong> is logged in
            <button onClick={handleLogout}>logout</button></p>
          <div>{blogForm()}</div>
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
  userLogin,
  userLogout,
  setUser
})(App)
