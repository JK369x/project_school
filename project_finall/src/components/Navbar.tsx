import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/nav-bar.css'
import { useAppDispatch, useAppSelector } from '../store/useHooksStore'
import { Avatar, Grid, Typography } from '@mui/material'
import { auth } from '../firebase/config_firebase'
import { signOut } from 'firebase/auth'
import { setAuthStore } from '../store/slices/authSlice'
import Account_menu from './Account_menu'
import logo from '../assets/logo-rmutt/20210202-logo-RMUTT-News.png'
import IconBreadcrumbs from './category'
import { positions } from '@mui/system'
export const Navbar = () => {
  const navigate = useNavigate()
  const onClickHome = () => {
    navigate('/')
  }
  const onClickLogin = () => {
    navigate('/login')
  }
  const onClicRegister = () => {
    navigate('/registor')
  }

  const onClickLogOut = () => {
    signOut(auth).then(() => {
      // Sign-out successful.
      dispatch(
        setAuthStore({
          email: null,
          displayName: null,
          status: null,
          photoURL: null,
          about: null,
          // photoURL: user.photoURL as any,
        }),
      )
    }).catch((error) => {
      console.log("🚀 ~ file: Navbar.tsx:21 ~ signOut ~ error", error)
      // An error happened.
    });

    navigate('/page')
  }
  const dispatch = useAppDispatch();
  // const { uid, status, displayName,photoURL } = useAppSelector(({ auth }) => auth)
  const { email, status, displayName, photoURL } = useAppSelector(({ auth }) => auth)
  // const auth_uid = uid !== undefined && uid !== null
  const auth_email = email !== undefined && email !== null
  const ClickCateGory = () => {
    navigate('/category_course')
  }
  return (

    <>
      <Grid container justifyContent={'space-between'} alignContent={'center'} alignItems={'center'} borderBottom={1} sx={{ backgroundColor: '#ffffff' }}>
        <Grid sx={{ mt: 1, ml: 5 }}>
          <img src={logo} alt="" width={150} height={50} onClick={onClickHome} />

        </Grid>
        <Grid>
          <Typography sx={{
            minWidth: 100, '&:hover': {
              color: '#0085ea',
            }
          }}>

            <IconBreadcrumbs />
          </Typography>
        </Grid>
        <Grid>
          {!auth_email ? (
            <>
              <Grid container justifyContent={'center'}>

                <Typography mr={2} sx={{
                  '&:hover': {
                    color: '#0085ea',
                  },
                  cursor: "pointer"
                }} >
                  <span onClick={onClickLogin}>เข้าสู่ระบบ</span>
                </Typography>
                <Typography mr={5} sx={{
                  '&:hover': {
                    color: '#0085ea',
                  },
                  cursor: "pointer"
                }}>
                  <span onClick={onClicRegister}>ลงทะเบียน</span>
                </Typography>

              </Grid>
            </>
          ) : (
            <>
              <Account_menu />
            </>
          )}
        </Grid>
      </Grid >
    </>




  )
}
