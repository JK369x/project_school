import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react'
import axios from 'axios';
import { useAppDispatch } from '../../../store/useHooksStore';
import { isCloseLoading, isShowLoading } from '../../../store/slices/loadingSlice';

export const useGetNameCheckById = () => {
    const { id_course } = useParams<{ id_course: string }>()
    console.log("🚀 ~ file: useGetNameCheckById.ts:9 ~ useGetAllNameCheck ~ id_course", id_course)
    const { id_user } = useParams<{ id_user: string }>()
    console.log("🚀 ~ file: useGetNameCheckById.ts:11 ~ useGetAllNameCheck ~ id_user", id_user)
    const dispatch = useAppDispatch();
    const [IdnameCheck, setIdnameCheck] = useState([])

    useEffect(() => {
        getNameCheckById()
    }, [id_course])

    const getNameCheckById = async () => {
        dispatch(isShowLoading());
        try {
            const url = `${import.meta.env.VITE_REACT_APP_API}course/getnamecheckbyid/${id_course}/${id_user}`
            axios.defaults.withCredentials = true
            //! edit form before post 
            const getAllCourse = await axios.get(url)
            const result = getAllCourse.data
            setIdnameCheck(
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


    return { IdnameCheck, getNameCheckById }
}
