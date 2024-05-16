import { baseUrl } from '@/constants/common/base/base-url.constants'
import { axiosInstance } from '@/plugins/axios'

const generateUrl = (path) => baseUrl + path

export const login = (data) => {
  const url = generateUrl('user/login')

  return axiosInstance.post(url, data)
}

export const logout = (headers) => {
  const url = generateUrl('user/logout')

  const config = {
    headers
  }
  return axiosInstance.post(url, {}, config)
}
