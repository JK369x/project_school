
import Sidebar from '../../../components/componentsAdmin/sidebar/Side-bar'
import Navbar from '../../../components/componentsAdmin/navbar/Navbar'
import { ControllerTextField } from '../../../framework/control'

import Grid from '@mui/material/Grid/Grid'

import { FC, useEffect, useState } from 'react'


//controller
import { useDialog } from '../../../Hook/dialog/useDialog'


//react dom 
import { useNavigate, useParams } from 'react-router-dom'
import { Button, TextField, Typography } from '@mui/material'

import { useForm } from 'react-hook-form'


import { storage } from '../../../firebase/config_firebase'
import { useAppDispatch, useAppSelector } from '../../../store/useHooksStore'

import { isCloseLoading, isShowLoading } from '../../../store/slices/loadingSlice'
import { openAlertError, openAlertSuccess } from '../../../store/slices/alertSlice'


import '../Dashboard/Dashboard.scss'
import { useCreateQuiz } from './Hook/useCreateQuiz'
import { TimePicker } from '@material-ui/pickers'
import { DesktopTimePicker } from '@mui/x-date-pickers'
import { Moment } from 'moment'
import moment from 'moment'
export interface QuizType {
    question: string;
    A: string;
    B: string;
    C: string;
    D: string;
    answer: string;
    title: string;
}


const Quiz: FC = () => {


    //*Hook
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const { addQuiz } = useCreateQuiz()
    const { uid } = useAppSelector(({ auth }) => auth)

    //? waiting set Default value form
    const myForm = useForm<{ data: QuizType[] }>({
        defaultValues: {
            data: [
                {
                    question: '',
                    A: '',
                    B: '',
                    C: '',
                    D: '',
                    answer: '',
                }
            ]
        }
    })


    const [state, setState] = useState(false)

    const { handleSubmit, getValues, setValue, watch } = myForm

    const values = getValues('data');

    const handleAddQuiz = () => {
        console.log('tsets  ')

        myForm.setValue('data', [...getValues('data'), {
            question: '',
            A: '',
            B: '',
            C: '',
            D: '',
            answer: '',
            title: '',

        }])
        setState(!state)

    }

    const { id } = useParams<{ id: string }>();
    console.log("🚀 ~ file: Quiz.tsx:77 ~ id", id)
    const [data, setData] = useState<any>([])
    console.log("🚀 ~ file: Quiz.tsx:80 ~ data", data)

    const setAnswer = (value: string, id: number) => {
        setData([...data, value]);
    }
    const ClickSetAnswer = (value: any, i: number) => {


        if (data.length + 1 === i) {

            setValue(`data.${i - 1}.answer`, value)
            setAnswer(value, i);
            console.log('set value')
        } else {
            dispatch(openAlertError('Choose 1 choice !!'))
        }

    }

    const [start, setStart] = useState<Moment>(
        moment()
    );

    const [end, setEnd] = useState<Moment>(
        moment()
    );

    const onSubmit = async () => {
        const start_quiz = moment(start)
        console.log(start_quiz)
        const end_quiz = moment(end)

        const title = getValues()
        console.log("🚀 ~ file: Quiz.tsx:137 ~ onSubmit ~ getValues()", getValues())
        console.log("🚀 ~ file: Quiz.tsx:137 ~ onSubmit ~ title", title)
        if (getValues()) {
            addQuiz(getValues('data'), id, { start_quiz, end_quiz }, getValues())
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
                        <Grid container justifyContent={'center'}>
                            <Typography variant="h1" component="h1" ml={3}>
                                Add Quiz
                            </Typography>
                            <Grid container justifyContent={'center'} spacing={2} sx={{ mt: 1 }}>
                                <Grid item >
                                    <DesktopTimePicker
                                        label="Start Quiz"
                                        value={start}
                                        ampm={false}
                                        onChange={(newValue: any) => {
                                            setStart(newValue);
                                        }}
                                        renderInput={(params: any) => <TextField {...params} />}
                                    />

                                </Grid>
                                <Grid item>
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

                            </Grid>


                            <form onSubmit={handleSubmit(onSubmit)}>
                                <ControllerTextField fullWidth formprop={myForm} name={`title`} label={`Title`} />
                                {getValues('data') && getValues('data').map((q, i) => {
                                    let temp = i + 1
                                    return (
                                        <div>
                                            <ControllerTextField fullWidth formprop={myForm} name={`data.${i}.question`} label={`Question${i + 1}`} />
                                            <Grid container justifyContent={'center'} spacing={1} >
                                                <Grid item xs={6}>
                                                    <ControllerTextField fullWidth formprop={myForm} name={`data.${i}.A`} label={'A'} />
                                                    <ControllerTextField fullWidth formprop={myForm} name={`data.${i}.B`} label={'B'} />
                                                </Grid>
                                                <Grid item xs={6} sx={{ mb: 2 }}>
                                                    <ControllerTextField fullWidth formprop={myForm} name={`data.${i}.C`} label={'C'} />
                                                    <ControllerTextField fullWidth formprop={myForm} name={`data.${i}.D`} label={'D'} />
                                                </Grid>

                                            </Grid>
                                            <Grid container justifyContent={'center'} spacing={1} sx={{ mb: 1 }}>
                                                <Grid item>
                                                    <Button onClick={() => { ClickSetAnswer('A', temp) }}>A</Button>
                                                </Grid>
                                                <Grid item>
                                                    <Button onClick={() => { ClickSetAnswer('B', temp) }}>B</Button>
                                                </Grid>
                                                <Grid item>
                                                    <Button onClick={() => { ClickSetAnswer('C', temp) }}>C</Button>
                                                </Grid>
                                                <Grid item>
                                                    <Button onClick={() => { ClickSetAnswer('D', temp) }}>D</Button>
                                                </Grid>
                                                <Grid key={i} container justifyContent={'center'} alignContent={'center'} alignItems={'center'} sx={{ mt: 2 }}>
                                                    <Typography variant="h6" color={'primary'} >
                                                        Answer :  {data[i]}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </div>
                                    )
                                })
                                }


                                <Grid container justifyContent={'space-between'} alignContent={'center'} alignItems={'center'}>
                                    <Typography variant="h6" color={'primary'} onClick={() => { handleAddQuiz() }}
                                        sx={{
                                            '&:hover': {
                                                color: '#0572c5',
                                                cursor: "pointer",
                                            }
                                            ,
                                        }}>
                                        Add Quiz +
                                    </Typography>
                                    <Button type='submit'>Submit</Button>

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