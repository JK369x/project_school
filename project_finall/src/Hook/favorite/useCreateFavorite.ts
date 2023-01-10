import { addDoc, setDoc, doc, deleteDoc, } from "firebase/firestore";

import { FavoriteCollection } from '../../firebase/createCollection'

import { useAppDispatch, useAppSelector } from "../../store/useHooksStore";
import { isCloseLoading, isShowLoading } from "../../store/slices/loadingSlice";


export interface FavoriteInput {
    id: string
    course_favorite: string []
}


export const useCreateFavorite = () => {
    const dispatch = useAppDispatch()
    // const uid_login = useAppSelector(({ auth: { uid } }) => uid)
    const addFavorite = async (params: any, uid: string ) => {
        console.log("🚀 ~ file: useCreateCategory.ts:16 ~ addCategory ~ params", params)
        try {
            dispatch(isShowLoading())
            await setDoc(doc(FavoriteCollection,uid ), {
                uid,
                ...params,
                timestamp: new Date(),
            })
        } catch (err) {
            console.log("🚀 ~ file: useCreateCategory.ts:23 ~ addCategory ~ err", err)

        } finally {
            dispatch(isCloseLoading())
        }
    }
    return { addFavorite }
}