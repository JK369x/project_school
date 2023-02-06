import Sidebar from '../../../components/componentsAdmin/sidebar/Side-bar'
import Navbar from '../../../components/componentsAdmin/navbar/Navbar'
import '../Dashboard/Dashboard.scss'

import Grid from '@mui/material/Grid/Grid'
import { FC, useEffect, useState } from 'react'
import CheckIcon from '@mui/icons-material/Check';

//controller
import { useDialog } from '../../../Hook/dialog/useDialog'
import { Box, Button, } from '@mui/material'
//react dom 
import { useNavigate, useParams } from 'react-router-dom'

//User

import { Typography, Avatar } from '@mui/material'
import { useGetCourseDetail } from './Hook/useGetCourseDtail'
import Image from '../../../components/Image/Image'
import React from 'react'
import { useAppDispatch, useAppSelector } from '../../../store/useHooksStore'
import { setbtnStore } from '../../../store/slices/buttonSlice'
import { useStatusButtonCheckName } from './Hook/useStatusButtonCheckName'
import { ControllerTextField } from '../../../framework/control'
import { useForm } from 'react-hook-form'
import { useReject } from './Hook/useRejectCourse'
import TableQuiz from '../Quiz/TableQuiz'

import { useGetStatusBtnCheckName } from './Hook/useGetStatusBtnCheckName'
import { useGetStatusBtnComment } from '../Comment/Hook/useGetStatusBtnComment'
import { useUpdateBtnComment } from '../Comment/Hook/useUpdateBtnComment'
const DetailCourse: FC = () => {
    const { state } = useGetCourseDetail()
    const { BtnstatusCheckName } = useStatusButtonCheckName()
    const { btnStatus } = useGetStatusBtnCheckName(state.id)
    const { BtnstatusComment } = useUpdateBtnComment()
    const { btnComment } = useGetStatusBtnComment(state.id)
    console.log("from hook =", btnStatus)



    //*start register course
    const Start_Register_Date = new Date(state.start_register).toLocaleDateString();
    const Start_Register_Time = new Date(state.start_register).toLocaleTimeString('en-Us', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: false,
        timeZone: 'Asia/Bangkok'
    });

    //*end register course
    const End_Register_Date = new Date(state.End_register).toLocaleDateString();
    const End_Register_Time = new Date(state.End_register).toLocaleTimeString('en-Us', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: false,
        timeZone: 'Asia/Bangkok'
    });

    //*start course and End course
    const Start_Course_Time = new Date(state.start_learn).toLocaleDateString()
    const End_Course_Time = new Date(state.end_learn).toLocaleDateString()

    //*Course Date
    const Course_Date = Array.from(state.course_date!).map((params: any, index: number) => {
        return (index !== 0 ? ' - ' + params.label : params.label)
    })

    //*Course Time Start and End
    const start_course_learn = new Date(state.start_time).toLocaleTimeString('en-Us', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: false,
        timeZone: 'Asia/Bangkok'
    })
    const start_course_end = new Date(state.end_time).toLocaleTimeString('en-Us', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: false,
        timeZone: 'Asia/Bangkok'
    })

    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const onClickViewUser = () => {
        navigate(`/viewuserjoincourse/${state.id}`)

    }
    const myForm = useForm<any>({
        //! can useDefault onChange

    })
    const { handleSubmit, getValues, setValue } = myForm

    const [isButtonEnabled, setIsButtonEnabled] = useState(btnStatus);
    const [isButtonEnabled1, setIsButtonEnabled1] = useState(btnStatus);
    useEffect(() => {
        setIsButtonEnabled(btnStatus)
        setIsButtonEnabled1(btnComment)
    }, [btnStatus, btnComment])
    console.log("isButtonEnabled =", isButtonEnabled)

    const onClickEdit = () => {
        navigate(`/editcourse/${state.id}`)
    }


    function viewDetailUser() {
        navigate(`/viewuserjoincourse/${state.id}`)
    }

    function checkName() {
        BtnstatusCheckName(state.id, !isButtonEnabled)
        setIsButtonEnabled(!isButtonEnabled)
    }

    function Quiz() {
        navigate(`/quiz/${state.id}`)
    }
    const Comment = () => {
        BtnstatusComment(state.id, !isButtonEnabled1)
        setIsButtonEnabled1(!isButtonEnabled1)
    }
    const [reject, setReject] = useState<any>(false)
    const clickReject = () => {
        setReject(!reject)
    }
    const { updateReject } = useReject()
    const test = state.reject ? state.reject : ''
    const newtest = test.reject
    console.log("🚀 ~ file: DetailCourse.tsx:117 ~ newtest", newtest)
    const onSubmit = async () => {
        getValues()
        console.log("🚀 ~ file: DetailCourse.tsx:122 ~ onSubmit ~ getValues", getValues())
        if (getValues()) {
            updateReject(getValues())
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
                            <Grid container justifyContent={'space-between'} >
                                <Grid item >
                                    <Typography variant="h2" mb={2}  >
                                        <span>
                                            Course About
                                        </span>
                                    </Typography>

                                </Grid>
                                {state.approval === false ?
                                    <>
                                        <Grid container mb={3} item spacing={2} >
                                            <Grid item>
                                                <Button sx={{ mr: 1 }} color='error' onClick={() => {
                                                    clickReject()
                                                }}>Reject</Button>
                                            </Grid>
                                            <Grid item>
                                                <Button sx={{ mr: 1 }} color='warning' onClick={() => {
                                                    onClickEdit()
                                                }}>Edit</Button>
                                            </Grid>

                                        </Grid>
                                    </> :
                                    <>
                                        <Grid container mb={3} item spacing={2} >
                                            <Grid item>
                                                <Button sx={{ mr: 1 }} color='success' onClick={() => {
                                                    viewDetailUser()
                                                }}>View User</Button>
                                            </Grid>
                                            <Grid item>
                                                <Button sx={{ mr: 1 }} color='warning' onClick={() => {
                                                    onClickEdit()
                                                }}>Edit</Button>
                                            </Grid>
                                            <Grid item>
                                                <Button sx={{ mr: 1 }} color='info' onClick={() => {
                                                    Quiz()
                                                }}>Create Quiz</Button>
                                            </Grid>
                                            <Grid item>
                                                <Button sx={{ mr: 1 }} color={isButtonEnabled === true ? 'success' : 'error'} onClick={() => {
                                                    checkName()
                                                }}>Check Name</Button>
                                            </Grid>
                                            <Grid item>
                                                <Button sx={{ mr: 1 }} color={isButtonEnabled1 === true ? 'success' : 'error'} onClick={() => {
                                                    Comment()
                                                }}>Comment</Button>
                                            </Grid>
                                        </Grid>

                                    </>}



                            </Grid>
                            <Grid container spacing={1}>
                                <Grid item xs={4}>
                                    <Image src={state.image} width={300} height={200} />
                                    <Grid container spacing={4}  >
                                        <Grid item >
                                            <Typography variant="body2" mr={1}  >
                                                Start registration
                                            </Typography>
                                            <Typography variant="body2" mb={2} mr={2} color={'#959494'} >
                                                {Start_Register_Date}
                                            </Typography>
                                        </Grid>
                                        <Grid item >
                                            <Typography variant="body2"   >
                                                Time
                                            </Typography>
                                            <Typography variant="body2" mb={2}  >
                                                {Start_Register_Time}
                                            </Typography>
                                        </Grid>
                                    </Grid>

                                    <Grid container spacing={4}>
                                        <Grid item sx={{ mr: 2 }}>
                                            <Typography variant="body2"   >
                                                End registration
                                            </Typography>
                                            <Typography variant="body2" mb={2} mr={2} >
                                                {End_Register_Date}
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="body2"   >
                                                Time
                                            </Typography>
                                            <Typography variant="body2" mb={2}  >
                                                {End_Register_Time}
                                            </Typography>

                                        </Grid>
                                    </Grid>

                                    <Grid container spacing={4}>
                                        <Grid item>
                                            <Typography variant="body2"  >
                                                Start Course
                                            </Typography>
                                            <Typography variant="body2" mb={2} >
                                                {Start_Course_Time}
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="body2"   >
                                                End Course
                                            </Typography>
                                            <Typography variant="body2" mb={2} >
                                                {End_Course_Time}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                    <Typography variant="body2" mb={2}  >
                                        Course Date
                                    </Typography>
                                    <Typography variant="body2" mb={2}  >
                                        {Course_Date}
                                    </Typography>
                                    <Typography variant="body2"  >
                                        Time Course
                                    </Typography>
                                    <Typography variant="body2" mb={2}  >
                                        {`${start_course_learn} - ${start_course_end}`}
                                    </Typography>
                                    <Typography variant="body2"  >
                                        Lecturer
                                    </Typography>
                                    <Typography variant="body2" mb={2}  >
                                        {state.create_byName}
                                    </Typography>
                                    <Typography variant="body2"   >
                                        About
                                    </Typography>
                                    <Typography variant="body2" mb={2}  >
                                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aliquam iusto ratione repellat aperiam nobis esse vitae exercitationem aut quo incidunt eius quis consequuntur, est assumenda possimus, rem velit nulla voluptate.
                                    </Typography>
                                </Grid>
                                <Grid item xs={8}>
                                    <Grid sx={{ ml: 10 }} >
                                        <Typography variant="h6" mb={1}  >
                                            Course title
                                        </Typography>
                                        <Typography variant="h3" mb={2} color={'black'} >
                                            {state.title}
                                        </Typography>
                                        <Typography variant="h6" mb={1}  >
                                            Course subtitle
                                        </Typography>
                                        <Typography variant="body2" mb={2}  >
                                            {state.subtitle}
                                        </Typography>
                                        <Typography variant="h6" mb={1}  >
                                            What will students learn in your course?
                                        </Typography>
                                        {state.what_will_student_learn_in_your_course.map((params: any, index: number) => {
                                            return (<React.Fragment key={index}>
                                                <Typography marginLeft={2} variant="body2" mb={2} color={'#black'} >
                                                    <CheckIcon /> {params}
                                                </Typography>
                                            </React.Fragment>)
                                        })}
                                        <Typography variant="h6" mb={1}  >
                                            What are the requirements prerequisites for taking your Course?
                                        </Typography>
                                        <Typography variant="body2" mb={2}  >
                                            {state.whataretherequirement}
                                        </Typography>
                                        <Typography variant="h6" mb={1}  >
                                            Who is this course for?
                                        </Typography>
                                        <Typography variant="body2" mb={2}  >
                                            {state.who_is_this_course}
                                        </Typography>
                                        <Typography variant="h6" mb={1}  >
                                            The course consists?
                                        </Typography>

                                        {state.the_course_consists.map((params: any, index: number) => {
                                            return (<React.Fragment key={index}>
                                                <Typography marginLeft={2} variant="body2" mb={2} color={'#black'} >
                                                    <CheckIcon /> {params}
                                                </Typography>
                                            </React.Fragment>)
                                        })}
                                        <Typography variant="body2" mb={2}  >
                                            Name teaching assistant
                                        </Typography>
                                        <Typography variant="body2" mb={2}  >
                                            {state.teaching_assistant}
                                        </Typography>
                                        <Grid container justifyContent={'end'}>
                                            <Grid>
                                                <Typography variant="body2" mb={1} mr={8} >
                                                    Max people
                                                </Typography>

                                                <Typography variant="body2" mb={1} mr={8} borderBottom={1} borderColor={'gray'}>
                                                    {state.max_people}
                                                </Typography>
                                            </Grid>
                                            <Grid>
                                                <Typography variant="body2" mb={1} mr={8} >
                                                    Min people
                                                </Typography>

                                                <Typography variant="body2" mb={1} mr={8} borderBottom={1} borderColor={'gray'}>
                                                    {state.min_people}
                                                </Typography>
                                            </Grid>
                                            <Grid>
                                                <Typography variant="body2" mb={1} mr={8} >
                                                    Pricing
                                                </Typography>

                                                <Typography variant="body2" mb={1} mr={8} borderBottom={1} borderColor={'gray'}>
                                                    {state.pricing.toLocaleString()} THB
                                                </Typography>
                                            </Grid>
                                        </Grid>

                                    </Grid>
                                </Grid>
                            </Grid>
                            {newtest && <>
                                <Grid sx={{ width: '100%' }}>
                                    <Typography variant="body2" mb={1} mr={8} >
                                        Reject Comment
                                    </Typography>

                                    <Typography variant="body2" mb={1} mr={8} borderBottom={1} borderColor={'red'}>
                                        {newtest}
                                    </Typography>

                                </Grid>

                            </>}
                            {reject == true ?
                                <>
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <Grid container justifyContent={'center'} sx={{ width: '100%' }}>
                                            <ControllerTextField fullWidth multiline maxRows={10} minRows={5} formprop={myForm} name={"reject"} label={'Description'} />
                                        </Grid>
                                        <Grid container justifyContent={'center'} sx={{ mt: 2, }}>
                                            <Button type='submit' sx={{ width: 100, height: 40 }}>Send</Button>
                                        </Grid>
                                    </form>
                                </> :
                                <>

                                </>}
                        </Box>
                    </div>
                </div>
                <TableQuiz id_course={state.id} />
            </div>
        </div >

    )
}

export default DetailCourse


