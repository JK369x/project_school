import { createSlice } from '@reduxjs/toolkit'

interface LoadingState {
	isLoad: number
}

const initialState: LoadingState = {
	isLoad: 0,
}

export const LoadingSlice = createSlice({
	name: 'loading',
	initialState,
	reducers: {
		isShowLoading: (state) => {
			state.isLoad = state.isLoad + 1
		},
		isCloseLoading: (state) => {
			if (state.isLoad > 0) state.isLoad = state.isLoad - 1
		},
	},
})

export const { isShowLoading, isCloseLoading } = LoadingSlice.actions

export default LoadingSlice.reducer