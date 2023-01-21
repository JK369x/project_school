import { db } from '../../../../firebase/config_firebase';
import { addDoc, setDoc, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { AccountCollection, CourseCollection } from '../../../../firebase/createCollection'
import { UserListsType } from "./useGetUserLists";
import axios from 'axios';

export const useUpdateUser = () => {
    const updateUser = async (params: UserListsType, id: string) => {
        console.log("🚀 ~ file: useUpdateUser.ts:9 ~ updateUser ~ params", params)
        try {
            const url = `${import.meta.env.VITE_REACT_APP_API}user/updateuser/${id}`
            axios.defaults.withCredentials = true
            const updateUser = await axios.put(url, params)
            const result = updateUser.data
            return true
        } catch (error) {
            console.log(error)
            return false
        }
    }
    return { updateUser }
}

