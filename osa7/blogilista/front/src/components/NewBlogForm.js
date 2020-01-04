import React, { useState } from 'react'
import { setNotification } from '../reducers/notificationReducer'
import { initializeUsers } from '../reducers/usersReducer'
import { createBlog } from '../reducers/blogReducer'
import { useField } from '../hooks'
import { connect } from 'react-redux'
import { Button } from 'semantic-ui-react'

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
        <Button onClick={() => setBlogFormVisible(true)}>Add a blog</Button>
      </div>
      <div style={showBlogForm}>
        <form className="ui form" onSubmit={addBlog}>
          <h4>Add a new blog</h4>
          <div className="field">
            <label>Title</label>
            <input id="title" {...newTitle.noReset} />
          </div>
          <div className="field">
            <label>Author</label>
            <input id="author" {...newAuthor.noReset} />
          </div>
          <div className="field">
            <label>Url</label>
            <input id="url" {...newUrl.noReset} />
          </div>
          <Button id="submit" primary type="submit">Add</Button>
        </form>
        <br/>
        <Button onClick={() => setBlogFormVisible(false)}>Hide this form</Button>

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