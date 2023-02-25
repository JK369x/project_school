import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from '../../../../firebase/config_firebase'
import { CourseCollection } from '../../../../firebase/createCollection'
import { useAppDispatch, useAppSelector } from "../../../../store/useHooksStore";
import { isCloseLoading, isShowLoading } from "../../../../store/slices/loadingSlice";
import { TypeCourses } from "./useCreateCourse";
import { CourseListsType } from "./useGetCourse";
import axios from "axios";

export const useGetCourseDetail = () => {
    const dispatch = useAppDispatch()
    const uid = useAppSelector(({ auth: { uid } }) => uid)
    const { id } = useParams<{ id: string }>();
    const [state, setState] = useState<CourseListsType>({
        title: "",
        subtitle: "",
        description: "",
        category: null,
        start_register: null,
        End_register: "",
        start_learn: null,
        end_learn: null,
        start_time: null,
        course_status: undefined,
        end_time: null,
        course_date: "",
        course_date_time: "",
        what_will_student_learn_in_your_course: [],
        the_course_consists: [],
        who_is_this_course: "",
        linkteammeeting: "",
        whataretherequirement: "",
        image: "",
        teaching_assistant: "",
        Pricing: 0,
        pricing: 0,
        create_byName: "",
        Approval: false,
        min_people: "",
        id: "",
        image_create: "",
        max_people: "",
        id_document: "",
        btn_quiz: false,
        btn_check_name: false,
        reject: "",
        location: "",
        create_by_id: "",
        updateDate: "",
        btn_comment: false,
        createDate: ""
    })

    useEffect(() => {
        if (id) {
            getCourse()
        }
    }, [id])


    const getCourse = async () => {
        try {
            dispatch(isShowLoading())
            const url = `${import.meta.env.VITE_REACT_APP_API}course/getdetailcourse/${id}`
            axios.defaults.withCredentials = true
            const getdetail = await axios.get(url)
            const result = getdetail.data
            console.log("🚀 ~ file: useGetCourseDtail.ts:62 ~ getCourse ~ result", result)
            if (result) {
                setState({ ...(result as any), id: result.id });
            }
        } catch (error) {
            console.log("🚀 ~ file: useGetDetailUser.ts:41 ~ getData ~ error", error)


        } finally {
            dispatch(isCloseLoading())
        }
    }
    return { state }

}