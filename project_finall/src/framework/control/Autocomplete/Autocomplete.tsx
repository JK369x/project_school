import { FC, useRef, useState, useEffect } from 'react'
import { TextField } from '../../control'
import {
	Autocomplete as MuiAutocomplete,
	AutocompleteProps as MuiAutoCompleteProps,
	Typography,
	FormControl,
	FormLabel,
} from '@mui/material'

import { ControllerAutocomplete } from './Controller'

export { ControllerAutocomplete }

export interface OptionType {
	id: string | number
	label: string
}

export type AutocompleteProps = {
	options: readonly any[]
	readOnly?: boolean
	label?: string
	name?: string
	value?: any
	onSelectedItem?: (data: any) => void
	errortype?: string
	texterror?: string
	disabled?: boolean
	fullWidth?: boolean
	multiple?: boolean
	newoption?: any
	placeholder?: string
	minRow?: number
	maxRow?: number
}

export const Autocomplete: FC<AutocompleteProps> = (props) => {
	const formRef = useRef<HTMLDivElement>(null)
	const checkboxRef = useRef<{ [id: number | string]: boolean }>({})
	const [options, setOptions] = useState(props.options)

	const { newoption } = props

	useEffect(() => {
		setOptions(props.options)
	}, [props.options])

	const handleSelectedItem = (dataItem: any) => {
		if (Array.isArray(dataItem)) {
			let cloneValues = [...dataItem]
			let distinctList: any[] = []
			if (checkboxRef.current) {
				Object.keys(checkboxRef.current).forEach((keyName) => {
					const conditionOne = keyName ? !checkboxRef.current[keyName] : false
					const conditionTwo =
						distinctList.find((distinctData) => `${distinctData.id}` === keyName) === undefined
					if (conditionOne && conditionTwo) {
						const findData = cloneValues.find((data) => `${data.id}` === keyName)
						findData && distinctList.push(findData)
					}
				})
			}

			const a: any[] = []
			distinctList &&
				distinctList.forEach((item) => {
					if (item.id !== null) a.push(item)
				})
			if (props.onSelectedItem) props.onSelectedItem(a)
		} else {
			if (props.onSelectedItem) props.onSelectedItem(dataItem)
		}
	}

	const autoNewOption = (data: any) => {
		if (props.options.filter((e) => e.label === data).length > 0) return
		setOptions([...props.options, { id: data, label: data }])
	}

	return (
		<FormControl ref={formRef} fullWidth={props.fullWidth} disabled={props.disabled}>
			<MuiAutocomplete
				{...props}
				renderInput={(params) => <TextField {...params} label={props.label} placeholder={props.placeholder} />}
				options={options}
				onChange={(_, data) => {
					handleSelectedItem(data)
					return data
				}}
				placeholder={props.placeholder}
				onInputChange={(_, data) => {
					if (!newoption) return
					autoNewOption(data)
				}}
				isOptionEqualToValue={(option, value) => option.label === value.label}
			/>
		</FormControl>
	)
}
