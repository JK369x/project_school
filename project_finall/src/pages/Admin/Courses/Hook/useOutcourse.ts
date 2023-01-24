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


export const UserOutCourse = () => {
    const { uid, status, displayName, photoURL } = useAppSelector(({ auth }) => auth);
    const { uid_course } = useAppSelector(({ course }) => course);
    const dispatch = useAppDispatch()
    const outCourse = async (params: any) => {
        try {
            dispatch(isShowLoading())
            dispatch(openAlertSuccess('addCourseSuccess'))
            const url = `${import.meta.env.VITE_REACT_APP_API}course/outjoincourse/${params}`
            try {
                axios.defaults.withCredentials = true
                await axios.post(url)

            } catch (err) {
                console.log("🚀 ~ file: useOutcourse.ts:33 ~ outCourse ~ err", err)
                // return false
            }
        } catch (err) {
            console.log(err)
            dispatch(openAlertError('addCourseError'))
        } finally {
            dispatch(isCloseLoading())
        }
    }
    return { outCourse }
}


