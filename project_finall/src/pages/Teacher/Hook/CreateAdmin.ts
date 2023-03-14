
import { openAlertError, openAlertSuccess } from "../../../store/slices/alertSlice";
import { useAppDispatch } from "../../../store/useHooksStore";
import axios from 'axios';
import bcrypt from "bcryptjs";
export interface TypeAdmin {
    email: string
    password: string
    confirmPassword: string
    firstName: string
    lastName: string
    image_rul: string
}




export const useCreateAdmin = () => {
    const dispatch = useAppDispatch();
    const addAdmin = async (params: TypeAdmin) => {
        let newdata: any = params
        const salt = bcrypt.genSaltSync()
        const password = bcrypt.hashSync(newdata.password, salt)
        // Assign the salt and password to the newdata object
        newdata.salt = salt
        newdata.password = password

        // Delete the confirmPassword property
        delete newdata.confirmPassword
        const url = `${import.meta.env.VITE_REACT_APP_API}user/register`
        try {
            axios.defaults.withCredentials = true
            await axios.post<TypeAdmin>(url, newdata)
            dispatch(openAlertSuccess('Create Teacher !!'))
            return true
        } catch (err: any) {
            const data = err.response.data.message
            dispatch(openAlertError(`${data}`))
            return err.response.data.message
        }
    }
    return { addAdmin }
}