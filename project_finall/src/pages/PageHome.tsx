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
import react, { useEffect, useState, useRef } from 'react';
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
import { useGetCategoryLists } from '../Hook/category/useGetCategory';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const PageHome = () => {
    const { CourseLists, getCourseLists } = useGetCourseLists()
    const data = CourseLists
    const { CategoryLists, useGetCategory } = useGetCategoryLists()
    const dataCategoryLists = CategoryLists.map((item, index) => {
        return (item.Category_Title)
    }
    )

    const [Category, setCategory] = useState<any>('')

    const navigate = useNavigate()


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

    const settings = {
        dots: true,
        infinite: true,
        arrows: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,

        responsive: [
            {
                breakpoint: 1424,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 1800,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 2,
                    infinite: true,
                    dots: true,
                },
            },

            {
                breakpoint: 1124,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 800,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    initialSlide: 1,
                },
            },
        ],
    };

    const queryCategory = (category: any) => {
        console.log("🚀 ~ ", category)
        setCategory(category)
    }

    const allcategoryClick = () => {
        setCategory('')
    }

    let newdata = data
    if (Category) {
        newdata = data.filter((item: any) => item.category === Category)
      
        console.log("🚀 ~ file: PageHome.tsx:127 ~ PageHome ~ newdata.length", newdata.length)
    } else {
        newdata = data
    }
    return (
        <>
            <Navbar />
            <Box
                sx={{
                    position: "relative",
                    width: '100%',
                    height: 650,
                    opacity: 0.1,
                    backgroundColor: '#000000',
                    // '&:hover': {
                    //     backgroundColor: 'primary.main',
                    //     opacity: [0.9, 0.8, 0.7],
                    // },
                }}>
            </Box>


            <Grid container justifyContent={'space-between'} alignItems={'center'} alignContent={'center'} sx={{ width: '100%', height: 650, position: "absolute", top: 65, }}>

                <Grid item xs={6} sx={{ ml: 6 }}>
                    <Grid sx={{ mb: 3, ml: 3 }}>
                        <Typography gutterBottom variant="h2" component="h2" color={"black"}>
                            คอร์สเรียนเพิ่มทักษะทาง<br />ด้านวิศวกรรมคอมพิวเตอร์
                        </Typography>
                        <Typography gutterBottom variant="h6" >
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
                <Grid item xs={3} sx={{ mr: 6 }}>
                    <Image src={HeaderLogo} width={350} height={350} />
                </Grid>
            </Grid>
            <Box
                sx={{ width: '100%', height: 800, backgroundColor: '#000000' }}>
                <Grid container justifyContent={'center'} alignContent={'center'} alignItems={'center'} sx={{ ml: 2, }}>
                    <Typography variant="h2" component="h2" color='#ffffff' sx={{ mt: 7 }}>
                        👨🏻‍💻  หลักสูตรที่แนะนำ
                    </Typography>
                </Grid>
                <Grid container justifyContent={'center'} alignContent={'center'} alignItems={'center'} sx={{ ml: 2, }}>
                    <Typography gutterBottom variant="body2" color='#ffffff' >
                        เรามีหลักสูตรที่พร้อมพัฒนาคุณให้เข้าใจ และ ปฏิบัติได้จริง
                    </Typography>
                </Grid>

                <Grid container justifyContent={'center'} sx={{ mb: 2 }}>
                    <Button color="secondary"
                        disabled={false}
                        size="medium"
                        variant="outlined"
                        sx={{ borderRadius: 50, mt: 2, ml: 2 }}
                        onClick={() => { allcategoryClick() }}
                    >
                        All
                    </Button>
                    {dataCategoryLists.map((item, index) => {
                        return (<react.Fragment key={index}>
                            <Button
                                color='secondary'
                                disabled={false}
                                size="medium"
                                variant="outlined"
                                sx={{ borderRadius: 50, mt: 2, ml: 2 }}
                                onClick={() => { queryCategory(item) }}
                            >
                                {item}
                            </Button>
                        </react.Fragment>)
                    })}
                </Grid>
                <Grid container justifyContent={'center'}  >
                {newdata.map((item, index) => {
                    if (item.approval === true && newdata.length < 3) {
                        const startCourse = new Date(item.start_course?.seconds * 1000)
                        const formattedDate = startCourse.toDateString();
                        const start_course_learn = new Date(item.start_register_time?.seconds * 1000).toLocaleTimeString('en-Us', {
                            hour: 'numeric',
                            minute: 'numeric',
                            hour12: false,
                            timeZone: 'Asia/Bangkok'
                        })
                        const start_course_end = new Date(item.start_register_end?.seconds * 1000).toLocaleTimeString('en-Us', {
                            hour: 'numeric',
                            minute: 'numeric',
                            hour12: false,
                            timeZone: 'Asia/Bangkok'
                        })
                        return (<react.Fragment key={index}>
                                <a onClick={() => { onClickCard(item) }}>
                                    <Grid item container mt={3} ml={2} justifyContent={'center'}>
                                        <Card sx={{
                                            height: 475, width: 345, borderRadius: 1, '&:hover': {
                                                cursor: 'pointer',
                                            }
                                        }}
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
                                                                    color: '#0085ea',
                                                                }
                                                            }} color='#015ca2' >
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
                                                    <CalendarMonthIcon sx={{ color: '#0085ea' }} />
                                                    {Array.from(item.course_date!).map((params: any, index: number) => {
                                                        return (index !== 0 ? ' - ' + params.label : params.label)
                                                    })}
                                                </Grid>
                                                <Grid container justifyContent={'flex-end'}>
                                                    <AccessTimeIcon sx={{ color: "#0085ea" }} />
                                                    <Typography>
                                                        {`${start_course_learn} - ${start_course_end}`}
                                                    </Typography>
                                                </Grid>

                                            </CardActions>
                                        </Card>
                                    </Grid>
                                </a>

                        </react.Fragment>)
                    }
                })}

                </Grid>

                <Slider {...settings} >
                    {newdata.map((item, index) => {
                        if (item.approval === true && newdata.length >= 3) {
                            const startCourse = new Date(item.start_course?.seconds * 1000)
                            const formattedDate = startCourse.toDateString();
                            const start_course_learn = new Date(item.start_register_time?.seconds * 1000).toLocaleTimeString('en-Us', {
                                hour: 'numeric',
                                minute: 'numeric',
                                hour12: false,
                                timeZone: 'Asia/Bangkok'
                            })
                            const start_course_end = new Date(item.start_register_end?.seconds * 1000).toLocaleTimeString('en-Us', {
                                hour: 'numeric',
                                minute: 'numeric',
                                hour12: false,
                                timeZone: 'Asia/Bangkok'
                            })
                            return (<react.Fragment key={index}>
                                <a onClick={() => { onClickCard(item) }}>
                                    <Grid container mt={3} justifyContent={'center'}>
                                        <Card sx={{
                                            height: 475, width: 345, borderRadius: 1, '&:hover': {
                                                cursor: 'pointer',
                                            }
                                        }}
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
                                                                    color: '#0085ea',
                                                                }
                                                            }} color='#015ca2' >
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
                                                    <CalendarMonthIcon sx={{ color: '#0085ea' }} />
                                                    {Array.from(item.course_date!).map((params: any, index: number) => {
                                                        return (index !== 0 ? ' - ' + params.label : params.label)
                                                    })}
                                                </Grid>
                                                <Grid container justifyContent={'flex-end'}>
                                                    <AccessTimeIcon sx={{ color: "#0085ea" }} />
                                                    <Typography>
                                                        {`${start_course_learn} - ${start_course_end}`}
                                                    </Typography>
                                                </Grid>

                                            </CardActions>
                                        </Card>
                                    </Grid>
                                </a>

                            </react.Fragment>)
                        }
                    }
                    )}
                </Slider>


            </Box>




        </>
    )
}

export default PageHome
