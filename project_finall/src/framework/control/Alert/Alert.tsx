import { FC, useEffect, useState } from 'react'

// hooks
import { useAppSelector, useAppDispatch } from "../../../store/useHooksStore";
import { closeAlert } from '../../../store/slices/alertSlice'
// mui & control
import { Snackbar, Alert as MuiAlert, AlertTitle } from '@mui/material'

export const Alert: FC = () => {
	const dispatch = useAppDispatch()
	const { open, title, text } = useAppSelector(({ alert }) => alert)
	const [stateTitle, setStateTitle] = useState<string>(title)
	const [stateText, setStateText] = useState<string>(text)
	useEffect(() => {
		if (!open) {
			setTimeout(() => {
				setStateTitle(title)
				setStateText(text)
			}, 100)
		} else {
			setStateTitle(title)
			setStateText(text)
		}
	}, [open])
	const handleClose = () => {
		dispatch(closeAlert())
	}

	return (
		<Snackbar
			anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
			open={open}
			onClose={handleClose}
			key={'Alert'}
			children={
				<MuiAlert
					variant="filled"
					severity={stateTitle.toLocaleLowerCase() as any}
					sx={{ minWidth: '300px', maxWidth: '400px' }}
				>
					<AlertTitle>{stateTitle}</AlertTitle>
					{stateText}
				</MuiAlert>
			}
		/>
	)
}

export default Alert
