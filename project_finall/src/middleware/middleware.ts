import axios from "axios"

// export interface AutoSignIn {
//     email: string

//     cookie: string
// }

export const middleware = () => {
    const autoSignIn = async (token) => {
        const url = `${import.meta.env.VITE_REACT_APP_API}auth/me`
        try {
            const data = await axios.get(url)
            console.log("🚀 ~ file: middleware.ts:14 ~ autoSignIdn ~ data", data)
            return true
        } catch (err) {
            return false
        }
    }
    return { autoSignIn }
}