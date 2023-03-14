
import { isCloseLoading, isShowLoading } from '../../../../store/slices/loadingSlice';
import { useAppDispatch, useAppSelector } from '../../../../store/useHooksStore'
import axios from 'axios';

export const UserOutCourse = () => {

    const dispatch = useAppDispatch()
    const outCourse = async (params: any) => {
        try {
            dispatch(isShowLoading())
            const url = `${import.meta.env.VITE_REACT_APP_API}course/outjoincourse/${params}`
            axios.defaults.withCredentials = true
            await axios.post(url)
        } catch (err) {
            console.log(err)
        } finally {
            dispatch(isCloseLoading())
        }
    }
    return { outCourse }
}


