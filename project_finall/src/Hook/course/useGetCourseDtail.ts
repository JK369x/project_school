import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from '../../firebase/config_firebase'
import { CourseCollection } from '../../firebase/createCollection'
import { useAppDispatch, useAppSelector } from "../../store/useHooksStore";
import { isCloseLoading, isShowLoading } from "../../store/slices/loadingSlice";
import { TypeCourses } from "./useCreateCourse";

export const useGetCourseDetail = () => {
    const dispatch = useAppDispatch()
    const uid = useAppSelector(({ auth: { uid } }) => uid)
    const { id } = useParams<{ id: string }>();
    const [state, setState] = useState<TypeCourses>({
        title: "",
        subtitle: "",
        description: "",
        category: "",
        start_register: null,
        start_register_time: null,
        start_register_end: null,
        start_course: null,
        course_status: undefined,
        end_course: null,
        course_date: "",
        course_date_time: "",
        what_will_student_learn_in_your_course: {
            input_0: "",
            input_1: "",
            input_2: "",
            input_3: "",
        },
        the_course_consists: {
            input_0: "",
            input_1: "",
            input_2: "",
            input_3: "",
        },
        who_is_this_course: "",
        linkteammeeting: "",
        whataretherequirement: "",
        image: "",
        teaching_assistant: "",
        Pricing: 0,
        pricing: 0,
        create_by_name:"",
        Approval: false,
        min_people: "",
    })

    useEffect(() => {
        if (id) {
            getCourse()
        }
    }, [id])


    const getCourse = async () => {
        try {
            dispatch(isShowLoading())
            const result = await getDoc(
                doc(CourseCollection, id as string)
            )
            if (result.exists()) {
                setState({ ...(result.data() as any), id: result.id });
            } else {
                //
            }
        } catch (error) {
            console.log("🚀 ~ file: useGetDetailUser.ts:41 ~ getData ~ error", error)


        } finally {
            dispatch(isCloseLoading())
        }
    }
    return { state }

}