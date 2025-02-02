import { configureStore } from "@reduxjs/toolkit"
import authreducer from "./UserSlice/index"

export const store = configureStore({
  reducer:{
    auth:authreducer
  }
})

export default store