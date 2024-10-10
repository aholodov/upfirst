import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'http://hn.algolia.com',
})

export default axiosInstance
