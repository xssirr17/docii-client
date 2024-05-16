import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import generalServices from '@/services/general'

const initialState = {}

const otpSlice = createSlice({
  name: 'otp',
  initialState,
  reducers: {}
})

// export const {} = otpSlice.actions

export const requestOtp = createAsyncThunk(
  'otp/requestOtp',
  async (payload) => await generalServices.requestOtp(payload)
)

export const verifyOtp = createAsyncThunk(
  'otp/verifyOtp',
  async (payload) => await generalServices.verifyOtp(payload)
)

export default otpSlice.reducer
