import { FC, Fragment, useState, useRef } from 'react'
import { useTranslation } from 'react-i18next'

// mui & control
import { Grid, List, ListItem, ListItemButton, Typography, Divider, MenuList, MenuItem } from '@mui/material'
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded'
import Popover from '../Popover/Popover'

// buildInComp
import ItemComp from './ItemComp'

interface DataSourceFileManageControl {
	label: string
	data: {
		label: string
		type?: string
	}[]
}
interface FileManageControlProps {
	dataSource: DataSourceFileManageControl[]
}
interface ContextMenuStateType {
	open: boolean
	positions: {
		top: number
		left: number
	}
	children: any
}
export const FileManageControl: FC<FileManageControlProps> = ({ dataSource }) => {
	const { t } = useTranslation()
	const headButtonRef = useRef(null)
	const [contextMenuState, setContextMenuState] = useState<ContextMenuStateType>({
		open: true,
		positions: {
			top: 0,
			left: 0,
		},
		children: <ConTextMenuComp />,
	})
	const handleCloseContextMenu = () => {
		setContextMenuState({ ...contextMenuState, open: false })
	}
	const handleOpenContextMenuFields = (positions: { top: number; left: number }) => {
		setContextMenuState({ ...contextMenuState, open: true, positions })
	}
	return (
		<Grid container>
			<Grid item container alignItems={'center'}>
				<List>
					<ListItem
						disablePadding
						ref={headButtonRef}
						onClick={(e) => {
							console.log(e)
							// console.log(headButtonRef.current)
							// if (headButtonRef.current) {
							// 	const { offsetTop, offsetLeft } = headButtonRef.current
							// 	// console.log(offsetTop, offsetLeft)
							// 	const refCurrent: any = headButtonRef.current
							// 	console.log(refCurrent.pageX)
							// }
							// const target: any = e.target
							// console.log(target.clientHeight)
							// console.log(target.clientWidth)

							// handleOpenContextMenuFields({ top: target.clientHeight, left: target.clientWidth })
						}}
					>
						<ListItemButton sx={{ height: '36px', borderRadius: '10px', pr: 0.2 }}>
							<Typography variant="subtitle1">{t('myIot')}</Typography>
							<ArrowDropDownRoundedIcon fontSize="large" sx={{ pt: 0.5 }} />
						</ListItemButton>
					</ListItem>
				</List>
			</Grid>
			<Grid item xs={12}>
				<Divider />
			</Grid>
			<Grid
				item
				xs={12}
				// onContextMenu={contextMenu}
				sx={{ height: 'calc(100vh - 117px)' }}
			>
				{/* data */}
				{dataSource.map(({ label, data }, index) => {
					return (
						<Fragment key={`${label}-${index}`}>
							<Grid container>
								<Typography variant="subtitle2" sx={{ mt: 4, mb: 1 }}>
									&nbsp;{label}
								</Typography>
							</Grid>
							<Grid container spacing={2} sx={{ pr: 2 }}>
								{data.map(({ label: dataLabel }, i) => {
									return <ItemComp key={`${index}-${i}-${dataLabel}`} />
								})}
							</Grid>
						</Fragment>
					)
				})}

				{/* context menu */}
				<Popover {...contextMenuState} handleOnClose={handleCloseContextMenu} />
			</Grid>
		</Grid>
	)
}

const ConTextMenuComp: FC = () => {
	return (
		<MenuList>
			<MenuItem>เพิ่มหมวดหมู่</MenuItem>
			<MenuItem>เพิ่มอุปกรณ์</MenuItem>
			<MenuItem>เพิ่มแผงควบคุม</MenuItem>
		</MenuList>
	)
}

export default FileManageControl
