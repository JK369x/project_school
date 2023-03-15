
import { useAppDispatch } from "../../../../store/useHooksStore";
import { isCloseLoading, isShowLoading } from "../../../../store/slices/loadingSlice";
import axios from "axios";


export interface CategoryInput {
    id: string
    Category_Title: string
}


export const useCreateCategory = () => {
    const dispatch = useAppDispatch()
    const addCategory = async (params: CategoryInput) => {
        try {
            dispatch(isShowLoading())
            const url = `${import.meta.env.VITE_REACT_APP_API}category/createcategory`
            axios.defaults.withCredentials = true
            await axios.post(url, params)
            return true
        } catch (err) {
            console.log("🚀 ~ file: useCreateCategory.ts:23 ~ addCategory ~ err", err)
            return false
        } finally {
            dispatch(isCloseLoading())
        }
    }
    return { addCategory }
}