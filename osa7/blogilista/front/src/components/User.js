import React from 'react'

const User = (props) => {
  if (props.user === undefined) {
    return null
  }

  return (
    <div>
      <h3>{props.user.name}</h3>
      <h4>Added blogs:</h4>
      <ul>
        {props.user.blogs.map(blog => <li key={blog.id}>{blog.title}</li>)}
      </ul>

    </div>
  )

}

export default User