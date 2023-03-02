import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useGetAllQuiz } from './Hook/useGetAllQuiz';
import { Key } from '@mui/icons-material';
import { time } from 'console';
import { Button, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { Footer } from '../../../components/Footer';

export default function SimpleAccordion(props: any) {
    const newId = props.id
    const navigate = useNavigate()
    console.log("🚀 ~ file: Accordion.tsx:11 ~ SimpleAccordion ~ newId", newId)
    const { quiz } = useGetAllQuiz()
    console.log("🚀 ~ file: Accordion.tsx:13 ~ SimpleAccordion ~ quiz", quiz)
    const clickQuiz = (quizall: any) => {
        console.log("=====", quizall)
        navigate(`/showquiz/${newId}/${quizall}`)
    }
    return (
        <>
            {quiz.map((item: any, index: number) => {
                return (<React.Fragment key={index}>
                    <Accordion disabled={item.status_quiz == "false" ? true : false} sx={{ maxWidth: 900 }} >
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography>{item.title}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Grid container alignContent={'center'} alignItems={'center'}>
                                <Button disabled={moment().isBetween(moment(item.start_quiz), moment(item.end_quiz)) ? false : true} onClick={() => { clickQuiz(item.id_document) }}>เริ่มทำ quiz</Button>
                                <Typography color='primary' sx={{ mr: 2, ml: 2 }}>
                                    Start Quiz
                                </Typography>
                                <Typography>
                                    {moment(item.start_quiz).format("H:mm")}
                                </Typography>
                                <Typography color='error' sx={{ mr: 2, ml: 2 }}>
                                    End Quiz
                                </Typography>
                                <Typography>
                                    {moment(item.end_quiz).format("H:mm")}
                                </Typography>
                                <Typography color='#129216' sx={{ mr: 1, ml: 2 }}>
                                    จำนวน
                                </Typography>
                                <Typography>
                                    {`${item.quizall.length}         ข้อ`}
                                </Typography>
                            </Grid>
                        </AccordionDetails>
                    </Accordion>

                </React.Fragment>)
            })}

        </>
    );
}