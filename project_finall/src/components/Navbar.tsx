import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/nav-bar.css'
export const Navbar = () => {
  const navigate = useNavigate()
  const onClickHome = () => {
    navigate('/')
  }
  const onClickLogin = () => {
    navigate('/login')
  }
  return (
    <div className='nav-bar'>

      <div className="side-nav-bar-start">
        <a href='#' onClick={onClickHome}>LOGO</a>
 
      </div>
      <div className="side-nav-bar-end">
        <div className="course">
        <a href='#' onClick={onClickLogin}>คอร์สเรียน</a>
        </div>
        <div className="nva-bar-in">
        <a href='#' onClick={onClickLogin}>เข้าสู่ระบบ</a>
        </div>
        <a href='#' onClick={onClickLogin}>ลงทะเบียน</a>
      </div>
    </div>
  )
}
