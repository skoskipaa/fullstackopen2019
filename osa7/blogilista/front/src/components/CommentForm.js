import React from 'react'
import { useField } from '../hooks'
import { addComment, initializeBlogs } from '../reducers/blogReducer'
import { connect } from 'react-redux'

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
      <form onSubmit={handleComment} >
        <input {...comment.noReset}></input>
        <button type="submit">Add comment</button>
      </form>

    </div>
  )
}

export default connect(null, { addComment, initializeBlogs })(CommentForm)