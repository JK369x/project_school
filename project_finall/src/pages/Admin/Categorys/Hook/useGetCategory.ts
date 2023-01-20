import { useState, useEffect } from 'react'
import { useAppDispatch } from '../../../../store/useHooksStore'
import { isShowLoading, isCloseLoading } from '../../../../store/slices/loadingSlice'
import { getDocs, query, where, orderBy, limit } from "firebase/firestore";
import { CategoryCollection } from '../../../../firebase/createCollection'
import { CategoryInput } from './useCreateCategory';
import axios from 'axios';
export type CategoryListsType = {
    id?: string
    label?: string
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
            const url = `${import.meta.env.VITE_REACT_APP_API}category/allcategory`
            axios.defaults.withCredentials = true
            const getCategory = await axios.get(url)
            const result = getCategory.data
     
            setCategoryLists(
                result.map((e:any) => {
                    return {
                        ...e,
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

