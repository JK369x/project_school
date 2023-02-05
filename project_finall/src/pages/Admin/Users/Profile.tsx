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
import { Box, } from '@mui/material'
import Button from "../../../framework/control/Button/Button";
//react dom 
import { useNavigate, useParams } from 'react-router-dom'

//User

import { useGetDetailUser } from './Hook/useGetDetailUser'
import { Typography, Avatar } from '@mui/material'
import { useAppSelector } from '../../../store/useHooksStore'

const Profile: FC = () => {

    const { userLists, getUserLists } = useGetUserLists()
    const { photoURL } = useAppSelector(({ auth }) => auth)
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()

    const { state } = useGetDetailUser()
    console.log("🚀 ~ file: DetailUser.tsx:29 ~ state", state)

    const onClickEdit = () => {
        navigate(`/editUser/${id}`)
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
                                <Grid container justifyContent={'space-between'} item xs={12} sx={{ m: 0, p: 0 }}>
                                    <Typography variant="h2" mb={2}  >
                                        INFORMATION
                                    </Typography>
                                    <Button label='Edit' onClick={() => onClickEdit()} />
                                </Grid>
                                {state.status?.id === '10' ?
                                    <>
                                        <Grid container item>
                                            <Grid container ml={3} mr={3} item xs={1}>
                                                <Avatar alt="Remy Sharp" src={state.image_rul ? state.image_rul : ''} sx={{ width: 120, height: 120, mr: 5 }} />
                                            </Grid>
                                            <Grid ml={1} item xs={6} >
                                                <Grid item container mt={0}>
                                                    <Typography variant="h3" ml={5} color='#555454'>
                                                        {state.firstName}
                                                    </Typography>
                                                    <Typography variant="h3" ml={2} color='#555454'>
                                                        {state.lastName}
                                                    </Typography>
                                                </Grid>
                                                <Grid>
                                                    <Typography variant="h4" ml={5} color='#555454'>
                                                        Email: {state.email}
                                                    </Typography>
                                                    <Typography variant="h4" ml={5} color='#555454'>
                                                        Change Password
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </> : <>
                                        <Grid container item>
                                            <Grid container item xs={1}>
                                                <Grid item sx={{ m: 'auto' }}>
                                                    <Avatar alt="Remy Sharp" src={state.image_rul ? state.image_rul : ''} sx={{ width: 120, height: 120, mr: 5 }} />

                                                </Grid>
                                            </Grid>
                                            <Grid ml={1} item xs={6} >
                                                <Grid item container mt={0}>
                                                    <Typography variant="h3" ml={5} color='#555454'>
                                                        {state.firstName}
                                                    </Typography>
                                                    <Typography variant="h3" ml={2} color='#555454'>
                                                        {state.lastName}
                                                    </Typography>
                                                </Grid>
                                                <Grid>
                                                    <Typography variant="h4" ml={5} color='#555454'>
                                                        Email: {state.email}
                                                    </Typography>
                                                </Grid>
                                                <Grid>
                                                    <Typography variant="h4" ml={5} color='#555454'>
                                                        Birthday: {state.birthday}
                                                    </Typography>
                                                </Grid>
                                                <Grid>
                                                    <Typography variant="h4" ml={5} color='#555454'>
                                                        Province: {state.province?.label ?? '-'}
                                                        {/* //! ?? if province false = '-' */}
                                                    </Typography>
                                                </Grid>
                                                <Grid>
                                                    <Typography variant="h4" ml={5} color='#555454'>
                                                        Tumbon: {state.tambon?.label}
                                                        {/* //! tambon? มีค่าอยู่หรือป่าว */}
                                                    </Typography>
                                                </Grid>
                                                <Grid>
                                                    <Typography variant="h4" ml={5} color='#555454'>
                                                        Aumphure: {state.amphure?.label}
                                                    </Typography>
                                                </Grid>
                                                <Grid>
                                                    <Typography variant="h4" ml={5} color='#555454'>
                                                        ZipCode: {state.zipCode?.label}
                                                    </Typography>
                                                </Grid>
                                                <Grid>
                                                    <Typography variant="h4" ml={5} color='#555454'>
                                                        Address: {state.address}
                                                    </Typography>
                                                </Grid>
                                                <Grid>
                                                    <Typography variant="h4" ml={5} color='#555454'>
                                                        Agency: {state.agency}
                                                    </Typography>
                                                </Grid>
                                                <Grid>
                                                    <Typography variant="h4" ml={5} color='#555454'>
                                                        Status: {state.status?.label}
                                                    </Typography>
                                                </Grid>

                                                <Grid>
                                                    <Typography variant="h4" ml={5} color='#555454'>
                                                        About: {state.about}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
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


