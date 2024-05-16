import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import doctorService from '@/services/doctor'

const initialState = {
  topDoctors: []
}

const doctorSlice = createSlice({
  name: 'doctor',
  initialState,
  reducers: {
    setTopScoreDoctors: (state, action) => {
      state.topDoctors = action.payload
    },
    setImageInTopDoctors: (state, action) => {
      state.topDoctors[action.payload.index].image = action.payload.image
    }
    // setPhoneNumber: (state, action) => {
    //   state.phoneNumber = action.payload
    //   localStorage.setItem('profile', JSON.stringify(state))
    // },
    // setToken: (state, action) => {
    //   state.token = action.payload
    //   localStorage.setItem('profile', JSON.stringify(state))
    // }
  }
})

export const { setTopScoreDoctors, setImageInTopDoctors } = doctorSlice.actions

export const getAllDoctors = createAsyncThunk(
  'doctor/getDoctors',
  async () => await doctorService.getAllDoctors()
)

export const getTopScoreDoctors = createAsyncThunk(
  'doctor/getTopScoreDoctors',
  async () => await doctorService.getTopDoctors({ sortBy: 'score' })
)

export const getDoctorById = createAsyncThunk(
  'doctor/getDoctorById',
  async (doctorId) => await doctorService.getDoctorById({ id: doctorId })
)

export const getPresentTimes = createAsyncThunk(
  'doctor/getPresentTimes',
  async (payload) => await doctorService.getPresentTimes(payload)
)

export default doctorSlice.reducer
