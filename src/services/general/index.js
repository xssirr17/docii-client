import { requestOtp, verifyOtp } from './otp.service'
import { getFile, uploadFile } from './file.service'
import {
  getCategories,
  getCategory,
  deleteCategory,
  updateCategory,
  addCategory
} from './category.service'

export default {
  requestOtp,
  verifyOtp,
  uploadFile,
  getFile,
  getCategories,
  getCategory,
  deleteCategory,
  updateCategory,
  addCategory
}
