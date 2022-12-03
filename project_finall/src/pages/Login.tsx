import React from 'react'
import { useForm, SubmitHandler } from 'react-hook-form';
import { Navbar } from '../components/Navbar'
// redux
import { useAppSelector } from '../store/useHooksStore'
//react-dom
import { useNavigate } from 'react-router-dom'
import Grid from '@mui/material/Grid';
import { ControllerTextField } from '../framework/control/TextField/Controller';
import { Button } from '@mui/material';
import { Typography } from '@mui/material';
enum GenderEnum {
  female = "female",
  male = "male",
  other = "other"
}

interface IFormInput {
  firstName: String;
  password: String | Number
}
type Props = {}

const Login = (props: Props) => {
  //route
  const navigate = useNavigate()
  const onClickRegistor = () => {
    navigate('/registor')
  }
  const myForm = useForm<IFormInput>()
  //react-form
  const { register, handleSubmit,getValues } = myForm;
  const onSubmit = async () =>{
    console.log(getValues())
  }

  //redux
  const { userStoreTest } = useAppSelector((state) => state)
  console.log(userStoreTest)


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
            <ControllerTextField fullWidth formprop={myForm} name={"passowrd"} label={'Password'} />
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