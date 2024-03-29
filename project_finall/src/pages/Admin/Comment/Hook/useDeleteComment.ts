import axios from "axios";
import { isCloseLoading, isShowLoading } from "../../../../store/slices/loadingSlice";
import { useAppDispatch } from "../../../../store/useHooksStore";


export const useDeleteComment = () => {
    const dispatch = useAppDispatch();
    const deleteComment = async (id_course: string, id_comment: string) => {
        try {
            dispatch(isShowLoading());
            const url = `${import.meta.env.VITE_REACT_APP_API}course/deletecomment/${id_course}/${id_comment}`
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

    return { deleteComment };
};