import { useState, useEffect } from 'react'
import { useAppDispatch } from '../../../../store/useHooksStore'
import { isShowLoading, isCloseLoading } from '../../../../store/slices/loadingSlice'
import { getDocs, query, where, orderBy, limit } from "firebase/firestore";
import { CourseCollection } from '../../../../firebase/createCollection'
import { TypeCourses } from './useCreateCourse';
import axios from 'axios';
import { useParams } from 'react-router-dom';
export interface CourseJoinType {
    approval: boolean | null
    courseName: string | null
    id_user: string
    image_course: string
    name_join: string | null
    id_document: string
    transaction: boolean | null
    transaction_image: string
    count_number: number | string
    image: any
    date_transaction: any
    pricing: number | string
    image_user?: any
}


export const useGetAllJoinCourse = () => {
    const dispatch = useAppDispatch();
    const { id } = useParams<{ id: string }>();
    const [JoinCourse, setJoinCourse] = useState<CourseJoinType[]>([])

    useEffect(() => {
        getUserJoinCourse()
    }, [])

    const getUserJoinCourse = async () => {
        dispatch(isShowLoading());
        try {
            const url = `${import.meta.env.VITE_REACT_APP_API}course/getalljoincourse/${id}`
            axios.defaults.withCredentials = true
            //! edit form before post 
            const getAllCourse = await axios.get(url)
            const count = getAllCourse.data.length
            const result = getAllCourse.data
            console.log("course all get list :", result)
            setJoinCourse(
                result.map((e: any) => {
                    return {
                        ...e,
                        count_number: count,
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


    return { JoinCourse, getUserJoinCourse }
}

