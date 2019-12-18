import React, { useState, useEffect } from 'react'
import blogService from './services/blogService'
import loginService from './services/login'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [blogFormVisible, setBlogFormVisible] = useState(false)

  // Refaktoroitavaa blogformiin... ?
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  /*
  useEffect(() => {
    blogService.getAll().then(initialBlogs => {
      setBlogs(initialBlogs)
    })
  }, []) */

  useEffect(() => {
   blogService.getAll().then(initialBlogs => {
     initialBlogs.sort((a, b) => {
       return b.likes - a.likes
     })
     setBlogs(initialBlogs)
   })
}, []) 


  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user =JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
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
  
  const blogForm = () => {
    const hideWhenVisible = { display: blogFormVisible ? 'none' : '' }
    const showWhenVisible = { display: blogFormVisible ? '' : 'none' }


    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setBlogFormVisible(true)}>add a blog</button>
        </div>
        <div style={showWhenVisible}>
          <BlogForm
            newTitle={newTitle}
            newAuthor={newAuthor}
            newUrl={newUrl}
            handleTitleChange={({ target }) => setNewTitle(target.value)}
            handleAuthorChange={({ target}) => setNewAuthor(target.value)}
            handleUrlChange={({ target }) => setNewUrl(target.value)}
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
      title: newTitle,
      author: newAuthor,
      url: newUrl
    }

    try {
      const response = await blogService.create(blogObject)
      console.log(response)
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
  
  const deleteBlog = async (blog) => {
    if (window.confirm(`remove blog ${blog.title}?`)) {
    try {
      const response = await blogService.deleteBlog(blog)
      console.log(response)
      setBlogs(blogs.filter(b => b.id !== blog.id))
    } catch (exception) {
      console.log('FAIL')
    }
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
        addLike={() => addLike(blog)}
        deleteBlog={() => deleteBlog(blog)}
        loggedUser={user}
        />
        )


  const addLike = async (blog) => {
      
    const updatedBlog = {
      id: blog.id,
      user: blog.user,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url
      }
      
      try {
        const response = await blogService.update(updatedBlog)
        setBlogs(blogs.map(b => b.id !== updatedBlog.id ? b : updatedBlog) )
      } catch (exception) {
        console.log('FAIL')
          }
      
        }

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
