import { FC } from 'react'

// mui & control
import { Grid } from '@mui/material'

export const MainContainer: FC<any> = ({ children }) => {
	return (
		// fix check display mobile view
		<Grid container padding={'16px 16px'}>
			{children}
		</Grid>
	)
}

export default MainContainer
