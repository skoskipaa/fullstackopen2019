import React, { useState } from 'react'
import { setNotification } from '../reducers/notificationReducer'
import { initializeUsers } from '../reducers/usersReducer'
import { createBlog } from '../reducers/blogReducer'
import { useField } from '../hooks'
import { connect } from 'react-redux'

const NewBlogForm = (props) => {
  const [blogFormVisible, setBlogFormVisible] = useState(false)
  const newTitle = useField('text')
  const newAuthor = useField('text')
  const newUrl = useField('text')

  const showOnlyAddButton = { display: blogFormVisible ? 'none' : '' }
  const showBlogForm = { display: blogFormVisible ? '' : 'none' }

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
      await props.createBlog(blogObject)
      await props.initializeUsers()
      newTitle.reset()
      newAuthor.reset()
      newUrl.reset()
      props.setNotification(`A new blog "${blogObject.title}" was added succesfully!`, 5000)
    }
  }

  return (
    <div>
      <div style={showOnlyAddButton}>
        <button onClick={() => setBlogFormVisible(true)}>add a blog</button>
      </div>
      <div style={showBlogForm}>
        <form onSubmit={addBlog}>
          <h4>Add a new blog</h4>
          <div>Title
            <input {...newTitle.noReset} />
          </div>
          <div>Author
            <input {...newAuthor.noReset} />
          </div>
          <div>Url
            <input {...newUrl.noReset} />
          </div>
          <button type="submit">Add</button>
        </form>
        <button onClick={() => setBlogFormVisible(false)}>hide</button>
      </div>
    </div>

  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    notification: state.notification
  }
}

const mapDispatchToProps = {
  setNotification, createBlog, initializeUsers
}

export default connect(mapStateToProps, mapDispatchToProps)(NewBlogForm)