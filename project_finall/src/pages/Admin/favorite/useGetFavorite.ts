import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../store/useHooksStore';
import { isCloseLoading, isShowLoading } from '../../../store/slices/loadingSlice';
import { doc, getDocs, orderBy, query, where } from 'firebase/firestore';
import { AccountCollection } from '../../../firebase/createCollection';
import axios from 'axios';

export type FavoriteListType = {
    id: string
}


export const useGetFavorite = () => {
    const dispatch = useAppDispatch();
    const uid = useAppSelector(({ auth: { uid } }) => {
        console.log("🚀 ~ file: useGetFavorite.ts:16 ~ useGetFavorite ~ uid", uid)
        return uid
    })
    const [FavoriteList, setFavoriteList] = useState<FavoriteListType[]>([])
    useEffect(() => {
        getFavoriteLists()
    }, [uid])

    const getFavoriteLists = async () => {
        try {
            dispatch(isShowLoading());
            if (uid) {
                const url = `${import.meta.env.VITE_REACT_APP_API}user/getfavoritefromid/${uid}`
                axios.defaults.withCredentials = true
                const get_favorite = await axios.get(url)
                const result = get_favorite.data
                setFavoriteList(
                    result.map((e: any) => {
                        return {
                            ...e,
                        }
                    }) as FavoriteListType[]
                )

            } else {
                console.log('no id')
            }
        } catch (err) {
            console.log("🚀 ~ file: useGetFavorite.ts:27 ~ getFavoriteLists ~ err", err)

        } finally {
            dispatch(isCloseLoading())
        }
    }
    return { FavoriteList, getFavoriteLists }
}