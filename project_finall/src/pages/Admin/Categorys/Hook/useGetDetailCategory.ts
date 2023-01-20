import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from '../../../../firebase/config_firebase'
import { AccountCollection } from '../../../../firebase/createCollection'
import { useAppDispatch, useAppSelector } from "../../../../store/useHooksStore";
import { isCloseLoading, isShowLoading } from "../../../../store/slices/loadingSlice";
import { lookup } from "dns";
import axios from "axios";
import { CategoryListsType } from "./useGetCategory";

export const useGetDetailCategory = () => {

    const dispatch = useAppDispatch()
    const { id } = useParams<{ id: string }>();
    console.log("🚀 ~ file: useGetDetailUser.ts:17 ~ useGetDetailUser ~ id", id)
    //! Time in use
    const [state, setState] = useState<CategoryListsType>({
        id: "",
        Category_Title: ""
    })




    useEffect(() => {
        if (id) {
            getData()
        }
    }, [id])

    const getData = async () => {
        try {
            dispatch(isShowLoading())
            const url = `${import.meta.env.VITE_REACT_APP_API}category/getdetatilcategory/${id}`
            axios.defaults.withCredentials = true
            const getdetail = await axios.get(url)
            const result = getdetail.data
            console.log("🚀 ~ file: useGetDetailUser.ts:53 ~ getData ~ result", result)
           
            if (result) {
                setState({ ...(result as any), id: result.id });
            } 
        } catch (error) {
            console.log("🚀 ~ file: useGetDetailUser.ts:41 ~ getData ~ error", error)


        } finally {
            dispatch(isCloseLoading())
        }
    }
    return { state }
}