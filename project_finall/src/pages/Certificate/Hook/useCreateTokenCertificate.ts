import { useParams } from 'react-router-dom';

import axios from 'axios';
import { useAppDispatch } from '../../../store/useHooksStore';
import { useEffect, useState } from 'react';
import { isCloseLoading, isShowLoading } from '../../../store/slices/loadingSlice';

//! & เพิ่ม id form input

//! uid คืออะไรที่เกี่ยวข้องกับตัวเอง

export const useCreateTokenCertificate = () => {
    const dispatch = useAppDispatch();
    const { id } = useParams<{ id: string }>()
    // const [genToken, setGenToken] = useState()


    const getTokenCertificate = async (certificate: any) => {
        try {
            dispatch(isShowLoading());
            const url = `${import.meta.env.VITE_REACT_APP_API}user/gentokencertificate/${id}`
            axios.defaults.withCredentials = true
            const getDetailUser = await axios.post(url, certificate)
            const result = getDetailUser.data
            return result
            // setGenToken(
            //     result
            // )
        } catch (error) {
            console.log(error)
        } finally {
            dispatch(isCloseLoading())
        }
    }
    return { getTokenCertificate }
}

