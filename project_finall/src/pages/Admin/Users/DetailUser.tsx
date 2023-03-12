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
import moment from 'moment'

const DetailUser: FC = () => {

  const { userLists, getUserLists } = useGetUserLists()
  const { photoURL } = useAppSelector(({ auth }) => auth)
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const { state } = useGetDetailUser()
  console.log("🚀 ~ file: DetailUser.tsx:29 ~ state", state)

  const onClickEdit = () => {

    switch (state.status?.id) {
      case '4':
        console.log(state.status?.id)
        navigate(`/editTeacher/${id}`)
        break;
      case '10':
        console.log(state.status?.id)
        navigate(`/editAdmin/${id}`)
        break
      case '1':
        console.log(state.status?.id)
        navigate(`/editUser/${id}`)
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
              <Typography variant="h2" mb={2}  >
                INFORMATION
              </Typography>
              <Grid container justifyContent={'center'}>
                <Grid container justifyContent={'center'} item xs={12}>
                  <Avatar alt="Remy Sharp" src={state.image_rul ? state.image_rul : ''} sx={{ width: 120, height: 120, }} />
                </Grid>
                <Grid container justifyContent={'center'} item xs={12}>
                  <Typography variant="h3" mr={1} color='#555454'>
                    {state.firstName}
                  </Typography>
                  <Typography variant="h3" color='#555454'>
                    {state.lastName}
                  </Typography>
                </Grid>
                <Grid container justifyContent={'center'} item xs={12}>
                  <Typography variant="h4" color='#555454'>
                    Email: {state.email}
                  </Typography>
                </Grid>
                <Grid container justifyContent={'center'} item xs={12}>
                  <Typography variant="h4" mr={2} color='#555454'>
                    Job: {state.job}
                  </Typography>
                  <Typography variant="h4" color='#555454'>
                    Birthday: {moment(state.birthday).format('DD/MM/YYYY')}
                  </Typography>
                </Grid>
                <Grid container justifyContent={'center'} item xs={12}>
                  <Typography variant="h4" mr={2} color='#555454'>
                    Province: {state.province?.label ?? '-'}
                    {/* //! ?? if province false = '-' */}
                  </Typography>

                  <Typography variant="h4" color='#555454'>
                    Tumbon: {state.tambon?.label}
                    {/* //! tambon? มีค่าอยู่หรือป่าว */}
                  </Typography>
                </Grid>
                <Grid container justifyContent={'center'} item xs={12}>
                  <Typography variant="h4" mr={2} color='#555454'>
                    Aumphure: {state.amphure?.label}
                  </Typography>

                  <Typography variant="h4" color='#555454'>
                    ZipCode: {state.zipCode?.label}
                  </Typography>
                </Grid>
                <Grid container justifyContent={'center'} item xs={12}>
                  <Typography variant="h4" mr={2} color='#555454'>
                    Agency: {state.agency}
                  </Typography>
                  <Typography variant="h4" color='#555454'>
                    Status: {state.status?.label}
                  </Typography>
                </Grid>
                <Grid container justifyContent={'center'} item xs={12}>
                  <Typography variant="h4" color='#555454'>
                    Address: {state.address}
                  </Typography>
                </Grid>
                <Grid container justifyContent={'center'} mt={2} item xs={12}>
                  <Button label='Edit' onClick={() => onClickEdit()} />
                </Grid>
              </Grid>
            </Box>
          </div>
        </div>
      </div>
    </div>

  )
}

export default DetailUser


