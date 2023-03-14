import axios from "axios";
import { openAlertError } from "../../../store/slices/alertSlice";
import { useAppDispatch } from "../../../store/useHooksStore";

export const joinCourseUser = () => {
    // const uid_login = useAppSelector(({ auth: { uid } }) => uid)
    const dispatch = useAppDispatch();
    const addJoinCourse = async (params: string[], id: string) => {
        try {
            const url = `${import.meta.env.VITE_REACT_APP_API}user/addjoincourse/${id}`
            axios.defaults.withCredentials = true
            await axios.put(url, params)
            return true
        } catch (err: any) {
            const data = err.response.data.message
            console.log("🚀 ~ file: useJoinCourse.ts:15 ~ addJoinCourse ~ data:", data)
            dispatch(openAlertError(`${data}`))
            return data
        }
    }
    return { addJoinCourse }
}