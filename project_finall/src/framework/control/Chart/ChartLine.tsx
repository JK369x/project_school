// import { FC } from 'react'
// import {
// 	Chart as ChartJS,
// 	CategoryScale,
// 	LinearScale,
// 	PointElement,
// 	LineElement,
// 	Title,
// 	Tooltip,
// 	Legend,
// } from 'chart.js'
// import { Line } from 'react-chartjs-2'
// import zoomPlugin from 'chartjs-plugin-zoom'

// ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, zoomPlugin)

// const options: any = {
// 	responsive: true,
// 	plugins: {
// 		legend: {
// 			display: false,
// 			position: 'right' as const,
// 		},
// 		title: {
// 			display: false,
// 			text: 'Chart.js Line Chart',
// 		},
// 		zoom: {
// 			pan: {
// 				enabled: true,
// 				mode: 'x',
// 			},
// 		},
// 	},
// 	scales: {
// 		x: {
// 			max: 4,
// 		},
// 	},
// }

// export interface ChartLineDataType {
// 	label: string
// 	value: number
// 	color: string
// 	dashLine?: boolean
// }

// interface ChartLineProps {
// 	data: ChartLineDataType[][]
// }

// export const ChartLine: FC<ChartLineProps> = ({ data }) => {
// 	let datasets: any[] = []
// 	data.forEach((e) => {
// 		let buildData: any = {
// 			label: e[0].label,
// 			data: e.map(({ value }) => value),
// 			borderColor: e[0].color,
// 		}
// 		if (e[0].dashLine) {
// 			buildData.borderDash = [3, 4]
// 		}
// 		datasets.push(buildData)
// 	})
// 	const dataSource = {
// 		labels: data[0].map(({ label }) => label),
// 		datasets,
// 	}
// 	return <Line options={options} data={dataSource} />
// }

// export default ChartLine
