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
    const { uid, status, displayName, photoURL } = useAppSelector(({ auth }) => auth);
    const { uid_course } = useAppSelector(({ course }) => course);
    const dispatch = useAppDispatch()
    const joinCourse = async (params: any) => {
        console.log("🚀 ~ file: useJoinCourse.ts:21 ~ joinCourse ~ params", params)
        try {
            dispatch(isShowLoading())
            dispatch(openAlertSuccess('addCourseSuccess'))
            const url = `${import.meta.env.VITE_REACT_APP_API}course/joincourse/${params}`
            try {
                axios.defaults.withCredentials = true
                await axios.post(url)
                // dispatch(setCourseStore({
                //     uid_course: params.id
                // }))

            } catch (err) {
                console.log("🚀 ~ file: useJoinCourse.ts:34 ~ joinCourse ~ err", err)

            }
        } catch (err) {
            console.log(err)
            dispatch(openAlertError('addCourseError'))
        } finally {
            dispatch(isCloseLoading())
        }
    }
    return { joinCourse }
}


