import axios from "axios"
import { useAppDispatch } from "../../../../store/useHooksStore"
import { isCloseLoading, isShowLoading } from "../../../../store/slices/loadingSlice"
import { openAlertError, openAlertSuccess } from "../../../../store/slices/alertSlice"
export const UpdateTransaction = async (id_course: string, id_user: string, image: any) => {
    try {
        try {
            const url = `${import.meta.env.VITE_REACT_APP_API}course/updateimagereceipt/${id_course}/${id_user}`
            axios.defaults.withCredentials = true
            await axios.put(url, image)

            return true
        } catch (error) {
            console.log(error)

            return false
        }
    } catch (err) {
        console.log("🚀 ~ file: useUploadTransaction.ts:15 ~ UpdateTransaction ~ err:", err)
    }
}