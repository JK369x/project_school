import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { doc, setDoc , getDoc} from "firebase/firestore"; 
import { db } from '../firebase/config_firebase'
import { AccountCollection } from '../firebase/createCollection'
import { useAppDispatch, useAppSelector } from "../store/useHooksStore";
import { isCloseLoading, isShowLoading } from "../store/slices/loadingSlice";
import { UserListsType } from "./useGetUserLists";
import { lookup } from "dns";
import {IFormInput} from "../Hook/useCreateAcc"

export const useGetDetailUser = () =>{
    
    const dispatch = useAppDispatch()
    // const uid = useAppSelector(({ auth: { uid } }) => uid)
    const { id } = useParams<{ id: string }>();
    const [state, setState] = useState<UserListsType>({
        email: "",
        password:  "",
        confirmPassword: "" ,
        firstName: "",
        lastName: "",
        job: "",
        birthday: ""  ,
        address: "" ,
        province: null,
        amphure: null,
        tambon: null ,
        zipCode: null ,
        agency: "",
        status:null ,
        id:"",
        about:"",
    })



    
    useEffect(() => {
        if (id) {
            getData()
        }
    }, [id])
    
    const getData = async () => {
        try {
            dispatch(isShowLoading())
            const result = await getDoc(
                doc(AccountCollection, id as string)
            )
            if(result.exists()){
                setState({ ...(result.data() as any), id: result.id });
            }else{
                //
            }
        } catch (error) {
            console.log("🚀 ~ file: useGetDetailUser.ts:41 ~ getData ~ error", error)
    
    
        } finally {
            dispatch(isCloseLoading())
        }
    }
    return {state}
}