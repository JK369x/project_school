import { useState, useEffect } from 'react'
import { useAppDispatch } from '../store/useHooksStore'
import { isShowLoading, isCloseLoading } from '../store/slices/loadingSlice'
import { getDocs, query, where, orderBy, limit } from "firebase/firestore";
import { IFormInput } from '../Hook/useCreateAcc'
import { AccountCollection } from '../firebase/createCollection'
export type UserListsType = {
    id: string
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
        dispatch(isShowLoading());
        try {
          /* Getting the documents from the AccountCollection and ordering them by the createdate field
          in descending order. */
            const result = await getDocs(
                query(
                    AccountCollection,
                    orderBy("createBy", "desc"),
                )
            )
            setUserLists(
                result.docs.map((e) => {
                    return {
                        ...e.data(),
                        id: e.id,
                    }
                }) as UserListsType[]
            )
        } catch (error) {
            console.log(error)
        } finally {
            dispatch(isCloseLoading())
        }
    }
    return { userLists,getUserLists}
}

