import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../../../store/useHooksStore";
import { isCloseLoading, isShowLoading } from "../../../../store/slices/loadingSlice";
import { UserListsType } from "./useGetUserLists";

import axios from "axios";

interface TypeUserApproval {
    approval: any
    id_document: string
}

export const useGetApprovalUserInCourse = (id_user: string) => {

    const dispatch = useAppDispatch()
    const { id } = useParams<{ id: string }>();
    console.log("🚀 ~ file: useGetApprovalUserInCourse.ts:19 ~ useGetApprovalUserInCourse ~ id:", id)
    //! Time in use
    const [approvalUser, setApprovalUser] = useState<TypeUserApproval[]>([{
        approval: false,
        id_document: "",
    }])




    useEffect(() => {
        if (id) {
            getData()
        }
    }, [id, id_user])

    const getData = async () => {
        try {
            dispatch(isShowLoading())
            console.log('Approval User!!')
            const url = `${import.meta.env.VITE_REACT_APP_API}user/getapprovaluserforcheckjoincourse/${id_user}/${id}`
            axios.defaults.withCredentials = true
            const getdetail = await axios.get(url)
            const result = getdetail.data
            console.log("🚀 ~ file: useGetApprovalUserInCourse.ts:43 ~ getData ~ result:", result)
            if (result) {
                setApprovalUser(result);
            }
        } catch (error) {
            console.log("🚀 ~ file: useGetDetailUser.ts:41 ~ getData ~ error", error)


        } finally {
            dispatch(isCloseLoading())
        }
    }
    return { approvalUser }
}