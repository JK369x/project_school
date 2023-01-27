import { configureStore } from '@reduxjs/toolkit'
// Slice
import authSlice from './slices/authSlice'
import loadingSlice from './slices/loadingSlice'
import dialogSlice from './slices/dialogSlice'
import alertSlice from './slices/alertSlice'
import courseSlice from './slices/courseSlice'
import buttonSlice from './slices/buttonSlice'
// import themeSlice from './themeSlice'

const store = configureStore({
	reducer: {
		auth: authSlice,
		loading: loadingSlice,
		dialog: dialogSlice,
		alert: alertSlice,
		course: courseSlice,
		btnStatus: buttonSlice,
		// theme: themeSlice,
	},
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store