import { createSlice } from '@reduxjs/toolkit'
import { FC } from 'react'

interface AlertState {
	open: boolean
	title: string
	text: string
}

const initialState: AlertState = {
	open: false,
	title: 'Error',
	text: 'Default Alert Content... Text content alert ________',
}

export const AlertSlice = createSlice({
	name: 'dialog',
	initialState,
	reducers: {
		openAlertSuccess: (state, { payload }) => {
			state.open = true
			state.title = 'Success'
			state.text = payload
		},
		openAlertInfo: (state, { payload }) => {
			state.open = true
			state.title = 'Info'
			state.text = payload
		},
		openAlertWarning: (state, { payload }) => {
			state.open = true
			state.title = 'Warning'
			state.text = payload
		},
		openAlertError: (state, { payload }) => {
			state.open = true
			state.title = 'Error'
			state.text = payload
		},
		closeAlert: (state) => {
			state.open = false
			state.title = 'Error'
			state.text = ''
		},
	},
})

export const { openAlertSuccess, openAlertInfo, openAlertWarning, openAlertError, closeAlert } = AlertSlice.actions

export default AlertSlice.reducer
