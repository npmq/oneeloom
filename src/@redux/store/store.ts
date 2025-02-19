import { menuReducer } from '@redux/slices/menuSlice'
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  reducer: {
    menu: menuReducer,
  },
})
