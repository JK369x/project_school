import './Side-bar.scss';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import StoreIcon from '@mui/icons-material/Store';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsSystemDaydreamIcon from '@mui/icons-material/SettingsSystemDaydream';
import PsychologyIcon from '@mui/icons-material/Psychology';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LogoutIcon from '@mui/icons-material/Logout';
//react dom 
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export const Sidebar = () => {
  const navigate = useNavigate()
  const onClickUser =  () =>{
    navigate('/users')
  
  }
  const onClickDashboard =  () =>{
    navigate('/dashboard')
  }

  const onClickCourse =  () =>{
  
    navigate('/courses')
  }

  const onClickCategory =  () =>{
  
    navigate('/category')
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
            <DashboardIcon className='icon'/>
            <span onClick={onClickDashboard}>Dashboard</span>
          </li>
          <p className="title">List</p>

          <li>
            <PersonOutlineIcon className='icon' />
            <span onClick={onClickUser}>Users</span>
          </li>
          <li>
            <StoreIcon className='icon'/>
            <span onClick={onClickCourse}>Course</span>
          </li>
          <li>
            <CreditCardIcon className='icon'/>
            <span onClick={onClickCategory}>Category</span>
          </li>
          <li>
            <LocalShippingIcon className='icon'/>
            <span>Delivery</span>
          </li>
          <p className="title">USEFUL</p>
          <li>
            <QueryStatsIcon className='icon'/>
            <span>Stats</span>
          </li>
          <li>
            <NotificationsIcon className='icon'/>
            <span>Notifications</span>
          </li>
          <p className="title">SERVICE</p>
          <li>
            <SettingsSystemDaydreamIcon className='icon'/>
            <span>System Health</span>
          </li>
          <li>
            <PsychologyIcon className='icon'/>
            <span>Logs</span>
          </li>
          <li>
            <SettingsIcon className='icon'/>
            <span>Setting</span>
          </li>
          <p className="title">USER</p>
          <li>
            <AccountBoxIcon className='icon'/>
            <span>Profile</span>
          </li>
          <li>
            <LogoutIcon className='icon'/>
            <span>Logout</span>
          </li>
          
        </ul>
      </div>
      <div className="bottom">
        <div className="colorOption"></div>
        <div className="colorOption"></div>
      </div>
    </div>
  )
}
export default Sidebar