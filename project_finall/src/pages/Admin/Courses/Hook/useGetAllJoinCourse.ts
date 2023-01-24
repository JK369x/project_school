import { useState, useEffect } from 'react'
import { useAppDispatch } from '../../../../store/useHooksStore'
import { isShowLoading, isCloseLoading } from '../../../../store/slices/loadingSlice'
import { getDocs, query, where, orderBy, limit } from "firebase/firestore";
import { CourseCollection } from '../../../../firebase/createCollection'
import { TypeCourses } from './useCreateCourse';
import axios from 'axios';
import { useParams } from 'react-router-dom';
export type CourseJoinType = {
    approval: boolean | null
    courseName: string | null
    id_user: string | null
    image_course: string | null
    name_join: string | null
}
//! & เพิ่ม id form input

//! uid คืออะไรที่เกี่ยวข้องกับตัวเอง

export const useGetAllJoinCourse = () => {
    const dispatch = useAppDispatch();
    const { id } = useParams<{ id: string }>();
    const [CourseLists, setCourseLists] = useState<CourseJoinType[]>([])

    useEffect(() => {
        getApprovalUserCourse()
    }, [])

    const getApprovalUserCourse = async () => {
        dispatch(isShowLoading());
        try {
            const url = `${import.meta.env.VITE_REACT_APP_API}course/getalljoincourse/${id}`
            axios.defaults.withCredentials = true
            //! edit form before post 
            const getAllCourse = await axios.get(url)
            const result = getAllCourse.data
            console.log("course all get list :", result)
            setCourseLists(
                result.map((e: any) => {
                    return {
                        ...e,
                        id_document: e.id_document
                    }
                }) as CourseJoinType[]
            )
        } catch (error) {
            console.log(error)
        } finally {
            dispatch(isCloseLoading())
        }
    }


    return { CourseLists, getApprovalUserCourse }
}

