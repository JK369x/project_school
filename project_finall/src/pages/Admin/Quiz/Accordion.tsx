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
        <div>
            {quiz.map((item: any, index: number) => {
                return (<React.Fragment key={index}>

                    <Accordion disabled={item.status_quiz == "false" ? true : false} >
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography>{item.title}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Grid container alignContent={'center'} alignItems={'center'}>
                                <Button onClick={() => { clickQuiz(item.id_document) }}>เริ่มทำ quiz</Button>
                                <Typography color='primary' sx={{ mr: 2, ml: 2 }}>
                                    Start Quiz
                                </Typography>
                                <Typography>
                                    {item.start_quiz}
                                </Typography>
                                <Typography color='primary' sx={{ mr: 2, ml: 2 }}>
                                    End Quiz
                                </Typography>
                                <Typography>
                                    {item.end_quiz}
                                </Typography>
                                <Typography color='primary' sx={{ mr: 1, ml: 2 }}>
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
        </div>
    );
}