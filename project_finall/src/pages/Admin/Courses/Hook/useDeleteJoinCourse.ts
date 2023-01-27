import axios from "axios";
import { isCloseLoading, isShowLoading } from "../../../../store/slices/loadingSlice";
import { useAppDispatch } from "../../../../store/useHooksStore";

export const useDeleteJoinCourse = () => {
    const dispatch = useAppDispatch();
    const deleteJoinCourse = async (id: string, docJoin: string) => {
        try {
            dispatch(isShowLoading());
            const url = `${import.meta.env.VITE_REACT_APP_API}course/deletejoincourse/${id}/${docJoin}`
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

    return { deleteJoinCourse };
};