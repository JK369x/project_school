import { db } from '../../../../firebase/config_firebase';
import { addDoc, setDoc, doc, deleteDoc, } from "firebase/firestore";

import { AccountCollection } from '../../../../firebase/createCollection'
import { Lookup } from "../../../../types/type";
import axios from 'axios';

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
}
// export const useCreateAcc = () => {
//     const addUser = async (params: IFormInput, uid: string) => {
//         try {
//             let newdata: any = params
//             delete newdata.password
//             delete newdata.confirmPassword
//             await setDoc(doc(AccountCollection, uid), {
//                 ...newdata, //! ค่าเหมือนกันใช้ต่อได้เลยไม่ต้อง set ใหม่  
//                 uid,
//                 createBy: uid,
//                 timestamp: new Date(),
//             })
//             return true
//         } catch (err) {
//             console.log(err)
//             return false
//         }
//     }
//     return { addUser }
// }


export const useCreateAcc = () => {
    const addUser = async (params: IFormInput) => {
        const url = `${import.meta.env.VITE_REACT_APP_API}auth/register`
        try {
            await axios.post<IFormInput>(url,
                params,
                {
                    // headers: {

                    // },
                },
            )
            return true
        } catch (err) {
            return false
        }
    }
    return { addUser }
}