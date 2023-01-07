import { db } from '../../firebase/config_firebase';
import { addDoc, setDoc, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { AccountCollection, CourseCollection } from '../../firebase/createCollection'
import { UserListsType } from "./useGetUserLists";
import { CourseListsType } from '../course/useGetCourse';

export const useUpdateUser = () => {
    const updateUser = async (params: UserListsType, id: string) => {
        console.log("🚀 ~ file: useUpdateUser.ts:9 ~ updateUser ~ params", params)
        try {
            await updateDoc(doc(AccountCollection, id), {
                ...params,
            })
            return true
        } catch (error) {
            console.log(error)
            return false
        }
    }
    return { updateUser }
}


export const useUpdateCourse = () => {
    const updateCourse = async (params: CourseListsType, id: string) => {
        console.log("🚀 ~ file: useUpdateUser.ts:9 ~ updateUser ~ params", params)
        try {
            await updateDoc(doc(CourseCollection, id), {
                ...params,
            })
            return true
        } catch (error) {
            console.log(error)
            return false
        }
    }
    return { updateCourse }
}