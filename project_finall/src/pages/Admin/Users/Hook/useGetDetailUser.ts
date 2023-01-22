import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from '../../../../firebase/config_firebase'
import { AccountCollection } from '../../../../firebase/createCollection'
import { useAppDispatch, useAppSelector } from "../../../../store/useHooksStore";
import { isCloseLoading, isShowLoading } from "../../../../store/slices/loadingSlice";
import { UserListsType } from "./useGetUserLists";
import { lookup } from "dns";
import { IFormInput } from "./useCreateAcc"
import axios from "axios";

export const useGetDetailUser = () => {

    const dispatch = useAppDispatch()
    const { id } = useParams<{ id: string }>();
    //! Time in use
    const [state, setState] = useState<UserListsType>({
        email: "",
        password: "",
        confirmPassword: "",
        firstName: "",
        lastName: "",
        job: "",
        birthday: "",
        address: "",
        province: null,
        amphure: null,
        tambon: null,
        zipCode: null,
        agency: "",
        status: null,
        id: "",
        about: "",
        image_rul: null,
        id_document: "",
    })




    useEffect(() => {
        if (id) {
            getData()
        }
    }, [id])

    const getData = async () => {
        try {
            dispatch(isShowLoading())
            const url = `${import.meta.env.VITE_REACT_APP_API}user/getdetailuser/${id}`
            axios.defaults.withCredentials = true
            const getdetail = await axios.get(url)
            const result = getdetail.data

            if (result) {
                setState({ ...(result as any), id: result.id });
                return true
            }
        } catch (error) {
            console.log("🚀 ~ file: useGetDetailUser.ts:41 ~ getData ~ error", error)


        } finally {
            dispatch(isCloseLoading())
        }
    }
    return { state }
}