import { async } from '@firebase/util';
import { useState, useEffect } from 'react'
import { Lookup } from '../../../../types/type'
import axios from 'axios'

import { useAppDispatch } from '../../../../store/useHooksStore'
import { isShowLoading, isCloseLoading } from '../../../../store/slices/loadingSlice'



interface LocationDatatype {
	amphure: {
		tambon: {
			amphure_id: number
			id: number
			name_th: string
			zip_code: number
		}[]
		province_id: number
		id: number
		name_th: string
	}[]
	id: number
	name_th: string
}

export const useLocationLookup = () => {
	const dispatch = useAppDispatch()
	const [data, setData] = useState<LocationDatatype[]>([])
	const [province, setProvince] = useState<Lookup[]>([])
	const [amphure, setAmphure] = useState<Lookup[]>([])
	const [tambon, setTambon] = useState<Lookup[]>([])
	const [zipcode, setZipcode] = useState<Lookup[]>([])

	useEffect(() => {
		getData()
	}, [])

	const getData = async () => {
		try {
			dispatch(isShowLoading())
			const url = `${import.meta.env.VITE_REACT_APP_API}provice/getapiprovince/`
			const result = await axios.get(url)
			console.log("🚀 ~ file: useLocationLookup.ts:44 ~ getData ~ result", result)
			setData(result.data)
			console.log(province)
			setProvince(result.data.map((e: LocationDatatype) => ({ id: e.id, label: e.name_th })))
		} catch (error) {
			console.log(error)
		} finally {
			dispatch(isCloseLoading())
		}
	}

	const getAmphure = async (id: number) => {
		if (data.length > 0) {
			const newdata = data.filter((e) => e.id === id)[0]
			setAmphure(newdata.amphure.map((e: any) => ({ id: e.id, label: e.name_th })))
		} else {
			const newdata = data.filter((e) => e.id === id)[0]
			setAmphure(newdata.amphure.map((e: any) => ({ id: e.id, label: e.name_th })))
		}
	}

	const getTambon = (pid: number, aid: number) => {
		const filterProvince = data.filter((e) => e.id === pid)[0]
		const filterAmphure = filterProvince.amphure.filter((e) => e.id == aid)[0]
		setTambon(filterAmphure.tambon?.map((e: any) => ({ id: e.id, label: e.name_th, zipcode: e.zip_code }))) //!เราเอาค่าตำบลนี้ไปใช้ต่อจาก zip_code เลยใช้ zipcode แทน
	}
	const getZipcode = (tid: number) => {

		const filltertambon = tambon.filter((e) => e.id === tid)
		const fillterzipcode = filltertambon.map((e: any) => ({ id: e.id, label: e.zipcode }))
		//! find return {}
		//! filter return [{}]
		setZipcode(fillterzipcode)
	}
	return { data, province, amphure, getAmphure, tambon, getTambon, zipcode, getZipcode, getData }
}


