import { db } from '../../../../firebase/config_firebase';
import { addDoc, setDoc, doc, deleteDoc, } from "firebase/firestore";
import { CourseCollection } from '../../../../firebase/createCollection'
import { openAlertError, openAlertSuccess } from '../../../../store/slices/alertSlice';
import { isCloseLoading, isShowLoading } from '../../../../store/slices/loadingSlice';
import { useAppDispatch, useAppSelector } from '../../../../store/useHooksStore'
import { Lookup, typeCourseOnline_Onside } from '../../../../types/type';
import axios from 'axios';
import { setCourseStore } from '../../../../store/slices/courseSlice';
import { useEffect } from 'react';

//uid_course?: string
//join_course?: string


export const UserJoinCourse = () => {
    const dispatch = useAppDispatch()
    const joinCourse = async (params: any) => {
        try {
            dispatch(isShowLoading())
            const url = `${import.meta.env.VITE_REACT_APP_API}course/joincourse/${params}`
            axios.defaults.withCredentials = true
            const data = await axios.post(url)
            const result = data.data
            return true
        } catch (err: any) {
            const data = err.response.data.message
            return data
        } finally {
            dispatch(isCloseLoading())
        }
    }
    return { joinCourse }
}


