// import { FC, useState, useEffect } from 'react'
// import { useTranslation } from 'react-i18next'

// // hook
// import { UseFormReturn } from 'react-hook-form'
// import { Lookup } from '../../../hooks/type'
// import { LedgerFormType } from '../../../hooks/Pockets/useAddLedger'
// import { useLocationLookup } from '../../../hooks/lookup/useLocationLookup'

// // mui & control
// import { Grid, FormControlLabel, Checkbox as MuiCheckbox } from '@mui/material'
// import { ControllerRadio, ControllerAutocomplete, ControllerTextField, Button } from '../../../framework/control'

// const revenueTypeLookup: Lookup[] = [
// 	{ id: 'salary', label: 'เงินเดือน' },
// 	{ id: 'busines', label: 'ธุรกิจ/งานพิเศษ' }, //ถ้าเลือกอันนี้ จะมีให้บอกประเภทด้วย
// 	{ id: 'invest', label: 'ลงทุน' },
// 	{ id: 'loan', label: 'เงินกู้' },
// 	{ id: 'other', label: 'อื่นๆ' }, //ถ้าเลือกอันนี้ จะมีให้บอกประเภทด้วย
// ]

// const expensesTypeLookup: Lookup[] = [
// 	{ id: 'consumerGoods', label: 'ของกิน/ของใช้' },
// 	{ id: 'general', label: 'ใช้จ่ายทั่วไป' },
// 	{ id: 'busines', label: 'ธุรกิจ/งานพิเศษ' }, //ถ้าเลือกอันนี้ จะมีให้บอกประเภทด้วย
// 	{ id: 'invest', label: 'ลงทุน' },
// 	{ id: 'loan', label: 'จ่ายหนี้' },
// 	{ id: 'other', label: 'อื่นๆ' }, //ถ้าเลือกอันนี้ จะมีให้บอกประเภทด้วย
// ]

// const typeLedger = [
// 	{ id: 'revenue', label: 'รายรับ' },
// 	{ id: 'expenses', label: 'รายจ่าย' },
// ]

// interface FormLedgerCompProps {
// 	formLedger: UseFormReturn<LedgerFormType, object>
// 	onSubmit: () => void
// 	data: LedgerFormType[]
// }
// const FormLedger: FC<FormLedgerCompProps> = ({ formLedger, onSubmit, data }) => {
// 	const { t } = useTranslation()
// 	const { getValues, watch, setValue, handleSubmit } = formLedger
// 	const [revenueAndExpensesTypeDetailLists, setRevenueAndExpensesTypeDetailLists] = useState<Lookup[]>([])

// 	const { province, amphure, getAmphure, tambon, getTambon } = useLocationLookup()

// 	const revenueOrExpensesType = watch('revenueOrExpensesType')
// 	const revenueAndExpensesType = watch('revenueAndExpensesType')
// 	const checked = watch('useCredits')

// 	const changeProvince = watch('province')
// 	const changeAmphure = watch('amphure')

// 	useEffect(() => {
// 		if (changeProvince) {
// 			getAmphure(parseInt(`${changeProvince.id}`))
// 		}
// 	}, [changeProvince])

// 	useEffect(() => {
// 		if (changeProvince && changeAmphure) {
// 			getTambon(parseInt(`${changeProvince.id}`), parseInt(`${changeAmphure.id}`))
// 		}
// 	}, [changeAmphure])

// 	useEffect(() => {
// 		if (revenueOrExpensesType === 'revenue') {
// 			setValue('useCredits', false)
// 		}
// 	}, [revenueOrExpensesType])

// 	useEffect(() => {
// 		setValue('revenueAndExpensesTypeDetail', null)
// 		if (revenueAndExpensesType) {
// 			const datasets = data.filter(
// 				({ revenueAndExpensesType: a }) => a?.id === getValues('revenueAndExpensesType.id'),
// 			)
// 			const newDataOptions = datasets
// 				.map(({ revenueAndExpensesTypeDetail: re }) => ({
// 					id: re?.id ?? '',
// 					label: re?.label ?? '',
// 				}))
// 				.filter((e) => e.id !== '')
// 			const filterDup = newDataOptions.reduce(
// 				(unique: any, item) =>
// 					unique.filter((el: any) => el.id === item.id).length > 0 ? unique : [...unique, item],
// 				[],
// 			)
// 			setRevenueAndExpensesTypeDetailLists(filterDup)
// 		}
// 	}, [revenueAndExpensesType])

// 	return (
// 		<form style={{ width: '100%' }} onSubmit={handleSubmit(onSubmit)}>
// 			<Grid item container spacing={2}>
// 				<Grid container item xs={12}>
// 					<Grid item>
// 						<ControllerRadio
// 							formprop={formLedger}
// 							name={'revenueOrExpensesType'}
// 							options={typeLedger}
// 							onChange={() => {
// 								setValue('revenueAndExpensesType', null)
// 							}}
// 						/>
// 					</Grid>
// 					{revenueOrExpensesType === 'expenses' ? (
// 						<Grid item>
// 							<FormControlLabel
// 								control={<MuiCheckbox checked={checked} />}
// 								label={t('useCredit')}
// 								onChange={(e: any) => {
// 									setValue('useCredits', e.target.checked)
// 								}}
// 							/>
// 						</Grid>
// 					) : null}
// 				</Grid>
// 				<Grid item xs={12} md={3}>
// 					<ControllerAutocomplete
// 						formprop={formLedger}
// 						name={'revenueAndExpensesType'}
// 						label={revenueOrExpensesType === 'revenue' ? t('revenueType') : t('expensesType')}
// 						options={revenueOrExpensesType === 'revenue' ? revenueTypeLookup : expensesTypeLookup}
// 						fullWidth
// 					/>
// 				</Grid>
// 				<Grid item xs={12} md={3}>
// 					<ControllerAutocomplete
// 						formprop={formLedger}
// 						name={'revenueAndExpensesTypeDetail'}
// 						label={t('revenueOrExpensesTypeMore')}
// 						options={revenueAndExpensesTypeDetailLists} // load options
// 						fullWidth
// 						autoaddnewoption
// 					/>
// 				</Grid>
// 				<Grid item xs={12} md={3}>
// 					<ControllerTextField
// 						formprop={formLedger}
// 						name={'quantity'}
// 						label={t('quantity')}
// 						fullWidth={true}
// 						type={'number'}
// 						inputProps={{ style: { textAlign: 'right' } }}
// 					/>
// 				</Grid>
// 				<Grid item xs={12}>
// 					<ControllerTextField
// 						formprop={formLedger}
// 						name={'detail'}
// 						label={t('detail')}
// 						multiline={true}
// 						minRows={2}
// 						maxRows={4}
// 						fullWidth={true}
// 					/>
// 				</Grid>
// 				<Grid container>
// 					<ControllerAutocomplete
// 						formprop={formLedger}
// 						name={'province'}
// 						label={'จังหวัด'}
// 						options={province} // load options
// 						fullWidth
// 					/>
// 					<ControllerAutocomplete
// 						formprop={formLedger}
// 						name={'amphure'}
// 						label={'อำเภอ'}
// 						options={amphure} // load options
// 						fullWidth
// 					/>
// 					<ControllerAutocomplete
// 						formprop={formLedger}
// 						name={'tambon'}
// 						label={'ตำบล'}
// 						options={tambon} // load options
// 						fullWidth
// 					/>
// 				</Grid>
// 				<Grid item container justifyContent={'right'}>
// 					<Button label={t('addList')} primary type="submit" />
// 				</Grid>
// 			</Grid>
// 		</form>
// 	)
// }

// export default FormLedger
