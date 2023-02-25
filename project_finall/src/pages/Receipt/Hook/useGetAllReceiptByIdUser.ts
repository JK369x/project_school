import { useState, useEffect } from 'react'
import { useAppDispatch } from '../../../store/useHooksStore';
import { useParams } from 'react-router-dom';
import { isCloseLoading, isShowLoading } from '../../../store/slices/loadingSlice';
import axios from 'axios';


//! & เพิ่ม id form input

//! uid คืออะไรที่เกี่ยวข้องกับตัวเอง
export interface ReceiptType {
    date: any
    image_url: string
    pricing: number | string
    image_course: string
    courseName: string
    date_transaction: string
    transaction: any
}
export const useGetAllReceiptByIdUser = () => {
    const dispatch = useAppDispatch();
    const { id } = useParams<{ id: string }>();
    const [ReceiptUser, setReceiptUser] = useState<ReceiptType[]>([])

    useEffect(() => {
        getReceiptUser()
    }, [])

    const getReceiptUser = async () => {
        dispatch(isShowLoading());
        try {
            const url = `${import.meta.env.VITE_REACT_APP_API}user/getjoincoursebyIduser/${id}`
            axios.defaults.withCredentials = true
            //! edit form before post 
            const getAllCourse = await axios.get(url)
            const result = getAllCourse.data
            setReceiptUser(
                result.map((e: any) => {
                    return {
                        ...e,
                    }
                }) as ReceiptType[]
            )
        } catch (error) {
            console.log(error)
        } finally {
            dispatch(isCloseLoading())
        }
    }


    return { ReceiptUser, getReceiptUser }
}

