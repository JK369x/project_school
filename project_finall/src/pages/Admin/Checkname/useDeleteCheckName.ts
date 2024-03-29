import axios from "axios";
import { useAppDispatch } from "../../../store/useHooksStore";
import { isCloseLoading, isShowLoading } from "../../../store/slices/loadingSlice";



export const useDeleteCheckName = () => {
    const dispatch = useAppDispatch();
    const deleteCheckName = async (id_course: string, id_comment: string) => {
        try {
            dispatch(isShowLoading());
            const url = `${import.meta.env.VITE_REACT_APP_API}course/deletecheckname/${id_course}/${id_comment}`
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

    return { deleteCheckName };
};