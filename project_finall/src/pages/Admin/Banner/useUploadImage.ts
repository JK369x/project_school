import { useDispatch } from 'react-redux';
import axios from "axios"



export const useUploadImage = () => {

    const uploadBannerAPI = async (image_banner: any) => {
        console.log("click check name update =", status)
        try {
            const url = `${import.meta.env.VITE_REACT_APP_API}upload/uploadimage`
            axios.defaults.withCredentials = true
            await axios.put(url, image_banner)
            return true
        } catch (error) {
            console.log(error)
            return false
        }
    }

    return { uploadBannerAPI }
}