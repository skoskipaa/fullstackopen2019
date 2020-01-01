import blogService from '../services/blogService'

const sortByLikes = (a, b) => b.likes - a.likes

const blogReducer = (state = [], action) => {
  switch(action.type) {
  case 'INITIALIZE_BLOGS':
    return action.data.sort(sortByLikes)
  case 'LIKE':
    return state
      .map(blog => blog.id !== action.data.id ? blog : action.data)
      .sort(sortByLikes)
  case 'DELETE':
    return state
      .filter(b => b.id !== action.data.id)
  case 'NEW_BLOG':
    return state
      .concat(action.data)
      .sort(sortByLikes)
  default:
    return state
  }
}

export const createBlog = (blog) => {

  return async dispatch => {
    try {
      const data = await blogService.create(blog)
      dispatch({
        type: 'NEW_BLOG',
        data
      })
    } catch (error) {
      console.log('New blog creation failed: ', error)
      return null
    }
  }
}

export const deleteBlog = (blog) => {
  return async dispatch => {
    await blogService.deleteBlog(blog)
    dispatch({
      type: 'DELETE',
      data: blog
    })
  }
}

export const addLike = (blog) => {
  return async dispatch => {
    const changedBlog = {
      ...blog, likes: blog.likes + 1
    }
    const data = await blogService.update(changedBlog)
    dispatch({
      type: 'LIKE',
      data: data
    })
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    blogs.sort((a, b) => {
      return b.likes - a.likes
    })
    dispatch({
      type: 'INITIALIZE_BLOGS',
      data: blogs
    })
  }
}

export default blogReducer