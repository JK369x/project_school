import { useState, useEffect } from 'react'
import { useAppDispatch } from '../../store/useHooksStore'
import { isShowLoading, isCloseLoading } from '../../store/slices/loadingSlice'
import { getDocs, query, where, orderBy, limit } from "firebase/firestore";
import { CourseCollection } from '../../firebase/createCollection'
import { CourseListsType} from '../course/useGetCourse'

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
          
            const result = await getDocs(
                query(
                    CourseCollection,
                    where("approval", "==", false),
                )
            )
            setApprovalLists(
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
    return { ApprovalLists, getApprovalLists }
}

