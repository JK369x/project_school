import { db } from '../../../../firebase/config_firebase';
import { addDoc, setDoc, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { AccountCollection, CourseCollection } from '../../../../firebase/createCollection'
import { UserListsType } from "./useGetUserLists";
import axios from 'axios';
import { ResetpasswordType } from '../ResetPassword';

export const useUpdatePassWord = () => {
    const updatePassword = async (password: any, id: string) => {
        console.log("🚀 ~ file: useUpdatePassword.ts:10 ~ updatePassword ~ password", password)
        try {
            const url = `${import.meta.env.VITE_REACT_APP_API}user/updatepassword/${id}`
            axios.defaults.withCredentials = true
            const updateUser = await axios.put(url, password)
            const result = updateUser.data.response
            console.log("🚀 ~ file: useUpdatePassword.ts:16 ~ updatePassword ~ result", result)
            return true
        } catch (error: any) {
            console.log('error log', error)
            return error.response.data.message
        }
    }
    return { updatePassword }
}

