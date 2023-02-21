import { useState, useEffect } from 'react'
import axios from 'axios';
import { useAppDispatch } from '../../../store/useHooksStore';
import { isCloseLoading, isShowLoading } from '../../../store/slices/loadingSlice';

export const useGetAllJoinCourseCategory = () => {
    const dispatch = useAppDispatch();
    const [getJoinCategory, setGetJoinCategory] = useState([])

    useEffect(() => {
        getJoinCategoryCourse()
    }, [])

    const getJoinCategoryCourse = async () => {
        dispatch(isShowLoading());
        try {
            const url = `${import.meta.env.VITE_REACT_APP_API}course/userjoincoursebycategory`
            axios.defaults.withCredentials = true
            //! edit form before post 
            const getAllCourse = await axios.get(url)
            const result = getAllCourse.data
            setGetJoinCategory(result)

        } catch (error) {
            console.log(error)
        } finally {
            dispatch(isCloseLoading())
        }
    }


    return { getJoinCategory, getJoinCategoryCourse }
}
