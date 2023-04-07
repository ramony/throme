import { configureStore } from '@reduxjs/toolkit'
import thromeReducer from './thromeSlice'

export default configureStore({
  reducer: {
    throme: thromeReducer
  }
})
