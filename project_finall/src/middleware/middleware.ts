import axios from "axios"

// export interface AutoSignIn {
//     email: string

//     cookie: string
// }

export const middleware = () => {
    const autoSignIn = async () => {
        console.log('auto login auth me ')
        const url = `${import.meta.env.VITE_REACT_APP_API}auth/me`
        try {
            const data = await axios.get(url,{ 
                withCredentials: true,   
            })
            console.log("🚀 ~ file: middleware.tss:14 a~ autoSignIdn ~ data", data)
            return true
        } catch (err) {
            console.log("🚀 ~ file: middleware.ts:19 ~ autaoSignIn ~ err", err)
            return false
        }
    }
    return { autoSignIn }
}