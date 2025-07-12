import axios from 'axios'
import { Backend_URL } from './config'

const API = axios.create({
  baseURL: Backend_URL || 'http://localhost:5000',
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
