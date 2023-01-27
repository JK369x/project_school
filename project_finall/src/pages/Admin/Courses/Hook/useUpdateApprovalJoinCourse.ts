import axios from "axios"

export const useUpdateApprovalJoinCourse = async (id: string, id_user: string) => {
    try {
        const url = `${import.meta.env.VITE_REACT_APP_API}course/updateapprovaljoincourse/${id}/${id_user}`
        axios.defaults.withCredentials = true
        const updateApprovalCourse = await axios.put(url)
        return true
    } catch (error) {
        console.log(error)
        return false
    }
}