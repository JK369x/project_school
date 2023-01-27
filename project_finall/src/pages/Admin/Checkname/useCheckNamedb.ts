
import axios from 'axios';

export const useCheckNamedb = () => {
    const clickCheckName = async (id: string) => {
        try {
            const url = `${import.meta.env.VITE_REACT_APP_API}course/checknamejoincourse/${id}`
            axios.defaults.withCredentials = true
            const Click_Check_Name = await axios.post(url)
            const result = Click_Check_Name.data
            return true
        } catch (error) {
            console.log(error)
            return false
        }
    }
    return { clickCheckName }
}

