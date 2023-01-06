import { FC } from 'react'

// hook
// import { useFormContext } from 'react-hook-form'

// mui & control
import { Typography, FormControl, FormLabel } from '@mui/material'
import MuiTextField, { TextFieldProps as MuiTextFieldProps } from '@mui/material/TextField'
import { ControllerTextField } from './Controller'
import { RegisterTextField } from './Register'

export { ControllerTextField, RegisterTextField }

export type TextFieldProps = {
	register?: any
} & MuiTextFieldProps

export const TextField: FC<TextFieldProps> = (props) => {
	return (
		<FormControl fullWidth={props.fullWidth}>
			{props.label ? (
				<FormLabel sx={{ mb: 0 }}>
					<Typography variant="subtitle2">{props.label}</Typography>
				</FormLabel>
			) : null}
			<MuiTextField {...props} {...props.register} label="" sx={{ ...props.sx, mt: -0.2 }} />
		</FormControl>
	)
}
