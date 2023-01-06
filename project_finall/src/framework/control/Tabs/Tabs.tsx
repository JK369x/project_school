import { FC, useState } from 'react'

import { Box, Tabs as MuiTabs, Tab, Typography } from '@mui/material'

export interface TabsDataType {
	title: string
	content: any
}

export interface TabsProps {
	data: TabsDataType[]
	defaultTabNumber?: number
}

export const Tabs: FC<TabsProps> = ({ data }) => {
	const [value, setValue] = useState<number>(0)
	return (
		<>
			<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
				<MuiTabs value={value} variant="fullWidth">
					{data.map((dataTab, index) => (
						<Tab label={dataTab.title} style={{ textTransform: 'none' }} onClick={() => setValue(index)} />
					))}
				</MuiTabs>
			</Box>
			{data.map((dataTab, index) => (
				<div
					key={`${dataTab.title}-${index}`}
					role="tabpanel"
					hidden={value !== index}
					id={`simple-tabpanel-${index}`}
					aria-labelledby={`simple-tab-${index}`}
				>
					{value === index && <Box sx={{ py: 3 }}>{dataTab.content}</Box>}
				</div>
			))}
		</>
	)
}

export default Tabs
