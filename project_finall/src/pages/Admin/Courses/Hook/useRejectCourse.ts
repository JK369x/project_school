import axios from "axios"
import { useParams } from "react-router-dom";

export const useReject = () => {
    const { id } = useParams<{ id: string }>();
    console.log("🚀 ~ file: useRejectCourse.ts:6 ~ useUpdateCourse ~ id", id)
    const updateReject = async (params: any) => {
        console.log("🚀 ~ file: useUpdateUser.ts:9 ~ updateUser ~ params", params)
        try {
            const url = `${import.meta.env.VITE_REACT_APP_API}course/rejectupdate/${id}`
            axios.defaults.withCredentials = true
            const reject = await axios.put(url, params)
            const result = reject.data
            return true
        } catch (error) {
            console.log(error)
            return false
        }
    }
    return { updateReject }
}