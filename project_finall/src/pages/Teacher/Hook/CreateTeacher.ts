
import { openAlertError, openAlertSuccess } from "../../../store/slices/alertSlice";
import { isCloseLoading, isShowLoading } from "../../../store/slices/loadingSlice";
import { useAppDispatch } from "../../../store/useHooksStore";
import { Lookup } from "../../../types/type";
import axios from 'axios';

export interface TeacherType {
    email: string
    password: string
    confirmPassword: string
    firstName: string
    lastName: string
    birthday: string
    about?: string
    image_rul?: string | null
    province: Lookup | null
    amphure: Lookup | null
    tambon: Lookup | null
    zipCode: Lookup | null
    agency: string | number
    createDate: any
}



export const useCreateTeacher = () => {
    const dispatch = useAppDispatch();
    const addTeacher = async (params: TeacherType) => {
        const url = `${import.meta.env.VITE_REACT_APP_API}user/register`
        try {
            axios.defaults.withCredentials = true
            await axios.post<TeacherType>(url, params)
            dispatch(openAlertSuccess('Create Teacher !!'))
            return true
        } catch (err) {
            dispatch(openAlertError('check info'))
            return false
        }
    }
    return { addTeacher }
}