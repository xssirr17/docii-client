import axios from 'axios'
import { onRequestFulfilled, onRequestRejected } from './request'
import { onResponseFulfilled, onResponseRejected } from './response'

export const axiosInstance = axios.create({
  headers: {
    'Content-Type': 'application/json',
    Authorization: 'a88c4d3e-1002-4bf5-bac4-61ffafae9a41'
  }
})

axiosInstance.interceptors.request.use(onRequestFulfilled, onRequestRejected)
axiosInstance.interceptors.response.use(onResponseFulfilled, onResponseRejected)

export default {}
