import { useState, useEffect } from 'react'
import axios from 'axios';
import { useAppDispatch } from '../../../store/useHooksStore';
import { isCloseLoading, isShowLoading } from '../../../store/slices/loadingSlice';

export const useGetScoreById = (id: string) => {
    console.log("id user", id)
    const dispatch = useAppDispatch();
    const [scoreall, setScoreAll] = useState([])

    useEffect(() => {
        getAllScore()
    }, [id])

    const getAllScore = async () => {
        dispatch(isShowLoading());
        try {
            const url = `${import.meta.env.VITE_REACT_APP_API}course/getscorebyid/${id}`
            axios.defaults.withCredentials = true
            //! edit form before post 
            const getAllCourse = await axios.get(url)
            const result = getAllCourse.data
            setScoreAll(
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


    return { scoreall, setScoreAll }
}
