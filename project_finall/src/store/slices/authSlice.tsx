import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Lookup } from '../../types/type'
// import type { RootState } from "../../app/store";
import { RootState } from '../store'



export interface AuthState {
	uid?: string | null
	email?: string | null
	displayName?: string | null
	photoURL?: string | null
	status?: Lookup | null
	about?: string | null
	favorite?: string[] | null
}

// Define the initial state using that type
const initialState: AuthState = {}

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		//! เป็น type ของ action 
		setAuthStore: (state, { payload: { uid, email, displayName, photoURL, status, favorite } }: PayloadAction<AuthState>) => {
			state.uid = uid
			state.email = email
			state.displayName = displayName
			state.photoURL = photoURL
			state.status = status
			state.favorite = favorite

		},

		clearAuthStore: (state) => {
			delete state.uid
			delete state.email
			delete state.displayName
			delete state.photoURL
			delete state.status
			delete state.favorite
		},
	},
})

export const { setAuthStore, clearAuthStore } = authSlice.actions

// Other code such as selectors can use the imported `RootState` type
// export const auth = (state: RootState) => {
// 	return state.auth
// }

export default authSlice.reducer