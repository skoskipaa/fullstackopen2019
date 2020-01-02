import React from 'react'
import Blog from './Blog'
import NewBlogForm from './NewBlogForm'
import Notification from './Notification'
import { addLike, deleteBlog } from '../reducers/blogReducer'
import { initializeUsers } from '../reducers/usersReducer'
import { setNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

const Blogs = (props) => {

  const addLike = (blog) => {
    props.addLike(blog)
    props.setNotification(`You liked "${blog.title}"`, 3000)

  }

  const deleteBlog = async (blog) => {
    if (window.confirm(`remove blog ${blog.title}?`)) {
      await props.deleteBlog(blog)
      await props.initializeUsers()
      props.setNotification(`"${blog.title}" was deleted!`, 3000)
    }
  }

  return (
    <div>
      <Notification />
      <NewBlogForm />

      {props.blogs.map(blog =>

        <Blog
          key={blog.id}
          blog={blog}
          addLike={() => addLike(blog)}
          deleteBlog={() => deleteBlog(blog)}
          loggedUser={props.user}
        />)}
    </div>
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
  deleteBlog: deleteBlog,
  initializeUsers: initializeUsers
}

export default connect(mapStateToProps, mapDispatchToProps)(Blogs)