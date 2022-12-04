import React from 'react'
// react hook form
import { useForm, } from 'react-hook-form';
import { Navbar } from '../components/Navbar'
// redux
import { useAppDispacth, useAppSelector } from '../store/useHooksStore'
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




enum GenderEnum {
  female = "female",
  male = "male",
  other = "other"
}

interface IFormInput {
  email: string;
  password: string 
}
type Props = {}

const Login = (props: Props) => {
  //route
  const navigate = useNavigate()
  const onClickRegistor = () => {
    navigate('/registor')
  }
  const dispatch = useAppDispacth()
  const myForm = useForm<IFormInput>()
  //react-form
  const {  handleSubmit, getValues } = myForm;
  const onSubmit = async () => {
    console.log(getValues())
    
    const email = getValues("email")
    const password = getValues("password")
    try{
      dispatch(isShowLoading())
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    console.log('user',userCredential)
    const user = userCredential.user
    }catch(error){
      console.log(error)
    }finally{
      dispatch(isCloseLoading())

    }
  }
  //redux
  


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
              <ControllerTextField fullWidth formprop={myForm} type='password'  name={"passowrd"} label={'Password'} />
            </Grid>
            <Grid container justifyContent={'Right'}>
              <Button type="button" onClick={onClickRegistor} sx={{ mr: 1, m: 1, }}>Registor</Button>
              <Button type="submit" sx={{ mr: 1, m: 1, }}>Login</Button>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </>
  )
}

export default Login