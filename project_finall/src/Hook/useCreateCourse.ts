import { db } from '../firebase/config_firebase';
import { addDoc, setDoc, doc, deleteDoc, } from "firebase/firestore";
import { CourseCollection } from '../firebase/createCollection'
import { openAlertError, openAlertSuccess } from '../store/slices/alertSlice';
import { isCloseLoading, isShowLoading } from '../store/slices/loadingSlice';
import { useAppDispatch } from '../store/useHooksStore'
import { Lookup,typeCourseOnline_Onside } from '../types/type';

export interface TypeCourses {
    title: string,
    subtitle: string,
    description: string,
    category: any,
    start_register: Date | null,
    start_register_time: Date | null,
    start_register_end: Date | null,
    start_course: Date | null,
    end_course: Date | null,
    course_date?: string,
    course_date_time: string | null,
    course_status?: Lookup[] ,
    what_will_student_learn_in_your_course: {
        input_0: string,
        input_1: string,
        input_2?: string,
        input_3?: string,
    },
    the_course_consists: {
        input_0: string,
        input_1: string,
        input_2?: string,
        input_3?: string,
    },
    who_is_this_course: string,
    linkteammeeting: string,
    whataretherequirement: string,
    image: string,
    teaching_assistant?: string,
    Pricing: string,
}

export const UseCreateCourse = () => {
    const dispatch = useAppDispatch()
    const addCourse = async (params: TypeCourses) => {
        console.log("🚀 ~ file: useCreateCourse.ts:39 ~ addCourse ~ params", params)
        try {
            await setDoc(doc(CourseCollection), {
                ...params,
                timestamp: new Date(),
            })
            dispatch(isShowLoading())
            dispatch(openAlertSuccess('addCourseSuccess'))
        } catch (err) {
            console.log(err)
            dispatch(openAlertError('addCourseError'))
        } finally {
            dispatch(isCloseLoading())
        }
    }
    return { addCourse }
}


