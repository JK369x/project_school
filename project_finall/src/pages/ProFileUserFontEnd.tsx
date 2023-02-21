import React from 'react'
import { Navbar } from '../components/Navbar'
import { Box, Container } from '@mui/system'
import { Avatar, Button, Card, CardActions, CardContent, CardMedia, Grid, IconButton, Rating, Typography } from '@mui/material'
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
import { useGetDetailUser } from './Admin/Users/Hook/useGetDetailUser'
import { Footer } from '../components/Footer'
const ProFileUserFontEnd = () => {
    const { state } = useGetDetailUser()
    console.log("🚀 ~ file: ProFileUserFontEnd.tsx:18 ~ ProFileUserFontEnd ~ state", state)

    const { uid, status, displayName, photoURL, favorite, email } = useAppSelector(({ auth }) => auth)

    const navigate = useNavigate()
    const EditUser = () => {
        navigate(`/usereditprofile/${state.id_document}`)
    }
    return (
        <>
            <Navbar />
            <Box sx={{ backgroundColor: '#1e1f1f', minHeight: '100vh', p: 4 }}>
                <Container sx={{ backgroundColor: '#fff', maxWidth: 1500, height: 900, borderRadius: '5px', pb: 4 }}>
                    <Grid sx={{ mt: 2 }} container justifyContent={'center'}>
                        <Typography gutterBottom variant="h1" mt={6}>
                            Profile
                        </Typography>
                    </Grid>
                    <Grid container justifyContent={'center'} >
                        <Grid container justifyContent={'center'} item xs={12}>
                            <Avatar alt="Remy Sharp" src={state.image_rul ? state.image_rul : photoURL ? photoURL : ''} sx={{ width: 300, height: 300, mb: 4, mt: 3 }} />
                        </Grid>
                        <Grid container justifyContent={'center'} item xs={12}>
                            <Grid container justifyContent={'center'} item xs={12} >
                                <Typography variant="h3" color='#555454'>
                                    {state.firstName}
                                </Typography>
                                <Typography variant="h3" ml={2} color='#555454'>
                                    {state.lastName}
                                </Typography>
                            </Grid>
                            <Grid container justifyContent={'center'} item xs={12}>
                                <Typography variant="h4" color='#555454'>
                                    Email: {state.email}
                                </Typography>
                            </Grid>
                            <Grid container justifyContent={'center'} item xs={12}>
                                <Typography variant="h4" color='#555454'>
                                    Job: {state.job}
                                </Typography>
                                <Typography variant="h4" ml={2} color='#555454'>
                                    Birthday: {state.birthday}
                                </Typography>
                            </Grid>
                            <Grid container justifyContent={'center'} item xs={12}>
                                <Typography variant="h4" color='#555454'>
                                    Province: {state.province?.label ?? '-'}
                                    {/* //! ?? if province false = '-' */}
                                </Typography>
                                <Typography variant="h4" ml={1} color='#555454'>
                                    Tumbon: {state.tambon?.label}
                                    {/* //! tambon? มีค่าอยู่หรือป่าว */}
                                </Typography>
                            </Grid>
                            <Grid container justifyContent={'center'} item xs={12}>
                                <Typography variant="h4" color='#555454'>
                                    Aumphure: {state.amphure?.label}
                                </Typography>
                                <Typography variant="h4" ml={2} color='#555454'>
                                    ZipCode: {state.zipCode?.label}
                                </Typography>
                            </Grid>
                            <Grid container justifyContent={'center'} item xs={12}>
                                <Typography variant="h4" color='#555454'>
                                    Address: {state.address}
                                </Typography>
                            </Grid>
                            <Grid container justifyContent={'center'} item xs={12}>
                                <Typography variant="h4" color='#555454'>
                                    Agency: {state.agency}
                                </Typography>
                                <Typography variant="h4" ml={1} color='#555454'>
                                    Status: {state.status?.label}
                                </Typography>
                            </Grid>
                            <Button sx={{ mt: 2, width: 150, height: 50 }} onClick={EditUser}>Edit</Button>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
            <Footer />
        </>
    )
}


export default ProFileUserFontEnd