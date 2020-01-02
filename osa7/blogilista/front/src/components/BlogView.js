import React from 'react'
import Notification from './Notification'
import CommentForm from './CommentForm'
import { setNotification } from '../reducers/notificationReducer'
import { addLike, deleteBlog } from '../reducers/blogReducer'
import { initializeUsers } from '../reducers/usersReducer'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

let BlogView = (props) => {

  if (props.blog === undefined) {
    return null
  }

  const addLike = (blog) => {
    props.addLike(blog)
    props.setNotification(`You liked "${blog.title}"`, 3000)
  }

  const deleteBlog = async (blog) => {
    if (window.confirm(`remove blog ${blog.title}?`)) {
      await props.deleteBlog(blog)
      await props.initializeUsers()
    }
    props.setNotification(`"${blog.title}" was deleted!`, 3000)
    props.history.push('/blogs')
  }

  const showDelete = (props.blog.user.username === props.user.username) ? true : false

  return (

    <div>
      <Notification />
      <h2>{props.blog.title}</h2>
      <a href={props.blog.url}>{props.blog.url}</a>
      <div>
        <p>{props.blog.likes} likes<button onClick={() => addLike(props.blog)}>like</button></p>
      </div>
      <p>Added by {props.blog.user.name}</p>
      <div>
        {showDelete &&
      <button onClick={() => deleteBlog(props.blog)}>Delete</button>}
      </div>
      <div>
        <h4>Comments</h4>
        <CommentForm id={props.blog.id}/>
        <ul>
          {props.blog.comments.map(com =>
            <li key={com.id}>{com.content}</li>)}
        </ul>
      </div>
    </div>

  )
}

BlogView = withRouter(BlogView)

const mapStateToProps = (state) => {
  return {
    user: state.user,
    blogs: state.blogs
  }
}

const mapDispatchToProps = {
  setNotification, addLike, deleteBlog, initializeUsers
}

export default connect(mapStateToProps, mapDispatchToProps)(BlogView)