import React from 'react'
import { Navigate } from 'react-router-dom'
import NavbarAdmin from '../../components/componentsAdmin/NavbarAdmin'
import NavigatebarAdmin from '../../components/componentsAdmin/NavigatebarAdmin'
import Home from './Home/Home'

const DashboardAdmin = () => {
  return (
    <div>
        <Home/>
    </div>
  )
}

export default DashboardAdmin
