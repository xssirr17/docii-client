import { baseUrl } from '@/constants/common/base/base-url.constants'
import { axiosInstance } from '@/plugins/axios'

const generateUrl = (path) => baseUrl + path

export const uploadFile = (data) => {
  const url = generateUrl('file')

  return axiosInstance.post(url, data)
}

export const getFile = (data) => {
  const url = generateUrl('file/' + data)
  return axiosInstance.get(url)
}
