import axios from 'axios'

const api = axios.create({ baseURL: '/api' })

api.interceptors.request.use(cfg => {
  const token = localStorage.getItem('token')
  if (token) cfg.headers.Authorization = `Bearer ${token}`
  return cfg
})

export const register   = (data)           => api.post('/auth/register', data)
export const login      = (data)           => api.post('/auth/login', data)
export const getFeed    = (page=1, size=10) => api.get('/posts', { params: { page, pageSize: size } })
export const createPost = (data)           => api.post('/posts', data)
export const updatePost = (id, data)       => api.put(`/posts/${id}`, data)
export const deletePost = (id)             => api.delete(`/posts/${id}`)

export default api
