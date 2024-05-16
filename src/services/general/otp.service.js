import { baseUrl } from '@/constants/common/base/base-url.constants'
import { axiosInstance } from '@/plugins/axios'

const generateUrl = (path) => baseUrl + path

export const requestOtp = (data) => {
  const url = generateUrl('otp/fakeSend')

  return axiosInstance.post(url, data)
}

export const verifyOtp = (data) => {
  const url = generateUrl('otp/verify')

  return axiosInstance.post(url, data)
}
