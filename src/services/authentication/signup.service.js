import { baseUrl } from '@/constants/common/base/base-url.constants'
import { axiosInstance } from '@/plugins/axios'

const generateUrl = (path) => baseUrl + path

export const signup = (data, headers) => {
  const config = {
    headers
  }
  const url = generateUrl('user/register')

  return axiosInstance.post(url, data, config)
}
