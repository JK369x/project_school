import { useParams } from 'react-router-dom';
import axios from 'axios';
import { isCloseLoading, isShowLoading } from '../../../../store/slices/loadingSlice';
import { useAppDispatch } from './../../../../store/useHooksStore';
import { openAlertError, openAlertSuccess } from '../../../../store/slices/alertSlice';
export const useUpdateQuiz = () => {
    const dispatch = useAppDispatch()
    const { id, id_quiz } = useParams<{ id: string, id_quiz: string }>()
    const updateQuiz = async (params: any) => {
        try {
            dispatch(isShowLoading())
            const url = `${import.meta.env.VITE_REACT_APP_API}course/updatequiz/${id}/${id_quiz}`
            try {
                axios.defaults.withCredentials = true
                await axios.put(url, params)
                dispatch(openAlertSuccess('Update Quiz Success !!'))
                return true
            } catch (err) {
                console.log(err)
                dispatch(openAlertError('Error Update Quiz !!'))
                return false
            }
        } catch (error) {
            console.log("🚀 ~ file: useUpdateCourse.ts:26 ~ updateCourse ~ error:", error)
        } finally {
            dispatch(isCloseLoading())
        }
    }
    return { updateQuiz }
}