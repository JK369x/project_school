import Sidebar from '../../../components/componentsAdmin/sidebar/Side-bar'
import Navbar from '../../../components/componentsAdmin/navbar/Navbar'

import Grid from '@mui/material/Grid/Grid'
import React, { FC, useEffect, useState } from 'react'

import '../Dashboard/Dashboard.scss'
//controller
import { useDialog } from '../../../Hook/dialog/useDialog'
import { Box, } from '@mui/material'
import Button from "../../../framework/control/Button/Button";
//react dom 
import { useNavigate, useParams } from 'react-router-dom'

//User

import { Typography, Avatar } from '@mui/material'
import { useAppSelector } from '../../../store/useHooksStore'
import { useGetDetailQuiz } from './Hook/useDetailQuiz'
import moment from 'moment'

const DetailQuiz: FC = () => {
    const { id, id_quiz } = useParams<{ id: string, id_quiz: string }>()
    console.log("🚀 ~ file: DetailQuiz.tsx:23 ~ id", id)
    const { stateQuiz } = useGetDetailQuiz(id)
    const navigate = useNavigate()
    const ClickEditQuiz = () => {
        navigate(`/editquiz/${id}/${id_quiz}`)
    }

    return (
        <div className='home'>
            <Sidebar />
            <div className="homeContainer">
                <Navbar />
                <div className="listContainer">
                    <div className="listTitle">
                        <Box sx={{ width: '100%' }}>
                            <Grid >
                                <Grid container justifyContent={'space-between'} item xs={12} sx={{ m: 0, p: 0 }}>
                                    <Typography variant="h2" mb={2}  >
                                        Detail Quiz
                                    </Typography>
                                    <Button onClick={() => ClickEditQuiz()} label='Edit Quiz'></Button>
                                </Grid>
                                <Grid container justifyContent={'center'}>
                                    <Grid container justifyContent={'space-between'} sx={{ mt: 3 }}>
                                        <Grid container item xs={6}  >
                                            <Typography variant="h5" mb={2} color={'#0061ab'} >
                                                Title :
                                            </Typography>
                                            <Typography variant="h5" mb={2}  >
                                                {stateQuiz.title}
                                            </Typography>
                                        </Grid>
                                        <Grid container item justifyContent={'flex-end'} xs={6}>
                                            <Typography variant="h5" mb={2} color={'#0061ab'}  >
                                                Create Quiz :
                                            </Typography>
                                            <Typography variant="h5" mb={2}  >
                                                {moment(stateQuiz.createDateTime).format('DD/MM/YYYY')}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                    <Grid container>
                                        <Grid container item xs={6}>
                                            <Typography variant="h5" mb={2} color={'#0061ab'}  >
                                                Start Quiz :
                                            </Typography>
                                            <Typography variant="h5" mb={2}  >
                                                {moment(stateQuiz.quiz?.start_quiz).format('H:mm')}
                                            </Typography>

                                        </Grid>
                                        <Grid container item justifyContent={'flex-end'} xs={6}>
                                            <Typography variant="h5" mb={2} color={'#0061ab'} >
                                                End Quiz :
                                            </Typography>
                                            <Typography variant="h5" mb={2}  >
                                                {moment(stateQuiz.quiz?.end_quiz).format('H:mm')}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                    {stateQuiz.quiz?.params?.map((item: any, index: number) => {
                                        return (<React.Fragment key={index}>
                                            <Grid container justifyContent={'center'}>
                                                <Typography variant="h5" mb={2}  >
                                                    {`question ${index + 1} : ${item.question}`}
                                                </Typography>
                                            </Grid>
                                            <Grid justifyContent={'center'} >
                                                <Typography variant="h5" mb={2} mr={2} >
                                                    {`Choice A : ${item.A}`}
                                                </Typography>

                                                <Typography variant="h5" mb={2}  >
                                                    {`Choice B : ${item.B}`}
                                                </Typography>

                                                <Typography variant="h5" mb={2} mr={2}  >
                                                    {`Choice C : ${item.C}`}
                                                </Typography>
                                                <Typography variant="h5" mb={2}  >
                                                    {`Choice D : ${item.D}`}
                                                </Typography>
                                            </Grid>
                                            <Grid container justifyContent={'center'}>
                                                <Typography variant="h5" mb={2}  >
                                                    {`Answer : ${item.answer}`}
                                                </Typography>
                                            </Grid>
                                        </React.Fragment>)
                                    })}
                                </Grid>
                            </Grid>
                        </Box>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default DetailQuiz


