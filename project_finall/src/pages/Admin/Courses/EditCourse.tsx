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

import { useUpdateUser } from '../../../Hook/user/useUpdateUser'
import { doc, updateDoc } from "firebase/firestore";
import ImageInput from '../../../framework/control/InputImage/ImageInput'
import TextField from '@mui/material/TextField';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { Lookup, roleWeek, typeCourseOnline_Onside } from '../../../types/type'
import { DateTimePicker } from '@mui/x-date-pickers'
import { useGetCourseLists } from '../../../Hook/category/useGetCategory'
import { CourseListsType } from '../../../Hook/course/useGetCourse'
import { useGetCourseDetail } from '../../../Hook/course/useGetCourseDtail'

const EditCourse: FC = () => {
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [value, setValues] = useState<Date>(new Date());
    const [valueDate, setValuesDate] = useState<Date>(new Date());
    const [valueTime_start, setValueTime_start] = useState<Date>(new Date());
    const [valueTime_end, setValueTime_end] = useState<Date>(new Date());
    const [valueEnd, setValuesEnd] = useState<Date>(new Date());
    const [image, setImage] = useState<any>(null);
    const { CategoryLists } = useGetCourseLists()
    const getCategoryLists = CategoryLists
    const { state } = useGetCourseDetail()
    console.log("🚀 ~ file: EditCourse.tsx:40 ~ state", state)
    const { updateUser } = useUpdateUser()
    const dataCategory = getCategoryLists.map((item, index) => {
        return (item.Category_Title)
    })
    useEffect( ()  => {
         myForm.setValue('data', state
        )
    }, [state])

    const myForm = useForm<{ data: CourseListsType }>({})
    console.log("🚀 ~ file: EditUser.tsx:46 ~ myForm", myForm.getValues())


    const handleChange = (e: any) => {
        if (e.target.files[0])
            setImage(e.target.files[0]);
    }
    //*start register course
    const Start_Register_Date = new Date(state.start_register?.seconds * 1000)

     //*end register course
     const End_Register_Date = new Date(state.start_registerEnd?.seconds * 1000)

     //*start course and End course
    const Start_Course_Time = new Date(state.start_register_time?.seconds * 1000)
    const End_Course_Time = new Date(state.start_register_end?.seconds * 1000)

    //*Course Date
    const Course_Date = Array.from(state.course_date!).map((params: any, index: number) => {
        return (index !== 0 ? ' - ' + params.label : params.label)
    })

    //*Course Time Start and End
    const start_course_learn = new Date(state.start_register_time?.seconds * 1000)
    const start_course_end = new Date(state.start_register_end?.seconds * 1000)
    const onSubmit = async () => {


        // if (getValues()) {
        //     try {
        //         const id = myForm.getValues().data.id
        //         updateUser(getValues().data, id)
        //     } catch (error) {
        //         console.log("🚀 ~ file: EditUser.tsx:55 ~ onClickSubmitEdit ~ error", error)

        //     }
        // }

    }

    const { watch, handleSubmit, getValues } = myForm



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
                                            name={'course_date'}
                                            label={'Course date'}
                                            options={roleWeek} // load options
                                        />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <ControllerAutocomplete
                                            fullWidth
                                            multiple={true}
                                            formprop={myForm}
                                            name={'course_status'}
                                            label={'Select Course Time'}
                                            options={typeCourseOnline_Onside} // load options
                                        />
                                    </Grid>
                                </Grid>

                                <Grid container alignItems={'center'} alignContent={'center'} spacing={1} sx={{ mb: 2, mt: 2 }}>
                                    <Grid item xs={6}>
                                        <ControllerTextField fullWidth formprop={myForm} name={"data.what_will_student_learn_in_your_course.input_0"} label={'What will student learn in your course'} />


                                        <ControllerTextField fullWidth formprop={myForm} name={"data.what_will_student_learn_in_your_course.input_1"} label={''} />

                                        <ControllerTextField fullWidth formprop={myForm} name={"data.what_will_student_learn_in_your_course.input_2"} label={''} />

                                        <ControllerTextField fullWidth formprop={myForm} name={"data.what_will_student_learn_in_your_course.input_3"} label={''} />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <ControllerTextField fullWidth formprop={myForm} name={"data.the_course_consists.input_0"} label={'The Course consists'} />

                                        <ControllerTextField fullWidth formprop={myForm} name={"data.the_course_consists.input_1"} label={''} />

                                        <ControllerTextField fullWidth formprop={myForm} name={"data.the_course_consists.input_2"} label={''} />

                                        <ControllerTextField fullWidth formprop={myForm} name={"data.the_course_consists.input_3"} label={''} />
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
                                <ImageInput label="Select an image"  onChange={
                                    handleChange} />


                                <Typography variant="h6" gutterBottom  >
                                    Time Course Register
                                </Typography>
                                <Grid container alignContent={'center'} alignItems={'center'} >
                                    <DateTimePicker
                                        renderInput={(props) => <TextField {...props} />}
                                        label="Start Registration"
                                        value={Start_Register_Date}
                                        onChange={(newValue: any) => {
                                            setValues(newValue);
                                        }}
                                    />
                                    <Typography variant="body2" m={2}>
                                        To
                                    </Typography>
                                    <DateTimePicker
                                        renderInput={(props) => <TextField {...props} />}
                                        label="End Registration"
                                        value={End_Register_Date}
                                        onChange={(newValue: any) => {
                                            setValuesEnd(newValue);
                                        }}
                                    />
                                </Grid>


                                <Typography variant="h6" gutterBottom >
                                    Time Course Learn
                                </Typography>
                                <Grid container alignContent={'center'} alignItems={'center'} >
                                    <DatePicker
                                        label="start-course"
                                        value={Start_Course_Time}
                                        onChange={(newValue: any) => {
                                            setValuesDate(newValue);
                                        }}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                    <Typography variant="body2" m={2}>
                                        To
                                    </Typography>
                                    <DatePicker
                                        label="end-course"
                                        value={End_Course_Time}
                                        onChange={(newValue: any) => {
                                            setSelectedDate(newValue);
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
                                        value={start_course_learn}
                                        onChange={(newValue: any) => {
                                            setValueTime_start(newValue);
                                        }}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                    <Typography variant="body2" m={2}>
                                        To
                                    </Typography>
                                    <TimePicker
                                        label="end-start"
                                        value={start_course_end}
                                        onChange={(newValue: any) => {
                                            setValueTime_end(newValue);
                                        }}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </Grid>

                                <Grid container spacing={1} sx={{ mb: 2 }} alignContent={'center'} alignItems={'center'} >
                                    <Grid item xs={3}>
                                        <ControllerTextField fullWidth formprop={myForm} name={"data.min_people"} label={'Min people'} />
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