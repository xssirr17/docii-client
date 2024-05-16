import { toast } from 'react-toastify'

import { AXIOS_DEFAULT_ERROR } from '@/constants/common/base/base-default-error.constants'

export const onResponseFulfilled = (response) => {
  return response.data?.data ?? response?.data
}

export const onResponseRejected = async (error) => {
  const errorMessage =
    typeof error?.response?.data?.message === 'string'
      ? error?.response?.data?.message
      : error?.response?.data?.message[0]

  const messageError = errorMessage || AXIOS_DEFAULT_ERROR.en

  if (messageError) {
    toast.error(messageError)
  }

  return Promise.reject(error.response)
}
