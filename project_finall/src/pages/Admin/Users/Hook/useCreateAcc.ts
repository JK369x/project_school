import { Moment } from 'moment';

import { Lookup } from "../../../../types/type";
import axios from 'axios';
import { openAlertError, openAlertSuccess } from '../../../../store/slices/alertSlice';
import { useAppDispatch } from '../../../../store/useHooksStore';
import bcrypt from "bcryptjs";
export interface IFormInput {
    email: string
    password: string
    confirmPassword: string
    firstName: string
    lastName: string
    job: string
    birthday: string
    address: string
    province: Lookup | null
    amphure: Lookup | null
    tambon: Lookup | null
    zipCode: Lookup | null
    agency: string | number
    status: Lookup | null
    about?: string
    image_rul?: string | null
    id_verify: string
}



export const useCreateAcc = () => {
    const dispatch = useAppDispatch();
    const addUser = async (params: IFormInput) => {
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
            await axios.post<IFormInput>(url, newdata)
            dispatch(openAlertSuccess('Create Success !!'))
            return true
        } catch (err: any) {
            const data = err.response.data.message
            dispatch(openAlertError(`${data}`))
            return err.response.data.message
        }
    }
    return { addUser }
}