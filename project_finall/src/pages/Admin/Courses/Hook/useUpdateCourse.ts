import axios from "axios"
import { CourseListsType } from "./useGetCourse"

export const useUpdateCourse = () => {
    const updateCourse = async (params: CourseListsType, id: string) => {
        console.log("🚀 ~ file: useUpdateUser.ts:9 ~ updateUser ~ params", params)
        try {
            const url = `${import.meta.env.VITE_REACT_APP_API}course/updatecourse/${id}`
            axios.defaults.withCredentials = true
            const updateUser = await axios.put(url, params)
            const result = updateUser.data
        
            return true
        } catch (error) {
            console.log(error)
            return false
        }
    }
    return { updateCourse }
}