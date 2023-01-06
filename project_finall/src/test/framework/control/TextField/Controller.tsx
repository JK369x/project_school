import React, { FC } from 'react'

// hooks
import { Controller, UseFormReturn } from 'react-hook-form'

// mui & control
import { TextFieldProps } from '@mui/material'
import { TextField } from './TextField'

type ControllerTextFieldProps = {
	formprop: UseFormReturn<any, any>
	name: string
} & TextFieldProps

export const ControllerTextField: FC<ControllerTextFieldProps> = (props) => {
	const {
		formprop: { control },
		name,
	} = props
	return (
		<Controller
			control={control}
			name={name}
			render={({ field: { onChange, onBlur, value, name }, fieldState: { error } }) => {
				return (
					<TextField
						{...props}
						name={name}
						value={value}
						onChange={onChange}
						onBlur={onBlur}
						helperText={error?.message}
						error={error?.message ? true : false}
					/>
				)
			}}
		/>
	)
}
