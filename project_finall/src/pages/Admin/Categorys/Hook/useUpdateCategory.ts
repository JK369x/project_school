import { db } from '../../../../firebase/config_firebase';
import { addDoc, setDoc, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { AccountCollection, CourseCollection } from '../../../../firebase/createCollection'
import { CourseListsType } from '../../../../Hook/course/useGetCourse';
import axios from 'axios';
import { CategoryInput } from './useCreateCategory';

export const useUpdateCategory = () => {
    const updateCategory = async (params:CategoryInput , id: string) => {
        console.log("🚀 ~ file: useUpdateUser.ts:9 ~ updateUser ~ params", params)
        try {
            const url = `${import.meta.env.VITE_REACT_APP_API}category/editcategory/${id}`
            axios.defaults.withCredentials = true
            const updateCategory = await axios.put(url, params)
            const result = updateCategory.data
            return true
        } catch (error) {
            console.log(error)
            return false
        }
    }
    return { updateCategory }
}

