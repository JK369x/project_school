import { useParams } from 'react-router-dom';

import axios from 'axios';
import { useAppDispatch } from '../../../store/useHooksStore';
import { useEffect, useState } from 'react';
import { isCloseLoading, isShowLoading } from '../../../store/slices/loadingSlice';
export type ScoreType = {
    title?: string
    start_learn?: string
    end_learn?: string
    score_quiz?: number
    score_user?: number
    create_by?: string
    image_course?: string
}
//! & เพิ่ม id form input

//! uid คืออะไรที่เกี่ยวข้องกับตัวเอง

export const useGetScoreUserAll = () => {
    const dispatch = useAppDispatch();
    const { id } = useParams<{ id: string }>()
    const [certificateLists, setCertificateLists] = useState<ScoreType[]>([])
    useEffect(() => {
        getAllScore()
    }, [])

    const getAllScore = async () => {
        try {
            dispatch(isShowLoading());
            const url = `${import.meta.env.VITE_REACT_APP_API}user/createcertificate/${id}`
            axios.defaults.withCredentials = true
            const getDetailUser = await axios.get(url)
            const result = getDetailUser.data
            setCertificateLists(
                result.map((e: any) => {
                    return {
                        ...e,
                        id: id

                    }
                }) as ScoreType[]
            )
        } catch (error) {
            console.log(error)
        } finally {
            dispatch(isCloseLoading())
        }
    }
    return { certificateLists, getAllScore }
}

