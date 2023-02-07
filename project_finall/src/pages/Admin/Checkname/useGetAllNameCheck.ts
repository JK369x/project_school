import { useState, useEffect } from 'react'
import axios from 'axios';
import { useAppDispatch } from '../../../store/useHooksStore';
import { isCloseLoading, isShowLoading } from '../../../store/slices/loadingSlice';

export const useGetAllNameCheck = (id: string) => {
    const dispatch = useAppDispatch();
    const [viewnamecheck, setViewNameCheck] = useState([])

    useEffect(() => {
        getAllNameCheck()
    }, [id])

    const getAllNameCheck = async () => {
        dispatch(isShowLoading());
        try {
            const url = `${import.meta.env.VITE_REACT_APP_API}course/getallnamecheck/${id}`
            axios.defaults.withCredentials = true
            //! edit form before post 
            const getAllCourse = await axios.get(url)
            const result = getAllCourse.data
            setViewNameCheck(
                result.map((e: any) => {
                    return {
                        ...e,
                    }
                })
            )
        } catch (error) {
            console.log(error)
        } finally {
            dispatch(isCloseLoading())
        }
    }


    return { viewnamecheck, getAllNameCheck }
}
