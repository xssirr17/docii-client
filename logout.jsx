import BaseButton from '@/components/base/base-button/BaseButton'

import Cookies from 'js-cookie'

import { useDispatch } from 'react-redux'

import { logout } from '@/stores/authentication/login/LoginSlice'
import { useState } from 'react'

function HomeView() {
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch()
  const logOut = async () => {
    try {
      setIsLoading(true)
      const token = Cookies.get('token')
      const logoutHeaders = { token }
      await dispatch(logout(logoutHeaders))
      Cookies.remove('token')
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <div onClick={logOut}>
      <BaseButton isLoading={isLoading}>Logout</BaseButton>
    </div>
  )
}

export default HomeView
