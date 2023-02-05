import { useState, useEffect } from 'react'
import { useAppDispatch } from '../../../../store/useHooksStore'
import { isShowLoading, isCloseLoading } from '../../../../store/slices/loadingSlice'

import axios from 'axios';
import { TeacherType } from '../../../Teacher/Hook/CreateTeacher';

//! & เพิ่ม id form input

//! uid คืออะไรที่เกี่ยวข้องกับตัวเอง

export const useGetTeacherLists = () => {
    const dispatch = useAppDispatch();
    const [teacherLists, setTeacherLists] = useState<TeacherType[]>([])
    useEffect(() => {
        getTeacherLists()
    }, [])

    const getTeacherLists = async () => {
        try {
            dispatch(isShowLoading());
            const url = `${import.meta.env.VITE_REACT_APP_API}user/allteacher`
            axios.defaults.withCredentials = true
            const getDetailUser = await axios.get(url)
            const result = getDetailUser.data
            setTeacherLists(
                result.map((e: any) => {
                    return {
                        ...e,
                        id_document: e.id_document
                    }
                }) as TeacherType[]
            )
        } catch (error) {
            console.log(error)
        } finally {
            dispatch(isCloseLoading())
        }
    }
    return { teacherLists, getTeacherLists }
}

