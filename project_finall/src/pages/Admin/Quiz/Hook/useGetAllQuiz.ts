import { db } from '../../../../firebase/config_firebase';
import { addDoc, setDoc, doc, deleteDoc, } from "firebase/firestore";
import { CourseCollection } from '../../../../firebase/createCollection'
import { openAlertError, openAlertSuccess } from '../../../../store/slices/alertSlice';
import { isCloseLoading, isShowLoading } from '../../../../store/slices/loadingSlice';
import { useAppDispatch, useAppSelector } from '../../../../store/useHooksStore'
import { Lookup, typeCourseOnline_Onside } from '../../../../types/type';
import axios from 'axios';
import { QuizType } from '../Quiz';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export type QuizGet = {
    createDateTime: any
    id_document: string
    end_quiz: any
    start_quiz: any
    quizall: any
    status_quiz: any
} & QuizType

export const useGetAllQuiz = () => {
    const { uid, status, displayName, photoURL } = useAppSelector(({ auth }) => auth);
    const dispatch = useAppDispatch()
    const { id } = useParams<{ id: string }>();
    console.log("useParams = id", id)
    const [quiz, setQuiz] = useState<QuizGet[]>([])

    useEffect(() => {
        if (id) {
            getQuiz()
        }
    }, [id])

    const getQuiz = async () => {
        try {
            dispatch(isShowLoading())
            console.log('quiz !! ')
            const url = `${import.meta.env.VITE_REACT_APP_API}course/getallquiz/${id}`
            try {
                axios.defaults.withCredentials = true
                const getQuiz = await axios.get(url)
                const result = getQuiz.data
                console.log("🚀 ~ file: useGetAllQuiz.ts:42 ~ getQuiz ~ result", result)

                setQuiz(
                    result.map((e: any) => {
                        return {
                            status_quiz: e.status_quiz,
                            quizall: e.quiz.params,
                            title: e.quiz.newdata,
                            end_quiz: e.quiz.end_quiz.toLocaleString('en-US'),
                            start_quiz: e.quiz.start_quiz,
                            id_document: e.id_document,
                            createDateTime: e.createDateTime,
                            id_create: e.quiz.uid
                        }
                    }) as QuizGet[]
                )
                return true
            } catch (err) {
                return false
            }
        } catch (err) {
            console.log(err)

        } finally {
            dispatch(isCloseLoading())
        }
    }

    return { quiz, getQuiz }
}


