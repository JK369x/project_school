import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { doc, setDoc , getDoc} from "firebase/firestore"; 
import { db } from '../firebase/config_firebase'
import { AccountCollection } from '../firebase/createCollection'
import { useAppDispatch, useAppSelector } from "../store/useHooksStore";
import { isCloseLoading, isShowLoading } from "../store/slices/loadingSlice";


// export interface DetailUserType {
//     id: string
//     firstName: string
//     lastName: string
//     email: string
//     birthday?: number
//     agency: string
//     description: string
// }


export const useGetDetailUser = () =>{
    
    const dispatch = useAppDispatch()
    // const uid = useAppSelector(({ auth: { uid } }) => uid)
    const { id } = useParams<{ id: string }>();
    const [state, setState] = useState<any>({})
    
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