import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/nav-bar.css'
import { useAppDispatch, useAppSelector } from '../store/useHooksStore'
import { Avatar } from '@mui/material'
import { auth } from '../firebase/config_firebase'
import { signOut } from 'firebase/auth'
import { setAuthStore } from '../store/slices/authSlice'
import Account_menu from './Account_menu'
export const Navbar = () => {
  const navigate = useNavigate()
  const onClickHome = () => {
    navigate('/')
  }
  const onClickLogin = () => {
    navigate('/login')
  }

  const onClickLogOut = () => {
    signOut(auth).then(() => {
      // Sign-out successful.
      dispatch(
        setAuthStore({
          uid: null,
          displayName: null,
          status: null,
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
  const { uid, status, displayName } = useAppSelector(({ auth }) => auth)
  const auth_uid = uid !== undefined && uid !== null
  console.log("🚀 ~ file: Navbar.tsx:30 ~ Navbar ~ auth_uid", auth_uid)
  return (
    <div className='nav-bar'>

      <div className="side-nav-bar-start">
        <a href='#' onClick={onClickHome}>LOGO</a>

      </div>
      <div className="side-nav-bar-end">

        {!auth_uid ? (
          <>
            <div className="nva-bar-in">
              <a href='#' onClick={onClickLogin}>เข้าสู่ระบบ</a>
            </div>
            <a href='#' onClick={onClickLogin}>ลงทะเบียน</a>

          </>
        ) : (
          <>
            <Account_menu />
          </>
        )}
      </div>
    </div>
  )
}
