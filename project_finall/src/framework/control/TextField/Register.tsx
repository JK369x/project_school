import { FC } from 'react'
import { useFormContext } from 'react-hook-form'
import { TextField, TextFieldProps } from './TextField'

type RegisterTextFieldProps = {
	register: any
} & TextFieldProps

export const RegisterTextField: FC<RegisterTextFieldProps> = ({ register, ...props }) => {
	const {
		formState: { errors },
	} = useFormContext()
	const keyname = register.name.split('.')
	const errorMessage = keyname.reduce((acc: any, curr: any) => acc[curr] || '', errors)
	return <TextField register={register} helperText={errorMessage.message || ''} error={!!errorMessage} {...props} />
}
