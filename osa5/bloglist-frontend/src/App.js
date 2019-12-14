import React, { useState, useEffect } from 'react'
import blogService from './services/blogService'
import loginService from './services/login'
import Blog from './components/Blog'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  // Refaktoroitavaa ...
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  useEffect(() => {
    blogService.getAll().then(initialBlogs => {
      setBlogs(initialBlogs)
    })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user =JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  const handleLogout = async (event) => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const loginForm = () => (
    
      <form onSubmit={handleLogin}>
        <div>
          username
          <input type="text" value={username} name="Username" 
          onChange={({ target }) => setUsername(target.value)}/>
        </div>
        <div>
          password
          <input type="password" value={password} name="Password"
          onChange={({ target }) => setPassword(target.value)}/>
        </div>
        <button type="submit">login</button>
      </form>
  )
  
  // refaktoroitavaa
  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setNewUrl(event.target.value)
  }
  const blogForm = () => (

    <form onSubmit={addBlog}>
      <div>title
        <input type="text" value={newTitle} name="Title"
        onChange={handleTitleChange} />
      </div>
      <div>author
      <input type="text" value={newAuthor} name="Author"
      onChange={handleAuthorChange} />
      </div>
      <div>url 
      <input type="text" value={newUrl} name="Url"
      onChange={handleUrlChange} />
      </div>
      <button type="submit">Add</button>
    </form>

  )

  const addBlog = async (event) => {
    event.preventDefault()

    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl
    }

    try {
      const response = await blogService.create(blogObject)
      setBlogs(blogs.concat(response))
      setNewTitle('')
      setNewAuthor('')
      setNewUrl('')

      setErrorMessage(`A new blog "${newTitle}" was added succesfully!` )
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)

    } catch (exception) {
      setErrorMessage('Blog creation failed')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const Notification = ({ message }) => {
    if (message === null) {
      return null
    } 
      return (
      <div>
        {message}
      </div> 
      )
    
  }

  const rows = () => blogs.map(blog =>
    <Blog
        key={blog.id}
        blog={blog}
        />
        )

  return (
    <div>
      <h1>Blogs</h1>

      <Notification message={errorMessage} />

      {user === null ?
        loginForm() :
        <div>
          <p><strong>{user.name}</strong> is logged in 
          <button onClick={handleLogout}>logout</button></p>
          <div>{blogForm()}</div>
        {rows()}
        </div>
        }
    </div>
  )
}

export default App;
