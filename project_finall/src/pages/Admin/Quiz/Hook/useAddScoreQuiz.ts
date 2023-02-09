import { db } from '../../../../firebase/config_firebase';
import { addDoc, setDoc, doc, deleteDoc, } from "firebase/firestore";
import { CourseCollection } from '../../../../firebase/createCollection'
import { openAlertError, openAlertSuccess } from '../../../../store/slices/alertSlice';
import { isCloseLoading, isShowLoading } from '../../../../store/slices/loadingSlice';
import { useAppDispatch, useAppSelector } from '../../../../store/useHooksStore'
import axios from 'axios';
import { useParams } from 'react-router-dom';



export const useAddScoreQuiz = () => {
    const dispatch = useAppDispatch()
    const { uid, status, displayName, photoURL } = useAppSelector(({ auth }) => auth);

    const { id, id_quiz } = useParams<{ id: string, id_quiz: string }>();
    const addScore = async (params: any) => {
        try {
            dispatch(isShowLoading())
            console.log("id user = ", uid)
            console.log('test')
            dispatch(openAlertSuccess('send score your quiz!!'))
            const url = `${import.meta.env.VITE_REACT_APP_API}course/createscorequiz/${uid}`
            try {
                axios.defaults.withCredentials = true
                await axios.post<any>(url, params)
                return true
            } catch (err) {
                return false
            }
        } catch (err) {
            console.log(err)
            dispatch(openAlertError('error save score'))
        } finally {
            dispatch(isCloseLoading())
        }
    }
    return { addScore }
}


