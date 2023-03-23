
import React from 'react'
import { useForm } from 'react-hook-form';

import { setAuthStore } from '../../store/slices/authSlice';
import { isCloseLoading, isShowLoading } from '../../store/slices/loadingSlice';
import { useAppDispatch, useAppSelector } from '../../store/useHooksStore';
import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import { Box, Button, Container, Link, Typography } from '@mui/material';
import { ControllerTextField } from '../../framework/control/TextField/Controller';
import axios from 'axios';
import imagelogin from '../../assets/Privacy policy-rafiki.png'
interface IFormInput {
    email: string;
    password: string
}
const LoginAdmin = () => {
    const navigator = useNavigate()
    const dispatch = useAppDispatch()
    const myForm = useForm<IFormInput>()

    //react-form
    const { handleSubmit, getValues } = myForm;
    const onSubmit = async () => {
        console.log(getValues())
        const { email, password } = getValues()
        try {
            dispatch(isShowLoading())
            axios.defaults.withCredentials = true
            const res = await axios.post(`${import.meta.env.VITE_REACT_APP_API}auth/signin`, { email, password })
            const user = res.data.user.email
            const image = res.data.user.image_rul
            const id_document = res.data.user.id_document
            const Name = res.data.user.displayName
            const user_favorite = res.data.user.favorite
            const user_status = res.data.user.status
            const user_about = res.data.user.about
            console.table(res.data.user)
            dispatch(setAuthStore({
                uid: id_document,
                email: user,
                displayName: Name,
                status: user_status,
                favorite: user_favorite,
                photoURL: image,
                about: user_about,
            }))
            navigator('/dashboard')

        } catch (error) {
            console.log(error)
        } finally {
            dispatch(isCloseLoading())
        }
    }
    return (
        <>
            <Box sx={{ backgroundColor: '#1e1f1f', minHeight: '100vh', pt: 3 }}>
                <Container sx={{ backgroundColor: '#fff', maxWidth: 1500, borderRadius: '5px', maxHeight: 600, mt: 5, }}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Grid container justifyContent={'center'} alignItems={'center'} alignContent={'center'} >
                            <Grid container justifyContent={'center'} alignItems={'center'} alignContent={'center'} >
                                <Grid item container justifyContent={'center'} alignItems={'center'} alignContent={'center'} xs={6}>
                                    <img src={imagelogin} width={'100%'} height={'100%'} />
                                </Grid>
                                <Grid container justifyContent={'center'} alignItems={'center'} alignContent={'center'} xs={6}>
                                    <Grid container justifyContent={'center'}>
                                        <Typography variant="h1" align="center" >
                                            เข้าสู่ระบบ
                                        </Typography>
                                    </Grid>
                                    <Grid container justifyContent={'center'} item sx={{ maxWidth: 400 }}>
                                        <ControllerTextField fullWidth formprop={myForm} name={"email"} label={'Email'} />
                                    </Grid>
                                    <Grid container justifyContent={'center'} item sx={{ maxWidth: 400 }}>
                                        <ControllerTextField fullWidth formprop={myForm} type='password' name={"password"} label={'Password'} />
                                    </Grid>
                                    <Grid container justifyContent={'center'} sx={{ ml: 38 }}>

                                        <Button type="submit" sx={{ mr: 1, m: 1, width: 100 }}>Login</Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </form>
                </Container>
            </Box>

        </>
    )
}

export default LoginAdmin