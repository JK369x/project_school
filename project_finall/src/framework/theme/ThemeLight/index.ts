import { createTheme } from '@mui/material'
import ThemeRoot from '../ThemeRoot'

const ThemeLight = createTheme({
	...ThemeRoot,
	palette: {
		mode: 'light',
		primary: {
			main: '#0085ea',
			light: '#0000FF',
			dark: '#0000FF',
		},
		secondary: {
			main: '#2df',
		},
		text: {
			primary: '#555555dd',
			secondary: '#666666dd',
			disabled: '#777777dd',
		},
		background: {
			default: '#fff',
			paper: '#fefefe',
		},
		action: {
			active: 'rgba(0,0,0,0.54)',
			hover: 'rgba(0, 0, 0, 0.04)',
			selected: 'rgba(0, 0, 0, 0.08)',
			disabled: 'rgba(0, 0, 0, 0.26)',
			disabledBackground: 'rgba(0, 0, 0, 0.12)',
		},
		divider: '#ccccccaa',
	},
	components: {
		...ThemeRoot.components,
		MuiAvatar: {
			styleOverrides: {
				root: (props) => ({
					color: props.theme.palette.primary.main,
					backgroundColor: props.theme.palette.background.default,
				}),
			},
		},
		MuiListItemIcon: {
			styleOverrides: {
				root: {
					color: '#f8a',
				},
			},
		},
		MuiButton: {
			...ThemeRoot.components!.MuiButton,
			variants: [
				{
					props: { variant: 'contained' },
					style: {
						color: '#fefefe',
					},
				},
			],
			styleOverrides: {
				root: {
					textTransform: 'none',
				},
			},
		},
	},
})

export default ThemeLight
