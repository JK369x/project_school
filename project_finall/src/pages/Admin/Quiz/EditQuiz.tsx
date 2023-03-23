import Sidebar from '../../../components/componentsAdmin/sidebar/Side-bar'
import Navbar from '../../../components/componentsAdmin/navbar/Navbar'

import Grid from '@mui/material/Grid/Grid'
import React, { FC, useEffect, useState } from 'react'

import '../Dashboard/Dashboard.scss'
//controller
import { useDialog } from '../../../Hook/dialog/useDialog'
import { Box, TextField, } from '@mui/material'
import Button from "../../../framework/control/Button/Button";
//react dom 
import { useNavigate, useParams } from 'react-router-dom'

//User

import { Typography, Avatar } from '@mui/material'
import { useAppSelector } from '../../../store/useHooksStore'
import { useGetDetailQuiz } from './Hook/useDetailQuiz'
import moment, { Moment } from 'moment'
import { useForm } from 'react-hook-form'
import { ControllerTextField } from '../../../framework/control'
import { DesktopTimePicker } from '@mui/x-date-pickers'
import { useUpdateQuiz } from './Hook/useUpdateQuiz'

const EditQuiz: FC = () => {
    const { id } = useParams<{ id: string }>()
    console.log("🚀 ~ file: DetailQuiz.tsx:23 ~ id", id)
    const { stateQuiz } = useGetDetailQuiz(id)
    const { updateQuiz } = useUpdateQuiz()
    const navigate = useNavigate()
    const myForm = useForm<{ data: any }>({
        //!defaultValues
        // defaultValues
    })
    const { watch, handleSubmit, getValues, setValue } = myForm
    const Start_Quiz = moment(stateQuiz.quiz?.start_quiz)
    const [start, setStart] = useState<Moment>(
        Start_Quiz
    );
    const End_Quiz = moment(stateQuiz.quiz?.end_quiz)
    const [end, setEnd] = useState<Moment>(
        End_Quiz
    );
    useEffect(() => {
        myForm.setValue('data', stateQuiz)
        setStart(stateQuiz.quiz?.start_quiz)
        setEnd(stateQuiz.quiz?.end_quiz)
    }, [stateQuiz])
    const [numOfChoices1, setNumOfChoices1] = useState(1);
    const handleAddChoice1 = (e: any) => {
        setNumOfChoices1(numOfChoices1 + 1);
    }


    const onSubmit = async () => {
        setValue('data.quiz.start_quiz', moment(start))
        setValue('data.quiz.end_quiz', moment(end))
        console.log(getValues().data)
        if (getValues().data) {
            try {
                await updateQuiz(getValues().data)
            } catch (error) {
                console.log("🚀 ~ file: EditUser.tsx:55 ~ onClickSubmitEdit ~ error", error)
            }
        }
    }
    return (
        <div className='home'>
            <Sidebar />
            <div className="homeContainer">
                <Navbar />
                <div className="listContainer">
                    <div className="listTitle">
                        <Box sx={{ width: '100%' }}>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <Grid >
                                    <Grid container justifyContent={'space-between'} item xs={12} sx={{ m: 0, p: 0 }}>
                                        <Typography variant="h2" mb={2}  >
                                            Detail Quiz
                                        </Typography>
                                    </Grid>

                                    <Grid container justifyContent={'center'}>
                                        <Grid container justifyContent={'space-between'} sx={{ mt: 3 }}>
                                            <Grid container item xs={6}  >
                                                <ControllerTextField fullWidth formprop={myForm} name={"data.title"} label={'Title'} />
                                            </Grid>
                                            <Grid container item justifyContent={'flex-end'} xs={6}>
                                                <Typography variant="h5" mb={2} color={'#0061ab'}  >
                                                    Create Quiz :
                                                </Typography>
                                                <Typography variant="h5" mb={2}  >
                                                    {moment(stateQuiz.createDateTime).format('DD/MM/YYYY')}
                                                </Typography>
                                            </Grid>

                                            <DesktopTimePicker
                                                label="Start Quiz"
                                                value={start}
                                                ampm={false}
                                                onChange={(newValue: any) => {
                                                    setStart(newValue);
                                                }}
                                                renderInput={(params: any) => <TextField {...params} />}
                                            />
                                            <DesktopTimePicker
                                                label="End Quiz"
                                                value={end}
                                                ampm={false}
                                                onChange={(newValue: any) => {
                                                    setEnd(newValue);
                                                }}
                                                renderInput={(params: any) => <TextField {...params} />}
                                            />
                                        </Grid>

                                        {Array.from({ length: numOfChoices1 }, (_, i) => (
                                            <>
                                                <Grid container justifyContent={'center'} spacing={1} sx={{ mb: 3 }}>
                                                    <Grid container justifyContent={'center'} item xs={12} >
                                                        <ControllerTextField
                                                            fullWidth
                                                            key={i}
                                                            formprop={myForm}
                                                            name={`data.quiz.params.${i}.question`}
                                                            label={`title`}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={3} >
                                                        <ControllerTextField
                                                            key={i}
                                                            fullWidth
                                                            formprop={myForm}
                                                            name={`data.quiz.params.${i}.A`}
                                                            label={`A`}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={3} >
                                                        <ControllerTextField
                                                            key={i}
                                                            fullWidth
                                                            formprop={myForm}
                                                            name={`data.quiz.params.${i}.B`}
                                                            label={`B`}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={3} >
                                                        <ControllerTextField
                                                            key={i}
                                                            fullWidth
                                                            formprop={myForm}
                                                            name={`data.quiz.params.${i}.C`}
                                                            label={`C`}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={3} >
                                                        <ControllerTextField
                                                            key={i}
                                                            fullWidth
                                                            formprop={myForm}
                                                            name={`data.quiz.params.${i}.D`}
                                                            label={`D`}
                                                        />
                                                    </Grid>
                                                    <Grid container justifyContent={'center'} >
                                                        <ControllerTextField
                                                            key={i}

                                                            formprop={myForm}
                                                            name={`data.quiz.params.${i}.answer`}
                                                            label={`answer`}
                                                        />
                                                    </Grid>
                                                </Grid>
                                            </>
                                        ))}
                                        <Typography variant="h6" color={'primary'} onClick={handleAddChoice1}
                                            ml={3} sx={{
                                                '&:hover': {
                                                    color: '#0572c5',
                                                    cursor: "pointer",
                                                }
                                            }}>
                                            Add Choice +
                                        </Typography>
                                    </Grid>
                                    <Grid container justifyContent={'center'} mt={2} >
                                        <Button type='submit' label='Submit' />
                                    </Grid>
                                </Grid>

                            </form>
                        </Box>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default EditQuiz


