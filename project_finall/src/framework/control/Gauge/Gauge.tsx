import { FC, useState, useEffect, useRef } from 'react'
import { Grid, Typography } from '@mui/material'

export interface ControlGaugeType {
	min: number
	max: number
	planText: string
	planValue: number
	value: number
	unit: string
	color: string
}

export const Gauge: FC<ControlGaugeType> = ({ min, max, planText, planValue, value, unit, color }) => {
	const ref = useRef(null)
	const refPlan = useRef(null)
	const [width, setWidth] = useState(0)
	const [widthPlan, setWidthPlan] = useState(0)

	useEffect(() => {
		setNewWidth()
		window.addEventListener('resize', setNewWidth)
	}, [])
	const setNewWidth = () => {
		let current: any = ref.current
		let currentPlan: any = refPlan.current
		setWidth(current.offsetWidth ?? 0)
		setWidthPlan(currentPlan.offsetWidth ?? 0)
	}

	const planPercent = (planValue / max) * 100
	const planOver50 = planPercent > 50
	const valuePercent = (value / max) * 100
	let plan = (planValue / max) * width
	if (planOver50) {
		plan = plan - widthPlan
	}

	const movePlan = planPercent < 10 || planPercent > 90

	return (
		<div style={{ height: '67px' }}>
			{/* label top */}
			<GaugeLabel min={min} max={max} unit={unit} />
			{/* Bar */}
			<Grid container style={{ height: '40px' }}>
				<Grid
					item
					xs={12}
					ref={ref}
					style={{ borderRadius: '5px', height: '40px', border: 'solid lightgrey 1px', overflow: 'hidden' }}
				>
					<Grid item style={{ width: `${valuePercent}%`, height: '38px', backgroundColor: color }}></Grid>
				</Grid>
				<Grid
					item
					style={{
						position: 'relative',
						zIndex: 1,
						top: movePlan ? -38 : -56,
						left: plan,
						width: 'fit-content',
					}}
					ref={refPlan}
				>
					<div>
						<Typography fontSize={12} color={'gray'}>
							{!movePlan ? `${planText} ${planValue}${unit}` : ' '}
						</Typography>
					</div>
					<div
						style={{
							borderLeft: `${planOver50 ? 'none' : 'dotted 2px #666'}`,
							borderRight: `${planOver50 ? 'dotted 2px #666' : 'none'}`,
							height: '36px',
							width: '100%',
						}}
					/>
					<div>
						<Typography fontSize={12} color={'gray'}>
							{movePlan ? `${planText} ${planValue}${unit}` : ''}
						</Typography>
					</div>
				</Grid>
			</Grid>
		</div>
	)
}

interface GaugeLabelProps {
	min: number
	max: number
	unit: string
}
const GaugeLabel: FC<GaugeLabelProps> = ({ min, max, unit }) => {
	return (
		<Grid container justifyContent={'space-between'}>
			<Grid item>
				<Typography fontSize={12} color={'gray'}>
					{min}
				</Typography>
			</Grid>
			<Grid item>
				<Typography fontSize={12} color={'gray'}>
					{max} {unit}
				</Typography>
			</Grid>
		</Grid>
	)
}

export default Gauge
