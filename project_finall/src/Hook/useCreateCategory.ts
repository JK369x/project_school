import { addDoc,setDoc,doc, deleteDoc, } from "firebase/firestore";

import {CategoryCollection} from '../firebase/createCollection'
import { Lookup } from "../types/type";
import { Timestamp } from "mongodb";


export interface CategoryInput {
    id:string
    Category_Title:string
  }


  export const useCreateCategory = () =>{
    const addCategory = async (params: CategoryInput) =>{
        try{
            await setDoc(doc(CategoryCollection),{
                ...params,
                timestamp: new Date(),
            })
        } catch (err) {

        }
    }
    return { addCategory }
  }