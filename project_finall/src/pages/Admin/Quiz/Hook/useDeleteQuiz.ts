import axios from "axios";
import { isCloseLoading, isShowLoading } from "../../../../store/slices/loadingSlice";
import { useAppDispatch } from "../../../../store/useHooksStore";
import { openAlertError, openAlertSuccess } from "../../../../store/slices/alertSlice";

export const useDeleteQuiz = () => {
    const dispatch = useAppDispatch();
    const deleteQuiz = async (id_course: string, id_quiz: string) => {
        try {
            dispatch(isShowLoading());
            dispatch(openAlertSuccess('Delete quiz!!'))
            const url = `${import.meta.env.VITE_REACT_APP_API}course/deletequiz/${id_course}/${id_quiz}`
            axios.defaults.withCredentials = true
            await axios.delete(url)
            return true;
        } catch (error) {
            console.log(error);
            dispatch(openAlertError('some thing went wrong!!'))
            return false;
        } finally {
            dispatch(isCloseLoading());
        }
    };

    return { deleteQuiz };
};