import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  }

  try {
    const response = await axios.post(baseUrl, newObject, config)
    return response
  } catch (error) {
    return {
      message: 'Error: Title and URL are required',
      status: 400,
    }
  }
}

const put = async (id, newObject) => {
  const config = {
    headers: { Authorization: token },
  }

  const url = baseUrl + '/' + id

  try {
    const response = await axios.put(url, newObject, config)
    return response.data
  } catch (error) {
    console.log(error)
    console.error('Error updating blog with id ' + id)
  }
}

const updateReactions = async (blog) => {
  const url = baseUrl + '/reactions/' + blog.id
  const response = await axios.patch(url, blog.reactions)
  return response
}

const addComment = async (blogId, comment) => {
  console.log(comment)
  const url = baseUrl + '/' + blogId + '/comments'
  const response = await axios.post(url, { comment })
  return response
}

const _delete = async (id) => {
  const config = {
    headers: { Authorization: token },
  }

  const url = baseUrl + '/' + id

  try {
    const response = await axios.delete(url, config)
    return response
  } catch (error) {
    console.error(error)
    console.error('Error deleting blog with id ' + id)
  }
}

// eslint-disable-next-line
export default {
  addComment,
  updateReactions,
  getAll,
  setToken,
  create,
  put,
  _delete,
}
