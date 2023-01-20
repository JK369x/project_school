import axios from "axios";
import { isCloseLoading, isShowLoading } from "../../../../store/slices/loadingSlice";
import { useAppDispatch } from "../../../../store/useHooksStore";


export const useDeleteCateGory = () => {
    const dispatch = useAppDispatch();
    const deleteCategory = async (id: string) => {
        try {
            dispatch(isShowLoading());
            const url = `${import.meta.env.VITE_REACT_APP_API}category/deletecategory/${id}`
            axios.defaults.withCredentials = true
            await axios.delete(url)
            return true;
        } catch (error) {
            console.log(error);
            return false;
        } finally {
            dispatch(isCloseLoading());
        }
    };

    return { deleteCategory };
};