
import axios from 'axios';
import { openAlertError } from '../../../store/slices/alertSlice';
import { useAppDispatch } from '../../../store/useHooksStore';

export const useCheckNamedb = () => {
    const clickCheckName = async (id: string) => {
        try {
            const url = `${import.meta.env.VITE_REACT_APP_API}course/checknamejoincourse/${id}`
            axios.defaults.withCredentials = true
            await axios.post(url)
            return true
        } catch (error: any) {
            console.log(error)
            return error.response.data.message
        }
    }
    return { clickCheckName }
}

