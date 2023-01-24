import React, { useState } from 'react'
// react hook form
import { useForm, } from 'react-hook-form';
import { Navbar } from '../components/Navbar'
// redux
import { useAppDispatch, } from '../store/useHooksStore'
//react-dom
import { useNavigate } from 'react-router-dom'
//MUI
import Grid from '@mui/material/Grid';
import { ControllerTextField } from '../framework/control/TextField/Controller';
import { Button, Typography } from '@mui/material';
//firebase
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase/config_firebase'
import { isCloseLoading, isShowLoading } from '../store/slices/loadingSlice';
import { setAuthStore } from '../store/slices/authSlice';
import { AccountCollection } from '../firebase/createCollection'
import { doc, getDoc } from 'firebase/firestore';
//google
import GoogleButton from 'react-google-button'
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { async } from '@firebase/util';
import { Footer } from '../components/Footer';
import { openAlertError, openAlertSuccess } from '../store/slices/alertSlice';
import axios from 'axios';
import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';
import * as jose from 'jose'
import { setCourseStore } from '../store/slices/courseSlice';

interface IFormInput {
  email: string;
  password: string
}
type Props = {}

const Login = (props: Props) => {
  //route
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const myForm = useForm<IFormInput>()
  const { handleSubmit, getValues } = myForm;
  const onClickRegistor = () => {
    navigate('/registor')
  }

  const onSubmit = async () => {
    console.log(getValues())

    const { email, password } = getValues()
    try {
      dispatch(isShowLoading())
      axios.defaults.withCredentials = true
      const res = await axios.post(`${import.meta.env.VITE_REACT_APP_API}auth/signin`, { email, password })
      const user = res.data.user
      console.log("🚀 ~ file: Login.tsx:55 ~ onSubmit ~ res", res)
      const user_email = user.email
      const user_displayName = user.display_name
      const user_status = user.status
      const user_id = user.id_document
      const user_favorite = user.favorite
      const user_course = res.data.data.course_join
      console.log("🚀 ~ file: Login.tsx:64 ~ onSubmit ~ user_course", user_course)

      if (user) {
        dispatch(setAuthStore({
          uid: user_id,
          email: user_email,
          displayName: user_displayName,
          status: user_status,
          favorite: user_favorite,
        }))

        dispatch(setCourseStore({
          uid_course: user_course,

        }),
        )
      }

      dispatch(openAlertSuccess('LoginSuccess'))
      navigate('/')
    } catch (error) {
      dispatch(openAlertError('Login fail'))
      console.log(error)
    } finally {
      dispatch(isCloseLoading())
    }
  }




  return (
    <>
      <Navbar />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container justifyContent={'center'} sx={{ mt: 15 }}>
          <Grid item xs={6}>
            <Typography variant="h1" align="center" >
              เข้าสู่ระบบ
            </Typography>
            <Grid item xs={12}>
              <ControllerTextField fullWidth formprop={myForm} name={"email"} label={'Email'} />
            </Grid>
            <Grid item xs={12}>
              <ControllerTextField fullWidth formprop={myForm} type='password' name={"password"} label={'Password'} />
            </Grid>
            {/* <Grid>
              <GoogleButton onClick={onClickLoginGoogle}/>
            </Grid> */}
            <Grid container justifyContent={'Right'}>
              <Button type="button" onClick={onClickRegistor} sx={{ mr: 1, m: 1, }}>Registor</Button>
              <Button type="submit" sx={{ mr: 1, m: 1, }}>Login</Button>
            </Grid>
          </Grid>
        </Grid>
      </form>
      <Footer />
    </>
  )
}

export default Login