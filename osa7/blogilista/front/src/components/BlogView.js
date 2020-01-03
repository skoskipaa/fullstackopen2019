import React from 'react'
import Notification from './Notification'
import CommentForm from './CommentForm'
import { setNotification } from '../reducers/notificationReducer'
import { addLike, deleteBlog, initializeBlogs } from '../reducers/blogReducer'
import { initializeUsers } from '../reducers/usersReducer'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Button, Container, Icon, Comment, Segment } from 'semantic-ui-react'

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
      await props.initializeUsers() // blogien määrän päivitys
      props.setNotification(`"${blog.title}" was deleted!`, 3000)
    }
    props.history.push('/blogs')
  }

  const showDelete = (props.blog.user.username === props.user.username) ? true : false

  return (

    <div>
      <Notification />
      <Container>
        <Segment.Group raised>
          <Segment size="big">{props.blog.title}</Segment>
          <Segment> <a href={props.blog.url}>{props.blog.url}</a></Segment>
          <Segment>
            {props.blog.likes} likes
            <Button color="blue" size="tiny"
              onClick={() => addLike(props.blog)} style={{marginLeft: '20px'}}>Like</Button>
          </Segment>
          <Segment size="mini">Added by {props.blog.user.name}
            {showDelete &&
      <Button color="red" size="tiny"
        onClick={() => deleteBlog(props.blog)} style={{marginLeft: '20px'}}>Delete blog</Button>}
          </Segment>
        </Segment.Group>
        <div>
          <br/>
          <h4>Comments</h4>
          <Comment.Group>
            {props.blog.comments.map(com =>
              <Comment.Content key={com.id}>
                <Comment.Text><Icon name='user' />
                  {com.content}
                </Comment.Text>
              </Comment.Content>)}
          </Comment.Group>
          <CommentForm id={props.blog.id}/>
        </div>
      </Container>
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
  setNotification, addLike, deleteBlog, initializeUsers, initializeBlogs
}

export default connect(mapStateToProps, mapDispatchToProps)(BlogView)