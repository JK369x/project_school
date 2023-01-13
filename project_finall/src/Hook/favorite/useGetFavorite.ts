import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../store/useHooksStore';
import { isCloseLoading, isShowLoading } from '../../store/slices/loadingSlice';
import { doc, getDocs, orderBy, query, where } from 'firebase/firestore';
import { AccountCollection } from '../../firebase/createCollection';

export type FavoriteListType = {
    id: string
}


export const useGetFavorite = () => {
    const dispatch = useAppDispatch();
    const uid = useAppSelector(({ auth: { uid } }) => uid)
    const [FavoriteList, setFavoriteList] = useState<FavoriteListType[]>([])

    useEffect(() => {
        getFavoriteLists()
    }, [])

    const getFavoriteLists = async () => {
        try {
            dispatch(isShowLoading());
            const result = await getDocs(
                query(
                    AccountCollection,
                    orderBy("Favorite", "desc"),
                )
            )
            setFavoriteList(
                result.docs.map((e) => {
                    return {
                        ...e.data(),
                        id: e.id,

                    }
                }) as FavoriteListType[]
            )
        } catch (err) {
            console.log("🚀 ~ file: useGetFavorite.ts:27 ~ getFavoriteLists ~ err", err)

        } finally {
            dispatch(isCloseLoading())
        }
    }
    return { FavoriteList }
}