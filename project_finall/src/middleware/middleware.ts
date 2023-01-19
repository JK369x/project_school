import axios from "axios"
import { useAppDispatch } from "../store/useHooksStore"
import { setAuthStore } from "../store/slices/authSlice"



export const middleware = () => {
    const dispatch = useAppDispatch()
    const autoSignIn = async () => {
        console.log('autosme ')
        const url = `${import.meta.env.VITE_REACT_APP_API}auth/me`
        axios.defaults.withCredentials = true
        try{
            const autoSignIn = await axios.get(url)
            const data = autoSignIn.data
            const displayName = `${data.firstName} ${data.lastName}`
            dispatch(setAuthStore({
                email: data.email,
                displayName,
                status:data.status.label,
                favorite:[]
              }))
        }catch (err){
        console.log("🚀 ~ filse: middleware.ts:18 ~ autoSignIn ~ err", err)

        }
        console.log("🚀===================")
    }
    return { autoSignIn }
}