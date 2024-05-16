import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import generalServices from '@/services/general'

const initialState = {
  categories: []
}

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    setCategories: (state, action) => {
      state.categories = action.payload
    },
    setImageInCategory: (state, action) => {
      state.categories[action.payload.index].image = action.payload.image
    }
  }
})

export const { setCategories, setImageInCategory } = categorySlice.actions

export const addCategory = createAsyncThunk(
  'category/addCategory',
  async (payload) => await generalServices.addCategory(payload)
)

export const getCategory = createAsyncThunk(
  'category/getCategory',
  async (payload) => await generalServices.getCategory(payload)
)

export const getCategories = createAsyncThunk(
  'category/getCategories',
  async () => await generalServices.getCategories()
)

export const updateCategory = createAsyncThunk(
  'category/updateCategory',
  async (payload) => await generalServices.updateCategory(payload)
)

export const deleteCategory = createAsyncThunk(
  'category/deleteCategory',
  async (payload) => await generalServices.deleteCategory(payload)
)

export default categorySlice.reducer
