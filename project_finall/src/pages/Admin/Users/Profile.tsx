import Sidebar from '../../../components/componentsAdmin/sidebar/Side-bar'
import Navbar from '../../../components/componentsAdmin/navbar/Navbar'
import './User.scss'

import Grid from '@mui/material/Grid/Grid'
import { FC, useEffect, useState } from 'react'
import { UserListsType } from './Hook/useGetUserLists'
import { useGetUserLists } from './Hook/useGetUserLists'

//controller
import { useDialog } from '../../../Hook/dialog/useDialog'
import { useDeleteUser } from './Hook/useDeleteUser'
import { Box, Link, } from '@mui/material'
import Button from "../../../framework/control/Button/Button";
//react dom 
import { useNavigate, useParams } from 'react-router-dom'

//User

import { useGetDetailUser } from './Hook/useGetDetailUser'
import { Typography, Avatar } from '@mui/material'
import { useAppSelector } from '../../../store/useHooksStore'
import moment from 'moment'

const Profile: FC = () => {

    const { userLists, getUserLists } = useGetUserLists()
    const { photoURL, status } = useAppSelector(({ auth }) => auth)
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()

    const { state } = useGetDetailUser()
    console.log("🚀 ~ file: DetailUser.tsx:29 ~ state", state)

    const onClickEdit = () => {
        switch (status?.id) {
            case '4':
                console.log(status?.id)
                navigate(`/editTeacher/${id}`)
                break;
            case '10':
                console.log(status?.id)
                navigate(`/editAdmin/${id}`)
                break;
            default:
                console.log("No such day exists!");
                break;
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
                            <Grid >

                                <Typography variant="h2" mb={2}  >
                                    INFORMATION
                                </Typography>

                                {state.status?.id === '10' ?
                                    <>
                                        <Grid container justifyContent={'center'} sx={{ mt: 5 }}>
                                            <Avatar alt="Remy Sharp" src={state.image_rul ? state.image_rul : ''} sx={{ width: 250, height: 250, }} />
                                        </Grid>
                                        <Grid container justifyContent={'center'}>
                                            <Typography variant="h3" color='#555454'>
                                                {`${state.firstName}  ${state.lastName}`}
                                            </Typography>
                                        </Grid>
                                        <Grid container justifyContent={'center'}>
                                            <Typography variant="h4" ml={5} color='#555454'>
                                                Email: {state.email}
                                            </Typography>
                                        </Grid>
                                        <Grid container justifyContent={'center'}>
                                            <Link
                                                sx={{ mr: 2 }}
                                                component="button"
                                                variant="body2"
                                                onClick={() => {
                                                    navigate(`/resetpassword/${id}`)
                                                }}
                                            >
                                                Reset Password
                                            </Link>
                                            <Button label='Edit' onClick={() => onClickEdit()} />
                                        </Grid>
                                    </> : <>
                                        <Grid container justifyContent={'center'} sx={{ mt: 5 }}>
                                            <Avatar alt="Remy Sharp" src={state.image_rul ? state.image_rul : ''} sx={{ width: 250, height: 250, }} />
                                        </Grid>
                                        <Grid container justifyContent={'center'}>
                                            <Typography variant="h3" color='#555454'>
                                                {`${state.firstName}  ${state.lastName}`}
                                            </Typography>
                                        </Grid>
                                        <Grid container justifyContent={'center'}>
                                            <Typography variant="h4" ml={5} color='#555454'>
                                                Email: {state.email}
                                            </Typography>
                                            <Typography variant="h4" ml={5} color='#555454'>
                                                Birthday: {moment(state.birthday).format('DD/MM/YYYY')}
                                            </Typography>
                                        </Grid>
                                        <Grid container justifyContent={'center'}>
                                            <Typography variant="h4" ml={5} color='#555454'>
                                                Province: {state.province?.label ?? '-'}
                                                {/* //! ?? if province false = '-' */}
                                            </Typography>

                                            <Typography variant="h4" ml={5} color='#555454'>
                                                Tumbon: {state.tambon?.label}
                                                {/* //! tambon? มีค่าอยู่หรือป่าว */}
                                            </Typography>
                                        </Grid>
                                        <Grid container justifyContent={'center'}>
                                            <Typography variant="h4" ml={5} color='#555454'>
                                                Aumphure: {state.amphure?.label}
                                            </Typography>

                                            <Typography variant="h4" ml={5} color='#555454'>
                                                ZipCode: {state.zipCode?.label}
                                            </Typography>
                                        </Grid>
                                        <Grid container justifyContent={'center'}>
                                            <Typography variant="h4" ml={5} color='#555454'>
                                                Address: {state.address}
                                            </Typography>
                                        </Grid>
                                        <Grid container justifyContent={'center'}>
                                            <Typography variant="h4" ml={5} color='#555454'>
                                                Agency: {state.agency}
                                            </Typography>
                                            <Typography variant="h4" ml={5} color='#555454'>
                                                Status: {state.status?.label}
                                            </Typography>
                                        </Grid>
                                        <Grid container justifyContent={'center'}>
                                            <Typography variant="h4" color='#555454' sx={{ width: 800, mt: 1, mb: 2 }}>
                                                About: {state.about}
                                            </Typography>

                                        </Grid>
                                        <Grid container justifyContent={'center'}>
                                            <Link
                                                sx={{ mr: 2 }}
                                                component="button"
                                                variant="body2"
                                                onClick={() => {
                                                    navigate(`/resetpassword/${id}`)
                                                }}
                                            >
                                                Reset Password
                                            </Link>
                                            <Button label='Edit' onClick={() => onClickEdit()} />
                                        </Grid>
                                    </>}
                            </Grid>
                        </Box>
                    </div>
                </div>
            </div>
        </div >

    )
}

export default Profile


