import { useState, useEffect } from 'react'
import { useAppDispatch } from '../../../../store/useHooksStore'
import { isShowLoading, isCloseLoading } from '../../../../store/slices/loadingSlice'
import { getDocs, query, where, orderBy, limit } from "firebase/firestore";
import { CourseCollection } from '../../../../firebase/createCollection'
import { CourseListsType } from '../../Courses/Hook/useGetCourse'
import axios from 'axios';

//! & เพิ่ม id form input

//! uid คืออะไรที่เกี่ยวข้องกับตัวเอง

export const useGetApproval = () => {
    const dispatch = useAppDispatch();
    const [ApprovalLists, setApprovalLists] = useState<CourseListsType[]>([])
    useEffect(() => {
        getApprovalLists()
    }, [])

    const getApprovalLists = async () => {
        dispatch(isShowLoading());
        try {
            const url = `${import.meta.env.VITE_REACT_APP_API}course/getapprovalfalse`
            axios.defaults.withCredentials = true
            const getapproval_false = await axios.get(url)
            const result = getapproval_false.data
            setApprovalLists(
                result.map((e: any) => {
                    return {
                        ...e,
                    }
                }) as CourseListsType[]
            )
        } catch (error) {
            console.log(error)
        } finally {
            dispatch(isCloseLoading())
        }
    }
    return { ApprovalLists, getApprovalLists }
}

