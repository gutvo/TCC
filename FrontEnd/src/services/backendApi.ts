import axios, { AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios'
import { UserData } from '@Redux/users/reducers'
import { toast } from 'react-toastify'
import { redirect } from 'react-router-dom'

interface refleshTokenDTO {
  data: {
    data: UserData
    token: string
  }
}
interface LocalStorageProps {
  email: string
  password: string
}

const baseURL = import.meta.env.VITE_LINK as string

export const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Interceptors

// Request

api.interceptors.request.use(
  (config): InternalAxiosRequestConfig => {
    const token = localStorage.getItem('token')

    config.headers = config.headers || {}
    config.headers.Authorization = `Bearer ${token}`
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// Response

api.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      const data: LocalStorageProps = JSON.parse(
        localStorage.getItem('user') || '{ "email": "", "password": "" }',
      )
      if (!data.email || !data.password) {
        toast.error('Relogue')
        return Promise.reject(redirect('/login'))
      }

      const user: refleshTokenDTO = await api.post('/refleshtoken', {
        email: data.email,
        password: data.password,
      })

      localStorage.setItem('token', user.data.token)

      const response = api.request(error.config as AxiosRequestConfig)
      return response
    } else {
      return Promise.reject(error)
    }
  },
)
