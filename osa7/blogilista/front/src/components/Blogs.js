import React from 'react'
import Blog from './Blog'
import { addLike, deleteBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

const Blogs = (props) => {

  const addLike = (blog) => {
    props.addLike(blog)
    props.setNotification(`You liked "${blog.title}"`, 3000)

  }

  const deleteBlog = (blog) => {
    if (window.confirm(`remove blog ${blog.title}?`)) {
      props.deleteBlog(blog)
      props.setNotification(`"${blog.title}" was deleted!`, 3000)
    }
  }

  return (
    props.blogs.map(blog =>

      <Blog
        key={blog.id}
        blog={blog}
        addLike={() => addLike(blog)}
        deleteBlog={() => deleteBlog(blog)}
        loggedUser={props.user}
      />)
  )
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
    user: state.user
  }
}

const mapDispatchToProps = {
  addLike: addLike,
  setNotification: setNotification,
  deleteBlog: deleteBlog
}

export default connect(mapStateToProps, mapDispatchToProps)(Blogs)