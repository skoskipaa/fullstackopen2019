import React from 'react'
import { Link } from 'react-router-dom'
import NewBlogForm from './NewBlogForm'
import Notification from './Notification'
import { connect } from 'react-redux'

const Blogs = (props) => {

  return (
    <div>
      <Notification />
      <NewBlogForm />
      {props.blogs.map(blog =>
        <Link key={blog.id} to={`/blogs/${blog.id}`}>{blog.title}<br/></Link>
      )}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs

  }
}

export default connect(mapStateToProps)(Blogs)