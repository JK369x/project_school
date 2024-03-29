import { useState, useEffect } from 'react'
import { useAppDispatch } from '../../../../store/useHooksStore'
import { isShowLoading, isCloseLoading } from '../../../../store/slices/loadingSlice'
import axios from 'axios';

export const useGetStatusBtnCheckName = (id: string) => {
    const dispatch = useAppDispatch();
    const [btnStatus, setBtnStatus] = useState(false)

    useEffect(() => {
        getBtnCheckName()
    }, [id])

    const getBtnCheckName = async () => {
        dispatch(isShowLoading());
        try {
            const url = `${import.meta.env.VITE_REACT_APP_API}course/checknamebtn/${id}`
            axios.defaults.withCredentials = true
            //! edit form before post 
            const getAllCourse = await axios.get(url)
            const result = getAllCourse.data
            // console.log(" get btn:", result)
            setBtnStatus(result)

        } catch (error) {
            console.log(error)
        } finally {
            dispatch(isCloseLoading())
        }
    }


    return { btnStatus, getBtnCheckName }
}

