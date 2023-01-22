import { db } from '../../../../firebase/config_firebase';
import { addDoc, setDoc, doc, deleteDoc, } from "firebase/firestore";
import { CourseCollection } from '../../../../firebase/createCollection'
import { openAlertError, openAlertSuccess } from '../../../../store/slices/alertSlice';
import { isCloseLoading, isShowLoading } from '../../../../store/slices/loadingSlice';
import { useAppDispatch, useAppSelector } from '../../../../store/useHooksStore'
import { Lookup, typeCourseOnline_Onside } from '../../../../types/type';
import axios from 'axios';

export interface TypeCourses {
    title: string,
    subtitle: string,
    description: string,
    category: Lookup | null,
    start_register: Date | any,
    End_register: Date | any,

    start_learn: Date | any,
    end_learn: Date | any,

    start_time: Date | any,
    end_time: Date | any,
    course_date?: string,
    course_date_time: string | null,
    course_status?: Lookup[],
    what_will_student_learn_in_your_course: string[],
    the_course_consists: string[],
    who_is_this_course: string,
    linkteammeeting: string,
    whataretherequirement: string,
    image: string,
    teaching_assistant?: string,
    Pricing: number,
    pricing: number,
    create_byName?: string,
    Approval: boolean,
    min_people: string,
    image_create: string,
    max_people: string,
}

export const UseCreateCourse = () => {
    const { uid, status, displayName, photoURL } = useAppSelector(({ auth }) => auth);
    const dispatch = useAppDispatch()
    const addCourse = async (params: TypeCourses) => {
        try {
            dispatch(isShowLoading())
            dispatch(openAlertSuccess('addCourseSuccess'))
            const url = `${import.meta.env.VITE_REACT_APP_API}course/addcourse`
            try {
                axios.defaults.withCredentials = true
                await axios.post<TypeCourses>(url, params)
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
    return { addCourse }
}


