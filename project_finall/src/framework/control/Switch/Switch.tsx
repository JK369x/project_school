import { FC } from 'react'

// mui & control
import { Switch as MuiSwitch, SwitchProps } from '@mui/material'
import { ControllerSwitch } from './Controller'

export { ControllerSwitch }
export interface ControlSwitchProps {
	primary?: true
	secondary?: true
	info?: true
	warning?: true
	error?: true
}
export const Switch: FC<ControlSwitchProps & SwitchProps> = (props) => {
	const typeColor = props.primary
		? 'primary'
		: props.secondary
		? 'secondary'
		: props.info
		? 'info'
		: props.warning
		? 'warning'
		: props.error
		? 'error'
		: undefined
	return <MuiSwitch color={typeColor} {...props} />
}

export default Switch
