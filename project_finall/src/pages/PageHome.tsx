import React from 'react'
import { Navbar } from '../components/Navbar'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { CourseListsType, useGetCourseLists } from '../Hook/course/useGetCourse';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { Avatar, Grid, IconButton, Rating } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useAppSelector } from '../store/useHooksStore';
import moment from 'moment';


const PageHome = () => {
    const { CourseLists, getCourseLists } = useGetCourseLists()
    const data = CourseLists

    // const [newData, setNewData] =  useState<CourseListsType[]>(data)
    const navigate = useNavigate()
    // const [status, setStatus] = useState('')
    console.log("🚀 ~ file: page.tsx:15 ~ page ~ data", data)

    // const getValue = () => {

    //     data.map((params, index) => {
    //         return (params.course_status?.forEach(item => {
    //             if (item) {

    //                 setStatus(item.label)
    //             } else {
    //                 console.log('error')
    //             }
    //             console.log("🚀 ~ file: PageHome.tsx:26 ~ data.map ~ item", item)
    //         }))
    //     })
    // }

    // useEffect(()=>{
    //     setNewData(data)
    // },[newData])

    // const { uid,status,displayName } = useAppSelector(({ auth }) => auth);
    // console.log("🚀 ~ file: PageHome.tsx:44 ~ PageHome ~ displayName", displayName)
    // console.log("🚀 ~ file: PageHome.tsx:44 ~ PageHome ~ status", status)
    // console.log("🚀 ~ file: Testgrid.tsx:21 ~ Testgrid ~ uid", uid)

    const onClickCard = (data: CourseListsType) => {

    }

    return (
        <>
            <Navbar />

            <Grid container justifyContent={'center'} >
                {data.map((item, index) => {
                  
                    const startCourse =  new Date(item.start_course.seconds)
                    console.log("🚀 ~ file: PageHome.tsx:63 ~ {data.map ~ startCourse", startCourse)
                    const formattedDate = startCourse.toDateString();
                    console.log("🚀 ~ file: PageHome.tsx:69 ~ {data.map ~ formattedDate", formattedDate)




                    return <a onClick={() => { onClickCard(item) }}>
                        <Grid margin={2}>
                            <Card sx={{
                                height: 600, width: 345, '&:hover': {
                                    cursor: 'pointer',
                                }
                            }} key={index}
                                /* It's a prop that adds a shadow to the
                                card. */
                                raised={true}>

                                <CardMedia
                                    component="img"
                                    alt="green iguana"
                                    height="200"
                                    image={item.image}
                                />
                                <CardContent sx={{ height: 120, }} >
                                    <Grid>
                                        <Grid container justifyContent={'space-between'}>
                                            <Grid >
                                                <Typography variant="body2" sx={{
                                                    mt: 0.5,
                                                    '&:hover': {
                                                        color: '#8c37f1',
                                                    }
                                                }} color='#6d18d5' >
                                                    {item.course_status!.map((params, index) => {
                                                        return (index !== 0 ? ' & ' + params.label : params.label)
                                                    })}
                                                </Typography>
                                                <Typography gutterBottom variant="h5" component="h5">
                                                    {item.title}
                                                </Typography>


                                            </Grid>
                                            <Grid>
                                                <IconButton
                                                    color='error'
                                                    sx={{
                                                        zIndex: 2,
                                                        borderRadius: '50%',
                                                        bottom: 0,
                                                    }}
                                                >
                                                    <FavoriteIcon />
                                                </IconButton>
                                            </Grid>
                                        </Grid>
                                        <Grid>
                                            <Typography variant="body2" color="text.secondary" sx={{
                                                display: '-webkit-box',
                                                overflow: 'hidden',
                                                WebkitBoxOrient: 'vertical',
                                                WebkitLineClamp: 3,
                                            }}
                                            >
                                                {item.description}
                                            </Typography>
                                        </Grid>

                                    </Grid>
                                </CardContent>
                                <CardContent sx={{ mt: 1, pt: 3, pb: 0 }}>
                                    <Grid container >
                                        <Grid item sx={{ mr: 1 }}>
                                            <Rating name="read-only" value={5} readOnly />
                                        </Grid>
                                        <Grid item >
                                            <Typography>
                                                {item.pricing.toLocaleString()} THB
                                            </Typography>
                                        </Grid>
                                        <Grid container sx={{ mr: 1 }} alignItems={'center'}>
                                            <Grid sx={{ mr: 1.5 }} >
                                                <Avatar alt="Remy Sharp" src="#" />
                                            </Grid>
                                            <Grid >
                                                {item.create_by_name}
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                                <CardActions sx={{ mt: 1.5, borderTop: '1px solid rgb(210, 210, 210)' }}>
                                    <Grid >

                                    </Grid>
                                </CardActions>
                            </Card>
                        </Grid>
                    </a>

                })}
            </Grid>

        </>
    )
}

export default PageHome
