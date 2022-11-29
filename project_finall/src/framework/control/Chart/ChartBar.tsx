import { FC } from 'react'

import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'
import { Bar } from 'react-chartjs-2'
import ChartDataLabels from 'chartjs-plugin-datalabels'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const options = {
	responsive: true,
	plugins: {
		legend: {
			display: false,
			position: 'top' as const,
		},
		title: {
			display: false,
			text: 'Chart.js Bar Chart',
		},
		hover: {
			diaplay: false,
		},
	},
}

export interface ChartBarDataType {
	label: string
	value: number
	color?: string
}

interface ChartBarProps {
	data: ChartBarDataType[]
}

export const ChartBar: FC<ChartBarProps> = ({ data }) => {
	const a: any = ChartDataLabels
	a.defaults.align = 'top'
	a.defaults.anchor = 'end'

	const defaultColor = '#091d36'

	// build data
	let dataSource = {
		labels: data.map(({ label }) => label),
		datasets: [
			{
				label: data[0].label,
				data: data.map(({ value }) => value),
				backgroundColor: data.map(({ color }) => color ?? defaultColor),
			},
		],
	}

	return <Bar options={options} data={dataSource} plugins={[a]} />
}

export default ChartBar
