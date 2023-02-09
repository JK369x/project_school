import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";
import { useAppDispatch } from "../../../store/useHooksStore";
import { UserListsType } from "../Users/Hook/useGetUserLists";
import { isCloseLoading, isShowLoading } from "../../../store/slices/loadingSlice";

export const useGetDetailuserById = () => {

    const dispatch = useAppDispatch()
    const { id_user } = useParams<{ id_user: string }>();
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
        if (id_user) {
            getData()
        }
    }, [id_user])

    const getData = async () => {
        try {
            dispatch(isShowLoading())
            const url = `${import.meta.env.VITE_REACT_APP_API}user/getdetailuser/${id_user}`
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