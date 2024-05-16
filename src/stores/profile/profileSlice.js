import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import panelService from '@/services/panel'

import Cookies from 'js-cookie'

const initialState = localStorage.getItem('profile')
  ? JSON.parse(localStorage.getItem('profile'))
  : {}

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfile: (state, action) => {
      const { firstName, lastName, nationalCode } = action.payload
      state.firstName = firstName
      state.lastName = lastName
      state.nationalCode = nationalCode
      localStorage.setItem('profile', JSON.stringify(state))
    },
    setPhoneNumber: (state, action) => {
      state.phoneNumber = action.payload
      localStorage.setItem('profile', JSON.stringify(state))
    },
    setToken: (state, action) => {
      state.token = action.payload
      localStorage.setItem('profile', JSON.stringify(state))
    }
  }
})

export const { setProfile, setPhoneNumber, setToken } = profileSlice.actions


export const reserveDoctor = createAsyncThunk(
  'profile/reserveDoctor',
  async (payload) => {
    const token = Cookies.get('token')
    await panelService.reserveDoctor(payload, { token })
  }
)
export default profileSlice.reducer

