import { useState, useEffect } from 'react'
import { useAppDispatch } from '../../../../store/useHooksStore'
import { isShowLoading, isCloseLoading } from '../../../../store/slices/loadingSlice'
import axios from 'axios';
import { TypeComment } from './usePostComment';

export const useGetAllComment = (id: string) => {
    const dispatch = useAppDispatch();
    const [viewcomment, setViewComment] = useState<TypeComment[]>([])

    useEffect(() => {
        getAllComment()
    }, [id])

    const getAllComment = async () => {
        dispatch(isShowLoading());
        try {
            const url = `${import.meta.env.VITE_REACT_APP_API}course/getallcomment/${id}`
            axios.defaults.withCredentials = true
            //! edit form before post 
            const getAllCourse = await axios.get(url)
            const result = getAllCourse.data
            setViewComment(
                result.map((e: any) => {
                    return {
                        ...e,
                    }
                }) as TypeComment[]
            )

        } catch (error) {
            console.log(error)
        } finally {
            dispatch(isCloseLoading())
        }
    }


    return { viewcomment, getAllComment }
}
