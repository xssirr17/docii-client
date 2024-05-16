import style from './index.module.scss'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import BaseTextInput from '@/components/base/base-text-input/BaseTextInput'
import BaseButton from '@/components/base/base-button/BaseButton'

import { requestOtp } from '@/stores/general/otp/otpSlice'
import { setPhoneNumber } from '@/stores/profile/profileSlice'

import { requestOtpMapper } from '@/mappers/authentication'

function SignupPhoneNumberView() {
  const defaultValues = {
    phoneNumber: ''
  }
  const { control, handleSubmit } = useForm({ defaultValues })
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onSubmit = async (data) => {
    try {
      setIsLoading(true)
      const payload = requestOtpMapper(data.phoneNumber)
      const response = await dispatch(requestOtp(payload))
      if (response?.error) throw new Error(response)
      dispatch(setPhoneNumber(data.phoneNumber))
      navigate('otp')
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={style['signup-form']}>
      <BaseTextInput
        placeholder="Enter your phone number"
        prependIcon="Phone"
        name="phoneNumber"
        type="tel"
        control={control}
        rules={{
          required: 'phone number is required',
          pattern: {
            value: /^[0-9]{11}$/,
            message: 'phone number must be 11 digits'
          }
        }}
      />
      <div className={style['signup-form__submit-wrapper']}>
        <BaseButton type="submit" isLoading={isLoading}>
          Sign Up
        </BaseButton>
      </div>
    </form>
  )
}

export default SignupPhoneNumberView
