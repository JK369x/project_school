import { useState } from 'react'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { storage } from '../firebase/config_firebase'

// store
import { useAppDispatch, useAppSelector } from '../store/useHooksStore';
import { isShowLoading, isCloseLoading } from '../store/slices/loadingSlice'

interface UploadStateType {
	progress: number
	status: 'none' | 'running' | 'paused'
	downloadURL: string
	fileName: string
}

export const useUploadFile = () => {
	const dispatch = useAppDispatch()
	const [uploadState, setUploadState] = useState<UploadStateType>({
		progress: 0,
		status: 'none',
		downloadURL: '',
		fileName: '',
	})
	const uploadFile = async (file: File, path: string = '') => {
		try {
			dispatch(isShowLoading())
			const storageRef = ref(storage, `${path}${file.name}`)
			const uploadTask = uploadBytesResumable(storageRef, file)
			uploadTask.on(
				'state_changed',
				(snapshot) => {
					const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100

					switch (snapshot.state) {
						case 'paused':
							setUploadState({
								progress,
								status: 'paused',
								downloadURL: uploadState.downloadURL,
								fileName: uploadState.fileName,
							})
							break
						case 'running':
							setUploadState({
								progress,
								status: 'running',
								downloadURL: uploadState.downloadURL,
								fileName: uploadState.fileName,
							})
							break
					}
				},
				(error) => {
					// Handle unsuccessful uploads
				},
				() => {
					getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
						console.log('File available at', downloadURL)
						setUploadState({
							progress: 100,
							status: 'none',
							downloadURL,
							fileName: file.name,
						})
					})
				},
			)
		} catch (error) {
			console.log(error)
			return false
		} finally {
			dispatch(isCloseLoading())
		}
	}
	return { uploadFile, uploadState }
}
