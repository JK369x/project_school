import { useState, useEffect } from 'react'
import { useAppDispatch } from '../../../../store/useHooksStore'
import { isShowLoading, isCloseLoading } from '../../../../store/slices/loadingSlice'
import axios from 'axios';

export const useGetStatusBtnComment = (id: string) => {
    const dispatch = useAppDispatch();
    const [btnComment, setBtnComment] = useState(false)

    useEffect(() => {
        getBtnComment()
    }, [id])

    const getBtnComment = async () => {
        dispatch(isShowLoading());
        try {
            const url = `${import.meta.env.VITE_REACT_APP_API}course/btncomment/${id}`
            axios.defaults.withCredentials = true
            //! edit form before post 
            const getAllCourse = await axios.get(url)
            const result = getAllCourse.data
            setBtnComment(result)

        } catch (error) {
            console.log(error)
        } finally {
            dispatch(isCloseLoading())
        }
    }


    return { btnComment, getBtnComment }
}
