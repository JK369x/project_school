import axios from "axios";

export const joinCourseUser = () => {
    // const uid_login = useAppSelector(({ auth: { uid } }) => uid)
    const addJoinCourse = async (params: string[], id: string) => {
        console.log("🚀 ~ file: useCreateFavorite.ts:15 ~ addJoinCourse ~ id", id)
        console.log("join course 💙", params)
        try {
            const url = `${import.meta.env.VITE_REACT_APP_API}user/addjoincourse/${id}`
            axios.defaults.withCredentials = true
            await axios.put(url, params)

        } catch (err) {
            console.log("🚀 ~ file: useCreateCategory.ts:23 ~ addJoinCourse ~ err", err)

        }
    }
    return { addJoinCourse }
}