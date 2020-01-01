import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, addLike, deleteBlog, loggedUser }) => {
  const [urlVisible, setUrlVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const hideUrl = { display: urlVisible ? '' : 'none' }
  const hideOrShow = urlVisible ? false : true

  const showDelete = (blog.user.username === loggedUser.username) ? true : false

  return (
    <div style={blogStyle}>

      <div className="defaultText" onClick={() => setUrlVisible(hideOrShow)}>
        <strong>{blog.title}</strong> {blog.author}
      </div>

      <div style={hideUrl} className="hiddenContent">
        <a href={blog.url}>{blog.url}</a>
        <br></br>
      Likes: {blog.likes}
        <button onClick={addLike}>like</button>
        <br></br>
      Added by: {blog.user ? blog.user.name : ''}
        <br></br>
        <div>
          {showDelete &&
      <button onClick={deleteBlog}>Delete</button>}
        </div>
      </div>

    </div>
  )
}

Blog.propTypes = {
  addLike: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
  loggedUser: PropTypes.object.isRequired,
  blog: PropTypes.object.isRequired
}

export default Blog