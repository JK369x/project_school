import { useState, useEffect } from 'react'
import { useAppDispatch } from '../../../../store/useHooksStore'
import { isShowLoading, isCloseLoading } from '../../../../store/slices/loadingSlice'
import { getDocs, query, where, orderBy, limit } from "firebase/firestore";
import { CourseCollection } from '../../../../firebase/createCollection'
import { TypeCourses } from './useCreateCourse';
import axios from 'axios';
export type CourseListsType = {
    id: string
    approval?: any
    id_document: string
    updateDate: any
    btn_comment: any
    createDate: any
} & TypeCourses
//! & เพิ่ม id form input

//! uid คืออะไรที่เกี่ยวข้องกับตัวเอง

export const useGetCourseLists = () => {
    const dispatch = useAppDispatch();
    const [CourseLists, setCourseLists] = useState<CourseListsType[]>([])

    useEffect(() => {
        getCourseLists()
    }, [])

    const getCourseLists = async () => {
        dispatch(isShowLoading());
        try {
            const url = `${import.meta.env.VITE_REACT_APP_API}course/getallcourse`
            axios.defaults.withCredentials = true
            const getAllCourse = await axios.get(url)
            const result = getAllCourse.data
            console.log("course all get list :", result)
            setCourseLists(
                result.map((e: any) => {
                    return {
                        ...e,
                        id_document: e.id_document
                    }
                }) as CourseListsType[]
            )
        } catch (error) {
            console.log(error)
        } finally {
            dispatch(isCloseLoading())
        }
    }

    return { CourseLists, getCourseLists }
}

