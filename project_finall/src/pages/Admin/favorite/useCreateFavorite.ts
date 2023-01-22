import axios from "axios";

export const useCreateFavorite = () => {
    // const uid_login = useAppSelector(({ auth: { uid } }) => uid)
    const addFavorite = async (params: string[], id: string) => {
        console.log("🚀 ~ file: useCreateFavorite.ts:15 ~ addFavorite ~ id", id)
        console.log("favorite 💙", params)
        try {
            const url = `${import.meta.env.VITE_REACT_APP_API}user/addfavorite/${id}`
            axios.defaults.withCredentials = true
            await axios.put(url, params)

        } catch (err) {
            console.log("🚀 ~ file: useCreateCategory.ts:23 ~ addCategory ~ err", err)

        }
    }
    return { addFavorite }
}