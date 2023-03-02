import React, { useEffect, useMemo } from 'react'
import { Typography, Card, CardContent, CardActions, Button } from '@mui/material'

import { useNavigate, useParams } from 'react-router-dom';
import { useGetDetailQuiz } from './Hook/useDetailQuiz';
import { useAddScoreQuiz } from './Hook/useAddScoreQuiz';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../../store/useHooksStore';
import moment from 'moment';
import { openAlertError } from '../../../store/slices/alertSlice';

interface scoretype {
    id_course: string
    id_quiz: string
    total_score: string | number
    full_score: string | number
    id_user: string | number
    title_quiz: string
}

export default function Result(props: any) {
    const { uid, status, displayName, photoURL } = useAppSelector(({ auth }) => auth);
    const { id, id_quiz } = useParams<{ id: string, id_quiz: string }>();
    const { answers, restartQuiz, title_quiz } = props;
    const { stateQuiz } = useGetDetailQuiz(id)
    console.log("=========", stateQuiz)
    const dispatch = useAppDispatch()
    const newdata = stateQuiz.quiz?.params ?? []
    const timeQuiz_start = stateQuiz.quiz?.end_quiz
    console.log("🚀 ~ file: Result.tsx:27 ~ Result ~ timeQuiz_start:", timeQuiz_start)
    const navigate = useNavigate()
    const { addScore } = useAddScoreQuiz()

    const correctAnswers = useMemo(() => {
        return newdata.filter((q: any, i: number) => {
            console.log('user กดมาทีละครั้ง', (answers[i]))
            console.log('เฉลย', q?.answer)

            return q?.answer === (answers[i]);
        }).length;
    }, [answers, newdata])


    const myForm = useForm<scoretype>({})
    const { getValues, setValue, handleSubmit } = myForm

    const onSubmit = async () => {
        if (moment().isBefore(timeQuiz_start)) {
            setValue('id_user', uid ? uid : '')
            setValue('id_quiz', id_quiz ? id_quiz : '')
            setValue('id_course', id ? id : '')
            setValue('total_score', correctAnswers)
            setValue('full_score', newdata.length)
            setValue('title_quiz', title_quiz)
            if (getValues()) {
                console.log("🚀 ~ file: Result.tsx:47 ~ onSubmit ~ getValues()", getValues())
                await addScore(getValues())
                navigate(`/detailcoursehomepage/${id}`)
            } else {
                console.log(' not Values ')
            }
        } else {
            dispatch(openAlertError('error save score'))
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>

            <Card variant='outlined' sx={{ pt: 3, pb: 3 }}>
                <CardContent>
                    <Typography sx={{ display: "flex", justifyContent: "center", mb: 3 }} variant="h4" color="text.secondary">
                        Result
                    </Typography>
                    <Typography sx={{ display: "flex", justifyContent: "center", mb: 3 }} variant="h4" color="text.secondary">
                        {correctAnswers} / {newdata.length}
                    </Typography>
                </CardContent>
                <CardActions sx={{ display: "flex", justifyContent: "center" }}>
                    <Button onClick={restartQuiz} variant="outlined">
                        Retry
                    </Button>
                    <Button type='submit' variant="outlined">
                        Submit
                    </Button>
                </CardActions>
            </Card>

        </form>
    )
}