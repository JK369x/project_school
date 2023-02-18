import { useParams } from 'react-router-dom';
import axios from "axios"
import { TypeComment } from "./usePostComment"

export const useUpdateReplyComment = () => {
    const { id_course, id_comment } = useParams<{ id_course: string, id_comment: string }>()
    const updateReplyComment = async (params: TypeComment) => {
        console.log("🚀 ~ file: useUpdateUser.ts:9 ~ updateUser ~ params", params)
        try {
            const url = `${import.meta.env.VITE_REACT_APP_API}course/replycomment/${id_course}/${id_comment}`
            axios.defaults.withCredentials = true
            await axios.put(url, params)
            return true
        } catch (error) {
            console.log(error)
            return false
        }
    }
    return { updateReplyComment }
}