import React, { FC, useEffect, useState } from 'react'
import { Avatar, Box, } from '@mui/material'
import Navbar from '../../../components/componentsAdmin/navbar/Navbar'
import Sidebar from '../../../components/componentsAdmin/sidebar/Side-bar'
import '../Dashboard/Dashboard.scss'
import Button from '../../../framework/control/Button/Button'
import Grid from '@mui/material/Grid/Grid'
import { Typography } from '@mui/material'
import {
    ControllerAutocomplete,
    ControllerTextField,

}
    from '../../../framework/control';
import { useForm } from "react-hook-form";

import { useUpdateCourse } from './Hook/useUpdateCourse'
import ImageInput from '../../../framework/control/InputImage/ImageInput'
import TextField from '@mui/material/TextField';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { Lookup, roleWeek, typeCourseOnline_Onside } from '../../../types/type'
import { DateTimePicker } from '@mui/x-date-pickers'
import { useGetCategoryLists } from '../Categorys/Hook/useGetCategory'
import { CourseListsType } from './Hook/useGetCourse'
import { useGetCourseDetail } from './Hook/useGetCourseDtail'
import moment, { Moment } from 'moment'
import { useNavigate } from 'react-router-dom'

const EditCourse: FC = () => {
    const [image, setImage] = useState<any>(null);
    const { CategoryLists } = useGetCategoryLists()
    const getCategoryLists = CategoryLists
    const { state } = useGetCourseDetail()
    console.log("🚀 ~ file: EditCourse.tsx:40 ~ state", state)
    const { updateCourse } = useUpdateCourse()
    const dataCategory = getCategoryLists.map((item, index) => {
        return (item.Category_Title)
    })
    const myForm = useForm<{ data: CourseListsType }>({
        //!defaultValues
        // defaultValues
    })


    const handleChange = (e: any) => {
        if (e.target.files[0])
            setImage(e.target.files[0]);
    }

    const navigate = useNavigate()
    const Start_Register_Date = moment(state.start_register)
    const [start_register, setStart_register] = useState<Moment>(Start_Register_Date);

    const End_Register_Date = moment(state.End_register)
    const [end_register, setEnd_register] = useState<Moment>(End_Register_Date);


    const Start_Course_Time = moment(state.start_learn)
    const [start_learn, setStart_learn] = useState<Moment>(Start_Course_Time);

    const End_Course_Time = moment(state.end_learn)
    const [end_learn, setEnd_learn] = useState<Moment>(End_Course_Time);

    const start_course_learn = moment(state.start_time)
    const [start_time, setStart_time] = useState<Moment>(start_course_learn);

    const start_course_end = moment(state.end_time)
    const [end_time, setEnd_time] = useState<Moment>(start_course_end);
    useEffect(() => {
        myForm.setValue('data', state)
        setStart_register(Start_Register_Date)
        setEnd_register(End_Register_Date)
        setStart_learn(Start_Course_Time)
        setEnd_learn(End_Course_Time)
        setStart_time(start_course_learn)
        setEnd_time(start_course_end)
    }, [state])
    const Course_Date = Array.from(state.course_date!).map((params: any, index: number) => {
        return (index !== 0 ? ' - ' + params.label : params.label)
    })
    // useEffect(() => {
    //     myForm.setValue('data', state)
    //     console.log("🚀 ~ file: EditCourse.tsx:47 ~ useEffect ~ state", state)
    // }, [state,])

    const { watch, handleSubmit, getValues, setValue } = myForm




    const [numOfChoices, setNumOfChoices] = useState(1);
    const [numOfChoices1, setNumOfChoices1] = useState(1);
    const handleAddChoice = (e: any) => {
        setNumOfChoices(numOfChoices + 1);
    }

    const handleAddChoice1 = (e: any) => {
        setNumOfChoices1(numOfChoices1 + 1);
    }

    const onSubmit = async () => {
        setValue('data.start_register', moment(start_register))
        setValue('data.End_register', moment(end_register))

        setValue('data.start_learn', moment(start_learn))
        setValue('data.end_learn', moment(end_learn))

        setValue('data.start_time', moment(start_time))
        setValue('data.end_time', moment(end_time))
        if (getValues()) {
            try {
                const id = myForm.getValues().data.id
                await updateCourse(getValues().data, id)
                navigate(`/detailcourse/${id}`)

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
                        <Grid>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <Typography variant="h2" mb={2}  >
                                    Edit Course
                                </Typography>
                                <Grid container spacing={2}>
                                    <Grid item xs={6}>
                                        <ControllerTextField fullWidth formprop={myForm} name={"data.title"} label={'Title'} />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <ControllerTextField fullWidth formprop={myForm} name={"data.subtitle"} label={'subtitle'} />
                                    </Grid>
                                </Grid>
                                <ControllerTextField fullWidth multiline maxRows={4} minRows={2} formprop={myForm} name={"data.description"} label={'description'} />
                                <Grid container spacing={1}>
                                    <Grid item xs={3}>
                                        <ControllerAutocomplete
                                            fullWidth
                                            formprop={myForm}
                                            name={'data.category'}
                                            label={'Category'}
                                            options={dataCategory} // load options
                                        />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <ControllerAutocomplete

                                            fullWidth
                                            multiple={true}
                                            formprop={myForm}
                                            name={'state.course_date'}
                                            label={'Course date'}
                                            options={roleWeek} // load options
                                        />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <ControllerAutocomplete
                                            fullWidth
                                            multiple={true}
                                            formprop={myForm}
                                            name={'state.course_status'}
                                            label={'Select Course Time'}
                                            options={typeCourseOnline_Onside} // load options
                                        />
                                    </Grid>
                                </Grid>

                                <Grid container spacing={1} sx={{ mb: 2, mt: 2 }}>
                                    <Grid item xs={6}>
                                        <Typography variant="h6">
                                            What will student learn in your course
                                        </Typography>
                                        {Array.from({ length: numOfChoices }, (_, i) => (

                                            <ControllerTextField
                                                key={i}
                                                fullWidth
                                                formprop={myForm}
                                                name={`data.what_will_student_learn_in_your_course.${i}`}

                                            />
                                        ))}
                                        <Typography variant="h6" color={'primary'} onClick={handleAddChoice}
                                            ml={3} sx={{
                                                '&:hover': {
                                                    color: '#0572c5',
                                                    cursor: "pointer",
                                                }
                                            }}>
                                            Add Choice +
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography variant="h6" >
                                            The Course consists
                                        </Typography>
                                        {Array.from({ length: numOfChoices1 }, (_, i) => (
                                            <ControllerTextField
                                                key={i}
                                                fullWidth
                                                formprop={myForm}
                                                name={`data.the_course_consists.${i}`}

                                            />
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
                                </Grid>

                                <Grid container spacing={1} sx={{ mb: 2 }} >
                                    <Grid item xs={6} >
                                        <ControllerTextField fullWidth formprop={myForm} name={"data.who_is_this_course"} label={'Who is this course for ?'} />
                                        <ControllerTextField fullWidth formprop={myForm} name={"data.linkteammeeting"} label={'Link team meeting'} />
                                    </Grid>
                                    <Grid item xs={6} >
                                        <ControllerTextField fullWidth formprop={myForm} name={"data.teaching_assistant"} label={'Add teaching assistant'} />
                                        <ControllerTextField fullWidth formprop={myForm} name={"data.whataretherequirement"} label={'What are the requirement or prerequisites for taking your course?'} />
                                    </Grid>

                                </Grid>

                                <Typography variant="h6"  >
                                    Image Course
                                </Typography>
                                <ImageInput label="Select an image" onChange={
                                    handleChange} />


                                <Typography variant="h6" gutterBottom  >
                                    Time Course Register
                                </Typography>
                                <Grid container alignContent={'center'} alignItems={'center'} >
                                    <DateTimePicker
                                        disableMaskedInput
                                        label="Start Registration"
                                        value={start_register}
                                        inputFormat="D MMMM YYYY H:mm"
                                        ampm={false}
                                        onChange={(newValue: any) => {
                                            setStart_register(newValue);
                                        }}
                                        renderInput={(props) => <TextField {...props} />}
                                    />
                                    <Typography variant="body2" m={2}>
                                        To
                                    </Typography>
                                    <DateTimePicker
                                        disableMaskedInput
                                        label="End Registration"
                                        value={end_register}
                                        inputFormat="D MMMM YYYY H:mm"
                                        ampm={false}
                                        onChange={(newValue: any) => {
                                            setEnd_register(newValue);
                                        }}
                                        renderInput={(props) => <TextField {...props} />}
                                    />
                                </Grid>


                                <Typography variant="h6" gutterBottom >
                                    Time Course Learn
                                </Typography>
                                <Grid container alignContent={'center'} alignItems={'center'} >
                                    <DatePicker
                                        disableMaskedInput
                                        label="start-course"
                                        inputFormat="D MMM YYYY "
                                        value={start_learn}
                                        onChange={(newValue: any) => {
                                            setStart_learn(newValue);
                                        }}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                    <Typography variant="body2" m={2}>
                                        To
                                    </Typography>
                                    <DatePicker
                                        disableMaskedInput
                                        label="end-course"
                                        value={end_learn}
                                        inputFormat="D MMM YYYY "
                                        onChange={(newValue: any) => {
                                            setEnd_learn(newValue);
                                        }}
                                        renderInput={(params) => <TextField {...params} />}

                                    />
                                </Grid>


                                <Typography variant="h6" gutterBottom  >
                                    Time Course In Day
                                </Typography>
                                <Grid container alignContent={'center'} alignItems={'center'} >
                                    <TimePicker
                                        label="start-time"
                                        value={start_time}
                                        ampm={false}
                                        onChange={(newValue: any) => {
                                            setStart_time(newValue);
                                        }}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                    <Typography variant="body2" m={2}>
                                        To
                                    </Typography>
                                    <TimePicker
                                        label="end-start"
                                        ampm={false}
                                        value={end_time}
                                        onChange={(newValue: any) => {
                                            setEnd_time(newValue);
                                        }}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </Grid>

                                <Grid container spacing={1} sx={{ mb: 2 }} alignContent={'center'} alignItems={'center'} >
                                    <Grid item xs={12}>
                                        <ControllerTextField fullWidth formprop={myForm} name={"data.location"} label={'Location'} />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <ControllerTextField fullWidth formprop={myForm} name={"data.min_people"} label={'Min people'} />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <ControllerTextField fullWidth formprop={myForm} name={"data.max_people"} label={'Max people'} />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <ControllerTextField fullWidth formprop={myForm} name={"data.pricing"} label={'Pricing'} />
                                    </Grid>
                                    <Grid item xs={3} sx={{ mt: 2.3 }}>
                                        <Button type='submit' label='Submit' />
                                    </Grid>
                                </Grid>
                            </form>
                        </Grid>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditCourse