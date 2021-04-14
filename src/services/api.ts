import axios from 'axios'

const api = axios.create({
  baseURL: 'https://simple-api-selection.herokuapp.com'
})

export { api }