import { addDoc,setDoc,doc, deleteDoc, } from "firebase/firestore";

import {CategoryCollection} from '../firebase/createCollection'
import { Lookup } from "../types/type";
import { Timestamp } from "mongodb";
import { useAppDispatch } from "../store/useHooksStore";
import { isCloseLoading, isShowLoading } from "../store/slices/loadingSlice";


export interface CategoryInput {
    id:string
    Category_Title:string
  }


  export const useCreateCategory = () =>{
    const dispatch = useAppDispatch()
    const addCategory = async (params: CategoryInput) => {
        console.log("🚀 ~ file: useCreateCategory.ts:16 ~ addCategory ~ params", params)
        try{
            dispatch(isShowLoading())
            await setDoc(doc(CategoryCollection),{
                ...params,
                timestamp: new Date(),
            })
        } catch (err) {
        console.log("🚀 ~ file: useCreateCategory.ts:23 ~ addCategory ~ err", err)

        }finally{
            dispatch(isCloseLoading())
        }
    }
    return { addCategory }
  }