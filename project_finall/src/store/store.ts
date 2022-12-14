import { configureStore } from '@reduxjs/toolkit'
// Slice
import authSlice from './slices/authSlice'
import loadingSlice from './slices/loadingSlice'
import dialogSlice from './slices/dialogSlice'
import alertSlice from './slices/alertSlice'
// import themeSlice from './themeSlice'

const store = configureStore({
	reducer: {
		auth: authSlice,
		loading: loadingSlice,
		dialog: dialogSlice,
		alert: alertSlice,
		// theme: themeSlice,
	},
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store