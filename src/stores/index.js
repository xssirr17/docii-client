import { configureStore } from '@reduxjs/toolkit'
import loginReducer from '@/stores/authentication/login/LoginSlice'
import signupReducer from '@/stores/authentication/signup/signupSlice'
import otpReducer from '@/stores/general/otp/otpSlice'
import profileReducer from '@/stores/profile/profileSlice'
import categoryReducer from '@/stores/general/category/categorySlice'
import fileReducer from '@/stores/general/file/fileSlice'
import doctorReducer from '@/stores/doctor/doctorSlice'

const store = configureStore({
  reducer: {
    login: loginReducer,
    signup: signupReducer,
    otp: otpReducer,
    profile: profileReducer,
    category: categoryReducer,
    file: fileReducer,
    doctor: doctorReducer
  }
})

export default store
