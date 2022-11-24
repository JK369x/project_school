import React from 'react'
import { useForm,SubmitHandler } from 'react-hook-form';
import {Navbar} from '../components/Navbar'
// redux
import {useAppSelector} from '../store/useHooksStore'
//react-dom
import { useNavigate } from 'react-router-dom'

enum GenderEnum {
  female = "female",
  male = "male",
  other = "other"
}

interface IFormInput {
  firstName: String;
  password: String | Number
  gender: GenderEnum;
}
type Props = {}

const Login = (props: Props) => {
  const navigate = useNavigate()
  const onClickRegistor = () =>{
    navigate('/registor')
  }
  const { register, handleSubmit } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = data => console.log(data);

  const {userStoreTest} = useAppSelector((state)=>state)
  
  console.log(userStoreTest)
  return (
    <>
    <Navbar/>
    {/* store:{userStoreTest.value} */}
    <h1>Login</h1>
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("firstName")} />
      <input type='password'{...register("password")} />
      <select {...register("gender")}>
        <option value="female">female</option>
        <option value="male">male</option>
        <option value="other">other</option>
      </select>
      <input type="submit" />
    </form>
    <a href='#' onClick={onClickRegistor}>Registor</a>
    </>
  )
}

export default Login