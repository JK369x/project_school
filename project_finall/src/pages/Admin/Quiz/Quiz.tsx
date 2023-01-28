
import Sidebar from '../../../components/componentsAdmin/sidebar/Side-bar'
import Navbar from '../../../components/componentsAdmin/navbar/Navbar'
import { Button, ControllerTextField } from '../../../framework/control'

import Grid from '@mui/material/Grid/Grid'

import { FC, useEffect, useState } from 'react'


//controller
import { useDialog } from '../../../Hook/dialog/useDialog'


//react dom 
import { useNavigate, useParams } from 'react-router-dom'
import { Typography } from '@mui/material'

import { useForm } from 'react-hook-form'


import { storage } from '../../../firebase/config_firebase'
import { useAppDispatch, useAppSelector } from '../../../store/useHooksStore'

import { isCloseLoading, isShowLoading } from '../../../store/slices/loadingSlice'
import { openAlertError, openAlertSuccess } from '../../../store/slices/alertSlice'


import '../Dashboard/Dashboard.scss'
import { useCreateQuiz } from './Hook/useCreateQuiz'

export interface QuizType {
    Title_Quiz: string
    choice0: string
    choice1: string
    choice2: string
    choice3: string
}


const Quiz: FC = () => {


    //*Hook
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const { addQuiz } = useCreateQuiz()


    //? waiting set Default value form
    const myForm = useForm<QuizType>({
        //! can useDefault onChange

    })




    const { handleSubmit, getValues, setValue } = myForm


    const [questions, setQuestions] = useState([{
        question: "",
        choices: ["", "", "", ""],
        answer: ""
    }]);


    const handleAddQuiz = () => {
        questions.push({
            question: "",
            choices: ["", "", "", ""],
            answer: ""
        });
        setQuestions([...questions]);
    }
    const { id } = useParams<{ id: string }>();
    console.log("🚀 ~ file: Quiz.tsx:77 ~ id", id)
    const onSubmit = async () => {
        if (getValues()) {
            console.log("🚀 ~ file: Quiz.tsx:82 ~ onSubmit ~ getValues()", getValues())
            addQuiz(getValues(), id)
            try {
            } catch (err) {
                console.log("🚀 ~ file: addCategory.tsx:65 ~ onSubmit ~ err", err)
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
                        <Grid container>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <Typography variant="h1" component="h1" ml={3}>
                                    Add Quiz
                                </Typography>




                                {questions.map((q, i) => {
                                    i = i + 1
                                    return (
                                        <div>
                                            <ControllerTextField fullWidth formprop={myForm} name={`Title_Quiz${i}`} label={`Title${i}`} value={q.question} />
                                            <Grid container justifyContent={'center'} spacing={1} >
                                                <Grid item xs={6}>
                                                    <ControllerTextField fullWidth formprop={myForm} name={`A${i}`} label={'A'} value={q.choices[0]} />
                                                    <ControllerTextField fullWidth formprop={myForm} name={`B${i}`} label={'B'} value={q.choices[1]} />
                                                </Grid>
                                                <Grid item xs={6} sx={{ mb: 2 }}>
                                                    <ControllerTextField fullWidth formprop={myForm} name={`C${i}`} label={'C'} value={q.choices[2]} />
                                                    <ControllerTextField fullWidth formprop={myForm} name={`D${i}`} label={'D'} value={q.choices[3]} />
                                                </Grid>
                                            </Grid>
                                            <ControllerTextField fullWidth formprop={myForm} name={`answer${i}`} label={'Answer'} value={q.answer} />
                                        </div>
                                    )
                                })}
                                <Grid container justifyContent={'space-between'} alignContent={'center'} alignItems={'center'}>
                                    <Typography variant="h6" color={'primary'} onClick={handleAddQuiz}
                                        sx={{
                                            '&:hover': {
                                                color: '#0572c5',
                                                cursor: "pointer",
                                            }
                                            ,
                                        }}>
                                        Add Quiz +
                                    </Typography>
                                    <Button label='Submit' type='submit' />
                                </Grid>
                            </form>
                        </Grid>
                    </div>
                </div>
            </div >
        </div >


    )
}

export default Quiz