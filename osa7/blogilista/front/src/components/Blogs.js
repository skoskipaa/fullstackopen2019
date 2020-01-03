import React from 'react'
import { Link } from 'react-router-dom'
import NewBlogForm from './NewBlogForm'
import Notification from './Notification'
import { connect } from 'react-redux'
import { List, Segment } from 'semantic-ui-react'

const Blogs = (props) => {

  return (
    <div>
      <Notification />
      <Segment.Group raised>
        <Segment>Recommended blogs:</Segment>
        <Segment>
          <List>
            <List.Item>
              {props.blogs.map(blog =>
                <List.Content key={blog.id}>
                  <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                </List.Content>)}
            </List.Item>
          </List>
        </Segment>
      </Segment.Group>
      <NewBlogForm />
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs

  }
}

export default connect(mapStateToProps)(Blogs)
