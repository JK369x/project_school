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
    const addQuiz = async (params: QuizType, id: any) => {
        console.log("🚀 ~ file: useCreateCourse.ts:49 ~ addCourse ~ params", params)
        try {
            dispatch(isShowLoading())
            dispatch(openAlertSuccess('addCourseSuccess'))
            console.log('quiz !! ')
            const url = `${import.meta.env.VITE_REACT_APP_API}course/createquiz/${id}`
            try {
                axios.defaults.withCredentials = true
                await axios.post<QuizType>(url, params)
                return true
            } catch (err) {
                return false
            }
        } catch (err) {
            console.log(err)
            dispatch(openAlertError('addCourseError'))
        } finally {
            dispatch(isCloseLoading())
        }
    }
    return { addQuiz }
}


