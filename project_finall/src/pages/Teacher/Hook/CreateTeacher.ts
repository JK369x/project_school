
import { openAlertError, openAlertSuccess } from "../../../store/slices/alertSlice";
import { isCloseLoading, isShowLoading } from "../../../store/slices/loadingSlice";
import { useAppDispatch } from "../../../store/useHooksStore";
import { Lookup } from "../../../types/type";
import axios from 'axios';
import bcrypt from "bcryptjs";
export interface TeacherType {
    email: string
    password: string
    confirmPassword: string
    firstName: string
    lastName: string
    birthday: Date | null
    about?: string
    image_rul?: string | null
    province: Lookup | null
    amphure: Lookup | null
    tambon: Lookup | null
    zipCode: Lookup | null
    agency: string | number
    createDate: any
    status: Lookup | null
    address: string
}



export const useCreateTeacher = () => {
    const dispatch = useAppDispatch();
    const addTeacher = async (params: TeacherType) => {
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
            await axios.post<TeacherType>(url, newdata)
            dispatch(openAlertSuccess('Create Teacher !!'))
            return true
        } catch (err: any) {
            const data = err.response.data.message
            dispatch(openAlertError(`${data}`))
            return err.response.data.message
        }
    }
    return { addTeacher }
}