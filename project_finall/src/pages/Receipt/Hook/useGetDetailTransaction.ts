import { useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../../store/useHooksStore';
import { useParams } from 'react-router-dom';
import { isCloseLoading, isShowLoading } from '../../../store/slices/loadingSlice';
import axios from 'axios';
import { ReceiptType } from './useGetAllReceiptByIdUser';


//! & เพิ่ม id form input

//! uid คืออะไรที่เกี่ยวข้องกับตัวเอง

export const useGetDetailTransaction = (id_document: any) => {
    console.log("🚀 ~ file: useGetDetailTransaction.ts:14 ~ useGetDetailTransaction ~ id_document:", id_document)
    const uid = useAppSelector(({ auth: { uid } }) => uid)

    const dispatch = useAppDispatch();
    const [ReceiptUser, setReceiptUser] = useState<ReceiptType>({
        date: "",
        image_url: "",
        pricing: 0,
        image_course: "",
        courseName: "",
        date_transaction: "",
        transaction: "",
    })
    useEffect(() => {
        getReceiptUser()
    }, [uid])
    const getReceiptUser = async () => {
        dispatch(isShowLoading());
        try {
            const url = `${import.meta.env.VITE_REACT_APP_API}user/getdetailtransaction/${uid}/${id_document}`
            axios.defaults.withCredentials = true
            //! edit form before post 
            const getAllCourse = await axios.get(url)
            const result = getAllCourse.data
            setReceiptUser(
                result
            )
        } catch (error) {
            console.log(error)
        } finally {
            dispatch(isCloseLoading())
        }
    }


    return { ReceiptUser, getReceiptUser }
}

