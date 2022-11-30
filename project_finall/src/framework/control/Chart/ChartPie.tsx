// import { FC, Fragment } from 'react'
// import { Pie } from 'react-chartjs-2'
// import { Chart as ChartJS, CategoryScale, LinearScale, ArcElement, Title, Tooltip, Legend } from 'chart.js'
// import { Grid, Typography } from '@mui/material'

// ChartJS.register(CategoryScale, LinearScale, ArcElement, Title, Tooltip, Legend)
// const options = {
// 	responsive: true,
// 	plugins: {
// 		legend: {
// 			display: false,
// 			position: 'right' as const,
// 		},
// 		title: {
// 			display: false,
// 			text: 'Chart.js Line Chart',
// 			// position: 'right' as const,
// 		},
// 	},
// }

// export interface ChartPieDataType {
// 	label: string
// 	value: number
// 	color: string
// }

// interface ChartPieProps {
// 	data: ChartPieDataType[]
// 	unit?: string
// }

// export const ChartPie: FC<ChartPieProps> = ({ data, unit }) => {
// 	const dataSource = {
// 		labels: data.map(({ label }) => label),
// 		datasets: [
// 			{
// 				label: data[0].label,
// 				data: data.map(({ value }) => value),
// 				backgroundColor: data.map(({ color }) => color),
// 			},
// 		],
// 	}
// 	const total = data.reduce((p, c) => {
// 		return c.value + p
// 	}, 0)

// 	return (
// 		<Grid container spacing={4}>
// 			<Grid item xs={5}>
// 				<Pie data={dataSource} options={options} />
// 			</Grid>
// 			<Grid item xs={6}>
// 				<Typography variant="h5" sx={{ mb: 2 }}>
// 					Total = {total} {unit ?? 'Project'}
// 				</Typography>
// 				<LabelRight data={data} />
// 			</Grid>
// 		</Grid>
// 	)
// }

// const LabelRight: FC<{ data: ChartPieDataType[] }> = ({ data }) => {
// 	return (
// 		<>
// 			{data.map(({ label, value, color }) => {
// 				return (
// 					<Grid container justifyContent={'space-between'} sx={{ padding: 0.2 }} key={label}>
// 						<Grid item>
// 							<Grid container alignItems={'center'}>
// 								<Grid item sx={{ mr: 1 }}>
// 									<div
// 										style={{
// 											backgroundColor: color, //
// 											height: '10px',
// 											width: '10px',
// 											borderRadius: 100,
// 										}}
// 									/>
// 								</Grid>
// 								<Grid item>
// 									<Typography variant="body1" fontWeight={550}>
// 										{label}
// 									</Typography>
// 								</Grid>
// 							</Grid>
// 						</Grid>
// 						<Grid item>
// 							<Typography variant="body1" fontWeight={550}>
// 								{value}
// 							</Typography>
// 						</Grid>
// 					</Grid>
// 				)
// 			})}
// 		</>
// 	)
// }

// export default ChartPie
