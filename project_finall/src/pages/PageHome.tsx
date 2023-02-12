import React from 'react'
import { Navbar } from '../components/Navbar'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { CourseListsType, useGetCourseLists } from './Admin/Courses/Hook/useGetCourse';
import { useNavigate } from 'react-router-dom';
import react, { useEffect, useState, useRef } from 'react';
import { Avatar, Box, Grid, IconButton, Rating } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useAppDispatch, useAppSelector } from '../store/useHooksStore';
import moment from 'moment';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SearchIcon from '@mui/icons-material/Search';
import { Search, SearchIconWrapper, StyledInputBase } from '../styles/seachMUI';
import Image from '../components/Image/Image';
import HeaderLogo from '../assets/Course app-amico.png'
import { useGetCategoryLists } from './Admin/Categorys/Hook/useGetCategory';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useCreateFavorite } from './Admin/favorite/useCreateFavorite'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { setAuthStore } from '../store/slices/authSlice';
import Favorite from '@mui/icons-material/Favorite';
import { OtherHouses } from '@mui/icons-material';
import imagebg from '../assets/logo-rmutt/Slide1.jpeg'
import imagebg1 from '../assets/logo-rmutt/rmutt-l.jpg'
import logo from '../assets/logo-rmutt/Logo-RMUTT-A4-stork-5-01.png'
import BodyCenterPage from './BodycenterPage';
import GoogleButton from 'react-google-button';
const PageHome = () => {
    const { CourseLists } = useGetCourseLists()
    const data = CourseLists
    const { addFavorite } = useCreateFavorite()
    const { CategoryLists, useGetCategory } = useGetCategoryLists()
    // const dataCategoryLists = CategoryLists.map((item, index) => {
    //     return (item.Category_Title)
    // }
    // )

    const [Category, setCategory] = useState<any>('')

    const navigate = useNavigate()


    const onClickCard = (data: CourseListsType) => {
        navigate(`/detailcoursehomepage/${data.id_document}`)
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
        speed: 3000,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,

        autoplaySpeed: 2000,
        cssEase: "linear",

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

    const { email, uid, status, displayName, photoURL } = useAppSelector(({ auth }) => auth)
    const dispatch = useAppDispatch()
    const uid_login = useAppSelector(({ auth: uid }) => uid)
    const favorite_user = useAppSelector(({ auth: { favorite } }) => favorite)
    const Clickfavorite = (item: string) => {
        //! ?? ถ้าไม่ใช่่ undefine and false
        try {

            let favorite: string[] = [...favorite_user ?? []]
            if (favorite.some((params) => params === item)) {
                //! เอาออก
                favorite = favorite.filter((params) => params !== item)
                addFavorite(favorite, uid_login.uid!)
            } else {
                favorite.push(item)
                addFavorite(favorite, uid_login.uid!)
            }


            dispatch(setAuthStore({
                //* ชื่อเหมือนกันไม่ต้อง :
                uid: uid,
                email,
                displayName,
                status: status,
                favorite,
                photoURL
            }),
            )
        } catch (err) {
            console.log("🚀 ~ file: PageHome.aatsx:140 ss~ Clickfavorite ~ err", err)
        }
    }

    const queryCategory = (category: any) => {
        setCategory(category)
    }

    const allcategoryClick = () => {
        setCategory('')
    }
    const settings1 = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };
    // let newdata = data
    // if (Category) {
    //     newdata = data.filter((item: any) => item.category.label === Category)

    // } else {
    //     newdata = data
    // }
    return (
        <>
            <Navbar />
            <Slider {...settings1}>
                <Grid container justifyContent={'center'} sx={{ mb: -1, }} >
                    <Box
                        sx={{
                            position: "relative",
                            width: '100%',
                            height: 1000,
                            maxHeight: '1600',
                            backgroundImage: `url(${imagebg})`,
                            backgroundSize: 'contain',
                        }}>
                    </Box>


                </Grid>
                <Grid container justifyContent={'center'} sx={{ mb: -1, }} >
                    <Box
                        sx={{
                            position: "relative",
                            width: '100%',
                            height: 1000,
                            maxHeight: '1600',
                            backgroundImage: `url(${imagebg})`,
                            backgroundSize: 'contain',
                        }}>
                    </Box>


                </Grid>
            </Slider>
            <BodyCenterPage />
            {/* <Grid container justifyContent={'center'} sx={{ mt: 1, mb: -1 }}>
                <Box
                    sx={{
                        position: "relative",
                        width: '100%',
                        height: 850,
                        backgroundImage: `url(${imagebg})`,
                        backgroundSize: 'contain',


                    }}>
                </Box>

            </Grid> */}



            {/* <Grid container justifyContent={'center'} alignItems={'center'} alignContent={'center'} sx={{ width: '100%', height: 650, position: "absolute", top: 65, }}>

                <Grid item xs={12} sx={{ ml: 6 }}>
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

            </Grid>  */}
            <Box
                sx={{ width: '100%', height: 830, backgroundColor: '#000000' }}>
                <Grid container justifyContent={'center'} sx={{ ml: 2, }}>
                    <Typography variant="h1" component="h2" color='#ffffff' sx={{ mt: 7 }}>
                        👨🏻‍💻  หลักสูตรที่แนะนำ
                    </Typography>
                </Grid>
                <Grid container justifyContent={'center'} sx={{ ml: 2, }}>
                    <Typography gutterBottom variant="h5" color='#ffffff' >
                        เรามีหลักสูตรที่พร้อมพัฒนาคุณให้เข้าใจ และ ปฏิบัติได้จริง
                    </Typography>
                </Grid>

                <Grid container justifyContent={'center'} sx={{ mb: 2 }}>
                    {/* <Button color="secondary"
                        disabled={false}
                        size="medium"
                        variant="outlined"
                        sx={{ borderRadius: 50, mt: 2, ml: 2 }}
                        onClick={() => { allcategoryClick() }}
                    >
                        All
                    </Button> */}
                    {/* {dataCategoryLists.map((item, index) => {
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
                    })} */}
                </Grid>



                <Grid sx={{ flexGrow: 1 }} container spacing={2}>
                    <Grid item xs={12}>
                        <Grid container justifyContent="center" spacing={5}>
                            {data.map((item, index) => {
                                if (item.approval === true && data.length < 3) {
                                    const start_course_learn = new Date(item.start_register).toLocaleTimeString('en-Us', {
                                        hour: 'numeric',
                                        minute: 'numeric',
                                        hour12: false,
                                        timeZone: 'Asia/Bangkok'
                                    })
                                    const start_course_end = new Date(item.End_register).toLocaleTimeString('en-Us', {
                                        hour: 'numeric',
                                        minute: 'numeric',
                                        hour12: false,
                                        timeZone: 'Asia/Bangkok'
                                    })
                                    return (<react.Fragment key={index}>
                                        <Grid   >
                                            <Card sx={{
                                                height: 490, width: 345, borderRadius: 1, '&:hover': {
                                                    cursor: 'pointer',
                                                }
                                            }}
                                                /* It's a prop that adds a shadow to the
                                                card. */
                                                raised={true}>
                                                <CardMedia
                                                    onClick={() => { onClickCard(item) }}
                                                    component="img"
                                                    alt="green iguana"
                                                    height="200"
                                                    image={item.image}
                                                />
                                                <CardContent sx={{ height: 120, }} >
                                                    <Grid>
                                                        <Grid container justifyContent={'space-between'} alignContent={'center'} alignItems={'center'}>
                                                            <Grid item xs={6}>
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

                                                            </Grid>
                                                            <Grid item xs={6} container justifyContent={'flex-end'}>
                                                                <AccessTimeIcon sx={{ color: "#0085ea" }} />
                                                                <Typography>
                                                                    {`${start_course_learn} - ${start_course_end}`}
                                                                </Typography>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid container justifyContent={'space-between'}>


                                                            <Grid item xs={10}>
                                                                <Typography gutterBottom variant="h6" sx={{
                                                                    display: '-webkit-box',
                                                                    overflow: 'hidden',
                                                                    WebkitBoxOrient: 'vertical',
                                                                    WebkitLineClamp: 1,

                                                                }}>
                                                                    {item.title}
                                                                </Typography>

                                                            </Grid>

                                                            <Grid>
                                                                <IconButton onClick={() => Clickfavorite(item.id_document)}
                                                                    color={favorite_user?.some((params: any) => params === item.id_document) ? 'error' : 'inherit'}
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
                                                <CardContent sx={{ mt: 3, pt: 3, pb: 0 }}>
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
                                                            <Avatar alt="Remy Sharp" src={item.image_create} />
                                                        </Grid>
                                                        <Grid >
                                                            {item.create_byName}
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


                                                </CardActions>
                                            </Card>
                                        </Grid>



                                    </react.Fragment>)
                                }
                            })}
                        </Grid>
                    </Grid>
                </Grid>


                <Slider {...settings} >
                    {data.map((item, index) => {
                        if (item.approval === true && data.length >= 3) {
                            const start_course_learn = new Date(item.start_register).toLocaleTimeString('en-Us', {
                                hour: 'numeric',
                                minute: 'numeric',
                                hour12: false,
                                timeZone: 'Asia/Bangkok'
                            })
                            const start_course_end = new Date(item.End_register).toLocaleTimeString('en-Us', {
                                hour: 'numeric',
                                minute: 'numeric',
                                hour12: false,
                                timeZone: 'Asia/Bangkok'
                            })
                            return (<react.Fragment key={index}>

                                <Grid container mt={3} justifyContent={'center'}>
                                    <Card sx={{
                                        height: 490, width: 345, borderRadius: 1, '&:hover': {
                                            cursor: 'pointer',
                                        }
                                    }}
                                        /* It's a prop that adds a shadow to the
                                        card. */
                                        raised={true}>
                                        <CardMedia
                                            onClick={() => { onClickCard(item) }}
                                            component="img"
                                            alt="green iguana"
                                            height="200"
                                            image={item.image}
                                        />
                                        <CardContent sx={{ height: 120, }} >
                                            <Grid>

                                                <Grid container justifyContent={'space-between'} alignContent={'center'} alignItems={'center'}>
                                                    <Grid item xs={6}>
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

                                                    </Grid>
                                                    <Grid item xs={6} container justifyContent={'flex-end'}>
                                                        <AccessTimeIcon sx={{ color: "#0085ea" }} />
                                                        <Typography>
                                                            {`${start_course_learn} - ${start_course_end}`}
                                                        </Typography>
                                                    </Grid>
                                                </Grid>

                                                <Grid container justifyContent={'space-between'}>


                                                    <Grid item xs={10}>
                                                        <Typography gutterBottom variant="h6" sx={{
                                                            display: '-webkit-box',
                                                            overflow: 'hidden',
                                                            WebkitBoxOrient: 'vertical',
                                                            WebkitLineClamp: 1,

                                                        }}>
                                                            {item.title}
                                                        </Typography>

                                                    </Grid>

                                                    <Grid>
                                                        <IconButton onClick={() => Clickfavorite(item.id_document)}
                                                            color={favorite_user?.some((params: any) => params === item.id_document) ? 'error' : 'inherit'}
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
                                        <CardContent sx={{ mt: 3, pt: 3, pb: 0 }}>
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
                                                <Grid sx={{ mr: 1.5, }}  >
                                                    <Avatar alt="Remy Sharp" src={item.image_create} />
                                                </Grid>
                                                <Grid >
                                                    {item.create_byName}
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


                                        </CardActions>
                                    </Card>
                                </Grid>


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
