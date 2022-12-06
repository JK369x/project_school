import React from 'react'
import { Navigate } from 'react-router-dom'
import NavbarAdmin from '../../components/componentsAdmin/NavbarAdmin'
import NavigatebarAdmin from '../../components/componentsAdmin/NavigatebarAdmin'

const DashboardAdmin = () => {
  return (
    <div>
        <NavbarAdmin/>
        <NavigatebarAdmin/> 
    </div>
  )
}

export default DashboardAdmin
