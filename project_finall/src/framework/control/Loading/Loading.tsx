import { FC } from 'react'

// hooks
import { useAppSelector } from '../../../store/useHooksStore'

// mui & control
import { Backdrop, CircularProgress } from '@mui/material'

export const Loading: FC = () => {
	const load = useAppSelector(( {loading} ) => loading.isLoad > 0)
	return (
		<Backdrop style={{ zIndex: 9999, color: 'aqua' }} open={load}>
			<CircularProgress color="primary" />
		</Backdrop>
	)
}

export default Loading
