import React from 'react'

const SimpleBlog = ({ blog, onClick }) => {
  return (

    <div>
      <div>
        {blog.title}
      </div>
      <div>
        {blog.author}
      </div>
      <div className="likes">
          blog has {blog.likes} likes
        <button onClick={onClick}>like</button>
      </div>
    </div>
  )
}

export default SimpleBlog