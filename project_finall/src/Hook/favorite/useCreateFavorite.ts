import { addDoc, setDoc, doc, deleteDoc, updateDoc, } from "firebase/firestore";

import { AccountCollection, FavoriteCollection } from '../../firebase/createCollection'

import { useAppDispatch, useAppSelector } from "../../store/useHooksStore";
import { isCloseLoading, isShowLoading } from "../../store/slices/loadingSlice";




export const useCreateFavorite = () => {
    // const uid_login = useAppSelector(({ auth: { uid } }) => uid)
    const addFavorite = async (params: string [], uid: string) => {
        console.log("favorite 💙", params)
        try {
           await updateDoc(doc(AccountCollection, uid), {
                favorite: params
            })
        } catch (err) {
            console.log("🚀 ~ file: useCreateCategory.ts:23 ~ addCategory ~ err", err)

        }
    }
    return { addFavorite }
}