import { useParams } from 'react-router-dom';

import axios from 'axios';
import { useAppDispatch } from '../../../store/useHooksStore';
import { useEffect, useState } from 'react';
import { isCloseLoading, isShowLoading } from '../../../store/slices/loadingSlice';



export const verifyCertificate = () => {
    const dispatch = useAppDispatch();
    const [verify_Cer, setVerify_Cer] = useState()


    const verifyCer = async (id_user: string, token: any, id_course: string) => {
        try {
            dispatch(isShowLoading());
            const url = `${import.meta.env.VITE_REACT_APP_API}user/verifycertificateuser/${id_user}/${id_course}/${token}`
            axios.defaults.withCredentials = true
            const getDetailUser = await axios.get(url)
            const result = getDetailUser.data
            return result
            // setVerify_Cer(
            //     result
            // )
        } catch (error) {
            console.log(error)
        } finally {
            dispatch(isCloseLoading())
        }
    }
    return { verify_Cer, verifyCer }
}

