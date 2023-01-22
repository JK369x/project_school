import Sidebar from '../../../components/componentsAdmin/sidebar/Side-bar'
import Navbar from '../../../components/componentsAdmin/navbar/Navbar'
import '../Dashboard/Dashboard.scss'

import Grid from '@mui/material/Grid/Grid'
import { FC, useEffect, useState } from 'react'


//controller
import { useDialog } from '../../../Hook/dialog/useDialog'
import { Box, } from '@mui/material'
import Button from "../../../framework/control/Button/Button";
//react dom 
import { useNavigate, useParams } from 'react-router-dom'

//User

import { Typography, Avatar } from '@mui/material'
import { useGetCourseDetail } from './Hook/useGetCourseDtail'
import Image from '../../../components/Image/Image'
const DetailCourse: FC = () => {
    const { state } = useGetCourseDetail()
    console.log("🚀 ~ file: DetailCourse.tsx:23 ~ state", state)
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

    console.log("🚀 ~ file: DetailUser.tsx:29 ~ state", state)






    const onClickEdit = () => {
        navigate(`/editcourse/${state.id}`)
    }


    return (
        <div className='home'>
            <Sidebar />
            <div className="homeContainer">
                <Navbar />
                <div className="listContainer">
                    <div className="listTitle">
                        <Box sx={{ width: '100%' }}>
                            <Grid container>
                                <Typography variant="h2" mb={2}  >
                                    <span>
                                        Course About |
                                    </span>
                                </Typography>
                                <Typography variant="h2" mb={2} ml={1} >
                                    <span>
                                        User
                                    </span>
                                </Typography>
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
                                        <Typography variant="body2" mb={2}  >
                                            {state.what_will_student_learn_in_your_course}<br />

                                        </Typography>
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
                                        <Typography variant="body2" mb={2}  >
                                            {state.the_course_consists}
                                            <br />

                                        </Typography>
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
                            <Grid container justifyContent={'center'} alignContent={'center'} alignItems={'center'}>


                                <Button label='Edit' onClick={() => onClickEdit()} />
                            </Grid>
                        </Box>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default DetailCourse


