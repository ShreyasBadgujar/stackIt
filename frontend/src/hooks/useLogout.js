import axios from 'axios'

const API = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000',
})

// Add token to headers automatically
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default API
