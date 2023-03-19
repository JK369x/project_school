import { db } from '../../../../firebase/config_firebase';
import { addDoc, setDoc, doc, deleteDoc, } from "firebase/firestore";
import { CourseCollection } from '../../../../firebase/createCollection'
import { openAlertError, openAlertSuccess } from '../../../../store/slices/alertSlice';
import { isCloseLoading, isShowLoading } from '../../../../store/slices/loadingSlice';
import { useAppDispatch, useAppSelector } from '../../../../store/useHooksStore'
import { Lookup, typeCourseOnline_Onside } from '../../../../types/type';
import axios from 'axios';
import { QuizType } from '../Quiz';



export const useCreateQuiz = () => {
    const { uid, status, displayName, photoURL } = useAppSelector(({ auth }) => auth);
    const dispatch = useAppDispatch()
    const addQuiz = async (params: any, id: any, { start_quiz, end_quiz }: any, title: any) => {
        console.log("🚀 ~ file: useCreateQuiz.ts:17 ~ addQuiz ~ title", title)
        const newdata = title.title
        console.log("######title", newdata)
        try {
            dispatch(isShowLoading())
            dispatch(openAlertSuccess('create quiz!!'))
            console.log('quiz !! ')
            const url = `${import.meta.env.VITE_REACT_APP_API}course/createquiz/${id}`
            try {
                axios.defaults.withCredentials = true
                await axios.post<any>(url, { params, start_quiz, end_quiz, newdata, uid })
                return true
            } catch (err) {
                return false
            }
        } catch (err) {
            console.log(err)
            dispatch(openAlertError('check detail quiz!!'))
        } finally {
            dispatch(isCloseLoading())
        }
    }
    return { addQuiz }
}


