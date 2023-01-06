import { FC } from 'react'

// mui & control
import { Grid, Card, CardContent, Typography } from '@mui/material'

const ItemComp: FC = () => {
	return (
		<Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
			<Card
				sx={{ cursor: 'pointer' }}
				onDoubleClick={() => {
					console.log('onDoubleClick')
				}}
				onContextMenu={(e) => {
					e.stopPropagation()
				}}
			>
				<CardContent>
					<Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
						Word of the Day
					</Typography>
					<Typography variant="h5" component="div"></Typography>
					<Typography sx={{ mb: 1.5 }} color="text.secondary">
						adjective
					</Typography>
					<Typography variant="body2">
						well meaning and kindly.
						<br />
						{'"a benevolent smile"'}
					</Typography>
				</CardContent>
			</Card>
		</Grid>
	)
}

export default ItemComp
