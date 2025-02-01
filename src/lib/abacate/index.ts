import { ENV } from '@/env'
import { default as axios } from 'axios'

export const abacateApi = axios.create({
  baseURL: ENV.ABACATE_API_URL,
})

abacateApi.interceptors.request.use((config) => {
  config.headers['Authorization'] = `Bearer ${ENV.ABACATE_SECRET_KEY}`
  return config
})
