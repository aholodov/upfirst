import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'https://hn.algolia.com',
})

export default axiosInstance
