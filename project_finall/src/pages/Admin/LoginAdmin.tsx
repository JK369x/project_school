import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import React from 'react'
import { useForm } from 'react-hook-form';
import { auth } from '../../firebase/config_firebase';
import { AccountCollection } from '../../firebase/createCollection';
import { setAuthStore } from '../../store/slices/authSlice';
import { isCloseLoading, isShowLoading } from '../../store/slices/loadingSlice';
import { useAppDispatch, useAppSelector } from '../../store/useHooksStore';
import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import { Button, Typography } from '@mui/material';
import { ControllerTextField } from '../../framework/control/TextField/Controller';
import axios from 'axios';

interface IFormInput {
    email: string;
    password: string
}
const LoginAdmin = () => {
    const navigator = useNavigate()
    const dispatch = useAppDispatch()
    const myForm = useForm<IFormInput>()
    const RegisterTeacher = () => {
        navigator('/registerteacher')
    }
    //react-form
    const { handleSubmit, getValues } = myForm;
    const onSubmit = async () => {
        console.log(getValues())
        const { email, password } = getValues()
        try {
            dispatch(isShowLoading())
            const res = await axios.post(`${import.meta.env.VITE_REACT_APP_API}auth/signin`, {
              email, password
            }, { withCredentials: true })
            const data = res.data
            const displayName = `${data.firstName} ${data.lastName}`
            dispatch(setAuthStore({
              uid: data.id_document,
              email: data.email,
              displayName,
              status:data.status.label,
              favorite:data.favorite,
              photoURL: data.image_rul,
            }))
            // dispatch(isShowLoading())
            // const {
            //     user: { uid },
            // } = await signInWithEmailAndPassword(auth, email, password)

            // const docSnap = await getDoc(doc(AccountCollection, uid))
            // console.log('123123', docSnap.exists())
            // if (docSnap.exists()) {
            //     const { firstName, lastName, image_rul, status, favorite } = docSnap.data() as any
            //     const displayName = `${firstName} ${lastName}`
            //     console.log(docSnap.data())
            //     dispatch(setAuthStore({
            //         uid,
            //         displayName,
            //         status,
            //         favorite,
            //         photoURL: image_rul,
            //     }))
                navigator('/dashboard')
            // } else {
            //     console.log('error data')
            //     // handle error
            // }
        } catch (error) {
            console.log(error)
        } finally {
            dispatch(isCloseLoading())
        }
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container justifyContent={'center'} sx={{ mt: 15 }}>
                <Grid item xs={6}>
                    <Typography variant="h1" align="center" >
                        เข้าสู่ระบบ Admins
                    </Typography>
                    <Grid item xs={12}>
                        <ControllerTextField fullWidth formprop={myForm} name={"email"} label={'Email'} />
                    </Grid>
                    <Grid item xs={12}>
                        <ControllerTextField fullWidth formprop={myForm} type='password' name={"password"} label={'Password'} />
                    </Grid>
                    <Grid container justifyContent={'Right'}>
                        <Button type="button" sx={{ mr: 1, m: 1, }} onClick={RegisterTeacher}>Register</Button>
                        <Button type="submit" sx={{ mr: 1, m: 1, }}>Login</Button>
                    </Grid>
                </Grid>
            </Grid>
        </form>
    )
}

export default LoginAdmin