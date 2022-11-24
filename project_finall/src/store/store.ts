import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import userSilice from "./slices/userSilice";

export const store = configureStore({
  reducer:{
    userStoreTest:userSilice,
   
  },
})

// export type of root state from reducers
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispacth = () => useDispatch<AppDispatch>();