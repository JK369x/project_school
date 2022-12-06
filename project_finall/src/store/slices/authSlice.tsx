import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Lookup } from '../../types/type'
// import type { RootState } from "../../app/store";
import { RootState } from '../store'

// displayName, uid, photoURL, accessToken
export interface AuthState {
	uid?: string | null
	displayName?: string | null
	photoURL?: string | null
	status?: Lookup | null
}

// Define the initial state using that type
const initialState: AuthState = {}

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setAuthStore: (state, { payload: { uid, displayName, photoURL,status, } }: PayloadAction<AuthState>) => {
			state.uid = uid
			state.displayName = displayName
			state.photoURL = photoURL
			state.status = status
		},
		clearAuthStore: (state) => {
			delete state.uid
			delete state.displayName
			delete state.photoURL
			delete state.status
		},
	},
})

export const { setAuthStore, clearAuthStore } = authSlice.actions

// Other code such as selectors can use the imported `RootState` type
// export const auth = (state: RootState) => {
// 	return state.auth
// }

export default authSlice.reducer