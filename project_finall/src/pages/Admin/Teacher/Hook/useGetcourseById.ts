import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../../../store/useHooksStore";
import { isCloseLoading, isShowLoading } from "../../../../store/slices/loadingSlice";

import axios from "axios";
import { CourseListsType } from "../../Courses/Hook/useGetCourse";

export const useGetcourseById = () => {
    const dispatch = useAppDispatch()
    const uid = useAppSelector(({ auth: { uid } }) => uid)
    const { id } = useParams<{ id: string }>();
    const [CourseLists, setCourseLists] = useState<CourseListsType[]>([])


    useEffect(() => {
        if (id) {
            getCourse()
        }
    }, [id])


    const getCourse = async () => {
        try {
            dispatch(isShowLoading())
            const url = `${import.meta.env.VITE_REACT_APP_API}course/getcoursebyid/${id}`
            axios.defaults.withCredentials = true
            const getdetail = await axios.get(url)
            const result = getdetail.data
            console.log("🚀 ~ file: useGetCourseDtail.ts:62 ~ getCourse ~ result", result)
            if (result)
                setCourseLists(
                    result.map((e: any) => {
                        return {
                            ...e,
                            id_document: e.id_document
                        }
                    }) as CourseListsType[]

                )

        } catch (error) {
            console.log("🚀 ~ file: useGetDetailUser.ts:41 ~ getData ~ error", error)


        } finally {
            dispatch(isCloseLoading())
        }
    }
    return { CourseLists }

}