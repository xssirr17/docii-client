import { baseUrl } from '@/constants/common/base/base-url.constants'
import { axiosInstance } from '@/plugins/axios'

const generateUrl = (path) => baseUrl + path


export const reserveDoctor = (data , headers)=>{
  const url = generateUrl('user/reserve')
  const config = {
    headers
  }
  return axiosInstance.post(url,data,config)
}