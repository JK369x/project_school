import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";

import { TypeComment } from "./usePostComment";
import { useAppDispatch } from "../../../../store/useHooksStore";
import { isCloseLoading, isShowLoading } from "../../../../store/slices/loadingSlice";

export const useGetDetailComment = () => {

    const dispatch = useAppDispatch()
    const { id_course, id_comment } = useParams<{ id_course: string, id_comment: string }>();
    //! Time in use
    const [state, setState] = useState<TypeComment>({
        id_document: "",
        name_user: "",
        ratting: 0,
        comment_user: "",
        date_comment: "",
        reply: ""
    })




    useEffect(() => {
        if (id_comment) {
            getData()
        }
    }, [id_comment])

    const getData = async () => {
        try {
            dispatch(isShowLoading())
            const url = `${import.meta.env.VITE_REACT_APP_API}course/commentbyid/${id_course}/${id_comment}`
            axios.defaults.withCredentials = true
            const getdetail = await axios.get(url)
            const result = getdetail.data

            if (result) {
                setState({ ...(result as any) });
                return true
            }
        } catch (error) {
            console.log("🚀 ~ file: useGetDetailUser.ts:41 ~ getData ~ error", error)


        } finally {
            dispatch(isCloseLoading())
        }
    }
    return { state, getData }
}