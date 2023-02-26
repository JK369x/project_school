import { db } from '../../../../firebase/config_firebase';
import { addDoc, setDoc, doc, deleteDoc, } from "firebase/firestore";

import { AccountCollection } from '../../../../firebase/createCollection'
import { Lookup } from "../../../../types/type";
import axios from 'axios';
import { openAlertError, openAlertSuccess } from '../../../../store/slices/alertSlice';
import { useAppDispatch } from '../../../../store/useHooksStore';

export interface IFormInput {
    email: string
    password: string
    confirmPassword: string
    firstName: string
    lastName: string
    job: string
    birthday: Date | null
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
        const url = `${import.meta.env.VITE_REACT_APP_API}user/register`
        try {
            await axios.post<IFormInput>(url, params)
            dispatch(openAlertSuccess('Create Teacher !!'))
            return true
        } catch (err) {
            dispatch(openAlertError('check info'))
            return false
        }
    }
    return { addUser }
}