import React from 'react'
import {Navbar} from '../components/Navbar'
// redux
import {useAppSelector} from '../store/useHooksStore'

type Props = {}

const Login = (props: Props) => {
  const {userStoreTest} = useAppSelector((state)=>state)
  console.log(userStoreTest)
  return (
    <>
    <Navbar/>
    store:{userStoreTest.value}
    <h1>Login</h1>
    </>
  )
}

export default Login