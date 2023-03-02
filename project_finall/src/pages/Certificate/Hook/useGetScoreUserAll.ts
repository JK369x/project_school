
import axios from 'axios';
import { useAppDispatch } from '../../../store/useHooksStore';
import { useEffect, useState } from 'react';
import { isCloseLoading, isShowLoading } from '../../../store/slices/loadingSlice';
export type ScoreType = {
    createDate?: any
    full_score?: number
    id_course?: string
    id_quiz?: string
    id_user?: string
    title_quiz?: string
    total_score?: number
}
//! & เพิ่ม id form input

//! uid คืออะไรที่เกี่ยวข้องกับตัวเอง

export const useGetUserLists = () => {
    const dispatch = useAppDispatch();
    const [userLists, setUserLists] = useState<ScoreType[]>([])
    useEffect(() => {
        getUserLists()
    }, [])

    const getUserLists = async () => {
        try {
            dispatch(isShowLoading());
            const url = `${import.meta.env.VITE_REACT_APP_API}user/alluser`
            axios.defaults.withCredentials = true
            const getDetailUser = await axios.get(url)
            const result = getDetailUser.data
            setUserLists(
                result.map((e: any) => {
                    return {
                        ...e,
                        id_document: e.id_document
                    }
                }) as ScoreType[]
            )
        } catch (error) {
            console.log(error)
        } finally {
            dispatch(isCloseLoading())
        }
    }
    return { userLists, getUserLists }
}

