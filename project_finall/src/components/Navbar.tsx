import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/nav-bar.css'
export const Navbar = () => {
    const navigate = useNavigate() 
    const onClickHome = () =>{
        navigate('/')
    }
    const onClickLogin = () =>{
        navigate('/login')
    }
  return (
    <div className='nav-bar'>
        <a href='#' onClick={onClickHome}>Home</a>
        <a href='#' onClick={onClickLogin}>Login</a>
    </div>
  )
}
