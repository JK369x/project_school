import React, { useEffect, useMemo } from 'react'
import { Typography, Card, CardContent, CardActions, Button } from '@mui/material'

import { useParams } from 'react-router-dom';
import { useGetDetailQuiz } from './Hook/useDetailQuiz';

export default function Result(props: any) {
    const { id, id_quiz } = useParams<{ id: string, id_quiz: string }>();
    const { answers, restartQuiz } = props;
    const { stateQuiz } = useGetDetailQuiz(id)
    const newdata = stateQuiz.quiz?.params ?? []



    const correctAnswers = useMemo(() => {
        return newdata.filter((q: any, i: number) => {
            console.log('user กดมาทีละครั้ง', (answers[i]))
            console.log('เฉลย', q?.answer)
            return q?.answer === (answers[i]);
        }).length;
    }, [answers, newdata])


    return (
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
            </CardActions>
        </Card>
    )
}