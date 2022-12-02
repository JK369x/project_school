import { db} from '../firebase/config_firebase';
import { addDoc, doc } from "firebase/firestore";
import {AccountCollection} from '../firebase/createCollection'
import { Lookup } from "../types/type";

export interface IFormInput {
    email: String | Number
    password: String | Number
    confirmPassword: String | Number
    firstName: String
    lastName: String
    job: String
    birthday: String | Number
    address: String | Number
    province: Lookup | null
    amphure: Lookup | null 
    tambon: Lookup | null 
    zipCode: Lookup | null 
    agency: String | Number
    status: Lookup | null 
  
  }
export const useCreateAcc= ()=>{
    const addUser = async (params: IFormInput) =>{
        try{
            await addDoc(AccountCollection,{
                ...params,
                email: params.email,
                password: params.password,
                confirmPassword: params.confirmPassword,
                firstName:params.firstName,
                lastName: params.lastName,
                job:params.job,
                address: params.address,
                province: params.province,
                amphure: params.amphure,
                tambon:params.tambon,
                zipCode:params.zipCode,
                agency:params.agency,
                status:params.status,
            })
            return true
        } catch (err){
            console.log(err)
            return false
        }
    }
    return { addUser }
}