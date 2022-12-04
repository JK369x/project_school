import { db} from '../firebase/config_firebase';
import { addDoc,setDoc } from "firebase/firestore";
import {AccountCollection} from '../firebase/createCollection'
import { Lookup } from "../types/type";

export interface IFormInput {
    email: string
    password: string 
    confirmPassword: string 
    firstName: string
    lastName: string
    job: string
    birthday: string | number 
    address: string 
    province: Lookup | null
    amphure: Lookup | null 
    tambon: Lookup | null 
    zipCode: Lookup | null 
    agency: string | number
    status: Lookup | null 
  
  }
export const useCreateAcc= ()=>{
    const addUser = async (params: IFormInput) =>{
        console.log('params',params.zipCode)
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
                zipcode:params.zipCode,
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