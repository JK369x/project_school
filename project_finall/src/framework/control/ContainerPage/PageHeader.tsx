import { FC } from 'react'
import { useNavigate } from 'react-router-dom'

// mui & control
import { Grid, Typography, Divider, useTheme } from '@mui/material'
import { Button } from '../index'

interface PageHeaderProps {
	name: string
	pathBack?: string
}
export const PageHeader: FC<PageHeaderProps> = ({ name, pathBack }) => {
	const navigate = useNavigate()
	const {
		palette: {
			background: { paper: shadowColor },
		},
	} = useTheme()
	return (
		<Grid container justifyContent={'space-between'} alignItems={'end'} style={{ minHeight: '60px' }}>
			<Grid item>
				<Typography variant={'h3'}>{name}</Typography>
			</Grid>
			{pathBack ? (
				<Grid item>
					<Button label="Back" varaint="outlined" primary onClick={() => navigate(pathBack)} />
				</Grid>
			) : null}
			<Grid item xs={12}>
				<Divider
					sx={{
						my: 1,
						boxShadow: `0px 2px 2px 0px ${shadowColor} !important`,
					}}
				/>
			</Grid>
		</Grid>
	)
}
export default PageHeader
