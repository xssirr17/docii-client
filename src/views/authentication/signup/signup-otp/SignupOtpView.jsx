import style from './index.module.scss'

import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import BaseButton from '@/components/base/base-button/BaseButton'
import OtpInput from '@/components/general/otp/OtpInput'

import { verifyOtp } from '@/stores/general/otp/otpSlice'
import { setToken } from '@/stores/profile/profileSlice'

import { verifyOtpMapper } from '@/mappers/authentication'
import { useNavigate } from 'react-router-dom'

function SignupOtpView() {
  const defaultValues = {
    otp: ''
  }
  const { control, handleSubmit } = useForm({ defaultValues })
  const [isLoading, setIsLoading] = useState(false)
  const [isOtpCompleted, setIsOtpCompleted] = useState(true)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const profileStore = useSelector((state) => state.profile)

  const onSubmit = async (data) => {
    try {
      const payload = verifyOtpMapper(data.otp, profileStore.phoneNumber)
      const response = await dispatch(verifyOtp(payload))
      dispatch(setToken(response?.payload?.token))
      if (response?.error) throw new Error(response)
      navigate('/signup/user-info')
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={style['signup-otp']}>
      <OtpInput
        name="otp"
        numberOfInputs={5}
        control={control}
        rules={{
          required: true,
          pattern: /^[0-9]{5}$/
        }}
        setIsOtpCompleted={setIsOtpCompleted}
      />
      <div className={style['signup-otp__submit-wrapper']}>
        <BaseButton type="submit" isLoading={isLoading} disabled={isOtpCompleted}>
          Verify
        </BaseButton>
      </div>
    </form>
  )
}

export default SignupOtpView
