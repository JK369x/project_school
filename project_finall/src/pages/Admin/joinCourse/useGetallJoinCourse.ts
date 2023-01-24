import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../store/useHooksStore';
import { isCloseLoading, isShowLoading } from '../../../store/slices/loadingSlice';

import axios from 'axios';

export type CourseListType = {
    id: string
}


export const useGetallJoinCourse = () => {
    const dispatch = useAppDispatch();
    const uid = useAppSelector(({ auth: { uid } }) => {
        console.log("🚀 ~ file join course ~ uid", uid)
        return uid
    })
    const [CourseJoinList, setCourseJoinList] = useState<CourseListType[]>([])
    useEffect(() => {
        getCourseLists()
    }, [uid])

    const getCourseLists = async () => {
        try {
            dispatch(isShowLoading());
            if (uid) {
                const url = `${import.meta.env.VITE_REACT_APP_API}user/getjoincoursefromid/${uid}`
                axios.defaults.withCredentials = true
                const get_Course_join = await axios.get(url)
                const result = get_Course_join.data
                setCourseJoinList(
                    result.map((e: any) => {
                        return {
                            ...e,
                        }
                    }) as CourseListType[]
                )

            } else {
                console.log('no id')
            }
        } catch (err) {
            console.log("🚀 ~ join course ~ err", err)

        } finally {
            dispatch(isCloseLoading())
        }
    }
    return { CourseJoinList }
}