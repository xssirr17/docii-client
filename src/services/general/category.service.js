import { baseUrl } from '@/constants/common/base/base-url.constants'
import { axiosInstance } from '@/plugins/axios'

const generateUrl = (path) => baseUrl + path

export const addCategory = (data) => {
  const url = generateUrl('category')

  return axiosInstance.post(url, data)
}

export const getCategory = (data) => {
  const url = generateUrl('category/' + data)

  return axiosInstance.get(url)
}

export const getCategories = () => {
  const url = generateUrl('category')

  return axiosInstance.get(url)
}

export const deleteCategory = (data) => {
  const url = generateUrl('category')

  return axiosInstance.delete(url, data)
}

export const updateCategory = (data) => {
  const url = generateUrl('category')

  return axiosInstance.put(url, data)
}
