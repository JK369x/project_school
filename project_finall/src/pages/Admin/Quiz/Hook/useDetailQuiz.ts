import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../../../store/useHooksStore";
import { isCloseLoading, isShowLoading } from "../../../../store/slices/loadingSlice";

import axios from "axios";

export const useGetDetailQuiz = (id_course: any) => {
    const dispatch = useAppDispatch()
    const uid = useAppSelector(({ auth: { uid } }) => uid)
    const { id_quiz } = useParams<{ id_quiz: string }>();
    const [stateQuiz, setStateQuiz] = useState<any>({
        createDateTime: "",
        id_document: "",
        end_quiz: "",
        start_quiz: "",
        question: "",
        A: "",
        B: "",
        C: "",
        D: "",
        answer: "",
        title: "",

    })

    useEffect(() => {
        if (id_quiz) {
            getQuiz()
        }
    }, [id_quiz])


    const getQuiz = async () => {
        try {
            dispatch(isShowLoading())
            const url = `${import.meta.env.VITE_REACT_APP_API}course/getdetailquiz/${id_course}/${id_quiz}`
            axios.defaults.withCredentials = true
            const getdetail = await axios.get(url)
            const result = getdetail.data
            console.log("🚀 ~ file: useGetCourseDtail.ts:62 ~ getCourse ~ result", result)
            if (result) {
                setStateQuiz({ ...(result as any), id: result.id });
            }
        } catch (error) {
            console.log("🚀 ~ file: useGetDetailUser.ts:41 ~ getData ~ error", error)


        } finally {
            dispatch(isCloseLoading())
        }
    }
    return { stateQuiz }

}