import { useState, useEffect } from 'react'
import { useAppDispatch } from '../../store/useHooksStore'
import { isShowLoading, isCloseLoading } from '../../store/slices/loadingSlice'
import { getDocs, query, where, orderBy, limit } from "firebase/firestore";
import { IFormInput } from '../user/useCreateAcc'
import { CourseCollection } from '../../firebase/createCollection'
import { TypeCourses } from './useCreateCourse';
export type CourseListsType = {
    id: string
    approval? : any
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
            /* Getting the documents from the AccountCollection and ordering them by the createdate field
            in descending order. */
            const result = await getDocs(
                query(
                    CourseCollection,
                    orderBy("timestamp", "desc"),
                )
            )
            setCourseLists(
                result.docs.map((e) => {
                    return {
                        ...e.data(),
                        id: e.id,
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

