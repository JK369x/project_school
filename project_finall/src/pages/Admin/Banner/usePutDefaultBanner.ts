import { useDispatch } from 'react-redux';
import axios from "axios"



export const usePutDefaultBanner = () => {

    const setDefaultBannerAPI = async (status: any) => {
        console.log('api banner')
        try {
            const url = `${import.meta.env.VITE_REACT_APP_API}upload/defaultbanner/${status}`
            axios.defaults.withCredentials = true
            await axios.put(url)
            return true
        } catch (error) {
            console.log(error)
            return false
        }
    }

    return { setDefaultBannerAPI }
}