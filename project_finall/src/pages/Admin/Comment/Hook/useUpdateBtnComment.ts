import { useDispatch } from 'react-redux';
import axios from "axios"



export const useUpdateBtnComment = () => {

    const BtnstatusComment = async (id: string, status: boolean) => {
        console.log("click check name update =", status)
        try {
            const url = `${import.meta.env.VITE_REACT_APP_API}course/updatecomment/${id}/${status}`
            axios.defaults.withCredentials = true
            await axios.put(url, { status })
            return true
        } catch (error) {
            console.log(error)
            return false
        }
    }

    return { BtnstatusComment }
}