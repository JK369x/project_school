import axios from "axios"

export const UpdateTransaction = async (id_course: string, id_user: string, image: any) => {
    try {
        const url = `${import.meta.env.VITE_REACT_APP_API}course/updateimagereceipt/${id_course}/${id_user}`
        axios.defaults.withCredentials = true
        await axios.put(url, image)
        return true
    } catch (error) {
        console.log(error)
        return false
    }
}