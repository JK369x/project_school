import { db } from '../../../../firebase/config_firebase';
import { addDoc, setDoc, doc, deleteDoc, } from "firebase/firestore";
import { CourseCollection } from '../../../../firebase/createCollection'
import { openAlertError, openAlertSuccess } from '../../../../store/slices/alertSlice';
import { isCloseLoading, isShowLoading } from '../../../../store/slices/loadingSlice';
import { useAppDispatch, useAppSelector } from '../../../../store/useHooksStore'
import { Lookup, typeCourseOnline_Onside } from '../../../../types/type';
import axios from 'axios';

export interface TypeComment {
    id_document?: string
    name_user?: string
    ratting?: any
    comment_user?: string
    date_comment?: any
    reply?: string
    status_reply?: string
}

export const usePostComment = () => {
    const dispatch = useAppDispatch()
    const addComment = async (params: TypeComment, id_course: any) => {
        const id = id_course.id

        try {
            dispatch(isShowLoading())
            dispatch(openAlertSuccess('Add Comment !!'))
            console.log('addcourse !! ')
            const url = `${import.meta.env.VITE_REACT_APP_API}course/commentcourse/${id}`
            try {
                axios.defaults.withCredentials = true
                await axios.post<TypeComment>(url, params)
                return true
            } catch (err) {
                return false
            }
        } catch (err) {
            console.log(err)
            dispatch(openAlertError('Add Comment Error !! '))
        } finally {
            dispatch(isCloseLoading())
        }
    }
    return { addComment }
}


