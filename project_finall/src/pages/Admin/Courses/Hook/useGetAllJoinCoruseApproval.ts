import { useState, useEffect } from 'react'
import { useAppDispatch } from '../../../../store/useHooksStore'
import { isShowLoading, isCloseLoading } from '../../../../store/slices/loadingSlice'
import { getDocs, query, where, orderBy, limit } from "firebase/firestore";
import { CourseCollection } from '../../../../firebase/createCollection'
import { TypeCourses } from './useCreateCourse';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { CourseJoinType } from './useGetAllJoinCourse';

//! & เพิ่ม id form input

//! uid คืออะไรที่เกี่ยวข้องกับตัวเอง

export const useGetAllJoinCourseApproval = () => {
    const dispatch = useAppDispatch();
    const { id } = useParams<{ id: string }>();
    const [JoinCourseApproval, setJoinCourseApproval] = useState<CourseJoinType[]>([])

    useEffect(() => {
        getUserJoinCourseApproval()
    }, [])

    const getUserJoinCourseApproval = async () => {
        dispatch(isShowLoading());
        try {
            const url = `${import.meta.env.VITE_REACT_APP_API}course/getalljoincoursetrue/${id}`
            axios.defaults.withCredentials = true
            //! edit form before post 
            const getAllCourse = await axios.get(url)
            const result = getAllCourse.data
            console.log("course all get list :", result)
            setJoinCourseApproval(
                result.map((e: any) => {
                    return {
                        ...e,
                        id_document: e.join_course
                    }
                }) as CourseJoinType[]
            )
        } catch (error) {
            console.log(error)
        } finally {
            dispatch(isCloseLoading())
        }
    }


    return { JoinCourseApproval, getUserJoinCourseApproval }
}

