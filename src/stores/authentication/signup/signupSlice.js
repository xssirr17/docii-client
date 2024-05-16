import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authenticationServices from '@/services/authentication'

const initialState = {}

const signupSlice = createSlice({
  name: 'signup',
  initialState,
  reducers: {
    // signup(state, actions) {
    //   authenticationServices.signup(actions.payload)
    // }
  }
})

// export const {} = signupSlice.actions

export const signup = createAsyncThunk(
  'signup/signup',
  async (payload) => await authenticationServices.signup(payload.data, payload.headers)
)

export default signupSlice.reducer
