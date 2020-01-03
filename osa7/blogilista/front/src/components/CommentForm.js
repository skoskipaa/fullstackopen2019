import React from 'react'
import { useField } from '../hooks'
import { addComment, initializeBlogs } from '../reducers/blogReducer'
import { connect } from 'react-redux'
import { Form, Container } from 'semantic-ui-react'

const CommentForm = (props) => {

  const comment = useField('text')

  const handleComment = async (event) => {
    event.preventDefault()

    const newComment = {
      content: comment.value
    }
    await props.addComment(newComment, props.id)
    comment.reset()
    await props.initializeBlogs()
  }

  return (
    <div>
      <Container>
        <Form onSubmit={handleComment} >
          <Form.Group>
            <Form.Input>
              <label style={{ marginRight: '15px' }}>Comment</label>
              <input {...comment.noReset}></input>
            </Form.Input>
            <Form.Button primary type="submit">Add comment</Form.Button>
          </Form.Group>
        </Form>
      </Container>
    </div>
  )
}

export default connect(null, { addComment, initializeBlogs })(CommentForm)