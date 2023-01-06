import { Components } from '@mui/material'

const themeComponents: Components = {
	MuiTextField: {
		defaultProps: {
			variant: 'outlined',
			margin: 'dense',
			size: 'small',
		},
	},
	MuiButton: {
		defaultProps: {
			variant: 'contained',
			disableRipple: true,
			disableFocusRipple: true,
		},
	},
}

export default themeComponents
