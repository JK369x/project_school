import { FC } from 'react'

// mui & control
import { Paper, ClickAwayListener } from '@mui/material'

interface ControlPopoverProps {
	open: boolean
	positions: {
		top: number
		left: number
	}
	children: any
	handleOnClose: () => void
}
export const Popover: FC<ControlPopoverProps> = ({ open, positions: { top, left }, children, handleOnClose }) => {
	const handleClose = () => {
		console.log('onClickAway')
		handleOnClose()
	}
	// check condition display someting
	// ex. scale up/down screen

	// anchorEL
	if (!open) return null
	return (
		<div style={{ position: 'absolute', top, left }}>
			<ClickAwayListener onClickAway={handleClose}>
				<Paper>{children}</Paper>
			</ClickAwayListener>
		</div>
	)
}

export default Popover
