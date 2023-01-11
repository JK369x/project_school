import { useState, useEffect } from 'react'
import { useAppDispatch } from '../../store/useHooksStore'
import { isShowLoading, isCloseLoading } from '../../store/slices/loadingSlice'
import { getDocs, query, where, orderBy, limit } from "firebase/firestore";
import { CategoryCollection } from '../../firebase/createCollection'
import { CategoryInput } from './useCreateCategory';
export type CategoryListsType = {
    id: string
    label: string
} & CategoryInput
//! & เพิ่ม id form input

//! uid คืออะไรที่เกี่ยวข้องกับตัวเอง

export const useGetCategoryLists = () => {
    const dispatch = useAppDispatch();
    const [CategoryLists, setCategoryLists] = useState<CategoryListsType[]>([])
    console.log("🚀 ~ file: useGetCategory.ts:17 ~ useGetCategoryLists ~ CategoryLists", CategoryLists)
    useEffect(() => {
        useGetCategory()
    }, [])

    const useGetCategory = async () => {
        dispatch(isShowLoading());
        try {
            /* Getting the documents from the AccountCollection and ordering them by the createdate field
            in descending order. */
            const result = await getDocs(
                query(
                    CategoryCollection,
                    orderBy("timestamp", "desc"),
                )
            )
            setCategoryLists(
                result.docs.map((e) => {
                    return {
                        ...e.data(),
                        label: e.data().Category_Title,
                        id: e.id,
                    }
                }) as CategoryListsType[]
            )
        } catch (error) {
            console.log(error)
        } finally {
            dispatch(isCloseLoading())
        }
    }
    return { CategoryLists, useGetCategory }
}

