import { useState, useEffect } from 'react'
import { useAppDispatch } from '../../../../store/useHooksStore'
import { isShowLoading, isCloseLoading } from '../../../../store/slices/loadingSlice'
import { getDocs, query, where, orderBy, limit } from "firebase/firestore";
import { IFormInput } from './useCreateAcc'
import { AccountCollection } from '../../../../firebase/createCollection'
import axios from 'axios';
export type UserListsType = {
    id: string
    id_document: string
    about: string
    salt: string
} & IFormInput
//! & เพิ่ม id form input

//! uid คืออะไรที่เกี่ยวข้องกับตัวเอง

export const useGetUserLists = () => {
    const dispatch = useAppDispatch();
    const [userLists, setUserLists] = useState<UserListsType[]>([])
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
                }) as UserListsType[]
            )
        } catch (error) {
            console.log(error)
        } finally {
            dispatch(isCloseLoading())
        }
    }
    return { userLists, getUserLists }
}

