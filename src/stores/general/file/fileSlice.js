import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import generalServices from '@/services/general'

const initialState = {}

const fileSlice = createSlice({
  name: 'file',
  initialState,
  reducers: {}
})

// export const {} = fileSlice.actions

export const uploadFile = createAsyncThunk(
  'file/uploadFile',
  async (payload) => await generalServices.uploadFile(payload)
)

export const getFile = createAsyncThunk(
  'file/getFile',
  async (payload) => await generalServices.getFile(payload)
)

export default fileSlice.reducer
