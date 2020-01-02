import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const request = axios.get(baseUrl)

  const response = await request
  return response.data
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async updatedObject => {
  const config = {
    headers: { Authorization: token }
  }
  const objectPath = baseUrl + '/' + updatedObject.id
  const response = await axios.put(objectPath, updatedObject, config)

  return response.data

}

const deleteBlog = async objectToDelete => {
  const config = {
    headers: { Authorization: token }
  }
  const objectPath = baseUrl + '/' + objectToDelete.id
  const response = await axios.delete(objectPath, config)
  return response.data

}

const addComment = async (newComment, blogId) => {
  const config = {
    headers: { Authorization: token }
  }
  const objectPath = baseUrl + '/' + blogId + '/comments'
  const response = await axios.post(objectPath, newComment, config)
  return response.data
}

export default { getAll, create, setToken, update, deleteBlog, addComment }