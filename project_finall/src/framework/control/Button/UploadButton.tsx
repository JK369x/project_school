import React, { FC, useRef, ChangeEvent } from 'react'
import { v4 as uuidv4 } from 'uuid'

// mui & control
import { Typography } from '@mui/material'
import MaterialButton, { ButtonProps } from '@mui/material/Button'

type TypeFile = 'image' | 'pdf' | 'excel' | 'zip' | 'xlsx'

interface ControlButtonProps {
	onUploadChange: (data: FileList | null) => void
	label?: string
	primary?: true
	secondary?: true
	info?: true
	warning?: true
	error?: true
	fullWidth?: true
	fileType?: TypeFile[]
	onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
	custom?: ButtonProps
	letterSpacing?: string | number
	varaint?: 'text' | 'outlined' | 'contained'
	multiple?: true
	acceptFile?: string[]
}
export const UploadButton: FC<ControlButtonProps> = ({
	label,
	primary,
	secondary,
	info,
	warning,
	error,
	fullWidth,
	fileType,
	onClick,
	custom,
	letterSpacing,
	varaint,
	multiple,
	acceptFile,
	onUploadChange,
}) => {
	const typeColor = primary
		? 'primary'
		: secondary
		? 'secondary'
		: info
		? 'info'
		: warning
		? 'warning'
		: error
		? 'error'
		: undefined

	const thisInput:
		| string
		| ((instance: HTMLInputElement | null) => void)
		| React.RefObject<HTMLInputElement>
		| null
		| undefined = useRef(null)

	const uniqueId = uuidv4()

	const handleChangeFile = (event: ChangeEvent<HTMLInputElement>) => {
		const listFile: FileList | null = event?.target?.files ?? null
		let validate = true
		// if (listFile && listFile[0]?.size > FileSizeLimit) {
		// 	setMessage(t('validate.sizeLimit'))
		// 	validate = false
		// }

		// if (listFile && fileType === 'zip') {
		// 	const nameFileSplit = listFile[0].name.split('.')
		// 	const typeFile = nameFileSplit[nameFileSplit.length - 1]
		// 	if (typeFile === 'rar' || typeFile === 'zip' || typeFile === '7zip' || typeFile === '7z') {
		// 		/**ใช้เงื่อนไข !== ไม่ได้ เพราะมันแจ้งerror เลยใช้ if else แบบนี้ไปก่อน */
		// 	} else {
		// 		setMessage(t('validate.fileTypeZip'))
		// 		validate = false
		// 	}
		// }

		// if (listFile && fileType === 'xlsx') {
		// 	const checkFile = listFile
		// 		? listFile[0].type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
		// 		: null
		// 	if (!checkFile) {
		// 		setMessage(t('validate.fileTypeXlsx'))
		// 		validate = false
		// 	}
		// }

		// if (listFile && fileType === 'pdf') {
		// 	const checkFile = listFile ? listFile[0].type === 'application/pdf' : null
		// 	if (!checkFile) {
		// 		setMessage(t('validate.fileTypePdf'))
		// 		validate = false
		// 	}
		// }

		// if (listFile && !fileType) {
		// 	const checkFile = listFile
		// 		? listFile[0].type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
		// 		: null
		// 	if (!checkFile) {
		// 		setMessage(t('validate.fileTypeEtc'))
		// 		validate = false
		// 	}
		// }

		if (onUploadChange && validate) {
			onUploadChange(listFile)
		}
		if (!validate) {
			// dialogFuncRef.current?.handleOpen()
		}
		if (thisInput.current) {
			thisInput.current.value = ''
		}
	}

	return (
		<>
			<input
				ref={thisInput}
				accept={acceptFile?.join(',') ?? ''}
				id={uniqueId}
				multiple={multiple}
				type="file"
				onChange={handleChangeFile}
				hidden
			/>

			<MaterialButton
				{...custom}
				color={typeColor}
				fullWidth={fullWidth}
				variant={varaint}
				sx={{ minHeight: '40px', minWidth: '120px' }}
				onClick={() => thisInput.current?.click()}
			>
				<Typography fontWeight={600} letterSpacing={letterSpacing} style={{ textTransform: 'none' }}>
					{label}
				</Typography>
			</MaterialButton>
		</>
	)
}

export default UploadButton
