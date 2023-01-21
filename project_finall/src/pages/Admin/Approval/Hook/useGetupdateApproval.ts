import axios from "axios"

export const useUpdateApproval= async (id:string) => {
        try {
            const url = `${import.meta.env.VITE_REACT_APP_API}course/updateapproval/${id}`
            axios.defaults.withCredentials = true
            const updateCategory = await axios.put(url)
            return true
        } catch (error) {
            console.log(error)
            return false
        }
}