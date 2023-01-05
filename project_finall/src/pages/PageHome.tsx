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
import { Avatar, Box, Grid, IconButton, Rating } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useAppSelector } from '../store/useHooksStore';
import moment from 'moment';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SearchIcon from '@mui/icons-material/Search';
import { Search, SearchIconWrapper, StyledInputBase } from '../styles/seachMUI';
import Image from '../components/Image/Image';
import HeaderLogo from '../assets/Course app-amico.png'

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

    const labels: { [index: string]: string } = {
        0.5: 'Useless',
        1: 'Useless+',
        1.5: 'Poor',
        2: 'Poor+',
        2.5: 'Ok',
        3: 'Ok+',
        3.5: 'Good',
        4: 'Good+',
        4.5: 'Excellent',
        5: 'Excellent+',
    };


    function getLabelText(value: number) {
        return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
    }

    return (
        <>
            <Navbar />
            <Box
                sx={{
                    position: "relative",
                    width: '100%',
                    height: 450,
                    opacity:0.1,
                    backgroundColor: '#000000',
                    // '&:hover': {
                        //     backgroundColor: 'primary.main',
                        //     opacity: [0.9, 0.8, 0.7],
                        // },
                    }}>
                    </Box>
                <Grid container justifyContent={'space-between'} alignItems={'center'} alignContent={'center'} sx={{ width: '100%', height: 450,position: "absolute",top:65, }}>

                    <Grid item xs={3} sx={{ ml: 6 }}>
                        <Grid sx={{mb:3,ml:3}}>
                            <Typography gutterBottom variant="h5" component="h5" color={"black"}>
                                คอร์สเรียนเพิ่มทักษะทางด<br/>ด้านวิศวกรรมคอมพิวเตอร์
                            </Typography>
                            <Typography gutterBottom variant="body2" component="h5">
                                พบกับวิทยากร ที่จะช่วยอัปสกิล ให้คุณเก่งขึ้น
                            </Typography>
                        </Grid>
                        <Grid item>
                        <Search>
                            <SearchIconWrapper>
                                <SearchIcon />
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder="Search…"
                                inputProps={{ 'aria-label': 'search' }}
                            />
                        </Search>
                        </Grid>
                    </Grid>
                    <Grid item xs={3} sx={{mr:6}}>
                    <Image src={HeaderLogo} width={350} height={350}/>
                    </Grid>
                </Grid>

            <Grid container justifyContent={'center'} >
                {data.map((item, index) => {

                    const startCourse = new Date(item.start_course.seconds * 1000)
                    const formattedDate = startCourse.toDateString();
                    const start_course_learn = new Date(item.start_register_time.seconds * 1000).toLocaleTimeString('en-Us', {
                        hour: 'numeric',
                        minute: 'numeric',
                        hour12: false,
                        timeZone: 'Asia/Bangkok'
                    })
                    const start_course_end = new Date(item.start_register_end.seconds * 1000).toLocaleTimeString('en-Us', {
                        hour: 'numeric',
                        minute: 'numeric',
                        hour12: false,
                        timeZone: 'Asia/Bangkok'
                    })
               



                    return <a onClick={() => { onClickCard(item) }}>
                        <Grid margin={2}>
                            <Card sx={{
                                height: 475, width: 345, '&:hover': {
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
                                    <Grid container justifyContent={'space-between'} >
                                        <Grid item sx={{ mr: 1 }}>
                                            <Rating name="read-only" value={5} getLabelText={getLabelText} readOnly />

                                        </Grid>
                                        <Grid item >
                                            <Typography>
                                                {item.pricing.toLocaleString()} THB
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                    <Grid container sx={{ mr: 1 }} alignItems={'center'}>
                                        <Grid sx={{ mr: 1.5 }} >
                                            <Avatar alt="Remy Sharp" src="#" />
                                        </Grid>
                                        <Grid >
                                            {item.create_by_name}
                                        </Grid>
                                    </Grid>
                                </CardContent>
                                <CardActions sx={{ mt: 1.5, borderTop: '1px solid rgb(210, 210, 210)' }}>

                                    <Grid container>
                                        <CalendarMonthIcon sx={{ color: "#6d18d5" }} />
                                        {Array.from(item.course_date!).map((params: any, index: number) => {
                                            return (index !== 0 ? ' - ' + params.label : params.label)
                                        })}
                                    </Grid>
                                    <Grid container justifyContent={'flex-end'}>
                                        <AccessTimeIcon sx={{ color: "#6d18d5" }} />
                                        <Typography>
                                            {`${start_course_learn} - ${start_course_end}`}
                                        </Typography>
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
