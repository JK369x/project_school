import './Side-bar.scss';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import SchoolIcon from '@mui/icons-material/School';
import CategoryIcon from '@mui/icons-material/Category';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import SettingsSystemDaydreamIcon from '@mui/icons-material/SettingsSystemDaydream';

import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LogoutIcon from '@mui/icons-material/Logout';
import VerifiedIcon from '@mui/icons-material/Verified';
//react dom 
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../../store/useHooksStore';
import { setAuthStore } from '../../../store/slices/authSlice';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { setCourseStore } from '../../../store/slices/courseSlice';
import axios from 'axios';
export const Sidebar = () => {
  const { email, status, photoURL, favorite, about, uid } = useAppSelector(({ auth }) => auth)
  const dispatch = useAppDispatch();
  const navigate = useNavigate()



  const onClickUser = () => {
    navigate('/users')
  }
  const onClickDashboard = () => {
    navigate('/dashboard')
  }
  const onClickCourse = () => {
    navigate('/courses')
  }
  const onClickCategory = () => {
    navigate('/category')
  }
  const onClickCalculate = () => {
    navigate('/calculate')
  }
  const onClickApproval = () => {
    navigate('/approval')
  }
  const onClickTeacher = () => {
    navigate('/teacher')
  }
  const onClickBanner = () => {
    navigate('/banner')
  }
  const onClickLogOut = async () => {
    await axios.get(`${import.meta.env.VITE_REACT_APP_API}auth/signout`)
    dispatch(
      setAuthStore({
        uid: null,
        email: null,
        displayName: null,
        status: null,
        favorite: null,
        photoURL: null,
        about: null
      }),
    )
    navigate('/adminlogin')
  }


  const onClickProfile = () => {
    navigate(`/profile/${uid}`)
  }


  return (
    <div className='sidebar'>
      <div className="top">
        <span className="logo">Preproject</span>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <li>
            <DashboardIcon className='icon' />
            <span onClick={onClickDashboard}>Dashboard</span>
          </li>
          <p className="title">List</p>

          <li>
            <PersonOutlineIcon className='icon' />
            <span onClick={onClickUser}>Users</span>
          </li>
          <li>
            <SchoolIcon className='icon' />
            <span onClick={onClickTeacher}>                  {status?.id === '10' ? 'Employee' : 'Teacher'}</span>
          </li>
          <li>
            <MenuBookIcon className='icon' />
            <span onClick={onClickCourse}>Course</span>
          </li>
          <li>
            <CategoryIcon className='icon' />
            <span onClick={onClickCategory}>Category</span>
          </li>
          {status?.id === '10' && (<>
            <li>
              <VerifiedIcon className='icon' />
              <span onClick={onClickApproval}>Approval</span>
            </li>
          </>)}
          <p className="title">USEFUL</p>
          <li>
            <QueryStatsIcon className='icon' />
            <span onClick={onClickBanner}>Banner</span>
          </li>

          <p className="title">SERVICE</p>
          <li>
            <SettingsSystemDaydreamIcon className='icon' />
            <span onClick={onClickCalculate}>Calculate Queue</span>
          </li>

          <p className="title">USER</p>
          <li>
            <AccountBoxIcon className='icon' />
            <span onClick={onClickProfile}>Profile</span>
          </li>
          <li>
            <LogoutIcon className='icon' />
            <span onClick={onClickLogOut}>Logout</span>
          </li>

        </ul>
      </div>
      <div className="bottom">

      </div>
    </div>
  )
}
export default Sidebar