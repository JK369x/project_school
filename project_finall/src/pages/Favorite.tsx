import React from 'react'
import { Navbar } from '../components/Navbar'
import { Box } from '@mui/system'
import { Avatar, Card, CardActions, CardContent, CardMedia, Grid, IconButton, Rating, Typography } from '@mui/material'
import { useGetFavorite } from './Admin/favorite/useGetFavorite'
import { CourseListsType, useGetCourseLists } from './Admin/Courses/Hook/useGetCourse'
import { useAppDispatch, useAppSelector } from '../store/useHooksStore'
import FavoriteIcon from '@mui/icons-material/Favorite';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import react from 'react'
import { useCreateFavorite } from './Admin/favorite/useCreateFavorite'
import { setAuthStore } from '../store/slices/authSlice'
import { useNavigate } from 'react-router-dom'
const Favorite = () => {
    const { FavoriteList, getFavoriteLists } = useGetFavorite()
    const favorite_data = FavoriteList

    const { uid, status, displayName, photoURL, favorite, email } = useAppSelector(({ auth }) => auth)
    console.log("🚀 ~ file: Favorite.tsx:20 ~ Favorite ~ favorite:", favorite)
    const dispatch = useAppDispatch()
    const uid_login = useAppSelector(({ auth: uid }) => uid)
    const favorite_user = useAppSelector(({ auth: { favorite } }) => favorite)
    const { addFavorite } = useCreateFavorite()
    // const getCourse = data.filter((item: any) => favorite?.includes(item.id_document));
    const Clickfavorite = (item: any) => {
        try {
            let favorite: string[] = [...favorite_user ?? []]
            if (favorite.some((params) => params === item)) {
                favorite = favorite.filter((params) => params !== item)
                addFavorite(favorite, uid_login.uid!)
                getFavoriteLists()
            } else {
                //!เอาเข้า
                favorite.push(item)
                addFavorite(favorite, uid_login.uid!)
                getFavoriteLists()
            }
            dispatch(setAuthStore({
                //* ชื่อเหมือนกันไม่ต้อง :
                uid,
                email,
                displayName,
                status,
                favorite,
                photoURL,
            }),
            )
        } catch (err) {
            console.log("🚀 ~ file: PageHome.tsx:140 ~ Clickfavorite ~ err", err)
        }
    }
    const navigate = useNavigate()
    const onClickCard = (favorite_data: any) => {
        console.log("🚀 ~ file: Favorite.tsx:53 ~ onClickCard ~ favorite_data", favorite_data)
        navigate(`/detailcoursehomepage/${favorite_data.id_document}`)
    }



    return (
        <>
            <Navbar />
            <Grid sx={{ mt: 2 }} container justifyContent={'center'}>
                <Typography gutterBottom variant="h3" >
                    Favorite
                </Typography>

            </Grid>
            <Box sx={{ width: '100%', display: "flex", justifyContent: 'center' }}>
                <Grid sx={{ flexGrow: 1 }} container spacing={2}>
                    <Grid item xs={12}>
                        <Grid container justifyContent="center" spacing={5}>
                            {favorite_data.map((item: any, index: number) => {
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

                                    <Grid key={index} item  >

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
                                                                {item.course_status!.map((params: any, index: any) => {
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
                                                        <Rating name="read-only" value={5} />

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
                            })}
                        </Grid>
                    </Grid>
                </Grid>

            </Box>
        </>
    )
}


export default Favorite