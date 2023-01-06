import { FC } from 'react'

// hooks
import { useAppSelector, useAppDispatch } from "../../../store/useHooksStore";
import { closeAlert } from '../../../store/slices/alertSlice'

// mui & control
import { Snackbar, Alert as MuiAlert, AlertTitle } from '@mui/material'

export const Alert: FC = () => {
	const dispatch = useAppDispatch()
	const { open, title, text } = useAppSelector(({ alert }) => alert)
	const handleClose = () => {
		dispatch(closeAlert())
	}
	return (
		<Snackbar
			anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
			open={open}
			onClose={handleClose}
			key={'Alert'}
			children={
				<MuiAlert
					variant="filled"
					severity={title.toLocaleLowerCase() as any}
					sx={{ minWidth: '300px', maxWidth: '400px' }}
				>
					<AlertTitle>{title}</AlertTitle>
					{text}
				</MuiAlert>
			}
		/>
	)
}

export default Alert

{
	/* 
<Alert variant="filled" severity="error">
        This is an error alert — check it out!
      </Alert>
      <Alert variant="filled" severity="warning">
        This is a warning alert — check it out!
      </Alert>
      <Alert variant="filled" severity="info">
        This is an info alert — check it out!
      </Alert>
      <Alert variant="filled" severity="success">
        This is a success alert — check it out!
      </Alert> 
    */
}
