import React from 'react'
import { Navigate } from 'react-router-dom'
import NavbarAdmin from '../../components/componentsAdmin/NavbarAdmin'
import NavigatebarAdmin from '../../components/componentsAdmin/NavigatebarAdmin'
import Dashboard from './Home/HomeAdmin'

const DashboardAdmin = () => {
  return (
    <div>
     <Dashboard/>
    </div>
  )
}

export default DashboardAdmin
