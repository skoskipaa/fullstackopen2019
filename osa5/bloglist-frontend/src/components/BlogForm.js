import React from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({
  addBlog,
  handleTitleChange,
  handleAuthorChange,
  handleUrlChange,
  newTitle,
  newAuthor,
  newUrl
}) => {
  return (
    <div>
      <form onSubmit={addBlog}>
        <h4>Add a new blog</h4>
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
    </div>
  )
}

BlogForm.propTypes = {
  addBlog: PropTypes.func.isRequired,
  handleTitleChange: PropTypes.func.isRequired,
  handleAuthorChange: PropTypes.func.isRequired,
  handleUrlChange: PropTypes.func.isRequired,
  newTitle: PropTypes.string.isRequired,
  newAuthor: PropTypes.string.isRequired,
  newUrl: PropTypes.string.isRequired
}

export default BlogForm