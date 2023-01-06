import { FC } from 'react'

// hooks
import { Controller, UseFormReturn } from 'react-hook-form'

// mui & control
import { ControlSwitchProps } from './Switch'
import { Switch } from './Switch'

type ControllerTextFieldProps = {
	formprop: UseFormReturn<any, any>
	name: string
} & ControlSwitchProps

export const ControllerSwitch: FC<ControllerTextFieldProps> = (props) => {
	const {
		formprop: { control },
		name,
	} = props
	return (
		<Controller
			control={control}
			name={name}
			render={({ field: { onChange, onBlur, value, name } }) => {
				return <Switch {...props} name={name} value={value} onChange={onChange} onBlur={onBlur} />
			}}
		/>
	)
}
